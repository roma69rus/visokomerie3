// const pool = require('mysql2').createPool({}); // or require('mysql2').createPoolPromise({}) or require('mysql2').createPool({}).promise()
var mysql = require("mysql2");


var DBconfig = {
    host     : 'localhost',
    user     : 'admin',
    password : '2sdfTY78(',
    database : 'visokomerie',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

function getQuery (sql) {    
    return new Promise(function (resolve, reject) { 
        var pool = mysql.createPool(DBconfig);
        pool.getConnection(function(err, conn) {
            if (err) throw err;
            // Do something with the connection
            conn.query(sql, function (err, result, fields) {
                if (err) reject(err);
                // console.log("db", result)
                resolve(result);
            });
            // Don't forget to release the connection when finished!
            pool.releaseConnection(conn);
        })
    })
}

exports.getMainPageProducts = function () {
    return new Promise(function (resolve, reject) {        
        const DBquery = 'select opt.id, p.name, p.price + opt.price_increase as price, opt.product_color, img.`path`, img.main_image ' +
                        'from visokomerie.product_options opt ' +
                        'left join visokomerie.product p ' +
                        'on p.id = opt.product_id ' +
                        'left join visokomerie.product_options_image img ' +
                        'on opt.id = img.option_id ' +
                        'where img.main_image = "1" and p.id in ' +
                            '(select p.id ' +
                            'from product p, product_category pc, products_to_categories ptc ' +
                            'where pc.id = ptc.category_id ' +
                            'and ptc.product_id = p.id ' +
                            'and pc.name = "БРЮКИ") ' +
                        'order by opt.`order`';
        getQuery(DBquery).then(function(result){
            resolve(result)
        })
        .catch(function(err){        
            reject(console.log(err))             
        })
            
    });
};

exports.getSlider = function () {
    return new Promise(function (resolve, reject) {        
        const DBquery = 'select * from visokomerie.slider';
        getQuery(DBquery).then(function(result){
            resolve(result)
        })
        .catch(function(err){        
            reject(console.log(err))             
        })
    });
};

exports.getCatalogCategories = function () {
    return new Promise(function (resolve, reject) {        
        const DBquery = 'select pc.id, pc.name, pc.description '+
                        'from visokomerie.product_category pc';
        getQuery(DBquery).then(function(result){            
            resolve(result)
        })
        .catch(function(err){        
            reject(console.log(err))             
        })
    });
};

exports.getCatalogAllProducts = function () {
    return new Promise(function (resolve, reject) {        
        const DBquery = 'select ptc.category_id, po.id as product_id, p.name, po.product_color, p.price + po.price_increase as price, poi.`path` '+
        'from visokomerie.product p '+
        'left join visokomerie.products_to_categories ptc '+
        'on ptc.product_id = p.id '+
        'left join visokomerie.product_options po '+
        'on po.product_id = p.id '+
        'left join visokomerie.product_options_image poi ' +
        'on poi.option_id = po.id ' +
        'where po.price_increase is not null and poi.main_image = "1"';
        getQuery(DBquery).then(function(result){
            resolve(result)
        })
        .catch(function(err){        
            reject(console.log(err))             
        })
    });
};

exports.getProduct = function () {
    return new Promise(function (resolve, reject) {        
        const DBquery = 'select po.product_id, po.id as option_id, p.name, p.price + po.price_increase as price, po.product_color, po.description, p.sizetable_path '+
                        'from visokomerie.product_options po ' +
                        'left join visokomerie.product p '+
                        'on po.product_id = p.id '+
                        'where po.id = "1"';
        getQuery(DBquery).then(function(result){
            resolve(result)
        })
        .catch(function(err){        
            reject(console.log(err))             
        })
    });
};

exports.getProductImages = function () {
    return new Promise(function (resolve, reject) {        
        const DBquery = 'select poi.id as image_id, poi.`path`, poi.main_image ' +
        'from visokomerie.product_options po ' +
        'left join visokomerie.product_options_image poi ' +
       ' on poi.option_id = po.id ' +
        'where po.id = "1"';
        getQuery(DBquery).then(function(result){
            resolve(result)
        })
        .catch(function(err){        
            reject(console.log(err))             
        })
    });
};

// module.exports = pool;