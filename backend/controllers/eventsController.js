const pool = require('../db');

exports.createEvent = async (req, res) => {
    const { name, date, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO events (name, date, description) VALUES ($1, $2, $3) RETURNING *',
            [name, date, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
