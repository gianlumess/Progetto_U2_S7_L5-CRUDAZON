const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

const APIKEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njg0ZjY3Yjc1YjczOTAwMTU3ZWFkM2MiLCJpYXQiOjE3MTk5ODk4ODMsImV4cCI6MTcyMTE5OTQ4M30.PoIMMTm_BFqVjWDvU9PWpAD8x6O_LZD5Nd6sg4-6flc";

const headers = {
  Authorization: APIKEY,
};

console.log(productId);

//se l'id sara presente utilizzeremo il metodo PUT per modificare il prodotto, altrimenti utilizzeremo il metodo POST per crearne uno nuvo

const URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const paragraph = document.querySelector("h6");
  const resetBtn = document.getElementById("reset");
  const submitBtn = document.getElementById("submit");
  resetBtn.addEventListener("click", () => {
    form.reset();
  });

  if (productId) {
    //se productId esiste allora entreremo nella modalità di modifica con metodo .PUT

    submitBtn.innerText = "EDIT";
    submitBtn.className = "btn btn-outline-primary";

    resetBtn.className = "btn btn-outline-warning";

    paragraph.innerText = "Modifica prodotto";
    const btnContainer = document.getElementById("button-container");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-outline-danger", "btn-sm");
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-trash3" viewBox="0 0 16 16">
                                <path
                                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>`;

    btnContainer.appendChild(deleteBtn);
    //qui prendo i dati del prodotto tramite id
    fetch(URL, {
      method: "GET",
      headers: headers,
    })
      .then((resp) => {
        console.log(resp);
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((product) => {
        console.log(product);

        //dopo aver preso i dati li inseriamo nei campi da modificare
        document.getElementById("product-name").value = product.name;
        document.getElementById("product-description").value = product.description;
        document.getElementById("brand-name").value = product.brand;
        document.getElementById("img-url").value = product.imageUrl;
        document.getElementById("price").value = product.price;
        submitBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const securityCheck1 = confirm("sicuro di voler MODIFICARE il prodotto?");

          const producToModify = {
            name: document.getElementById("product-name").value,
            description: document.getElementById("product-description").value,
            brand: document.getElementById("brand-name").value,
            imageUrl: document.getElementById("img-url").value,
            price: document.getElementById("price").value,
          };

          fetch(URL, {
            method: "PUT",
            body: JSON.stringify(producToModify),
            headers: {
              "Content-Type": "application/json",
              Authorization: APIKEY,
            },
          })
            .then((resp) => {
              if (resp.ok) {
                return resp.json();
              }
            })
            .then((productModified) => {
              alert(`Prodotto: ${product.name} , ID: ${product._id} modificato con successo!`);
              window.location.assign("/");
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));

    //funzione che al click elimina il prodotto
    deleteBtn.addEventListener("click", () => {
      const securityCheck2 = confirm("sicuro di voler cancellare il prodotto?");

      if (securityCheck2) {
        fetch(URL, {
          method: "DELETE",
          headers: headers,
        })
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw new Error("Network response was not ok");
            }
          })
          .then((deleteProduct) => {
            alert(`hai eliminato il prodotto: ${deleteProduct.name}, ID: ${deleteProduct._id}`);

            window.location.assign("/");
          })
          .catch((err) => console.log(err));
      }
    });
  } else {
    //qui entriamo invece qunado productId non esiste e quindi non bisogna modificare nessun prodotto
    //verrà quindi uitlizzato il metodo .POST per creare un nuovo prodotto

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newProduct = {
        name: document.getElementById("product-name").value,
        description: document.getElementById("product-description").value,
        brand: document.getElementById("brand-name").value,
        imageUrl: document.getElementById("img-url").value,
        price: document.getElementById("price").value,
      };

      fetch(URL, {
        method: "POST",
        body: JSON.stringify(newProduct), //stringhifizzazione per evitare di ottenere un [object,object]
        headers: {
          "Content-type": "application/json",
          Authorization: APIKEY,
        },
      })
        .then((resp) => {
          console.log(resp);
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((generatedProduct) => {
          alert(`Prodotto: ${generatedProduct.name} , ID: ${generatedProduct._id} creato con successo!`);
          window.location.assign("/");
        })
        .catch((err) => console.log(err));
    });
  }
});
