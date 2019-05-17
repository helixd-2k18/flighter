(async () => {
    "use strict";

    const fs = require("fs");
    const express = require('express'), path = require('path'), favicon = require('serve-favicon'), mongoose = require('mongoose'), bodyParser = require('body-parser'), session = require('express-session'), cookieParser = require('cookie-parser');
    const MongoStore = require('connect-mongo')(session);
    //let register = require('./router/register')

    const config = require('./config');
    const serveStatic = require('serve-static');

    let app = express()
    let server = require('http').createServer(app)
    let io = require('socket.io')(server)
    let port = config.port

    //const babelCompiler = require('./generator/babel')
    //const sassCompiler = require('./generator/sass')
    let sass = require('node-sass');
    sass.middleware = require('node-sass-middleware');

    // 
    express.static.mime.define({'text/jpeg': ['jpg']});
    express.static.mime.define({'text/css': ['css']});
    express.static.mime.define({'text/css': ['scss']});
    express.static.mime.define({'text/javascript': ['ts']});

    // 
    //app.use(express.static(__dirname + '/public'))
    //app.use(express.static(__dirname + '/node_modules'))
    
    app.use("/public", express.static(path.join(__dirname, 'node_modules')))
    app.use("/public", express.static(path.join(__dirname, 'public')))
    
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')
    app.set('trust proxy', 1)
    app.use(cookieParser())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true}))

    // session 
/*
    let db = {
        once:()=>{}
    }
    mongoose.connect(config.dbUrl , (err) => { useNewUrlParser: true });
    app.use(session({
        secret: 'work hard',
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
          mongooseConnection: db
        })
    }))
*/

    var showdown  = require('showdown'),
        converter = new showdown.Converter(),
        blog      = require('./posts.json');
        //text      = '# hello, markdown!',
        //html      = converter.makeHtml(text);

    // main page
    app.get('/', async (req, res) => {
        let welcomeText = "Flighters";

        // planned handling 
        for (let post of blog.posts) {
            post.html = converter.makeHtml(fs.readFileSync(post.file).toString("utf-8"));
        }

        // 
        res.render('pages/index.ejs', {welcomeText: welcomeText, posts: blog.posts})
    })

    // middleware styles
    app.use("/public/styles", sass.middleware({
        src: __dirname + '/views/styles',
        dest: __dirname + '/public/styles',
        debug: true,
        outputStyle: 'expanded',
        importer: require('node-sass-package-importer')(),
    }))

    // 
    app.get("logout", (req, res, next) => { if (req.session) {
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        })
    }})

    // use favicon
    app.use(favicon(path.join(__dirname, 'public', 'images/favicon.png')));

    // listen by port
    app.listen(port, () => console.log(`Flighter website server initialized!`))

    // error handler
    app.use(require("./middleware/errorhandler").handle);

})();
