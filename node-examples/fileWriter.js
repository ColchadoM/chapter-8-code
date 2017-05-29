var fs = require('fs');

fs.writeFile('file.txt', 'Hello content!', function (error) {
  if (error) throw error;
  console.log('Saved!');
});
