const express = require('express');
const app = express();
app.set('title','Hello');
var title = app.get('title');
console.log(title);