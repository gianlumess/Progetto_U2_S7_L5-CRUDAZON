const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

const APIKEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njg0ZjY3Yjc1YjczOTAwMTU3ZWFkM2MiLCJpYXQiOjE3MTk5ODk4ODMsImV4cCI6MTcyMTE5OTQ4M30.PoIMMTm_BFqVjWDvU9PWpAD8x6O_LZD5Nd6sg4-6flc";
const headers = {
  Authorization: APIKEY,
};

const URL = "https://striveschool-api.herokuapp.com/api/product/" + productId;

window.addEventListener("DOMContentLoaded", () => {
  fetch(URL, {
    method: "GET",
    headers: headers,
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((product) => {
      const row = document.getElementById("product-container");
      const colImg = document.createElement("div");
      colImg.classList.add("col");
      const colDetails = document.createElement("div");
      colDetails.classList.add("col");

      const img = document.createElement("img");
      img.classList.add("img-fluid");
      img.src = product.imageUrl;
      /* img.style.width = "100%"; */
      img.style.height = "500px";

      const name = document.createElement("h1");
      name.innerText = product.name;

      const description = document.createElement("p");
      description.innerText = product.description;

      const brand = document.createElement("p");
      brand.innerText = "Brand : " + product.brand;

      const price = document.createElement("p");
      price.innerText = "Price: " + product.price + "€";

      row.appendChild(colImg);
      row.appendChild(colDetails);

      colDetails.appendChild(name);
      colDetails.appendChild(description);
      colDetails.appendChild(brand);
      colDetails.appendChild(price);

      colImg.appendChild(img);
    })
    .catch((err) => console.log(err));
});
