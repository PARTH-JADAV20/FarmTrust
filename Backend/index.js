const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const Farmer = require('./models/farmer');
const User = require('./models/user');

dotenv.config();

const app = express();
const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'farmtrust'
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'productImages') {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Product images must be image files'));
      }
    } else if (file.fieldname === 'fssaiCert' || file.fieldname === 'organicCert') {
      if (file.mimetype !== 'application/pdf') {
        return cb(new Error('Certificates must be PDF files'));
      }
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per file
});

app.post('/farmers', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const farmerData = {
      _id: new ObjectId().toString(),
      name,
      email,
    };

    const farmer = new Farmer(farmerData);
    await farmer.save();

    res.status(201).json({
      message: 'Farmer created successfully',
      farmerId: farmer._id
    });
  } catch (error) {
    console.error('Error creating farmer:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.patch('/farmers/:id', upload.fields([
  { name: 'productImages', maxCount: 4 },
  { name: 'fssaiCert', maxCount: 1 },
  { name: 'organicCert', maxCount: 1 }
]), async (req, res) => {
  try {
    const { id } = req.params;
    const { phone, address, description, deliveryCharge, products } = req.body;

    console.log('Request body:', req.body); 
    console.log('Uploaded files:', req.files); 

    const farmer = await Farmer.findById(id);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    if (phone) farmer.phone = phone;
    if (address) farmer.address = JSON.parse(address);
    if (description) farmer.description = description;
    if (deliveryCharge) farmer.deliveryCharge = deliveryCharge;

    // Upload product images to Cloudinary
    const productImages = [];
    if (req.files['productImages']) {
      for (const file of req.files['productImages']) {
        console.log('Uploading file:', file.originalname, file.mimetype, file.buffer.length); 
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'farmers/products', resource_type: 'image' },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error);
              } else {
                console.log('Upload result:', result); 
                resolve(result);
              }
            }
          ).end(file.buffer);
        });
        productImages.push(result.secure_url);
      }
    } else {
      console.log('No product images uploaded');
    }

    // Upload certificates to Cloudinary
    if (req.files['fssaiCert']) {
      const fssaiFile = req.files['fssaiCert'][0];
      const fssaiResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'farmers/certificates',
            resource_type: 'raw',
            public_id: `${Date.now()}-${fssaiFile.originalname}` 
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(fssaiFile.buffer);
      });
      farmer.certificates.fssai = fssaiResult.secure_url;
      console.log('FSSAI URL:', fssaiResult.secure_url);
    }

    if (req.files['organicCert']) {
      const organicFile = req.files['organicCert'][0];
      const organicResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'farmers/certificates',
            resource_type: 'raw',
            public_id: `${Date.now()}-${organicFile.originalname}`
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(organicFile.buffer);
      });
      farmer.certificates.organicFarm = organicResult.secure_url;
      console.log('Organic URL:', organicResult.secure_url);
    }

    if (products) {
      const parsedProducts = JSON.parse(products);
      const newProducts = parsedProducts.map(product => {
        const productId = new ObjectId().toString();
        console.log('New Product id:', productId);
        return {
          id: productId,
          name: product.name,
          mrpPerKg: product.mrpPerKg,
          images: productImages.length ? productImages : [], 
          description: product.description || '', 
          category: product.category,
          subcategory: product.subcategory,
          stockInKg: product.stockInKg,
        };
      });
      farmer.products.push(...newProducts);
    }

    await farmer.save();
    console.log('Updated farmer products:', farmer.products);

    res.status(200).json({
      message: 'Farmer updated successfully',
      farmer: farmer.toObject()
    });
  } catch (error) {
    console.error('Error updating farmer:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/farmers/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    res.status(200).json({
      message: 'Farmer retrieved successfully',
      farmer
    });
  } catch (error) {
    console.error('Error fetching farmer:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.delete('/farmers/:id/products/:productId', async (req, res) => {
  try {
    const { id, productId } = req.params;

    const farmer = await Farmer.findById(id);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    const productIndex = farmer.products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in farmer\'s products' });
    }

    farmer.products.splice(productIndex, 1);
    await farmer.save();

    res.status(200).json({
      message: 'Product removed successfully',
      farmer: farmer.toObject()
    });
  } catch (error) {
    console.error('Error removing product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { name, email, phone, address, role } = req.body; 

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const userData = {
      _id: new ObjectId().toString(),
      name,
      email,
      phone: phone || '',
      address: address || { street: '', city: '', state: '', zipCode: '' },
      role: role || 'customer' 
    };

    const user = new User(userData);
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      userId: user._id
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.patch('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, googleId, phone, address, cart, orders, role } = req.body; 

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id !== id) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email;
    }
    if (phone) user.phone = phone;
    if (address) user.address = JSON.parse(address);
    if (role) user.role = role; 

    if (cart) {
      const parsedCart = JSON.parse(cart);
      user.cart.push(...parsedCart);
    }

    if (orders) {
      const parsedOrders = JSON.parse(orders);
      const newOrders = parsedOrders.map(order => ({
        id: new ObjectId().toString(),
        farmerId: order.farmerId,
        products: order.products.map(product => ({
          productId: product.productId,
          name: product.name,
          quantityInKg: product.quantityInKg,
          pricePerKg: product.pricePerKg,
          totalPrice: product.totalPrice
        })),
        totalAmount: order.totalAmount,
        status: order.status || 'pending'
      }));
      user.orders.push(...newOrders);
    }

    await user.save();

    res.status(200).json({
      message: 'User updated successfully',
      user: user.toObject()
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/users/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User retrieved successfully',
      user: user.toObject()
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.delete('/users/:id/cart/:productId', async (req, res) => {
  try {
    const { id, productId } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cartIndex = user.cart.findIndex(item => item.productId === productId);
    if (cartIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    user.cart.splice(cartIndex, 1);
    await user.save();

    res.status(200).json({
      message: 'Cart item removed successfully',
      user: user.toObject()
    });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});