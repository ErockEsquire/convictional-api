const {
  Product,
  Inventory,
  Variant,
  Weight,
  Image,
} = require("../models/models");

//I wasn't sure what was supposed to indicate Inventory... so I set a default 1
const checkInventory = () => {
  return 1;
};

//Main method for ingesting products API. 
//With more time, I would make these functions modular, as this part becomes harder to read.
const ingest = (input, db) => {
  const { products, inventory, weights, variants, images } = db;

  input.forEach((product) => {
    const productVariants = []
    const productImages = []

    //essentially, this code loops through each product found in the products API,
    //and populates our own local mock db with objects based on our own models/schema.

    //My biggest debate here was how to modularize each construct call without needing to enter 
    //the loop from the beginning, at the products level, each time.

    //Ultimately, I settled on the fact that products, variants, and images are inherently deeply connected,
    //so my code would reflect that. If I had more time, I would have pure function calls for construction.

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
      productVariants.push(convVariant);
      weights.push(weight);
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