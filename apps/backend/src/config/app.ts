import dotenv from 'dotenv';
dotenv.config();

export const environment = process.env.NODE_ENV;

export const appConfig = {
  port: process.env.PORT || 3000,
};

export const OpenAIConfig = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

export const dbConfig = {
  username: process.env.DB_USERNAME || 'Dbadmin',
  password: process.env.DB_PASSWORD || 'M@gento12345',
  database: process.env.DB_NAME || 'communications',
  host: process.env.DB_HOST || 'puradev.database.windows.net',
};