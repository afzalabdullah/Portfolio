const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Configure multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).single('file');

// Helper to run middleware in serverless environment
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// S3 Client configuration for Supabase
const s3 = new S3Client({
  endpoint: process.env.SUPABASE_S3_ENDPOINT,
  region: 'ap-south-1', // Supabase AWS region
  credentials: {
    accessKeyId: process.env.SUPABASE_S3_KEY_ID,
    secretAccessKey: process.env.SUPABASE_S3_SECRET
  },
  forcePathStyle: true
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Basic Auth Check
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD || 'admin'}`) {
      return res.status(401).json({ error: "Unauthorized: Invalid admin password" });
    }

    // Run multer parser
    await runMiddleware(req, res, upload);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Generate unique key
    const fileName = req.file.originalname.replace(/\s+/g, '_');
    const fileKey = `${Date.now()}_${fileName}`;
    const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'portfolio-assets';

    // Upload to S3 (Supabase)
    const uploadParams = {
      Bucket: bucketName,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };

    await s3.send(new PutObjectCommand(uploadParams));

    // Construct public access URL
    const publicUrl = `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/${bucketName}/${fileKey}`;

    return res.status(200).json({
      message: "File uploaded successfully",
      url: publicUrl,
      fileName: fileKey
    });
  } catch (err) {
    console.error("Upload API error:", err);
    return res.status(500).json({ error: "Upload failed", details: err.message });
  }
};
