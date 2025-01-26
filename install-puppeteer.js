const puppeteer = require('puppeteer');

puppeteer
  .launch()
  .then(() => {
    console.log('Puppeteer installed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error installing Puppeteer:', error);
    process.exit(1);
  });