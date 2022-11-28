const db = require('../connect');
module.exports = function (server) {

    server.post('/api/register', function (req, res) {
        let formData = req.body;
        let Sql = "INSERT INTO account SET ?";
        db.query(Sql, [formData], function (err, data) {
            if (err) {
                res.send({
                    result: err.sqlMessage,
                    status: false
                }) 
            }else{
                formData.id = data.insertId;
                res.send({
                    result: formData,
                    status: true
                })
            }
            
        });
    })

    server.post('/api/login', function (req, res) {
        let Sql = "SELECT * FROM account WHERE email = ? AND password = ?";
        db.query(Sql, [req.body.email, req.body.password], function (err, data) {
            res.send({
                result: data.length ? data[0] : null
            })
        });
    })
}