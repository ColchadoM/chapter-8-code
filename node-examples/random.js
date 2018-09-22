function random (min, max) {
  var len = max - min;
  return (Math.random() * len) + min;
}

console.log(random(1,70));
module.exports = random;
