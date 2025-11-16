/* ============================================================
   DATA PRODUK + BUNDLE
============================================================ */
const products = [
  /* --- SINGLE PRODUCTS (MANUAL / TETAP DI HTML) --- */
  // Tidak di-render ulang, tetap biarkan di HTML

  /* --- BUNDLE PRODUCTS (RENDER OTOMATIS KE #bundleGrid) --- */
  {
    id: "b1",
    title: "Jago Google Ads — Bundle",
    price: "55.000",
    category: "bundle",
    description:
      "Pelajari semua teknik penting Google Ads dari dasar sampai expert untuk UMKM maupun bisnis besar.",
    images: ["https://i.pinimg.com/736x/placeholder.jpg"]
  },
  {
    id: "b2",
    title: "Panduan Lengkap Bisnis TikTok Shop — Bundle",
    price: "65.000",
    category: "bundle",
    description:
      "Strategi lengkap membangun & scaling TikTok Shop: riset produk, konten viral, dan teknik penjualan.",
    images: ["https://i.pinimg.com/736x/placeholder.jpg"]
  },
  {
    id: "b3",
    title: "Affiliate Shopee Marketing — Bundle",
    price: "45.000",
    category: "bundle",
    description:
      "Cara menjadi affiliate Shopee yang profitable: teknik viral, riset konten, scaling komisi, dan optimasi algoritma.",
    images: ["https://i.pinimg.com/736x/placeholder.jpg"]
  }
];

/* ============================================================
   RENDER BUNDLES KE DALAM #bundleGrid SAJA
============================================================ */
const bundleGrid = document.getElementById("bundleGrid");

function renderBundles() {
  if (!bundleGrid) return;

  products
    .filter((p) => p.category === "bundle")
    .forEach((b) => {
      const el = document.createElement("div");
      el.className = "bundle-card";
      el.dataset.category = "bundle";

      el.innerHTML = `
        <div class="bundle-image">
          <img src="${b.images[0]}" alt="${b.title}">
        </div>
        <div class="bundle-info">
          <h3 class="bundle-title">${b.title}</h3>
          <p class="bundle-price">Rp ${b.price}</p>
          <button class="view-details-btn" data-id="${b.id}">View Details</button>
        </div>
      `;

      bundleGrid.appendChild(el);
    });
}

renderBundles();

/* ============================================================
   FILTER KATEGORI (HANYA MEN-SHOW/HIDE ELEMEN HTML)
============================================================ */
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const cards = document.querySelectorAll(
      ".product-card, .bundle-card"
    );

    cards.forEach((card) => {
      const cat = card.dataset.category;

      if (filter === "all" || filter === cat) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* ============================================================
   DETAIL MODAL + VIEW DETAILS
============================================================ */
function q(sel) {
  return document.querySelector(sel);
}

const overlay = q("#detailsOverlay");
const mainImage = q("#mainImage");
const thumbContainer = q("#thumbContainer");

function openDetails(data) {
  q("#productTitle").innerText = data.title;
  q("#productPrice").innerText = `Rp ${data.price}`;
  q("#productDescription").innerText = data.description;

  mainImage.src = data.images[0] || "";
  mainImage.alt = data.title;

  thumbContainer.innerHTML = "";
  data.images.forEach((img, i) => {
    const t = document.createElement("img");
    t.src = img;
    t.className = "thumb";
    if (i === 0) t.classList.add("active");
    t.addEventListener("click", () => {
      mainImage.src = img;
      document.querySelectorAll(".thumb").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
    });
    thumbContainer.appendChild(t);
  });

  overlay.classList.remove("hidden");
}

function initDetailButtons() {
  const detailBtns = document.querySelectorAll(".view-details-btn");

  detailBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const id = btn.dataset.id;
      const data = products.find((p) => p.id === id);

      if (data) openDetails(data);
    });
  });
}

initDetailButtons();

q("#detailsClose").addEventListener("click", () => {
  overlay.classList.add("hidden");
});


// CLICK HANDLER GLOBAL UNTUK SEMUA VIEW DETAILS
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".view-details-btn");
  if (!btn) return;

  e.preventDefault(); // HENTIKAN <a href=""> agar tidak pindah halaman

  const id = btn.dataset.id;

  // 1) Cari di array "products" dulu
  let data = products.find((p) => p.id === id);

  // 2) Kalau tidak ditemukan → ambil dari elemen HTML (single products)
  if (!data) {
    const card = btn.closest(".product-card");
    if (!card) return;

    data = {
      id,
      title: card.querySelector(".product-title").innerText,
      price: card.querySelector(".product-price").innerText.replace("Rp ", ""),
      description:
        card.dataset.description || "Tidak ada deskripsi untuk produk ini.",
      images: [card.querySelector("img").src]
    };
  }

  openDetails(data);
});
