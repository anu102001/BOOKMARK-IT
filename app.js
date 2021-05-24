const request = require("request");
const express =require("express");
const app = express();
const port = 3000;
app.set('views','./views')
app.set('view engine','ejs');
app.use(express.static('public'))
app.use('/css',express.static(__dirname +'public/css'))
app.use('/css',express.static(__dirname +'public/js'))
app.use('/css',express.static(__dirname +'public/img'))
app.get('/',(req, res)=>{
    res.render('home');
});

app.listen(port,()=>{
    console.log(`weather app is listening at https://localhost:${port}`)
});

app.set
