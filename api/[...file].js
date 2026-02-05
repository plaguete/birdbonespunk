import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIME_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.webmanifest': 'application/manifest+json',
};

export default function handler(req, res) {
  // Parse the file path from the URL
  let filePath = req.url.replace(/^\/api\//, '').split('?')[0];
  
  // Remove leading/trailing slashes
  filePath = filePath.replace(/^\/|\/$/g, '');

  // Security: prevent path traversal
  if (filePath.includes('..') || filePath.includes('api')) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Try to find the file in the public directory
  const fullPath = path.join(__dirname, '..', 'public', filePath);

  try {
    if (fs.existsSync(fullPath)) {
      const ext = path.extname(fullPath).toLowerCase();
      const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
      const content = fs.readFileSync(fullPath);
      
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return res.send(content);
    }
  } catch (err) {
    console.error('File serving error:', err);
  }

  // If not found, return 404
  res.status(404).json({ error: 'Not found' });
}
