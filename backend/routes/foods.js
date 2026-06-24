const express = require('express')
const router = express.Router()
const pool = require('../db')

// GET all foods
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM foods ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST add new food
router.post('/', async (req, res) => {
  try {
    const { name, price, category, status, description, image } = req.body
    const result = await pool.query(
      'INSERT INTO foods (name, price, category, status, description, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, price, category, status, description, image]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT update food
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, price, category, status, description, image } = req.body
    const result = await pool.query(
      'UPDATE foods SET name=$1, price=$2, category=$3, status=$4, description=$5, image=$6 WHERE id=$7 RETURNING *',
      [name, price, category, status, description, image, id]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE food
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM foods WHERE id=$1', [id])
    res.json({ message: 'Food deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router