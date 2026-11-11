import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// data source for the tents category (reads json/tents.json)
const dataSource = new ProductData("tents");

// the <ul class="product-list"> on the home page where the cards go
const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);
productList.init();
