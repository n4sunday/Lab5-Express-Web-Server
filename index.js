var express = require('express'),
   app = express(),
   bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static(__dirname + '/public'));
var session = require('express-session')

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1000 },
   resave : false, saveUninitialized: false }))

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(function(req, res, next) {
    var sess = req.session
    console.log(sess.views)
    next();
 })


app.post('/admin', urlencodedParser, function(req, res){
    console.log(req.body.user);
    console.log(req.body.pass);

    req.session.user =  req.body.user
    console.log("session user : "+req.session.user);
    req.session.pass =  req.body.pass
    console.log("session pass : "+req.session.pass);

    if(req.session.user=='5935512004' && req.session.pass=='root'){
        res.render('admin', {admins: ['Hello'] , foo: req.session.user, bt: 'Logout' })
        console.log("login Complete")
    }
    else {
        res.render('admin', {admins: ['Please login first'] , foo:'', bt: 'Login'})
        console.log("login Fail")
    }
 })
 app.get('/admin', urlencodedParser, function(req, res){
    if(req.session.user=='5935512004' && req.session.pass=='root'){
        res.render('admin', {admins: ['Hello'] , foo: req.session.user, bt: 'Logout' })
        console.log("login Complete")
    }
    else {
        res.render('admin', {admins: ['Please login first'] , foo:'', bt: 'Login'})
        console.log("login Fail")
    }
 })




 app.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('destroy session');
            res.redirect('/form.html');
        }
    });
 });
 

app.listen(8000);

