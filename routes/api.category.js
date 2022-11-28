const db = require('../connect');
module.exports = function (server) {

    server.get('/api/category', function (req, res) {
        db.query("SELECT * FROM category", function (err, data) {
            res.send({
                result: data
            })
        });
    })
    server.get('/api/product-by-category/:id', function (req, res) {
        let id = req.params.id;
        db.query("SELECT * FROM product WHERE category_id = ?",[id], function (err, data) {
            res.send({
                result: data
            })
        });
    })

    server.delete('/api/category/:id', function (req, res) {
        let id = req.params.id;
        let Sql = "DELETE FROM category WHERE id = ?";
        db.query(Sql, [id], function (err, data) {
            res.send({
                result: data
            })
        });
    })

    server.post('/api/category', function (req, res) {
        let formData = req.body;
        console.log({formData})
        let Sql = "INSERT INTO category SET ?";
        db.query(Sql, [formData], function (err, data) {
            formData.id = data.insertId;
            res.send({
                result: formData
            })
        });
    })

    server.get('/api/category/:id', function (req, res) {
        let id = req.params.id;
        let Sql = "SELECT * FROM category WHERE id = ?";
        db.query(Sql, [id], function (err, data) {
            let cat = null;
            if (data.length > 0) {
                cat = data[0];
            }
            res.send({
                result: cat
            })
        });

    })

    server.put('/api/category/:id', function (req, res) {
        let formData = req.body;
        let id = req.params.id;
        let Sql = "UPDATE category SET ? WHERE id = ?";
        db.query(Sql, [formData, id], function (err, data) {
            formData.id = id;
            res.send({
                result: formData,
                message: 'Cập nhật dữ liệu thành công'
            })
        });
    })
}