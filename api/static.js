import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

export default function handler(req, res) {
  try {
    // Remove leading slash and decode URL
    const filePath = decodeURIComponent(req.url.split('?')[0].replace(/^\//, ''));
    
    // Security: Don't allow path traversal
    if (filePath.includes('..') || filePath.includes('/.')) {
      return res.status(403).send('Forbidden');
    }

    // Get full file path
    const fullPath = path.resolve(__dirname, '..', filePath);
    
    // Security: Ensure file is within root directory
    const rootDir = path.resolve(__dirname, '..');
    if (!fullPath.startsWith(rootDir)) {
      return res.status(403).send('Forbidden');
    }

    // Check if file exists and is a file (not directory)
    if (!fs.existsSync(fullPath)) {
      return res.status(404).send('Not Found');
    }

    const stats = fs.statSync(fullPath);
    if (!stats.isFile()) {
      return res.status(403).send('Forbidden');
    }

    // Get file extension and MIME type
    const ext = path.extname(fullPath).toLowerCase();
    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    // Read and send file
    const content = fs.readFileSync(fullPath);
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(content);
  } catch (error) {
    console.error('Error serving file:', error);
    res.status(500).send('Internal Server Error');
  }
}
