/**
 * Database connection configuration
 * Handles MongoDB connection with proper error handling and connection options
 */
import mongoose from 'mongoose';
import { env } from './env';

/**
 * Connects to MongoDB database
 * @throws Error if connection fails
 */
export const connectDB = async (): Promise<void> => {
  try {
    const options: mongoose.ConnectOptions = {
      // Connection pool settings for better performance
      maxPoolSize: 10,
      minPoolSize: 5,
      // Connection timeout
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(env.MONGO_URI, options);
    
    console.log('✅ MongoDB Connected Successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
};
