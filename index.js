const APIKEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmZmNDdjMjM5YzAwMTUyZjRiNzQiLCJpYXQiOjE3MTgzNTM5MDgsImV4cCI6MTcxOTU2MzUwOH0.YxOTllrumawWZJ4LtdXWOHBZKu9J2pg4-y4aQ09JeiQ";
const headers = {
  Authorization: APIKEY,
};

window.addEventListener("DOMContentLoaded", () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "GET",
    headers: headers,
  })
    .then((resp) => {
      if (resp.ok) {
        console.log(resp);
        return resp.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((products) => {
      console.log(products);

      const row = document.getElementById("product-container");

      products.forEach((product) => {
        const col = document.createElement("div");
        col.classList.add("col");

        const card = document.createElement("div");
        card.classList.add("card", "mb-4", "shadow-sm");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = product.imageUrl;
        img.style.height = "200px";
        img.style.objectFit = "cover";
        img.style.cursor = "pointer";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerText = product.name;

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerText = product.description;

        const ul = document.createElement("ul");
        ul.classList.add("list-group", "list-group-flush");

        const li1 = document.createElement("li");
        li1.classList.add("list-group-item");
        li1.innerText = product.brand;

        const li2 = document.createElement("li");
        li2.classList.add("list-group-item");
        li2.innerText = product.price + "€";

        const buttonSection = document.createElement("div");
        buttonSection.classList.add("d-flex", "justify-content-between", "align-items-center");

        const editBtn = document.createElement("button");
        editBtn.classList.add("btn", "btn-outline-warning", "btn-sm");
        editBtn.innerText = "EDIT";

        editBtn.addEventListener("click", () => {
          window.location.assign("backoffice.html?productId=" + product._id);
        });

        buttonSection.appendChild(editBtn);

        ul.appendChild(li1);
        ul.appendChild(li2);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);

        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(ul);
        card.appendChild(buttonSection);

        col.appendChild(card);
        row.appendChild(col);
      });
    })
    .catch((err) => console.log(err));
});
