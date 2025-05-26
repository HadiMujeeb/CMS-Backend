import app from './app';
import { ENV } from './config/env';
import connectToMongoDB from './infrastructure/database/mongo/connection';

const PORT = ENV.PORT || 8080;

async function startServer() {
  try {
    await connectToMongoDB();  // Wait for DB connection first
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();
