const mongoose = require('mongoose')

// Models representing the API Objects in db.json

const ProductSchema = new mongoose.Schema({
  code: {type: String, required: true},
  title: {type: String, description: 'Product title'},
  vendor: {type: String, description: 'Product vendor'},
  bodyHtml: {type: String, description: 'HTML description of a product'},
  variants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Variant'}],
  images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}]
})

const InventorySchema = new mongoose.Schema({
  productId: String,
  variantId: String,
  stock: Number
})

const VariantSchema = new mongoose.Schema({
  id: String,
  title: String,
  sku: String,
  available: {type: Boolean, description: 'True if inventory > 0, false otherwise'},
  inventory_quantity: Number,
  weight: {type: mongoose.Schema.Types.ObjectId, ref: 'Weight'}
})

const WeightSchema = new mongoose.Schema({
  value: Number,
  unit: String
})

const ImageSchema = new mongoose.Schema({
  source: { type: String, required: true },
  variantId: { type: String, required: true, description: 'ID for the variant the image relates to' }
})

module.exports.Product = mongoose.model('Product', ProductSchema)
module.exports.Inventory = mongoose.model('Inventory', InventorySchema)
module.exports.Variant = mongoose.model('Variant', VariantSchema)
module.exports.Weight = mongoose.model('Weight', WeightSchema)
module.exports.Image = mongoose.model('Image', ImageSchema)


