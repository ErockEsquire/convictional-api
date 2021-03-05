const {
  Product,
  Inventory,
  Variant,
  Weight,
  Image,
} = require("../models/models");

const checkInventory = () => {
  return 1;
};

const ingest = (input, db) => {
  const { products, inventory, weights, variants, images } = db;

  input.forEach((product) => {
    const productVariants = []
    const productImages = []

    product.variants.forEach((variant) => {
      convVariant = new Variant({
        id: variant.id.toString(),
        title: variant.title,
        sku: variant.sku,
        available: checkInventory(variant) > 0 ? true : false,
        inventory_quantity: checkInventory(variant),
        weight: (weight = new Weight({
          value: variant.weight,
          unit: variant.weight_unit,
        })),
      });
      weights.push(weight);
      productVariants.push(convVariant);
      variants.push(convVariant);

      variant.images.forEach((image) => {
        convImage = new Image({
          source: image.src,
          variantId: variant.id,
        });
        images.push(convImage);
        productImages.push(convImage);
      });

      convInventory = new Inventory({
        productId: product.id,
        variantId: variant.id,
        stock: 1,
      });
      inventory.push(convInventory);

    });
    convProduct = new Product({
      code: product.id.toString(),
      title: product.title,
      vendor: product.vendor,
      bodyHtml: product.body_html,
      variants: productVariants,
      images: productImages,
    });
    products.push(convProduct);
  });
};

module.exports = ingest;