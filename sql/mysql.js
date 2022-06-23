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
            conn.query(sql, function (err, result) {
                if (err) throw err;
                // console.log("db", result)
                resolve(result);
            });
            // Don't forget to release the connection when finished!
            pool.releaseConnection(conn);
        })
    })
}

exports.getSlider = function () {          
    const DBquery = 'select * from visokomerie.slider';
    const promise = getQuery(DBquery);
    return promise;   
};

exports.getMainPageProducts = function () {         
    const DBquery = 'select opt.id, p.name, p.price + opt.price_increase as price, opt.product_color, img.`path`, img.main_image, p.slug, opt.color_slug ' +
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
    return getQuery(DBquery);
};


exports.getCatalogCategories = function () {          
    const DBquery = 'select pc.id, pc.name, pc.description '+
                    'from visokomerie.product_category pc';
    return getQuery(DBquery);
};

exports.getCatalogAllProducts = function () {     
    const DBquery = 'select ptc.category_id, po.id as product_id, p.name, po.product_color, p.price + po.price_increase as price, poi.`path`, p.slug, po.color_slug '+
    'from visokomerie.product p '+
    'left join visokomerie.products_to_categories ptc '+
    'on ptc.product_id = p.id '+
    'left join visokomerie.product_options po '+
    'on po.product_id = p.id '+
    'left join visokomerie.product_options_image poi ' +
    'on poi.option_id = po.id ' +
    'where po.price_increase is not null and poi.main_image = "1"';
    return getQuery(DBquery);
};

exports.getProduct = function (name, color) {       
        if ((name===undefined)|(color===undefined)){
            name = "";
            color = "";
        }  
        const DBquery = 'select po.product_id, po.id as option_id, p.name, p.price + po.price_increase as price, po.product_color, po.description, p.sizetable_path, po.color_slug '+
                        'from visokomerie.product_options po ' +
                        'left join visokomerie.product p '+
                        'on po.product_id = p.id '+
                        'where po.color_slug = "'+color+'" and p.slug = "'+name+'"';
        return getQuery(DBquery);
};

exports.getProductImages = function (name, color) {        
    if ((name===undefined)|(color===undefined)){
        name = "";
        color = "";
    }
    const DBquery = 'select poi.id as image_id, poi.`path`, poi.main_image ' +
    'from visokomerie.product_options po ' +
    'left join visokomerie.product_options_image poi ' +
    ' on poi.option_id = po.id ' +
    'left join visokomerie.product p '+
    'on p.id = po.product_id '+
    'where po.color_slug = "' + color + '" and p.slug = "' + name + '"';
    return getQuery(DBquery);
};

exports.getCartProductsByID = function (ids_array) {        
    if (ids_array.length != 0){
        const DBquery = 'select po.id, p.name, po.product_color, p.price + po.price_increase as price, poi.`path` ' +
        'from visokomerie.product p ' +
        'left join visokomerie.product_options po ' +
        'on po.product_id = p.id ' +
        'left join visokomerie.product_options_image poi ' +
        'on poi.option_id = po.id ' +
        'where po.price_increase is not null and poi.main_image = "1" and po.id IN (' + ids_array.join(',') + ')'  //+ id + '"' 
        return getQuery(DBquery);
    }
    else 
        return "0";
    
};

// module.exports = pool;