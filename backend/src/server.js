require('dotenv').config();

const mongoose = require('mongoose');

const app = require('./app');
const connectDB = require('./config/db');

const port = Number(process.env.PORT) || 5000;
let server;
let isShuttingDown = false;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(port, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
    });
  } catch (error) {
    console.error(`Unable to start server: ${error.message}`);
    process.exit(1);
  }
};

const shutdown = async (signal) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`${signal} received. Shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  } else {
    await mongoose.connection.close();
    process.exit(0);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

startServer();
