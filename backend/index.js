// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const express = require('express');
// const cron = require('node-cron');
// const plantRoutes = require('./routes/Plantroutes');
// const wateringRoutes = require('./routes/wateringRoutes');
// const User = require('./models/User');
// const WateringSchedule = require('./models/WateringSchedule');
// const cors = require('cors');
// const rateLimit = require('express-rate-limit');
// const winston = require('winston');
// const { sendWateringReminder } = require('./services/emailService');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Logger Setup
// // const logger = winston.createLogger({
// //   level: 'info',
// //   format: winston.format.combine(
// //     winston.format.timestamp(),
// //     winston.format.json()
// //   ),
// //   transports: [
// //     new winston.transports.File({ filename: 'error.log', level: 'error' }),
// //     new winston.transports.File({ filename: 'combined.log' }),
// //     new winston.transports.Console(),
// //   ],
// // });

// // Environment Variable Check
// const requiredEnvVars = [
//   'MONGO_URI',
//   'JWT_SECRET_KEY',
//   'EMAIL_USER',
//   'EMAIL_PASSWORD',
//   'FRONTEND_URL',
// ];
// requiredEnvVars.forEach((varName) => {
//   if (!process.env[varName]) {
//     logger.error(`Missing required environment variable: ${varName}`);
//     process.exit(1);
//   }
// });

// // Middleware
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
// app.use(express.json());

// // Rate Limiting
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: 'Too many requests, please try again later.',
// });
// app.use('/api/signup', authLimiter);
// app.use('/api/login', authLimiter);

// // Routes
// app.use('/api/plants', plantRoutes);
// app.use('/api/watering', wateringRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => logger.info('✅ Connected to MongoDB'))
//   .catch((err) => {
//     logger.error('❌ MongoDB connection error:', err);
//     process.exit(1);
//   });

// // Scheduled Job
// cron.schedule('0 9 * * *', async () => {
//   try {
//     logger.info('Running daily watering schedule check...');
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
//     const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));

//     const schedules = await WateringSchedule.find({
//       wateringDate: { $gte: startOfDay, $lt: endOfDay },
//       notificationSent: false,
//     }).populate('user');

//     logger.info(`Found ${schedules.length} schedules to process.`);

//     for (const schedule of schedules) {
//       if (!schedule.user?.email) {
//         logger.error(`No valid user email for schedule ${schedule._id}`);
//         continue;
//       }

//       if (schedule.user.receiveReminders === false) {
//         logger.info(`Skipping email for ${schedule.plantName} (user unsubscribed)`);
//         continue;
//       }

//       logger.info(`Processing schedule for ${schedule.plantName} (${schedule.user.email})`);
//       const emailSent = await sendWateringReminder(
//         schedule.user.email,
//         schedule.plantName,
//         schedule.wateringDate
//       );
//       if (emailSent) {
//         schedule.notificationSent = true;
//         await schedule.save();
//         logger.info(`Email sent for ${schedule.plantName}`);
//       } else {
//         logger.error(`Failed to send email for ${schedule.plantName}`);
//       }
//     }
//   } catch (error) {
//     logger.error('Error in daily watering check:', error);
//   }
// });

// // Signup Route
// app.post('/api/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   logger.info('Signup attempt:', { email });

//   if (!name || !email || !password) {
//     logger.warn('Signup failed: Missing fields', { email });
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       logger.warn('Signup failed: Email already registered', { email });
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });
//     logger.info('User registered successfully', { email, userId: user._id });

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     logger.error('Signup error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login Route
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   logger.info('Login attempt:', { email });

//   if (!email || !password) {
//     logger.warn('Login failed: Missing fields', { email });
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       logger.warn('Login failed: User not found', { email });
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       logger.warn('Login failed: Invalid credentials', { email });
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: '1h' }
//     );

//     logger.info('Login successful', { email, userId: user._id });

//     res.json({
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     logger.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Unsubscribe Route
// app.get('/api/watering/unsubscribe', async (req, res) => {
//   const { email } = req.query;
//   logger.info('Unsubscribe attempt:', { email });

//   if (!email) {
//     logger.warn('Unsubscribe failed: Email parameter missing');
//     return res.status(400).send('Email parameter is required');
//   }

//   try {
//     const user = await User.findOneAndUpdate(
//       { email },
//       { $set: { receiveReminders: false } }
//     );

//     if (!user) {
//       logger.warn('Unsubscribe failed: User not found', { email });
//       return res.status(404).send('User not found');
//     }

