const path = require('path');
const rfs = require('rotating-file-stream');

const pad = num => (num > 9 ? num : `0${num}`);

const generator = () => {
  const time = new Date();

  const year = time.getFullYear();
  const month = pad(time.getMonth() + 1);
  const day = pad(time.getDate());

  return `uptick-${year}-${month}-${day}.log`;
};

const rotatingFileStream = rfs.createStream(generator, {
  interval: '1d', // rotate daily
  path: path.join(__dirname, '../storage/logs'),
});

module.exports = rotatingFileStream;
