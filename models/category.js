const sqlite3 = require('sqlite3').verbose();
const dbPath = './sql/sqlite/visokomerie2.db'
const q = require('../sql/queries')


// constructor
class Category {
  constructor() {
  }
  getCatalogCategories() {
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
  }
}



module.exports = Category;
