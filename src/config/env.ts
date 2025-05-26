import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
  PORT: Joi.number().default(8080),
  DATABASE_URL: Joi.string().uri().required(),
  FRONTEND_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string(),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  MAIL: Joi.string().email().required(),
  PASS: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const ENV = {
  PORT: envVars.PORT,
  DATABASE_URL: envVars.DATABASE_URL,
  FRONTEND_URL: envVars.FRONTEND_URL,
  JWT_SECRET: envVars.JWT_SECRET,
  JWT_EXPIRES_IN: envVars.JWT_EXPIRES_IN,
  MAIL: envVars.MAIL,
  PASS: envVars.PASS,
  NODE_ENV: envVars.NODE_ENV,
};
