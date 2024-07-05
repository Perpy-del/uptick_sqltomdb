import path from 'path';
import rfs from 'rotating-file-stream';

const pad = (num: any) => (num > 9 ? num : `0${num}`);

const generator = () => {
  const time: Date = new Date();

  const year: number = time.getFullYear();
  const month: number = pad(time.getMonth() + 1);
  const day: number = pad(time.getDate());

  return `uptick-${year}-${month}-${day}.log`;
};

const rotatingFileStream: rfs.RotatingFileStream = rfs.createStream(generator, {
  interval: '1d', // rotate daily
  path: path.join(__dirname, '../storage/logs'),
});

module.exports = rotatingFileStream;
