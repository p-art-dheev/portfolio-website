const sharp = require('sharp');
const toIco = require('to-ico');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'assets', 'images');

// Monogram styling — edit colors/letter if you want another look
const bgColor = '#0f172a'; // dark slate
const circleColor = '#06b6d4'; // teal
const textColor = '#ffffff';
const letters = 'PV';

function buildSVG(size) {
  const fontSize = Math.floor(size * 0.5);
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="100%" height="100%" fill="${bgColor}" />
    <circle cx="${size/2}" cy="${size/2}" r="${size*0.42}" fill="${circleColor}" />
    <text x="50%" y="50%" font-family="Segoe UI, Roboto, Inter, Arial, sans-serif" font-size="${fontSize}" fill="${textColor}" dominant-baseline="middle" text-anchor="middle">${letters}</text>
  </svg>`;
}

async function run() {
  try {
    // create 32x32 PNG
    const png32Path = path.join(outDir, 'favicon-32x32.png');
    const svg32 = buildSVG(32);
    const png32Buffer = await sharp(Buffer.from(svg32)).png().toBuffer();
    fs.writeFileSync(png32Path, png32Buffer);

    // create 180x180 apple-touch-icon
    const applePath = path.join(outDir, 'apple-touch-icon.png');
    const svg180 = buildSVG(180);
    const png180Buffer = await sharp(Buffer.from(svg180)).png().toBuffer();
    fs.writeFileSync(applePath, png180Buffer);

    // create ICO from 16x16 and 32x32
    const svg16 = buildSVG(16);
    const png16Buffer = await sharp(Buffer.from(svg16)).png().toBuffer();
    const icoBuffer = await toIco([png16Buffer, png32Buffer]);
    const icoPath = path.join(outDir, 'favicon.ico');
    fs.writeFileSync(icoPath, icoBuffer);

    console.log('Monogram favicons written:', { png32Path, applePath, icoPath });
  } catch (err) {
    console.error('Failed to generate monogram favicons:', err);
    process.exitCode = 1;
  }
}

run();
