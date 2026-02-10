
const sharp = require('sharp');
const toIco = require('to-ico');
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'assets', 'images', 'favicon.jpg');
const outDir = path.join(__dirname, '..', 'public', 'assets', 'images');

async function run() {
  try {
    // Ensure source exists
    if (!fs.existsSync(src)) throw new Error('Source image not found: ' + src);

    // Create 32x32 PNG
    const png32 = path.join(outDir, 'favicon-32x32.png');
    await sharp(src).resize(32, 32, { fit: 'cover' }).png().toFile(png32);

    // Create 180x180 apple-touch-icon
    const apple = path.join(outDir, 'apple-touch-icon.png');
    await sharp(src).resize(180, 180, { fit: 'cover' }).png().toFile(apple);

    // Generate ICO from 16x16 and 32x32 PNG buffers
    const png16Buffer = await sharp(src).resize(16, 16, { fit: 'cover' }).png().toBuffer();
    const png32Buffer = await sharp(src).resize(32, 32, { fit: 'cover' }).png().toBuffer();
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
