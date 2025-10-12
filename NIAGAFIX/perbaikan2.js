const products = [
    {id: 1, name: "Arens Coffee", category: 'coffee',
     prices: {cup: 15000, bottle: 20000},
     image: 'fotokopi/aren.jpg',
     desc: 'Kenikmatan khas dari Aren yang lezat'},

    {id: 2, name: 'Salted Caramel', category: 'coffee',
     prices: {cup: 15000, bottle: 20000},
     image: 'fotokopi/caramel.jpg',
     desc: 'Kesempurnaan kombinasi Sweet & Salty'},

    {id: 3, name: 'Butterscotch', category: 'coffee',
     prices: {cup: 15000, bottle: 22000},
     image: 'fotokopi/butterskot2.jpg',
     desc: 'Rich old money vibes💸⚜️'},

    {id: 4, name: 'Americano', category: 'coffee',
     prices: {cup: 15000, bottle: 20000},
     image: 'fotokopi/americano.jpg',
     desc: 'Gaya Italian klasik. Mamma mia😋🤌'},

    {id: 5, name: 'Chocolate', category: 'non-coffee',
     prices: {cup: 15000, bottle: 20000},
     image: 'fotokopi/coklat.jpg',
     desc: 'Rich hot chocolate🍫'},

    {id: 6, name: 'Matcha Latte', category: 'non-coffee',
     prices: {cup: 15000, bottle: 20000},
     image: 'fotokopi/premium matcha.png',
     desc: 'Authentic Japanese matcha🍵'}
];


        let cart = [];
        let selectedSizes = {};
        let currentFilter = 'all';
        
        

        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();
            initFeedback();
        });

        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            const filtered = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);
            
            grid.innerHTML = filtered.map(p => `
                <div class="product-card">
                    <img src="${p.image}" alt="${p.name}" class="product-img">
                    <div class="product-info">
                        <h3 class="product-name">${p.name}</h3>
                        <p class="product-desc">${p.desc}</p>
                        <div class="sizes">
                            <div class="size-option" onclick="selectSize(${p.id}, 'cup')">
                                <span>Cup</span>
                                <span>Rp ${p.prices.cup.toLocaleString('id-ID')}</span>
                            </div>
                            <div class="size-option" onclick="selectSize(${p.id}, 'bottle')">
                                <span>Botol</span>
                                <span>Rp ${p.prices.bottle.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                        <button class="btn add-cart" onclick="addToCart(${p.id})">
                            <i class="fas fa-plus"></i> Tambah
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function filterProducts(cat) {
            currentFilter = cat;
            document.querySelectorAll('.filter button').forEach(b => b.classList.remove('active'));
            event.target.classList.add('active');
            renderProducts();
        }

        function selectSize(id, size) {
            const card = event.target.closest('.product-card');
            card.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
            event.target.classList.add('selected');
            selectedSizes[id] = size;
        }

        // tambah ke keranjang
        function addToCart(id) {
            const p = products.find(x => x.id === id);
            const size = selectedSizes[id];
            
            if(!size) {
                showNotification('Pilih ukuran dulu!', 'error');
                return;
            }
            
            const price = p.prices[size];
            const cartId = `${id}-${size}`;
            const existing = cart.find(item => item.cartId === cartId);
            
            if(existing) {
                existing.quantity++;
            } else {
                cart.push({...p, cartId, size, price, quantity: 1});
            }
            
            updateCart();
            showNotification(`${p.name} ditambahkan!`);
            delete selectedSizes[id];
            renderProducts();
        }

        // Update cart UI
        function updateCart() {
            document.getElementById('cartCount').textContent = cart.reduce((s, i) => s + i.quantity, 0);
            
            const items = document.getElementById('cartItems');
            if(cart.length === 0) {
                items.innerHTML = '<p style="text-align: center; color: #999;">Keranjang kosong</p>';
            } else {
                items.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div>
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-details">${item.size} - Rp ${item.price.toLocaleString('id-ID')}</div>
                        </div>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="updateQty('${item.cartId}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQty('${item.cartId}', 1)">+</button>
                        </div>
                    </div>
                `).join('');
            }
            
            const total = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
            document.getElementById('cartTotal').textContent = total.toLocaleString('id-ID');
        }

        // Update quantity
        function updateQty(cartId, change) {
            const item = cart.find(i => i.cartId === cartId);
            if(item) {
                item.quantity += change;
                if(item.quantity <= 0) {
                    cart = cart.filter(i => i.cartId !== cartId);
                }
                updateCart();
            }
        }

        // Toggle cart
        function toggleCart() {
            document.getElementById('cartModal').style.display = 
                document.getElementById('cartModal').style.display === 'flex' ? 'none' : 'flex';
        }

        // Clear cart
        function clearCart() {
            if(cart.length && confirm('Hapus semua item?')) {
                cart = [];
                updateCart();
                showNotification('Keranjang dikosongkan');
            }
        }

        function checkout() {
            if(!cart.length) {
                showNotification('Keranjang kosong!', 'error');
                return;
            }
            const total = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
            alert(`Terima kasih!\nTotal: Rp ${total.toLocaleString('id-ID')}`);
            cart = [];
            updateCart();
            toggleCart();
        }

        function showNotification(msg, type = 'success') {
            const notif = document.getElementById('notification');
            notif.textContent = msg;
            notif.className = `notification show ${type === 'error' ? 'error' : ''}`;
            setTimeout(() => notif.classList.remove('show'), 3000);
        }

// ⬇️ GANTI BAGIAN FEEDBACK LO DENGAN INI
let selectedRating = 0;

function initFeedback() {
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.dataset.rating);
      updateStars();
    });
  });
}

function updateStars() {
  document.querySelectorAll('.star').forEach((star, i) => {
    star.classList.toggle('active', i < selectedRating);
  });
}

function toggleFeedback() {
  document.getElementById('feedbackForm').classList.toggle('active');
}

function submitFeedback() {
  if(!selectedRating) {
    // popup error dengan stiker error
    showFeedbackPopup("Rating dulu dong bos🤨", "sticker_error.jpg");
    return;
  }

  // popup sukses dengan stiker sukses
  showFeedbackPopup("Thank you😊", "sticker_success.jpg");

  selectedRating = 0;
  updateStars();
  document.querySelector('.feedback-textarea').value = '';
  toggleFeedback();
}

// khusus feedback popup
function showFeedbackPopup(message, imgSrc) {
  document.getElementById('popupMessage').textContent = message;
  document.getElementById('popupImage').src = imgSrc;
  document.getElementById('popupCard').style.display = 'flex';

  // auto close 3 detik
  setTimeout(closeFeedbackPopup, 4000);
}

function closeFeedbackPopup() {
  document.getElementById('popupCard').style.display = 'none';
}
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                document.querySelector(a.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
            });
        });
        