const express = require('express');
const app = express();

// logging and parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// router
const router = require('./routes.js');
app.use(router);

// Set up server
app.listen(3000, () => {
  console.log("listening on port 3000");
});
