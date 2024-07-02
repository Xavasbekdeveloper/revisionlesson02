const ownerCard = document.querySelector(".owner__cards");
const categoryContainer = document.querySelector(".overview__category");

const API_URL = "https://dummyjson.com";

async function getProducts(url) {
  let data = await fetch(`${API_URL}/products${url}`, {
    method: "GET",
  });

  data
    .json()
    .then((res) => {
      mapProducts(res);
    })
    .catch((err) => console.error(err));
}

getProducts("");

function mapProducts(products) {
  let product = "";

  products.products.forEach((pr) => {
    product += `
      <tr class="owner__card">
        <td class="owner__wrapper">
          <img src=${pr.images[0]} alt=${pr.title}>
          ${pr.title}
        </td>
        <td class="owner__date">$${pr.price}</td>
        <td class="owner__profits">${pr.category}</td>
        <td class="owner__losses">${pr.rating}</td>
        <td class="owner__phone">${pr.brand}</td>
      </tr>
    `;
  });

  ownerCard.innerHTML = product;
}

async function getCategories() {
  let data = await fetch(`${API_URL}/products/categories`, {
    method: "GET",
  });

  data
    .json()
    .then((res) => {
      console.log(res);
      mapCategories(res);
    })
    .catch((err) => console.error(err));
}

getCategories();

function mapCategories(categories) {
  let category = `<li><data value="all">All</data></li>`;

  categories.forEach((cat) => {
    category += `
      <li><data value=${cat.slug}>${cat.name}</data></li>
    `;
  });

  categoryContainer.innerHTML = category;
}

categoryContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "DATA") {
    const selectedCategory = e.target.getAttribute("value");
    console.log(selectedCategory);
    if (selectedCategory === "all") {
      getProducts("");
    } else {
      getProducts(`/category/${selectedCategory}`);
    }
  }
});
