var fs = require('fs');

// Sync
console.log(1);
var data = fs.readFileSync('data.txt', {encoding: 'utf8'});
console.log(data);

//readFileSyn
console.log(2);
fs.readFile('data.txt', {encoding: 'utf8'}, function(error, data){
  console.log(3);
  console.log(data);
})

console.log(4);
