// Data Product 1 sengaja hardcode sesuai requirement assignment.
const product = {
  name: "Laptop A",
  price: 8500000,
  description: "Laptop untuk produktivitas harian, belajar, dan pekerjaan kantor.",
  processor: "Intel Core i5",
  memory: "RAM 16 GB",
  storage: "SSD 512 GB",
  stock: 8
};

const formatRupiah = (amount) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);

document.getElementById("product-name").textContent = product.name;
document.getElementById("product-price").textContent = formatRupiah(product.price);
document.getElementById("product-description").textContent = product.description;
document.getElementById("product-processor").textContent = product.processor;
document.getElementById("product-memory").textContent = product.memory;
document.getElementById("product-storage").textContent = product.storage;
document.getElementById("product-stock").textContent =
  `Tersedia (${product.stock} unit)`;

const contactButton = document.getElementById("contact-button");
const contactFeedback = document.getElementById("contact-feedback");

// DOM Elements for Product Interaction
const quantityInput = document.getElementById("quantity");
const subtotalElement = document.getElementById("subtotal");
const validationFeedback = document.getElementById("validation-feedback");
const addToCartButton = document.getElementById("add-to-cart-button");
const cartCountElement = document.getElementById("cart-count");

// Initial Cart Count
let cartCount = 0;

function validateQuantity(quantity) {

  if (quantity === "") {
    return "Quantity tidak boleh kosong.";
  }

  const value = Number(quantity);

  if (!Number.isInteger(value) || value <= 0) {
    return "Quantity harus berupa bilangan bulat positif.";
  }

  if (value > product.stock) {
    return `Stok tidak mencukupi. Maksimal ${product.stock} unit.`;
  }

  return null;
}


function updateSubtotal() {
  // 1. Validasi quantity dari input pengguna
  const errorMessage = validateQuantity(quantityInput.value);

  // 2. Jika quantity tidak valid
  if (errorMessage) {
    subtotalElement.textContent = "-";
    validationFeedback.textContent = errorMessage;
    addToCartButton.disabled = true;

    return false;
  }

  // 3. Jika quantity valid, hitung subtotal
  const quantity = Number(quantityInput.value);
  const subtotal = product.price * quantity;

  subtotalElement.textContent = formatRupiah(subtotal);

  // 4. Bersihkan pesan error
  validationFeedback.textContent = "";
  addToCartButton.disabled = false;

  return true;
}

quantityInput.addEventListener("input", updateSubtotal);

// Jalankan sekali ketika halaman pertama kali dimuat
updateSubtotal();


addToCartButton.addEventListener("click", () => {
  // 1. Pastikan quantity valid sebelum menambahkan ke cart
  const isValid = updateSubtotal();

  if (!isValid) {
    return;
  }

  // 2. Ambil quantity
  const quantity = Number(quantityInput.value);

  // 3. Tambahkan quantity ke cart
  cartCount += quantity;

  // 4. Perbarui tampilan cart
  cartCountElement.textContent = cartCount;

  // 5. Tampilkan feedback
  validationFeedback.textContent =
    `${quantity} unit ${product.name} berhasil ditambahkan ke cart.`;
});

contactButton.addEventListener("click", () => {
  contactFeedback.textContent =
    "Demo interaksi: Anda memilih " + product.name + ". Belum ada transaksi sungguhan.";
});