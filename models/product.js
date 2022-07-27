const sqlite3 = require('sqlite3').verbose();
const dbPath = './sql/sqlite/visokomerie2.db'
const q = require('../sql/queries')


// constructor
class Product {
  constructor(obj) {
    this.id = obj.id;
    this.img_path = obj.img_path;
    this.name = obj.name;
    this.price = obj.price;
    this.product_color = obj.product_color;
  }
  getMainPageProducts() {
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
  }
  getCatalogAllProducts() {
    return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(dbPath);
      db.all(q.CatalogAllProducts, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // console.log("CATALOG", rows)
          resolve(rows);
        }
      });
      db.close();
    });
  }
  getProduct() {
    if ((this.name === undefined) | (this.product_color === undefined)) {
      this.name = "";
      this.product_color = "";
    }
    return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(dbPath);
      db.all(q.Product, [this.product_color, this.name], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // console.log("rows1", rows)
          resolve(rows);
        }
      });
      db.close();
    });
  }
  getProductImages() {
    if ((this.name === undefined) | (this.product_color === undefined)) {
      this.name = "";
      this.product_color = "";
    }
    return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(dbPath);
      db.all(q.productImages(this.name, this.product_color), [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // console.log("rows", rows)
          resolve(rows);
        }
      });
      db.close();
    });
  }
  getCartProductsByID(ids_array) {
    const DBquery = 'select po.id, p.name, po.product_color, p.price + po.price_increase as price, poi.img_path ' +
      'from product p ' +
      'left join product_options po ' +
      'on po.product_id = p.id ' +
      'left join product_options_image poi ' +
      'on poi.option_id = po.id ' +
      'where po.price_increase is not null and poi.main_image = "1" and po.id IN (' + ids_array.join(',') + ')'; //+ id + '"' 
    return new Promise((resolve, reject) => {
      if (ids_array.length != 0) {
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

  }
}









module.exports = Product;