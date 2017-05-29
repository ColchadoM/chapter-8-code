function random (min, max) {
  var len = max - min;
  return (Math.random() * len) + min;
}

module.exports = random;
