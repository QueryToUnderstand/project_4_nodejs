const db = require('../connect');
module.exports = function (server) {

    server.get('/category', function (req, res) {
        db.query("SELECT * FROM category", function (err, data) {
            res.render('category', {
                cats: data,
            })
        });
    })

    server.get('/delete-category/:id', function (req, res) {
        let id = req.params.id;
        let Sql = "DELETE FROM category WHERE id = ?";
        db.query(Sql, [id], function (err, data) {
            if (!err) {
                res.redirect('/category');
            }
        });
    })

    server.get('/create-category', function (req, res) {
        res.render('create-category');
    })

    server.post('/create-category', function (req, res) {
        let formData = req.body;
        let Sql = "INSERT INTO category SET ?";
        db.query(Sql, [formData], function (err, data) {
            if (!err) {
                res.redirect('/category');
            }
        });
    })

    server.get('/edit-category/:id', function (req, res) {
        let id = req.params.id;
        let Sql = "SELECT * FROM category WHERE id = ?";
        db.query(Sql, [id], function (err, data) {
            let cat = null;
            if (data.length > 0) {
                cat = data[0];
            }
            res.render('edit-category', {
                cat: cat
            });
        });

    })

    server.post('/edit-category/:id', function (req, res) {
        let formData = req.body;
        let id = req.params.id;
        let Sql = "UPDATE category SET ? WHERE id = ?";
        db.query(Sql, [formData, id], function (err, data) {
            if (!err) {
                res.redirect('/category');
            }
        });
    })
}