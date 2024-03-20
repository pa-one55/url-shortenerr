const { createShortUrl, decodeURL } = require('shortlnk');

async function testShortlnk() {
  try {
    const longUrl = 'https://www.youtube.com';

    // Create a short URL
    const createResponse = await createShortUrl(longUrl);
    if (createResponse.success) {
      console.log('Short URL:', createResponse.data);
    } else {
      console.error('Error creating short URL:', createResponse.error);
    }

    const shortUrl = 'j08KMQtWUC';

    // Decode a short URL
    const decodeResponse = await decodeURL(shortUrl);
    if (decodeResponse.success) {
      console.log('Decoded URL:', decodeResponse.data);
    } else {
      console.error('Error decoding short URL:', decodeResponse.error);
    }
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

testShortlnk();