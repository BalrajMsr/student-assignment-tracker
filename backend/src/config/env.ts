/**
 * Environment variable validation and configuration
 * Ensures all required environment variables are present before server startup
 */
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

interface EnvConfig {
  PORT: string;
  MONGO_URI: string;
  JWT_SECRET: string;
  NODE_ENV: string;
}

const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET'] as const;

/**
 * Validates that all required environment variables are set
 * @throws Error if any required environment variable is missing
 */
export const validateEnv = (): EnvConfig => {
  const missing: string[] = [];

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }

  // Validate JWT_SECRET strength
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }

  return {
    PORT: process.env.PORT || '5000',
    MONGO_URI: process.env.MONGO_URI!,
    JWT_SECRET: process.env.JWT_SECRET!,
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
};

export const env = validateEnv();

