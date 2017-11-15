var db = require('../../config/database');

var api = {}

api.adiciona = function(req, res) {
    var task = req.body;
    delete task._id;
    db.insert(task, function(err, newDoc) {
        if(err) return console.log(err);
        console.log('Adicionado com sucesso: ' + newDoc._id);
        res.json(newDoc._id);
    });  
};

api.busca = function(req, res) {
   db.findOne({_id: req.params.taskId }, function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });
};

api.atualiza = function(req, res) {
    console.log('Parâmetro recebido:' + req.params.taskId);
    db.update({_id : req.params.taskId }, req.body, function(err, numReplaced) {
        if (err) return console.log(err);
        if(numReplaced) res.status(200).end();
        res.status(500).end();
        console.log('Atualizado com sucesso: ' + req.body._id);
        res.status(200).end();
    });  
};

api.lista = function(req, res) {
    db.find({}).sort({titulo: 1}).exec(function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });
};

api.listaPorGrupo = function(req, res) {
    var grupoId = parseInt(req.params.grupoId);
    db.find({grupo: grupoId}, function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });

};

api.remove = function(req, res) {

    db.remove({ _id: req.params.taskId }, {}, function (err, numRemoved) {
        if (err) return console.log(err);
        console.log('removido com sucesso');
        if(numRemoved) res.status(200).end();
        res.status(500).end();
    });
};

api.listaGrupos = function(req, res) {

    res.json([
        {
            _id: 1, 
            nome: 'opcional'
        }, 
        { 
            _id: 2, 
            nome: 'normal', 
        }, 
        { 
            _id: 3, 
            nome: 'medio'
        },
		{ 
            _id: 4, 
            nome: 'urgente'
        },
		{ 
            _id: 5, 
            nome: 'critico'
        }
    ]);
        
};


module.exports = api;