import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import errorMiddleware from './middleware/error.middleware.js';
import productsRouter from './routes/products.routes.js';
import customerRouter from './routes/customer.routes.js'; // Corrected variable name to customerRouter
import loggingMiddleware from './middleware/log.middleware.js';

config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging requests to the console

// CORS configuration (for handling cross-origin requests)
app.use((req, res, next) => {
  // Allow any origin when credentials are not present
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials like cookies
  next();
});



app.use(loggingMiddleware)

// Routes
app.use('/api/v1/product', productsRouter); // Endpoint for products
app.use('/api/v1/customer', customerRouter); // Endpoint for customers

// Default route for testing server
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is running and ready.',
  });
});

// Error handling middleware (must be defined after routes)
app.use(errorMiddleware);

// Catch-all route for undefined endpoints
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: 'Oops! Not Found',
  });
});

// Export the Express app instance
export default app;
