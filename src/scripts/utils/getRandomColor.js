const getRandomPastelColor = () => {
  const randomChannel = () => Math.floor(Math.random() * 128 + 127);
  const r = randomChannel();
  const g = randomChannel();
  const b = randomChannel();
  return `rgb(${r}, ${g}, ${b})`;
};

const rgbToHex = (rgbString) => {
  const rgbValues = rgbString.match(/\d+/g);
  const [r, g, b] = rgbValues.map(Number);
  const toHex = (val) => val.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export { getRandomPastelColor, rgbToHex }