const sqlite3 = require('sqlite3').verbose();
const dbPath = __dirname + '/sqlite/visokomerie2.db'
const q = require('../sql/queries')

console.log(dbPath)

exports.getMainPageProducts = () => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(dbPath);
    db.all(q.MainPageProducts, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // console.log("rows", rows)
        resolve(rows);
      }
    });
    db.close();
  });
};

exports.getSlider = function () {          
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(dbPath);
    db.all(q.Slider, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // console.log("rows1", rows)
        resolve(rows);
      }
    });
    db.close();
  });
};

exports.getCatalogCategories = function () {          
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(dbPath);
    db.all(q.CatalogCategories, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // console.log("rows", rows)
        resolve(rows);
      }
    });
    db.close();
  });
};

exports.getCatalogAllProducts = function () {     
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(dbPath);
    db.all(q.CatalogAllProducts, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // console.log("rows", rows)
        resolve(rows);
      }
    });
    db.close();
  });
};

exports.getProduct = function (name, color) {       
  if ((name===undefined)|(color===undefined)){
    name = "";
    color = "";
  }  
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(dbPath);
    db.all(q.Product, [color, name], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // console.log("rows1", rows)
        resolve(rows);
      }
    });
    db.close();
  });
};

exports.getProductImages = function (name, color) {        
  if ((name===undefined)|(color===undefined)){
    name = "";
    color = "";
  }
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(dbPath);
    db.all(q.productImages(name, color), [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // console.log("rows", rows)
        resolve(rows);
      }
    });
    db.close();
  });
};

exports.getCartProductsByID = function (ids_array) {        
  const DBquery = 'select po.id, p.name, po.product_color, p.price + po.price_increase as price, poi.img_path ' +
  'from product p ' +
  'left join product_options po ' +
  'on po.product_id = p.id ' +
  'left join product_options_image poi ' +
  'on poi.option_id = po.id ' +
  'where po.price_increase is not null and poi.main_image = "1" and po.id IN (' + ids_array.join(',') + ')'  //+ id + '"' 
  return new Promise((resolve, reject) => {
    if (ids_array.length != 0){
      let db = new sqlite3.Database(dbPath);
      db.all(DBquery, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // console.log("rows", rows)
          resolve(rows);
        }
      });
      db.close();
    }
    else {
      resolve("");
    }
  });
  
};