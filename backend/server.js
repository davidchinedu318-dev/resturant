const express = require('express')
const cors = require('cors')
const multer = require('multer')
const { v2: cloudinary } = require('cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// configure multer to upload directly to cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'eateny',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
})

const upload = multer({ storage })

// image upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  res.json({ imageUrl: req.file.path })
})

const foodRoutes = require('./routes/foods')
app.use('/api/foods', foodRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})