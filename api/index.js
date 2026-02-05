import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function handler(req, res) {
    try {
        // Read index.html from the root directory
        const indexPath = path.join(__dirname, '..', 'index.html');
        const indexContent = fs.readFileSync(indexPath, 'utf-8');
        
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200).send(indexContent);
    } catch (error) {
        console.error('Error serving index.html:', error);
        res.status(500).json({ error: 'Failed to load page' });
    }
}
