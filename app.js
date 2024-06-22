import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import errorMiddleware from './middleware/error.middleware.js';
import productRouter from './routes/product.routes.js';


config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// CORS configuration
app.use((req, res, next) => {
  // Allow any origin when credentials are not present
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials like cookies
  next();
});

// Routes



app.use('/api/v1/product',productRouter)

// Default route for testing
app.get('/', (req, res) => {
  res.status(200).json({
    message: "This is Test Running Server",
  });
});

// Error handling middleware
app.use(errorMiddleware);

// Catch-all route for undefined endpoints
app.all('*', (req, res) => {
  res.status(404).json({
    success:false,
    status:404,
    message:"Oops! Not Found"
  })
});

// Export the app
export default app;