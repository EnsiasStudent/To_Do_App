var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// set up template engine embedded javascript
app.set('view engine', 'ejs');

// static files using express middleware
app.use(express.static('./public'));

// fire controllers
todoController(app);

//listen to a specific port ( I choosed 3000 )
app.listen(3000);
console.log('You are listening to port 3000');
