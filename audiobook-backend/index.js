const express = require('express');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const cors = require('cors');
const Audiobook = require('./models/Audiobook'); // Adjust the path if necessary

const app = express();
const port = 5000;
const uri = 'mongodb+srv://gyanendrabbsr2001:gyana123@gyanendra.thh2c8i.mongodb.net/audiobooks';

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const conn = mongoose.connection;
let bucket;

conn.once('open', () => {
  bucket = new GridFSBucket(conn.db, { bucketName: 'images' });
  console.log('GridFS initialized');
});

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Helper function to get image data from GridFS
const getImageData = async (imageId) => {
  try {
    const file = await bucket.find({ _id: new mongoose.Types.ObjectId(imageId) }).toArray();
    if (!file || file.length === 0) {
      throw new Error('File not found in GridFS');
    }

    const readstream = bucket.openDownloadStream(file[0]._id);
    const chunks = [];

    return new Promise((resolve, reject) => {
      readstream.on('data', (chunk) => chunks.push(chunk));
      readstream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const base64 = buffer.toString('base64');
        resolve(`data:${file[0].contentType};base64,${base64}`);
      });
      readstream.on('error', (err) => reject(err));
    });
  } catch (error) {
    console.error('Error retrieving image:', error);
    return null;
  }
};

// Endpoint to get all audiobooks with their images
app.get('/api/audiobooks', async (req, res) => {
  try {
    const audiobooks = await Audiobook.find().exec();

    // Fetch and include the image data for each audiobook
    const audiobooksWithImages = await Promise.all(audiobooks.map(async (audiobook) => {
      if (audiobook.image) {
        const imageId = audiobook.image.toString();
        audiobook = audiobook.toObject();
        audiobook.imageData = await getImageData(imageId);
      } else {
        audiobook.imageData = null;
      }
      return audiobook;
    }));

    res.json(audiobooksWithImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
