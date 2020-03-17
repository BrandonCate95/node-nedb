var loki = require('lokijs')

var db = new loki('example.db');

var users = db.addCollection('users');

users.insert([{ name: 'Thor', age: 35}, { name: 'Loki', age: 30}]);

console.log(Date.now())
var odin = users.findOne({ name:'Thor' });
console.log(Date.now())

console.log(odin)