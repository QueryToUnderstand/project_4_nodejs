const db = require('../connect');
module.exports = function (server) {

    server.get('/api/product', function (req, res) {
        let limit = req.query.limit
        let SQL = "SELECT * FROM product Order By id DESC";
        if(limit > 0) {
            SQL += " LIMIT " + limit
        }

        db.query(SQL, function (err, data) {
            res.send({
                result: data
            })
        });
    })
    //
    server.get('/api/search-product', function (req, res) {
        let key = req.query.key
        let SQL = "SELECT * FROM product";
        if (key) {
            // "SELECT * FROM product LIMIT 6";
            SQL += " WHERE name LIKE '%" + key +"%'"
        }

        SQL += ' Order By id DESC'
        db.query(SQL, function (err, data) {
            res.send({
                result: data
            })
        });
    })

    server.get('/api/product/:id', function (req, res) {
        let id = req.params.id;
        let Sql = "SELECT * FROM product WHERE id = ?";
        db.query(Sql, [id], function (err, data) {
            res.send({
                result: data.length ? data[0] : null
            })
        });
    })
    //
    


    server.post('/api/product', function (req, res) {
        let formData = req.body;
        let Sql = "INSERT INTO product SET ?";
        db.query(Sql, [formData], function (err, data) {
            res.send({
                result: data
            })
        });
    })

    server.put('/api/product/:id', function (req, res) {
        let formData = req.body;
        let id = req.params.id;
        let Sql = "UPDATE product SET ? WHERE id = ?";
        db.query(Sql, [formData, id], function (err, data) {
            res.send({
                result: data
            })
        });
    })

    server.delete('/api/product/:id', function (req, res) {
        let id = req.params.id;
        let Sql = "DELETE FROM product WHERE id = ?";
        db.query(Sql, [id], function (err, data) {
            res.send({
                result: data
            })
        });
    })

}