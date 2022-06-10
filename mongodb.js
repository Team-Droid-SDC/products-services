const mongoose = require('mongodb');

mongoose.connect('mongodb://localhost/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let productSchema = mongoose.Schema({

})