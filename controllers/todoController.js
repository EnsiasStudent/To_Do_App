var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@todo-shard-00-00-cxnml.mongodb.net:27017,todo-shard-00-01-cxnml.mongodb.net:27017,todo-shard-00-02-cxnml.mongodb.net:27017/test?ssl=true&replicaSet=todo-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true});

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req, res){
        // get data from mongodb and pass it to view
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, "")}).deleteOne(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

};