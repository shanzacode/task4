// ==========================================
// BLACK ELEGANCE - PRODUCT DATABASE
// ==========================================
// Yahan aap apni images (1.jpg, 2.jpg, etc.) lagayein
const products = [
    {
        id: 1,
        name: 'Royal Black Velvet Gown',
        category: 'Formals',
        priceFormatted: 'Rs. 185,000',
        description: 'Handcrafted pure velvet long gown featuring exquisite floral zardozi embroidery.',
        image: '22.jpg',
        hoverImage: '23.jpg'
    },
    {
        id: 2,
        name: 'Embellished Luxury Pishwas',
        category: 'Formals',
        priceFormatted: 'Rs. 145,000',
        description: 'Traditional net pishwas adorned with delicate silver embellishments.',
        image: '24.jpg',
        hoverImage: '25.jpg'
    },
    {
        id: 3,
        name: 'Classic Black Evening Dress',
        category: 'Casuals',
        priceFormatted: 'Rs. 120,000',
        description: 'Sleek black formal wear designed with premium fabric.',
        image: '26.jpg',
        hoverImage: '27.jpg'
    },
    {
        id: 4,
        name: 'Black Block Printed Maxi',
        category: 'Casuals',
        priceFormatted: 'Rs. 95,000',
        description: 'Graceful flowing maxi featuring cultural gold block printing.',
        image: '28.jpg',
        hoverImage: '29.jpg'
    },
    {
        id: 5,
        name: 'Black Velvet Formal Suit',
        category: 'Formals',
        priceFormatted: 'Rs. 160,000',
        description: 'Tailored black velvet suit with gold embroidery accents.',
        image: '30.jpg',
        hoverImage: '31.jpg'
    },
    {
        id: 6,
        name: 'Minimalist Black Maxi',
        category: 'Casuals',
        priceFormatted: 'Rs. 85,000',
        description: 'Simple and elegant black daily wear designer maxi.',
        image: '32.jpg',
        hoverImage: '33.jpg'
    }
];

let currentCategory = 'All';
let cartTotal = 0;

// User Login State Check
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// Update Nav Login Button text automatically
document.addEventListener('DOMContentLoaded', () => {
    const navLoginBtn = document.getElementById('nav-login-btn');
    if (navLoginBtn && isLoggedIn) {
        navLoginBtn.innerText = 'Logout';
        navLoginBtn.href = '#';
        navLoginBtn.onclick = () => {
            localStorage.removeItem('isLoggedIn');
            window.location.reload();
        };
    }
});

// Display Products
function displayProducts(items) {
    const grid = document.getElementById('product-grid');
    const banner = document.getElementById('login-banner');
    
    if (!grid) return;
    
    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #a1a1aa; padding: 40px;">No matching items found.</p>';
        return;
    }

    // Displays all items
    items.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <div class="image-container">
                    <img src="${p.image}" class="primary-img" alt="${p.name}">
                    <img src="${p.hoverImage}" class="hover-img" alt="${p.name}">
                </div>
                <div class="product-info">
                    <span style="font-size: 11px; font-weight: 700; color: #f59e0b; text-transform: uppercase;">${p.category}</span>
                    <h3>${p.name}</h3>
                    <p class="product-desc">${p.description}</p>
                    <div class="price-tag">${p.priceFormatted}</div>
                    
                    <div class="size-selector">
                        <span>Size:</span>
                        <button class="size-btn selected" onclick="selectSize(this)">S</button>
                        <button class="size-btn" onclick="selectSize(this)">M</button>
                        <button class="size-btn" onclick="selectSize(this)">L</button>
                    </div>

                    <button class="btn-cart" onclick="addToCart('${p.name}')">Add to Bag 🛍️</button>
                </div>
            </div>
        `;
    });

    // Hide banner if user is already logged in
    if (banner) {
        banner.style.display = isLoggedIn ? 'none' : 'block';
    }
}

function selectSize(btn) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

function filterCategory(category, btn) {
    currentCategory = category;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    searchProducts();
}

function searchProducts() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase();
    const filtered = products.filter(p => {
        const matchesCat = currentCategory === 'All' || p.category === currentCategory;
        const matchesQuery = p.name.toLowerCase().includes(query);
        return matchesCat && matchesQuery;
    });
    
    displayProducts(filtered);
}

function addToCart(productName) {
    if (!isLoggedIn) {
        alert('Please login first to add items to your shopping bag!');
        window.location.href = 'login.html';
        return;
    }

    cartTotal++;
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.innerText = cartTotal;
    
    alert(`"${productName}" added to your bag! 🛍️`);
}

// Render immediately when script loads
displayProducts(products);