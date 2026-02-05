import { Pool } from 'pg';

// Lazy initialize pool (only when DATABASE_URL is available)
let pool = null;

function getPool() {
    if (!pool) {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) {
            throw new Error('DATABASE_URL environment variable is not set. Please configure Vercel Postgres.');
        }
        pool = new Pool({
            connectionString: dbUrl,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
        });
    }
    return pool;
}

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        // Ensure table exists (safe to run on each request)
        await getPool().query(`
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMPTZ DEFAULT now()
            )
        `);

        switch (req.method) {
            case 'GET': {
                const result = await getPool().query('SELECT id, name, message, created_at FROM comments ORDER BY created_at DESC');
                const formatted = result.rows.map(r => ({
                    id: r.id,
                    name: r.name,
                    message: r.message,
                    createdAt: r.created_at.toISOString()
                }));
                res.status(200).json(formatted);
                break;
            }

            case 'POST': {
                const { name, message } = req.body || {};
                if (!name || !message) {
                    return res.status(400).json({ error: 'Name and message are required' });
                }
                if (String(name).trim().length < 2 || String(message).trim().length < 5) {
                    return res.status(400).json({ error: 'Name must be at least 2 characters and message at least 5 characters' });
                }

                const insertResult = await getPool().query(
                    'INSERT INTO comments (name, message) VALUES ($1, $2) RETURNING id, name, message, created_at',
                    [String(name).trim(), String(message).trim()]
                );
                const newRow = insertResult.rows[0];
                res.status(201).json({
                    id: newRow.id,
                    name: newRow.name,
                    message: newRow.message,
                    createdAt: newRow.created_at.toISOString()
                });
                break;
            }

            case 'DELETE': {
                const { id } = req.body || {};
                if (!id) return res.status(400).json({ error: 'Comment ID is required for deletion' });

                const delResult = await getPool().query('DELETE FROM comments WHERE id = $1 RETURNING id', [parseInt(id, 10)]);
                if (delResult.rowCount === 0) return res.status(404).json({ error: 'Comment not found' });
                res.status(200).json({ message: 'Comment deleted successfully' });
                break;
            }

            default:
                res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
                res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}