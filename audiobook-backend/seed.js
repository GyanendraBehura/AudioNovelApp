const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const path = require('path');
const fs = require('fs');
const Audiobook = require('./models/Audiobook'); // Adjust the path if necessary

const uri = 'mongodb+srv://gyanendrabbsr2001:gyana123@gyanendra.thh2c8i.mongodb.net/audiobooks';

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const conn = mongoose.connection;

conn.once('open', () => {
  const bucket = new GridFSBucket(conn.db, { bucketName: 'images' });
  console.log('GridFS initialized');

  // Function to insert audiobook with image from local folder
  const insertAudiobook = async (audiobookData, imagePath) => {
    try {
      if (!fs.existsSync(imagePath)) {
        console.error('Image file does not exist:', imagePath);
        return;
      }

      const fileName = path.basename(imagePath);
      console.log(`Uploading image: ${fileName}`);

      // Create a write stream to GridFS
      const uploadStream = bucket.openUploadStream(fileName);
      const readStream = fs.createReadStream(imagePath);

      readStream.pipe(uploadStream);

      uploadStream.on('finish', async () => {
        // Retrieve the uploaded file's ID from GridFS
        const file = await bucket.find({ filename: fileName }).toArray();
        if (file.length === 0) {
          throw new Error('File not found in GridFS');
        }

        const fileId = file[0]._id;
        console.log('Image uploaded to GridFS with ID:', fileId);

        const newAudiobook = new Audiobook({
          ...audiobookData,
          image: fileId,
        });

        try {
          await newAudiobook.save();
          console.log('Audiobook and image saved to database');
        } catch (saveErr) {
          console.error('Error saving audiobook to database:', saveErr);
        }

        mongoose.connection.close();
      });

      uploadStream.on('error', (err) => {
        console.error('Error writing image to GridFS:', err);
        mongoose.connection.close();
      });

      readStream.on('error', (err) => {
        console.error('Error reading image file:', err);
        mongoose.connection.close();
      });
    } catch (err) {
      console.error('Error in insertAudiobook function:', err);
    }
  };

  // Example audiobook data
  const audiobookData = {
    id: 3,
    name: 'My Boyfriend is Ninja',
    author: 'aryan suvada',
    genres: ['Thriller'],
    description: "Apni katilana zindagi se tang aakar Japan ka ek khatarnaak ninja, Zoro Yoshida, India bhaag aata hai aur Nidhi se pyaar kar baithta hai. Jab use pata chalta hai ki Nidhi ki jaan khatre mein hai, tab firse uske samne uski purani zindagi khadi hoti hai, jisse bhaag kar wo India aaya tha. Kya Zoro firse rakhega kadam gunaho ki duniya me aur bahayega khoon ki nadiya ya fir wo chhod dega Nidhi ka sath? Aayiye sunte hain hmare is khaas audio show me.",
    rating: 4.6,
    reviews: [
      {
        user_name: 'User One',
        review: 'Great audiobook!',
        rating: 4.6,
      },
      {
        user_name: 'User Two',
        review: 'Enjoyed it a lot.',
        rating: 4.6,
      },
    ],
  };

  // Path to the image file in the specified directory
  const imagePath = path.join(__dirname, 'images1','My Boyfriend is Ninja.webp');

  // Call the function to insert audiobook and image data
  insertAudiobook(audiobookData, imagePath);
});
