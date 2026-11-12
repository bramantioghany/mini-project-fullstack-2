Full Stack Web Miniproject: Building Interactivity Website with JavaScript

TechStore: Proyek Mini Full Stack
1. Gambaran Umum Proyek

TechStore adalah website sederhana yang menampilkan produk laptop dan dikembangkan sebagai bagian dari proyek mini Full Stack Web Development.

Proyek ini mendemonstrasikan bagaimana JavaScript dapat digunakan untuk menambahkan interaktivitas pada sebuah website, termasuk validasi jumlah produk, perhitungan subtotal secara otomatis, fitur Tambahkan ke Keranjang (Add to Cart), serta pengambilan informasi produk melalui REST API.

Proyek ini memiliki dua halaman detail produk dengan sumber data yang berbeda:
Produk 1 — Laptop A: Informasi produk disimpan secara langsung di JavaScript pada frontend (hardcoded).
Produk 2 — Laptop B: Informasi produk diambil secara dinamis dari REST API backend yang terhubung dengan database MySQL.

2. Teknologi yang Digunakan
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Node.js
- Express.js
- MySQL
- REST API
- Fetch API
- Git

3. Struktur Proyek
text
mini-project-fullstack-1/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── productController.js
│   ├── models/
│   │   └── productModel.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── database/
│   └── products.sql
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── product-1.js
│   │   └── product-2.js
│   ├── index.html
│   ├── product-1.html
│   └── product-2.html
├── .gitignore
└── README.md

4. Informasi Produk
Produk	Harga	Stok	Sumber Data
Laptop A	Rp8.500.000	8 unit	JavaScript (Hardcoded)
Laptop B	Rp12.000.000	5 unit	MySQL melalui REST API
5. Fitur dan Interaktivitas

Kedua halaman detail produk menyediakan fitur-fitur berikut:

Input Jumlah Produk (Quantity Input)

Pengguna dapat menentukan jumlah produk yang ingin ditambahkan ke keranjang belanja.

Validasi Jumlah Produk (Quantity Validation)

Aplikasi melakukan validasi terhadap input pengguna untuk memastikan bahwa:

- Jumlah produk tidak boleh kosong.
- Jumlah produk harus berupa bilangan bulat positif.
- Jumlah produk tidak boleh melebihi stok yang tersedia.
- Jumlah produk yang tidak valid tidak dapat ditambahkan ke keranjang.
- Perhitungan Subtotal Otomatis (Automatic Subtotal Calculation)

Subtotal akan diperbarui secara otomatis setiap kali jumlah produk berubah.

Rumus:

text
Subtotal = Harga Produk × Jumlah Produk

Tambahkan ke Keranjang (Add to Cart)

Pengguna dapat menambahkan produk ke keranjang belanja lokal. Jumlah item pada keranjang akan diperbarui berdasarkan jumlah produk yang dimasukkan.

Fitur keranjang belanja diimplementasikan menggunakan variabel JavaScript dan tidak disimpan secara permanen ke database maupun local storage.

Pertanyaan Produk (Product Inquiry)

Tombol "Tanyakan Produk" menampilkan respons interaktif berdasarkan produk yang dipilih.

Integrasi API — Produk 2

Laptop B mengambil informasi produknya dari endpoint berikut:

http
GET http://localhost:3000/api/products/2


Frontend menggunakan Fetch API dengan async/await untuk mengambil dan menampilkan informasi produk.

Aplikasi juga menangani beberapa kondisi berikut:


- Status pemuatan data dari API (API loading state).
- Respons API yang berhasil.
- Kesalahan HTTP dan jaringan.
- Fitur mencoba kembali (retry functionality) ketika permintaan API gagal.


6. Instalasi dan Konfigurasi
Persyaratan Awal (Prerequisites)

Pastikan perangkat lunak berikut sudah terinstal:

Node.js dan npm.
MySQL Server.
Web browser.
Editor kode seperti Visual Studio Code.
Langkah 1 — Clone Repository
bash
git clone <repository-url>
cd mini-project-fullstack-1

