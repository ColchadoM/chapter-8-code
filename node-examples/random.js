function random (min, max) {
  var len = max - min;
  return (Math.random() * len) + min;
}

console.log(random(1,7));
module.exports = random;
