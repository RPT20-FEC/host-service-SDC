//const brotli = require('brotli');
const fs = require('fs');
const zlib = require('zlib');

const brotliSettings = {
  extension: 'br',
  skipLarger: true,
  mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
  quality: 10, // 0 - 11,
  lgwin: 12 // default
};

// var dirs = ['client/dist'];
// dirs.forEach(dir => {
//     fs.readdirSync(dir).forEach(file => {
//       if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
//       // brotli
//       const result = brotli.compress(fs.readFileSync(dir + '/' + file), brotliSettings);
//       fs.writeFileSync(dir + '/' + file + '.br', result);
//       // gzip
//       const fileContents = fs.createReadStream(dir + '/' + file);
//       const writeStream = fs.createWriteStream(dir + '/' + file + '.gz');
//       const zip = zlib.createGzip();
//       fileContents
//           .pipe(zip)
//           .on('error', err => console.error(err))
//           .pipe(writeStream)
//           .on('error', err => console.error(err));
//       }
//     })
// })


const READ_FILE_NAME = 'client/dist/bundle.js';
const WRITE_FILE_NAME = 'client/dist/bundleCompressed.js.br';

// Create read and write streams
const readStream = fs.createReadStream(READ_FILE_NAME);
const writeStream = fs.createWriteStream(WRITE_FILE_NAME);

// Create brotli compress object
const brotli = zlib.createBrotliCompress();

// Pipe the read and write operations with brotli compression
const stream = readStream.pipe(brotli).pipe(writeStream);

stream.on('finish', () => {
  console.log('Done compressing 😎');
});