Langkah 2 — Konfigurasi Database
Jalankan MySQL Server.
Buka MySQL Workbench atau aplikasi klien MySQL lainnya.
Jalankan skrip SQL berikut:
text
database/products.sql

Pastikan database mini_project_db dan tabel products berhasil dibuat.
Langkah 3 — Konfigurasi Backend

Masuk ke direktori backend:

bash
cd backend


Instal seluruh dependencies:

bash
npm install


Konfigurasikan file .env dengan menggunakan .env.example sebagai referensi. Pastikan kredensial database dan pengaturan koneksi sudah sesuai dengan konfigurasi MySQL lokal.

Jalankan backend menggunakan perintah yang telah ditentukan dalam file backend/package.json. Jika proyek menggunakan file utama Node.js secara langsung, jalankan perintah:

bash
node server.js


Backend seharusnya dapat diakses melalui alamat:

text
http://localhost:3000

Langkah 4 — Menjalankan Frontend

Buka proyek menggunakan server pengembangan lokal (local development server), seperti ekstensi Live Server pada Visual Studio Code.

Buka halaman berikut:

frontend/index.html
frontend/product-1.html
frontend/product-2.html

Pastikan backend sedang berjalan ketika mengakses halaman Produk 2.

7. Dokumentasi Pengujian
Pengujian dilakukan untuk memastikan seluruh fitur interaktif pada halaman produk berjalan sesuai dengan yang diharapkan, termasuk validasi jumlah produk, perhitungan subtotal, fitur keranjang belanja, serta integrasi dan penanganan kesalahan API.

Berikut adalah skenario pengujian yang digunakan:

1. Pengujian Tampilan dan Pemuatan Produk
Skenario 1 — Memuat Produk 1

Kondisi: Membuka halaman product-1.html.
Hasil yang diharapkan: Informasi Laptop A berhasil ditampilkan pada halaman produk.
Status: Belum diuji.
Skenario 2 — Memuat Produk 2

Kondisi: Membuka halaman product-2.html ketika backend sedang berjalan.
Hasil yang diharapkan: Informasi Laptop B berhasil diambil dari REST API dan ditampilkan pada halaman produk.
Status: Belum diuji.

2. Pengujian Validasi Jumlah Produk (Quantity Validation)
Skenario 3 — Input Jumlah Produk Valid

Kondisi: Memasukkan bilangan bulat positif yang tidak melebihi stok tersedia.
Hasil yang diharapkan: Input diterima oleh aplikasi.
Status: Belum diuji.
Skenario 4 — Input Kosong

Kondisi: Membiarkan kolom jumlah produk kosong.
Hasil yang diharapkan: Aplikasi menampilkan pesan validasi bahwa jumlah produk tidak boleh kosong.
Status: Belum diuji.
Skenario 5 — Input Nol

Kondisi: Memasukkan angka 0.
Hasil yang diharapkan: Aplikasi menolak input dan menampilkan pesan validasi.
Status: Belum diuji.
Skenario 6 — Input Negatif

Kondisi: Memasukkan angka -1.
Hasil yang diharapkan: Aplikasi menolak input dan menampilkan pesan validasi.
Status: Belum diuji.
Skenario 7 — Input Desimal

Kondisi: Memasukkan angka 1.5.
Hasil yang diharapkan: Aplikasi menolak input karena jumlah produk harus berupa bilangan bulat.
Status: Belum diuji.
Skenario 8 — Jumlah Produk Melebihi Stok

Kondisi: Memasukkan jumlah produk yang melebihi stok tersedia.
Hasil yang diharapkan: Aplikasi menampilkan pesan kesalahan validasi stok dan menolak penambahan produk ke keranjang.
Status: Belum diuji.

3. Pengujian Perhitungan Subtotal
Skenario 9 — Perhitungan Subtotal Otomatis

