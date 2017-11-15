var http = require('http')
    ,app = require('./config/express')
    ,db = require('./config/database');

app.listen(3000, function() {
    console.log('Servidor app tasks escutando na porta: ' + this.address().port);
});
