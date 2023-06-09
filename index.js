const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function downloadImage(imageUrl, imagePath) {
  const response = await axios.get(imageUrl, { responseType: 'stream' });
  response.data.pipe(fs.createWriteStream(imagePath));
}

async function downloadPictures(concurrent) {
  try {
    const url = process.argv[2];
    if (!url) {
      console.error('Please provide a URL as a command line argument.');
      return;
    }

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const firstLink = $('#content > div:nth-child(1) > a').attr('href');
    const linkNumber = firstLink.match(/\/(\d+)\//)[1];
    const username = url.split('/').slice(-2, -1)[0];

    const picturesDirectory = path.join(__dirname, 'pictures', username);
    if (!fs.existsSync(picturesDirectory)) {
      fs.mkdirSync(picturesDirectory, { recursive: true });
    }

    const numPictures = parseInt(linkNumber, 10);
    if (concurrent) {
      const downloadPromises = [];
      for (let i = 1; i <= numPictures; i++) {
        const formattedNumber = i.toString().padStart(4, '0');
        const imageUrl = `https://fapello.com/content/d/a/${username}/1000/${username}_${formattedNumber}.jpg`;
        const imagePath = path.join(picturesDirectory, `${formattedNumber}.jpg`);
        const downloadPromise = downloadImage(imageUrl, imagePath);
        downloadPromises.push(downloadPromise);
        console.log(`Started downloading picture ${i}/${numPictures}`);
      }

      await Promise.all(downloadPromises);
    } else {
      for (let i = 1; i <= numPictures; i++) {
        const formattedNumber = i.toString().padStart(4, '0');
        const imageUrl = `https://fapello.com/content/d/a/${username}/1000/${username}_${formattedNumber}.jpg`;
        const imagePath = path.join(picturesDirectory, `${formattedNumber}.jpg`);
        await downloadImage(imageUrl, imagePath);
        console.log(`Downloaded picture ${i}/${numPictures}`);
      }
    }

    console.log('Pictures downloaded successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Check the command line arguments for the "--concurrent" switch
const concurrentFlagIndex = process.argv.indexOf('--concurrent');
const isConcurrent = concurrentFlagIndex !== -1;

// Start the picture download based on the user's choice
downloadPictures(isConcurrent);
