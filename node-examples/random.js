function random (min, max) {
  var len = max - min;
  return (Math.random() * len) + min;
}

console.log(random(2,6));
module.exports = random;
