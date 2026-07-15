const { pool, initDb } = require('./db');

// Trigger table creation and data seeding asynchronously on module load
initDb().catch(err => console.error("Initial DB setup failed:", err));

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const dbRes = await pool.query('SELECT content FROM portfolio_data WHERE id = $1', ['main']);
      if (dbRes.rows.length === 0) {
        return res.status(404).json({ error: "Portfolio data not found" });
      }
      return res.status(200).json(dbRes.rows[0].content);
    } 
    
    if (req.method === 'POST') {
      // Basic Authorization Check
      const authHeader = req.headers.authorization;
      if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD || 'admin'}`) {
        return res.status(401).json({ error: "Unauthorized: Invalid admin password" });
      }

      const newContent = req.body;
      if (!newContent || typeof newContent !== 'object') {
        return res.status(400).json({ error: "Invalid data payload" });
      }

      await pool.query(
        'UPDATE portfolio_data SET content = $1 WHERE id = $2',
        [JSON.stringify(newContent), 'main']
      );
      return res.status(200).json({ message: "Portfolio updated successfully", content: newContent });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};
