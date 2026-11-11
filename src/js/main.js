import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");


dataSource.getData().then((tents) => {
  console.log(tents);
});