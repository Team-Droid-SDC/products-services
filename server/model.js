const pool = require('./db.js');

exports.products = (req, res) => {
  const limit = req.query.count || 5;
  const queryStr = `SELECT * FROM products limit ${limit}`;

  pool.query(queryStr)
    .then(response => res.send(response.rows))
    .catch(err => res.send(err));
}

exports.product = (req, res) => {
  const productQuery = `SELECT * FROM products where id = ${req.params.product_id}`;
  const featureQuery = `SELECT feature, value FROM features where product_id = ${req.params.product_id}`;
  pool.query(productQuery)
    .then(product => {
      pool.query(featureQuery)
        .then(features => {
          product.rows[0].features = features.rows;
          res.json(product.rows[0]);
        })
    })
    .catch(err => res.send(err));
}

exports.styles = (req, res) => {
  const styleQuery = `SELECT * FROM styles WHERE productId = ${req.params.product_id}`;

  pool.connect((err, client, done) => {
    if (err) res.send(err);
    client.query(styleQuery, [1], (error, response) => {
      done();

      if (error) {
        console.log('error', error);
        res.send(error.stack);
      } else {
        // console.log(response);
        res.send(response.rows)
      }
    })
  })
  // pool.query(styleQuery)
  //   .then(styles => {
  //     const photoQuery = styles.rows.map(row => pool.query(`SELECT * FROM photos WHERE styleId = ${row.id}`));
  //     const skuQuery = styles.rows.map(row => pool.query(`SELECT * FROM skus where styleId = ${row.id}`));
  //     if(photoQuery.length !== 0) {
  //       Promise.all([...photoQuery, ...skuQuery])
  //         .then(results => {
  //           const photoData = results.slice(0, photoQuery.length).map(result => {
  //             if (result.rows.length === 0) {
  //               return;
  //             }
  //             const styleID = result.rows[0].styleid;
  //             const urls = result.rows.map(({url, thumbnail_url}) => {
  //               return {url, thumbnail_url};
  //             })
  //             return [styleID, urls];
  //           });
  //           const skuData = results.slice(photoQuery.length).map(result => {
  //             if (result.rows.length === 0) {
  //               return;
  //             }
  //             const styleID = result.rows[0].styleid;
  //             const skus = result.rows.map(({size, quantity}) => {
  //               return {size, quantity};
  //             })
  //             return [styleID, skus];
  //           })
  //           styles.rows.forEach(row => {
  //             for (let i = 0; i < photoData.length; i++) {
  //               if (photoData[i] && photoData[i][0] === row.id) {
  //                 row.photos = photoData[i][1];
  //                 break;
  //               }
  //             }

  //             for (let i = 0; i < skuData.length; i++) {
  //               if (skuData[i] && skuData[i][0] === row.id) {
  //                 row.skus = skuData[i][1];
  //                 break;
  //               }
  //             }
  //           })
  //           res.send(styles.rows);
  //         })
  //         .catch(err => res.send(err));
  //     }
  //     else res.send(styles.rows);
  //   })

}

exports.related = (req, res) => {
  const queryStr = `SELECT related_product_id FROM related WHERE current_product_id = ${req.params.product_id}`;

  pool.query(queryStr)
    .then(response => {
      const relatedData = response.rows.map(row => row.related_product_id);
      res.send(relatedData);
    })
    .catch(err => res.send(err));
}