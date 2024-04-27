document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById("product-list");
    const categorySelect = document.getElementById("category");
    const searchInput = document.getElementById("search");
    const sortSelect = document.getElementById("sort");

    let products = [];

    // Fetch products from FakeStoreAPI
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        products = data;
        renderProducts(products);
        renderCategories();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    // Render products
    function renderProducts(productsToRender) {
      productList.innerHTML = "";
      productsToRender.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
        `;
        productList.appendChild(productItem);
      });
    }

    // Render categories dropdown
    function renderCategories() {
      const categories = products.reduce((acc, curr) => {
        if (!acc.includes(curr.category)) {
          acc.push(curr.category);
        }
        return acc;
      }, []);
      categorySelect.innerHTML = `<option value="all">All Categories</option>`;
      categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      });
    }

    // Filter products by category
    categorySelect.addEventListener("change", function() {
      const category = this.value;
      const filteredProducts = category === "all" ? products : products.filter(product => product.category === category);
      renderProducts(filteredProducts);
    });

    // Search products by title
    searchInput.addEventListener("input", function() {
      const searchTerm = this.value.trim().toLowerCase();
      const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
      renderProducts(filteredProducts);
    });

    // Sort products by price
    sortSelect.addEventListener("change", function() {
      const sortOrder = this.value;
      const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      renderProducts(sortedProducts);
    });

    // Initialize the app
    fetchProducts();
  });