var express = require('express'),
   app = express(),
   bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static(__dirname + '/public'));

app.set('views', './views')
app.set('view engine', 'ejs')

app.post('/admin', urlencodedParser, function(req, res){
    console.log(req.body.user);
    console.log(req.body.pass);
    if(req.body.user=='5935512004' && req.body.pass=='root'){
        res.render('admin', {admins: ['Hello'] , foo: req.body.user, bt: 'Logout' })
        console.log("login Complete")
    }
    else {
        res.render('admin', {admins: ['Please login first'] , foo:'', bt: 'Login'})
        console.log("login Fail")
    }
 })

app.listen(8000);

