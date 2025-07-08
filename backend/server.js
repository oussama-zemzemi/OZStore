// server.js
import app from './app.js';
import db from './config/db.js';

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await db.getConnection();
    console.log('✅ Connected to MySQL database');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
})();

