const SMILES = ['🦊', '❤', '👑', '🎶', '🔥'];

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomSmile = () => {
  const idx = getRandomNumber(0, SMILES.length - 1);
  return SMILES[idx];
};

const convertHoursToNumber = (hour) => {
  return +hour.split(':')[0] + +hour.split(':')[1] / 60;
};

const getSortedHours = (hrs) => {
  return hrs.sort((a, b) => a.split(':')[0] - b.split(':')[0]);
};

const getRangeHours = (startTime, endTime, accumulator) => {
  const duration = endTime.split(':')[0] - startTime.split(':')[0];

  Array.from({ length: duration }).forEach((item, index) => {
    accumulator.push(+startTime.split(':')[0] + index + ':00');
  });
};

module.exports = {
  convertHoursToNumber,
  getSortedHours,
  getRangeHours,
  getRandomNumber,
  getRandomSmile,
};
