import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { env } from '../config/env';

/**
 * Logger Configuration
 *
 * Uses Winston for structured logging with:
 * - Console output in development
 * - File rotation in production
 * - JSON formatting for easy parsing
 * - Different log levels per environment
 */

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Console format for development (more readable)
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `${timestamp} [${level}]: ${message}${metaStr}`;
  })
);

// Configure transports based on environment
const transports: winston.transport[] = [];

// Console transport (always enabled)
transports.push(
  new winston.transports.Console({
    format: env.NODE_ENV === 'development' ? consoleFormat : logFormat,
  })
);

// File transports for production
if (env.NODE_ENV === 'production' || env.NODE_ENV === 'staging') {
  // Error logs - separate file for errors
  transports.push(
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '30d',
      maxSize: '20m',
      format: logFormat,
    })
  );

  // Combined logs - all levels
  transports.push(
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      maxSize: '20m',
      format: logFormat,
    })
  );
}

// Create logger instance
export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: logFormat,
  defaultMeta: {
    service: 'template-backend',
    environment: env.NODE_ENV,
  },
  transports,
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' }),
  ],
});

/**
 * Stream for Morgan HTTP logging
 */
export const httpLogStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

/**
 * Helper functions for common logging patterns
 */
export const loggers = {
  /**
   * Log API request
   */
  request: (method: string, path: string, userId?: string) => {
    logger.info('API Request', {
      method,
      path,
      userId,
      type: 'request',
    });
  },

  /**
   * Log API response
   */
  response: (method: string, path: string, statusCode: number, duration: number) => {
    logger.info('API Response', {
      method,
      path,
      statusCode,
      duration,
      type: 'response',
    });
  },

  /**
   * Log authentication event
   */
  auth: (event: string, userId: string, success: boolean, details?: object) => {
    logger.info('Auth Event', {
      event,
      userId,
      success,
      ...details,
      type: 'auth',
    });
  },

  /**
   * Log database operation
   */
  db: (operation: string, table: string, duration?: number, error?: Error) => {
    if (error) {
      logger.error('Database Error', {
        operation,
        table,
        duration,
        error: error.message,
        stack: error.stack,
        type: 'database',
      });
    } else {
      logger.debug('Database Operation', {
        operation,
        table,
        duration,
        type: 'database',
      });
    }
  },

  /**
   * Log security event
   */
  security: (event: string, severity: 'low' | 'medium' | 'high', details: object) => {
    logger.warn('Security Event', {
      event,
      severity,
      ...details,
      type: 'security',
    });
  },

  /**
   * Log performance metric
   */
  performance: (operation: string, duration: number, metadata?: object) => {
    logger.info('Performance Metric', {
      operation,
      duration,
      ...metadata,
      type: 'performance',
    });
  },
};

export default logger;
