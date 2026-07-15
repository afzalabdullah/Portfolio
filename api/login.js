module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { password } = req.body || {};
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin';

    if (password === expectedPassword) {
      return res.status(200).json({ success: true, token: expectedPassword });
    } else {
      return res.status(401).json({ success: false, error: "Incorrect password" });
    }
  } catch (err) {
    console.error("Login API error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
