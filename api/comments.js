import { json } from 'stream/consumers';

// Simple in-memory storage for comments (can be replaced with a real database)
let comments = [
    {
        id: 1,
        name: "Fã do Interior",
        message: "Vocês são a melhor banda da região! Mal posso esperar pelo próximo show!",
        createdAt: new Date('2026-01-15T10:30:00Z')
    },
    {
        id: 2,
        name: "Maria da Silva",
        message: "Adorei a música 'Astro Itapetinigano'! Quando sai o clipe?",
        createdAt: new Date('2026-01-18T15:45:00Z')
    }
];

// Helper function to generate unique IDs
function generateId() {
    return Math.max(0, ...comments.map(c => c.id)) + 1;
}

export default async function handler(req, res) {
    // Set CORS headers
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
        switch (req.method) {
            case 'GET':
                // Return comments sorted by creation date (newest first)
                const sortedComments = comments
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map(comment => ({
                        ...comment,
                        createdAt: comment.createdAt.toISOString()
                    }));
                
                res.status(200).json(sortedComments);
                break;

            case 'POST':
                const { name, message } = req.body;

                // Basic validation
                if (!name || !message) {
                    return res.status(400).json({ 
                        error: 'Name and message are required' 
                    });
                }

                if (name.trim().length < 2 || message.trim().length < 5) {
                    return res.status(400).json({ 
                        error: 'Name must be at least 2 characters and message at least 5 characters' 
                    });
                }

                // Create new comment
                const newComment = {
                    id: generateId(),
                    name: name.trim(),
                    message: message.trim(),
                    createdAt: new Date()
                };

                comments.push(newComment);

                // Return the created comment
                res.status(201).json({
                    ...newComment,
                    createdAt: newComment.createdAt.toISOString()
                });
                break;

            case 'DELETE':
                const { id } = req.body;
                
                if (!id) {
                    return res.status(400).json({ 
                        error: 'Comment ID is required for deletion' 
                    });
                }

                const commentIndex = comments.findIndex(c => c.id === parseInt(id));
                
                if (commentIndex === -1) {
                    return res.status(404).json({ 
                        error: 'Comment not found' 
                    });
                }

                comments.splice(commentIndex, 1);
                res.status(200).json({ message: 'Comment deleted successfully' });
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
                res.status(405).json({ 
                    error: `Method ${req.method} Not Allowed` 
                });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error' 
        });
    }
}