const express = require('express');
const app = express();

/* app.set('title','Hello');
var title = app.get('title');
console.log(title); */

app.get('/',(req,res)=>{
    res.send('Hello World!!!');
});

app.get('/api/courses',(req,res)=>{
    res.send([1,2,3]);
});
//app.listen(3000,()=>{console.log('Listening on port 3000')});
const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Listening on port ${port}...`)});