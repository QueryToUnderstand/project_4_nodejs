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


    server.post('/create-product', upload, function (req, res) {
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
        let sqlProduct = "SELECT * FROM product WHERE id = ?";
        let sqlCategories = "SELECT * FROM category"; // Giả sử bạn có bảng category

        db.query(sqlProduct, [id], function (err, productData) {
            if (err) {
                return res.status(500).send(err);
            }
            if (productData.length > 0) {
                let product = productData[0];
                db.query(sqlCategories, function (err, categoryData) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.render('edit-product', {
                        product: product,
                        cats: categoryData // Pass the categories data to the template
                    });
                });
            } else {
                return res.status(404).send('Product not found');
            }
        });
    });

 

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