Kondisi: Mengubah jumlah produk ke nilai yang valid.
Hasil yang diharapkan: Subtotal diperbarui secara otomatis berdasarkan harga produk dan jumlah yang dimasukkan.
Status: Belum diuji.

4. Pengujian Fitur Keranjang Belanja (Add to Cart)
Skenario 10 — Menambahkan Produk ke Keranjang

Kondisi: Memasukkan jumlah produk yang valid, kemudian mengklik tombol "Add to Cart".
Hasil yang diharapkan: Produk berhasil ditambahkan ke keranjang lokal dan jumlah item keranjang bertambah sesuai jumlah yang dimasukkan.
Status: Belum diuji.

5. Pengujian Fitur Pertanyaan Produk (Product Inquiry)
Skenario 11 — Tombol Tanyakan Produk

Kondisi: Mengklik tombol "Tanyakan Produk".
Hasil yang diharapkan: Aplikasi menampilkan respons interaktif berdasarkan produk yang dipilih.
Status: Belum diuji.

6. Pengujian Integrasi dan Penanganan Kesalahan API
Skenario 12 — Penanganan Kesalahan API

Kondisi: Menghentikan backend, kemudian membuka halaman Produk 2 atau mencoba kembali memuat data.
Hasil yang diharapkan: Aplikasi menampilkan pesan kesalahan dan tombol "Coba Lagi".
Status: Belum diuji.
Skenario 13 — Mencoba Kembali Koneksi API

Kondisi: Menjalankan kembali backend, kemudian mengklik tombol "Coba Lagi".
Hasil yang diharapkan: Permintaan API berhasil dan informasi Laptop B ditampilkan pada halaman Produk 2.
Status: Belum diuji.
Bukti Pengujian
Tangkapan layar (screenshot) atau hasil tampilan dari browser dapat ditambahkan sebagai bukti pendukung untuk setiap skenario pengujian.

Bukti tersebut digunakan untuk menunjukkan bahwa setiap fitur telah diuji dan berjalan sesuai dengan hasil yang diharapkan.

8. Pernyataan Penggunaan AI (AI Usage Disclosure)

AI digunakan sebagai asisten selama proses pengembangan proyek, khususnya untuk membantu implementasi dan penyempurnaan interaktivitas JavaScript serta fitur-fitur produk.

Bantuan yang diberikan meliputi:

- Panduan dalam mengimplementasikan validasi jumlah produk.
- Bantuan dalam membuat perhitungan subtotal secara otomatis.
- Panduan dalam mengimplementasikan fitur Tambahkan ke Keranjang (Add to Cart).
- Bantuan dalam mengintegrasikan interaksi produk ke halaman produk yang menggunakan API sebagai sumber data.
- Saran dalam menangani status pemuatan API, kesalahan, dan percobaan ulang (retry).
- Panduan peninjauan kode (code review) dan proses debugging.

AI berperan sebagai asisten pengembangan sekaligus pendamping pembelajaran. Implementasi proyek, penyesuaian kode, eksekusi, dan pengujian dilakukan oleh pengembang.

9. Ruang Lingkup dan Batasan Proyek

Proyek ini berfokus pada implementasi interaktivitas frontend dan integrasi dasar API backend.

Beberapa fitur yang belum termasuk dalam ruang lingkup proyek ini adalah:

- Autentikasi pengguna (user authentication).
- Keranjang belanja yang menyimpan data secara permanen (persistent shopping cart).
- Proses checkout dan pembayaran.
- Manajemen pesanan (order management).
- Pengurangan stok setelah produk ditambahkan ke keranjang.
- Fitur Tambahkan ke Keranjang saat ini hanya merupakan demonstrasi pada sisi frontend dan belum menghasilkan transaksi yang sebenarnya.

Proyek: TechStore — Proyek Mini Full Stack
Fokus: Menambahkan Interaktivitas pada Website Menggunakan JavaScript
Pengembang: Bramantio Ghany Suryoleksono