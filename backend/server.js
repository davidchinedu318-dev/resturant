const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

// serve uploaded images as static files
app.use('/uploads', express.static('uploads'))

// configure where images are saved
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

// image upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  res.json({ imageUrl: `http://localhost:5000/uploads/${req.file.filename}` })
})

const foodRoutes = require('./routes/foods')
app.use('/api/foods', foodRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})