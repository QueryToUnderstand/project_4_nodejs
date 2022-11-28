const db = require('../connect');
const upload = require('../moddleware/upload')
module.exports = function (server) {

    server.get('/product', function (req, res) {
        db.query("SELECT * FROM product", function (err, data) {
            res.render('product', {
                data: data,
            })
        });
    })

    server.get('/delete-product/:id', function (req, res) {
        let id = req.params.id;
        let Sql = "DELETE FROM product WHERE id = ?";
        db.query(Sql, [id], function (err, data) {
            if (!err) {
                res.redirect('/product');
            }
        });
    })

    server.get('/create-product', function (req, res) {
        let Sql = "SELECT id, name FROM category Order By name ASC";
        db.query(Sql, function (err, data) {
            res.render('create-product', {
                cats: data,
            })
        });
    })

    server.post('/create-product',upload, function (req, res) {
        let formData = req.body;
        
        if (req.file) {
            formData.image = req.file.filename;
        }

        let Sql = "INSERT INTO product SET ?";
        db.query(Sql, [formData], function (err, data) {
            
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/product');
            }
        });
    })

    server.get('/edit-product/:id', function (req, res) {
        let id = req.params.id;
        let Sql = "SELECT * FROM product WHERE id = ?";
        db.query(Sql, [id], function (err, data) {
            let cat = null;
            if (data.length > 0) {
                data = data[0];
            }
            res.render('edit-product', {
                data: cat
            });
        });

    })

    server.post('/edit-product/:id', function (req, res) {
        let formData = req.body;
        let id = req.params.id;
        let Sql = "UPDATE product SET ? WHERE id = ?";
        db.query(Sql, [formData, id], function (err, data) {
            if (!err) {
                res.redirect('/product');
            }
        });
    })
}