const express = require('express');
const cors = require('cors');
const app = express(),
      bodyParser = require("body-parser"),
      fs = require('fs'),
      port = 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
const mockDataUtil = require("./mock-data-generator");

app.use(bodyParser.json());
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  app.options("*", (res, req) => {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
  });
});


if(mockDataUtil.getAllProducts().length <= 0) {
  mockDataUtil.generateMockData(40);
}

app.get('/api/products', (req, res) => {
  res.statusCode = 200;
  res.write(JSON.stringify(mockDataUtil.getAllProducts()));
  res.end();
});

app.get('/api/products/:id', (req, res) => {
  res.statusCode = 200;
  const allProducts = mockDataUtil.getAllProducts();
  const selectedProduct = allProducts.find(x => x.productId === req.params.id);
  if(selectedProduct) {
    res.write(JSON.stringify(selectedProduct));
  } else {
    res.write(JSON.stringify({
      title: "Invalid Product",
      message: "Product ID is not valid",
    }));
  }
  res.end();
});

app.post("/api/products", (req, res) => {
  const data = req.body;
  const productId = mockDataUtil.saveProduct(data);
  if (productId !== null) {
    res.write(
      JSON.stringify({
        productId: productId
      })
    );
    res.end();
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "Product Model is not valid",
      })
    );
  }
});

app.put("/api/products/edit", (req, res) => {
  const data = req.body;
  if(data && data.productId) {
    const productId = mockDataUtil.updateProduct(data);
    if (productId !== null) {
      res.write(
        JSON.stringify({
          productId: productId
        })
      );
      res.end();
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Invalid Request",
        })
      );
    }
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "Invalid Request",
      })
    );
  }
});

app.options('*',(req, res) => {
  res.status(200).send();
});

app.get('/', (req,res) => {
  res.send(`<h1>IMB Catalog Running on port ${port}</h1>`);
});

app.listen(port, () => {
  console.log(`Server listening on the port::::::${port}`);
});