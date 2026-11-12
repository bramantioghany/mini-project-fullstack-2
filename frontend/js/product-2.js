// Product 2 memperoleh data melalui API, bukan hardcode produk di frontend.
const API_URL = "http://localhost:3000/api/products/2";

// DOM Elements
const elements = {
  status: document.getElementById("api-status"),
  statusMessage: document.getElementById("api-status-message"),
  retryButton: document.getElementById("retry-button"),
  detail: document.getElementById("product-detail"),

  name: document.getElementById("product-name"),
  price: document.getElementById("product-price"),
  description: document.getElementById("product-description"),
  processor: document.getElementById("product-processor"),
  memory: document.getElementById("product-memory"),
  storage: document.getElementById("product-storage"),
  stock: document.getElementById("product-stock"),

  quantity: document.getElementById("quantity"),
  subtotal: document.getElementById("subtotal"),
  validationFeedback: document.getElementById("validation-feedback"),
  addToCartButton: document.getElementById("add-to-cart-button"),
  cartCount: document.getElementById("cart-count"),

  contactButton: document.getElementById("contact-button"),
  contactFeedback: document.getElementById("contact-feedback")
};

// Product State
let currentProduct = null;
let cartCount = 0;

// Format Rupiah
function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(amount));
}

// Validate Quantity
function validateQuantity(quantity) {
  if (quantity === "") {
    return "Quantity tidak boleh kosong.";
  }

  const value = Number(quantity);

  if (!Number.isInteger(value) || value <= 0) {
    return "Quantity harus berupa bilangan bulat positif.";
  }

  if (value > Number(currentProduct.stock)) {
    return `Stok tidak mencukupi. Maksimal ${currentProduct.stock} unit.`;
  }

  return null;
}

// Update Subtotal
function updateSubtotal() {
  if (!currentProduct) {
    return false;
  }

  const errorMessage = validateQuantity(elements.quantity.value);

  if (errorMessage) {
    elements.subtotal.textContent = "-";
    elements.validationFeedback.textContent = errorMessage;
    elements.addToCartButton.disabled = true;

    return false;
  }

  const quantity = Number(elements.quantity.value);
  const subtotal = Number(currentProduct.price) * quantity;

  elements.subtotal.textContent = formatRupiah(subtotal);
  elements.validationFeedback.textContent = "";
  elements.addToCartButton.disabled = false;

  return true;
}

// Add to Cart
function addToCart() {
  const isValid = updateSubtotal();

  if (!isValid) {
    return;
  }

  const quantity = Number(elements.quantity.value);

  cartCount += quantity;
  elements.cartCount.textContent = cartCount;

  elements.validationFeedback.textContent =
    `${quantity} unit ${currentProduct.name} berhasil ditambahkan ke cart.`;
}

// Load Product from API
async function loadProduct() {
  try {
    // Loading State
    elements.status.hidden = false;
    elements.detail.hidden = true;
    elements.retryButton.hidden = true;
    elements.statusMessage.textContent = "Memuat detail produk dari API…";
    elements.status.className = "api-status";

    const response = await fetch(API_URL);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `Request gagal (${response.status})`);
    }

    const product = await response.json();

    // Save API data into currentProduct
    currentProduct = product;

    // Render Product Information
    elements.name.textContent = product.name;
    elements.price.textContent = formatRupiah(product.price);
    elements.description.textContent =
      product.description || "Deskripsi belum tersedia.";
    elements.processor.textContent =
      product.processor || "Tidak dicantumkan";
    elements.memory.textContent =
      product.memory || "Tidak dicantumkan";
    elements.storage.textContent =
      product.storage || "Tidak dicantumkan";

    elements.stock.textContent = Number(product.stock) > 0
      ? `Tersedia (${product.stock} unit)`
      : "Stok habis";

    // Reset Quantity and Cart Interaction
    elements.quantity.value = 1;
    elements.cartCount.textContent = cartCount;

    updateSubtotal();

    // Show Product Detail
    elements.detail.hidden = false;
    elements.status.hidden = true;

  } catch (error) {
    console.error("Gagal memuat produk:", error);

    currentProduct = null;

    // Error State
    elements.status.hidden = false;
    elements.detail.hidden = true;
    elements.status.className = "api-status error";
    elements.statusMessage.textContent =
      "Detail produk tidak dapat dimuat. Pastikan backend dan database berjalan.";
    elements.retryButton.hidden = false;
  }
}

// Event Listeners
elements.quantity.addEventListener("input", updateSubtotal);
elements.addToCartButton.addEventListener("click", addToCart);
elements.retryButton.addEventListener("click", loadProduct);

elements.contactButton.addEventListener("click", () => {
  elements.contactFeedback.textContent =
    `Demo interaksi: Anda memilih ${currentProduct.name}. Belum ada transaksi sungguhan.`;
});

// Initial API Request
loadProduct();