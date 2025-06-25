// routes/form.js

const express = require('express')
const multer = require('multer')
const Info = require('../models/info.model')
const sendEmail = require('../lib/email')

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/submit', upload.single('image'), async (req, res) => {
  try {
    const { name, email, textArea } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    const image = req.file
      ? {
          data: req.file.buffer,
          contentType: req.file.mimetype
        }
      : undefined

    const info = new Info({
      name,
      email,
      textArea,
      image
    })

    await info.save()
    await sendEmail(info)

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('Server Error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
