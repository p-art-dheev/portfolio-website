
const sharp = require('sharp');
const toIco = require('to-ico');
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'assets', 'images', 'profile1.jpeg');
const outDir = path.join(__dirname, '..', 'public', 'assets', 'images');

function circleMask(size) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white" />
    </svg>
  `);
}

async function circlePng(size) {
  return sharp(src)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: circleMask(size), blend: 'dest-in' }])
    .png()
    .toBuffer();
}

async function run() {
  try {
    // Ensure source exists
    if (!fs.existsSync(src)) throw new Error('Source image not found: ' + src);

    // Create 32x32 PNG
    const png32 = path.join(outDir, 'favicon-32x32.png');
    fs.writeFileSync(png32, await circlePng(32));

    // Create 180x180 apple-touch-icon
    const apple = path.join(outDir, 'apple-touch-icon.png');
    fs.writeFileSync(apple, await circlePng(180));

    // Generate ICO from 16x16 and 32x32 PNG buffers
    const png16Buffer = await circlePng(16);
    const png32Buffer = await circlePng(32);
    const icoBuffer = await toIco([png16Buffer, png32Buffer]);
    const icoPath = path.join(outDir, 'favicon.ico');
    fs.writeFileSync(icoPath, icoBuffer);

    console.log('Favicons generated:', { png32, apple, icoPath });
  } catch (err) {
    console.error('Error generating favicons:', err);
    process.exitCode = 1;
  }
}

run();
