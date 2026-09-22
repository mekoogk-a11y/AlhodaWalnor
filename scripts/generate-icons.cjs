const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Generate valid PNG file using Node.js standard libraries
function createPng(width, height) {
  // A simple RGBA canvas buffer
  const buffer = Buffer.alloc(width * height * 4);

  // Background color: #0F1D36 (15, 29, 54, 255)
  // Gold color: #C5A265 (197, 162, 101, 255)
  // Radiant gold: #FDE68A (253, 230, 138, 255)
  // White: #FAF7F2 (250, 247, 242, 255)
  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.44;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Default dark navy background
      let r = 15;
      let g = 29;
      let b = 54;
      let a = 255;

      // Outer squircle margin border
      const margin = width * 0.05;
      if (x >= margin && x <= width - margin && y >= margin && y <= height - margin) {
        // Inner gradient
        r = 11 + Math.floor((x / width) * 10);
        g = 23 + Math.floor((y / height) * 15);
        b = 40 + Math.floor(((x + y) / (width * 2)) * 28);

        // Circular glow in upper center (dawn glow)
        const glowDx = x - cx;
        const glowDy = y - (cy * 0.75);
        const glowDist = Math.sqrt(glowDx * glowDx + glowDy * glowDy);
        const glowRadius = width * 0.28;

        if (glowDist < glowRadius) {
          const factor = 1 - (glowDist / glowRadius);
          r = Math.min(255, Math.floor(r * (1 - factor) + 246 * factor));
          g = Math.min(255, Math.floor(g * (1 - factor) + 225 * factor));
          b = Math.min(255, Math.floor(b * (1 - factor) + 140 * factor));
        }

        // Emerging path in bottom center
        const pathTop = cy * 0.8;
        const pathBottom = height - margin * 1.5;
        if (y >= pathTop && y <= pathBottom) {
          const progress = (y - pathTop) / (pathBottom - pathTop);
          const halfWidth = (width * 0.06) + progress * (width * 0.22);
          if (Math.abs(dx) <= halfWidth) {
            const pFactor = 0.85 - progress * 0.35;
            r = Math.floor(r * (1 - pFactor) + 245 * pFactor);
            g = Math.floor(g * (1 - pFactor) + 230 * pFactor);
            b = Math.floor(b * (1 - pFactor) + 180 * pFactor);
          }
        }

        // Quran / Book emblem shape
        const bookY = cy * 1.1;
        const bookDy = Math.abs(y - bookY);
        const bookDx = Math.abs(dx);
        if (bookDy < height * 0.09 && bookDx < width * 0.25) {
          if (bookDy < height * 0.07 && bookDx > 2 && bookDx < width * 0.23) {
            r = 250;
            g = 247;
            b = 242;
          } else if (bookDx <= 2) {
            r = 197;
            g = 162;
            b = 101;
          }
        }

        // Gold border stroke
        const isBorder = (
          (x >= margin && x <= margin + 4) ||
          (x >= width - margin - 4 && x <= width - margin) ||
          (y >= margin && y <= margin + 4) ||
          (y >= height - margin - 4 && y <= height - margin)
        );
        if (isBorder) {
          r = 197;
          g = 162;
          b = 101;
        }
      }

      buffer[idx] = r;
      buffer[idx + 1] = g;
      buffer[idx + 2] = b;
      buffer[idx + 3] = a;
    }
  }

  // Convert raw RGBA buffer into standard PNG
  return encodePNG(width, height, buffer);
}

function encodePNG(width, height, rgbaBuffer) {
  // Scanlines with filter byte 0
  const rowSize = width * 4;
  const filtered = Buffer.alloc((rowSize + 1) * height);
  for (let y = 0; y < height; y++) {
    filtered[y * (rowSize + 1)] = 0; // Filter None
    rgbaBuffer.copy(filtered, y * (rowSize + 1) + 1, y * rowSize, (y + 1) * rowSize);
  }

  const compressed = zlib.deflateSync(filtered, { level: 9 });

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const pubDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(pubDir, 'pwa-192x192.png'), createPng(192, 192));
fs.writeFileSync(path.join(pubDir, 'pwa-512x512.png'), createPng(512, 512));
fs.writeFileSync(path.join(pubDir, 'apple-touch-icon.png'), createPng(180, 180));
console.log('Successfully generated PWA PNG icons!');
