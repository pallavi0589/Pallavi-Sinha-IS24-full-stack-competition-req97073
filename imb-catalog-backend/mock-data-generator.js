// Note that this code relies on the fs and faker modules, so they must be installed before running this code.
const productListFile = "./product-list.json";
const { faker } = require('@faker-js/faker');
const fs = require("fs");
// A set of functions to perform CRUD (Create, Read, Update, Delete) operations on a product list JSON file.
module.exports = {
  // Generates mock product data by using the faker library and saves it to the JSON file. The function takes an integer numOfProducts which specifies the number of products to generate.
  generateMockData: (numOfProducts) => {
    for (let i = 0; i < numOfProducts; i++) {
      const randomDeveloper = Math.random() * 5;
      const product = {
        productName: faker.commerce.product(),
        productOwnerName: faker.name.firstName(),
        developers: [],
        scrumMasterName: faker.name.firstName(),
        startDate: new Date(
          new Date(2012, 0, 1).getTime() +
            Math.random() *
              (new Date().getTime() - new Date(2012, 0, 1).getTime())
        ),
        methodology: parseInt(Math.random() * 2) ? "agile" : "waterfall",
      };
      for (let x = 0; x < randomDeveloper; x++) {
        product.developers.push(faker.name.firstName());
      }
      saveProduct(product);
    }
  },
  saveProduct: (data) => saveProduct(data),
  getAllProducts: () => getAllProducts(),
  deleteProduct: (productId) => deleteProduct(productId),
  updateProduct: (data) => updateProduct(data)
};

      // Validates the input data, generates a new product ID and saves it to the JSON file.
      // It returns the product ID if successful, or false if validation fails.
function saveProduct(data) {
  const productModel = validateData(data);
  if(productModel) {
    const existingData = getAllProducts();
    existingData.push(productModel);
    fs.writeFileSync(productListFile, JSON.stringify(existingData));
    return productModel.productId;
  } else {
    return false;
  }
}
// Updates a product with the given productId in the JSON file. 
// It returns the product ID if successful, or false if the product is not found.
function updateProduct(data) {
    const existingData = getAllProducts();
    const selectedProductIndex = existingData.findIndex(x => x.productId === data.productId);
    if(selectedProductIndex !== -1) {
      data.startDate = existingData[selectedProductIndex].startDate; // Start Date is not editable
      existingData.push(data);
      existingData.splice(selectedProductIndex,1);
      fs.writeFileSync(productListFile, JSON.stringify(existingData));
      return data.productId;
    }
    return false;
}

function validateData(data) {
  const productModel = {
    "productId": "PRD_"+(getTotalNumberOfProducts() + 1),
    "productName": null,
    "productOwnerName": null,
    "developers": [],
    "scrumMasterName": null,
    "startDate": null,
    "methodology": null
  };

  if(data.productName && data.productOwnerName && data.developers.length > 0 && data.developers.length <= 5 && data.scrumMasterName && data.startDate && data.methodology) {
    productModel.productName = data.productName;
    productModel.productOwnerName = data.productOwnerName;
    productModel.developers = data.developers;
    productModel.scrumMasterName = data.scrumMasterName;
    productModel.startDate = data.startDate;
    productModel.methodology = data.methodology;
    return productModel;
  } else {
    return false;
  }
}

function getAllProducts() {
  const jsonData = fs.readFileSync(productListFile);
  return JSON.parse(jsonData);
}

function getTotalNumberOfProducts() {
  const jsonData = fs.readFileSync(productListFile);
  return (JSON.parse(jsonData)).length;
}

function deleteProduct(productId) {
  const data = getAllProducts();
  const index = data.findIndex(x => x.productId === productId);
  if(index !== -1) {
    fs.writeFileSync(productListFile, JSON.stringify([]));
    data.splice(index, 1);
    return true;
  }
  return false;
}