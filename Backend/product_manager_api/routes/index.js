var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: 'abc123',
  port: 5432,
})

router.get('/', function (req, res, next) {});


// Api get data from postgreSQL
router.get('/getdata01', function (req, res, next) {

  pool.query('SELECT * FROM product_info',(error,response) => {
    if(error){
      console.log(error);
    }
    else{
      res.send(response.rows);
    }
  });
});

// Add product
router.get('/add', function (req, res, next) {
  res.render('add',{});
});
router.post('/add', function (req, res, next) {
  var product_name  = req.body.product_name;
  var product_price  = req.body.product_price;
  var images  = req.body.images;
  pool.query("INSERT INTO product_info (product_name,product_price,images) values ($1, $2, $3)",[product_name,product_price,images],(error,response) => {
    if(error){
      console.log(error);
      res.send(0);
    }
    else{
      res.send(1);
    }
  });
});


module.exports = router;