//     logger.info('User unsubscribed successfully', { email });
//     res.send(`
//       <html>
//         <body style="font-family: Arial, sans-serif; text-align: center; padding: 2rem;">
//           <h1 style="color: #2e7d32;">You've been unsubscribed</h1>
//           <p>You will no longer receive watering reminder emails.</p>
//           <p><a href="${process.env.FRONTEND_URL}" style="color: #2e7d32;">Return to GroWithMe</a></p>
//         </body>
//       </html>
//     `);
//   } catch (error) {
//     logger.error('Unsubscribe error:', error);
//     res.status(500).send('Error processing unsubscribe request');
//   }
// });

// // Default Route
// app.get('/', (req, res) => {
//   res.send('🌱 GrowWithMe Backend is running');
// });

// // Error Middleware
// app.use((err, req, res, next) => {
//   logger.error('Unhandled error:', {
//     error: err.message,
//     stack: err.stack,
//     path: req.path,
//     method: req.method,
//   });
//   res.status(500).json({ message: 'Something went wrong on the server' });
// });

// // Start Server
// app.listen(port, () => {
//   logger.info(`🚀 Server is running on http://localhost:${port}`);
// });


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const cron = require('node-cron');
const plantRoutes = require('./routes/plantRoutes');
const wateringRoutes = require('./routes/wateringRoutes');
const User = require('./models/User');
const WateringSchedule = require('./models/WateringSchedule');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const emailRoutes = require('./routes/emailRoutes');
const { sendWateringReminder } = require('./services/emailService');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Check environment variables
const requiredEnvVars = [
  'MONGO_URI',
  'JWT_SECRET_KEY',
  'EMAIL_USER',
  'EMAIL_PASSWORD',
  'FRONTEND_URL',
];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});


// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use('/api/signup', authLimiter);
app.use('/api/login', authLimiter);

app.use('/api/email', emailRoutes);
// Routes
app.use('/api/plants', plantRoutes);
app.use('/api/watering', wateringRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Cron Job - Daily Watering Check
cron.schedule('0 9 * * *', async () => {
  try {
    console.log('🕘 Running daily watering schedule check...');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));

    const schedules = await WateringSchedule.find({
      wateringDate: { $gte: startOfDay, $lt: endOfDay },
      notificationSent: false,
    }).populate('user');

    console.log(`📋 Found ${schedules.length} schedules to process`);

    for (const schedule of schedules) {
      if (!schedule.user?.email) {
        console.warn(`⚠️ No valid user email for schedule ${schedule._id}`);
        continue;
      }

      if (schedule.user.receiveReminders === false) {
        console.log(`⏩ Skipping email for ${schedule.plantName} (user unsubscribed)`);
        continue;
      }

      const emailSent = await sendWateringReminder(
        schedule.user.email,
        schedule.plantName,
        schedule.wateringDate
      );

      if (emailSent) {
        schedule.notificationSent = true;
        await schedule.save();
        console.log(`✅ Email sent for ${schedule.plantName}`);
      } else {
        console.error(`❌ Failed to send email for ${schedule.plantName}`);
      }
    }
  } catch (error) {
    console.error('❌ Error in daily watering check:', error.message);
  }
});

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('📝 Signup attempt:', email);

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    console.log('✅ User registered:', user._id);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Signup error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('🔐 Login attempt:', email);

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    console.log('✅ Login successful:', user._id);
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unsubscribe Route
app.get('/api/watering-schedules/unsubscribe', async (req, res) => {
  const { email } = req.query;
  console.log('📤 Unsubscribe request:', email);

  if (!email) {
    return res.status(400).send('Email parameter is required');
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { receiveReminders: false } }
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    console.log('✅ User unsubscribed:', email);
    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 2rem;">
          <h1 style="color: #2e7d32;">You've been unsubscribed</h1>
          <p>You will no longer receive watering reminder emails.</p>
          <p><a href="${process.env.FRONTEND_URL}" style="color: #2e7d32;">Return to GroWithMe</a></p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('❌ Unsubscribe error:', error.message);
    res.status(500).send('Error processing unsubscribe request');
  }
});

// Default Route
app.get('/', (req, res) => {
  res.send('🌱 GrowWithMe Backend is running');
});

// Error Middleware
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', {
    message: err.message,
    path: req.path,
    method: req.method,
    stack: err.stack,
  });
  res.status(500).json({ message: 'Something went wrong on the server' });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
