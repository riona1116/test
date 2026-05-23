// =============== CROP LISTING FUNCTIONALITY ===============

// Global variables
let allProducts = [];
let filteredProducts = [];
let currentProduct = null;
let productsPerPage = 8;
let currentPage = 1;

// =============== INITIALIZATION ===============
document.addEventListener('DOMContentLoaded', function() {
    initializeCropListing();
    loadProducts();
    setupEventListeners();
});

function initializeCropListing() {
    // Initialize product data with the provided images
    allProducts = [
        {
            id: 1,
            name: 'Fresh Carrots',
            category: 'vegetables',
            price: 70,
            unit: 'per kg',
            quantity: 500,
            farmer: 'Ram Bahadur Thapa',
            farmerId: 'farmer_1',
            location: 'Chitwan, Nepal',
            image: 'carrots.jpg',
            description: 'Fresh, organic carrots grown without pesticides. Rich in beta-carotene and perfect for cooking or eating raw.',
            harvestDate: '2024-01-15',
            phone: '9841234567'
        },
        {
            id: 2,
            name: 'Premium Rice',
            category: 'grains',
            price: 95,
            unit: 'per kg',
            quantity: 1000,
            farmer: 'Sita Devi Sharma',
            farmerId: 'farmer_2',
            location: 'Kaski, Nepal',
            image: 'rice.jpg',
            description: 'High-quality basmati rice with excellent aroma and taste. Perfect for daily consumption and special occasions.',
            harvestDate: '2024-01-10',
            phone: '9851234568'
        },
        {
            id: 3,
            name: 'Organic Tomatoes',
            category: 'vegetables',
            price: 100,
            unit: 'per kg',
            quantity: 300,
            farmer: 'Krishna Prasad Poudel',
            farmerId: 'farmer_3',
            location: 'Lalitpur, Nepal',
            image: 'tomato.jpg',
            description: 'Juicy, red tomatoes grown organically. Perfect for salads, cooking, and making sauces.',
            harvestDate: '2024-01-18',
            phone: '9861234569'
        },
        {
            id: 4,
            name: 'Fresh Potatoes',
            category: 'vegetables',
            price: 55,
            unit: 'per kg',
            quantity: 800,
            farmer: 'Hari Bahadur Magar',
            farmerId: 'farmer_4',
            location: 'Rupandehi, Nepal',
            image: 'potato.jpg',
            description: 'High-quality potatoes perfect for cooking. Grown in fertile soil with natural farming methods.',
            harvestDate: '2024-01-12',
            phone: '9871234570'
        },
        {
            id: 5,
            name: 'Red Onions',
            category: 'vegetables',
            price: 80,
            unit: 'per kg',
            quantity: 400,
            farmer: 'Maya Devi Gurung',
            farmerId: 'farmer_5',
            location: 'Syangja, Nepal',
            image: 'onions.jpg',
            description: 'Fresh red onions with strong flavor. Essential ingredient for Nepali cuisine and cooking.',
            harvestDate: '2024-01-14',
            phone: '9881234571'
        },
        {
            id: 6,
            name: 'Green Spinach',
            category: 'vegetables',
            price: 50,
            unit: 'per kg',
            quantity: 200,
            farmer: 'Dhan Bahadur Rai',
            farmerId: 'farmer_6',
            location: 'Jhapa, Nepal',
            image: 'spinich.jpg',
            description: 'Fresh green spinach leaves rich in iron and vitamins. Perfect for healthy cooking and nutrition.',
            harvestDate: '2024-01-16',
            phone: '9891234572'
        },
        {
            id: 7,
            name: 'Fresh Eggplant',
            category: 'vegetables',
            price: 65,
            unit: 'per kg',
            quantity: 250,
            farmer: 'Kamala Devi Thapa',
            farmerId: 'farmer_7',
            location: 'Banke, Nepal',
            image: 'eggplant.jpg',
            description: 'Purple eggplants grown organically. Great for traditional Nepali dishes and curries.',
            harvestDate: '2024-01-17',
            phone: '9801234573'
        },
        {
            id: 8,
            name: 'Red Chilli',
            category: 'spices',
            price: 250,
            unit: 'per kg',
            quantity: 100,
            farmer: 'Tek Bahadur Limbu',
            farmerId: 'farmer_8',
            location: 'Ilam, Nepal',
            image: 'chilli.jpg',
            description: 'Hot red chillies perfect for spicing up your dishes. Grown in the hills with natural methods.',
            harvestDate: '2024-01-13',
            phone: '9811234574'
        },
        {
            id: 9,
            name: 'Orange Pumpkin',
            category: 'vegetables',
            price: 40,
            unit: 'per kg',
            quantity: 600,
            farmer: 'Bishnu Maya Magar',
            farmerId: 'farmer_9',
            location: 'Gulmi, Nepal',
            image: 'pumpkin.jpg',
            description: 'Sweet orange pumpkins perfect for cooking and making traditional dishes. Rich in vitamins.',
            harvestDate: '2024-01-11',
            phone: '9821234575'
        },
        {
            id: 10,
            name: 'Quality Cereals',
            category: 'grains',
            price: 85,
            unit: 'per kg',
            quantity: 700,
            farmer: 'Surya Bahadur Chhetri',
            farmerId: 'farmer_10',
            location: 'Dang, Nepal',
            image: 'cereals.jpg',
            description: 'Mixed cereals including wheat and barley. Perfect for healthy breakfast and nutrition.',
            harvestDate: '2024-01-09',
            phone: '9831234576'
        },
        {
            id: 11,
            name: 'Premium Tea Leaves',
            category: 'spices',
            price: 300,
            unit: 'per kg',
            quantity: 150,
            farmer: 'Laxmi Devi Sherpa',
            farmerId: 'farmer_11',
            location: 'Nuwakot, Nepal',
            image: 'tea.jpg',
            description: 'High-quality tea leaves grown in the hills. Perfect for making traditional Nepali tea.',
            harvestDate: '2024-01-08',
            phone: '9841234577'
        },
        {
            id: 12,
            name: 'Mixed Potatoes',
            category: 'vegetables',
            price: 60,
            unit: 'per kg',
            quantity: 900,
            farmer: 'Gopal Prasad Sharma',
            farmerId: 'farmer_12',
            location: 'Baglung, Nepal',
            image: 'potatoess.jpg',
            description: 'Variety of potatoes including red and white. Fresh from the farm with excellent quality.',
            harvestDate: '2024-01-19',
            phone: '9851234578'
        },
        {
            id: 13,
            name: 'Fresh Carrots Bundle',
            category: 'vegetables',
            price: 75,
            unit: 'per kg',
            quantity: 350,
            farmer: 'Indra Bahadur Tamang',
            farmerId: 'farmer_13',
            location: 'Sindhupalchok, Nepal',
            image: 'carrots.jpg',
            description: 'Premium quality carrots in bundles. Freshly harvested and perfect for healthy cooking.',
            harvestDate: '2024-01-20',
            phone: '9861234579'
        },
        {
            id: 14,
            name: 'Organic Rice Grains',
            category: 'grains',
            price: 110,
            unit: 'per kg',
            quantity: 1200,
            farmer: 'Parvati Devi Yadav',
            farmerId: 'farmer_14',
            location: 'Sarlahi, Nepal',
            image: 'rice.jpg',
            description: 'Organic rice grains grown without chemicals. Premium quality for health-conscious consumers.',
            harvestDate: '2024-01-07',
            phone: '9871234580'
        },
        {
            id: 15,
            name: 'Garden Fresh Tomatoes',
            category: 'vegetables',
            price: 90,
            unit: 'per kg',
            quantity: 450,
            farmer: 'Raju Maharjan',
            farmerId: 'farmer_15',
            location: 'Bhaktapur, Nepal',
            image: 'tomato.jpg',
            description: 'Garden fresh tomatoes with natural sweetness. Perfect for salads and cooking.',
            harvestDate: '2024-01-21',
            phone: '9881234581'
        },
        {
            id: 16,
            name: 'Premium Spinach',
            category: 'vegetables',
            price: 55,
            unit: 'per kg',
            quantity: 180,
            farmer: 'Sunita Devi Tharu',
            farmerId: 'farmer_16',
            location: 'Kailali, Nepal',
            image: 'spinich.jpg',
            description: 'Premium quality spinach leaves. Rich in nutrients and perfect for healthy meals.',
            harvestDate: '2024-01-22',
            phone: '9891234582'
        }
    ];
    
    filteredProducts = [...allProducts];
}

function setupEventListeners() {
    // Mobile navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    
    navToggle?.addEventListener('click', () => navMenu?.classList.add('show-menu'));
    navClose?.addEventListener('click', () => navMenu?.classList.remove('show-menu'));
    
    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('show-menu');
        });
    });
    
    // Product modal
    setupProductModal();
    
    // Login modal
    setupLoginModal();
    
    // Scroll up button
    setupScrollUp();
}

function setupProductModal() {
    const productModal = document.getElementById('product-modal');
    const productModalClose = document.getElementById('product-modal-close');
    
    productModalClose?.addEventListener('click', () => {
        productModal?.classList.remove('active');
    });
    
    productModal?.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
        }
    });
}

function setupLoginModal() {
    const loginModal = document.getElementById('login-modal');
    const modalClose = document.getElementById('modal-close');
    const loginForm = document.getElementById('login-form');
    
    modalClose?.addEventListener('click', () => {
        loginModal?.classList.remove('active');
    });
    
    loginModal?.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });
    
    loginForm?.addEventListener('submit', handleLogin);
}

function setupScrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 350) {
            scrollUp?.classList.add('show-scroll');
        } else {
            scrollUp?.classList.remove('show-scroll');
        }
    });
    
    scrollUp?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =============== PRODUCT LOADING AND DISPLAY ===============
function loadProducts() {
    displayProducts();
    updateStats();
}

function displayProducts() {
    const productsContainer = document.getElementById('products-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (!productsContainer) return;
    
    // Calculate products to show
    const startIndex = 0;
    const endIndex = currentPage * productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    if (productsToShow.length === 0) {
        productsContainer.innerHTML = `
            <div class="empty-state">
                <i class="ri-search-line"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters to find more products</p>
                <button class="btn btn-outline" onclick="clearFilters()">
                    <i class="ri-refresh-line"></i>
                    Clear Filters
                </button>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    productsContainer.innerHTML = productsToShow.map(product => `
        <div class="product-card" onclick="showProductDetails(${product.id})">
            <div class="product-card__image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-card__badge">
                    <span class="badge ${product.category}">${product.category}</span>
                </div>
            </div>
            <div class="product-card__content">
                <h3 class="product-card__title">${product.name}</h3>
                <p class="product-card__farmer">
                    <i class="ri-user-line"></i>
                    By ${product.farmer}
                </p>
                <div class="product-card__details">
                    <div class="detail-item">
                        <span class="detail-label">Quantity:</span>
                        <span class="detail-value">${product.quantity} kg</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Location:</span>
                        <span class="detail-value">${product.location}</span>
                    </div>
                </div>
                <div class="product-card__price">
                    <span class="price">Rs. ${product.price}</span>
                    <span class="unit">${product.unit}</span>
                </div>
                <div class="product-card__actions">
                    <button class="btn btn-outline" onclick="event.stopPropagation(); viewFarmerProfile('${product.farmerId}')">
                        <i class="ri-user-line"></i>
                        View Farmer
                    </button>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); contactFarmerDirect('${product.farmerId}')">
                        <i class="ri-message-line"></i>
                        Contact
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Show/hide load more button
    if (endIndex >= filteredProducts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

function loadMoreProducts() {
    currentPage++;
    displayProducts();
}

function updateStats() {
    const totalProducts = filteredProducts.length;
    const uniqueFarmers = new Set(filteredProducts.map(p => p.farmerId)).size;
    
    document.getElementById('total-products').textContent = totalProducts;
    document.getElementById('total-farmers').textContent = uniqueFarmers;
}

// =============== FILTERING FUNCTIONS ===============
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value.toLowerCase();
    const priceFilter = document.getElementById('price-filter').value;
    const locationFilter = document.getElementById('location-filter').value.toLowerCase();
    const searchFilter = document.getElementById('search-filter').value.toLowerCase();
    
    filteredProducts = allProducts.filter(product => {
        // Category filter
        if (categoryFilter && product.category !== categoryFilter) {
            return false;
        }
        
        // Price filter
        if (priceFilter) {
            const price = product.price;
            switch (priceFilter) {
                case '0-50':
                    if (price > 50) return false;
                    break;
                case '51-100':
                    if (price < 51 || price > 100) return false;
                    break;
                case '101-200':
                    if (price < 101 || price > 200) return false;
                    break;
                case '201+':
                    if (price < 201) return false;
                    break;
            }
        }
        
        // Location filter
        if (locationFilter && !product.location.toLowerCase().includes(locationFilter)) {
            return false;
        }
        
        // Search filter
        if (searchFilter && !product.name.toLowerCase().includes(searchFilter) && 
            !product.farmer.toLowerCase().includes(searchFilter)) {
            return false;
        }
        
        return true;
    });
    
    currentPage = 1;
    displayProducts();
    updateStats();
}

function clearFilters() {
    document.getElementById('category-filter').value = '';
    document.getElementById('price-filter').value = '';
    document.getElementById('location-filter').value = '';
    document.getElementById('search-filter').value = '';
    
    filteredProducts = [...allProducts];
    currentPage = 1;
    displayProducts();
    updateStats();
}

// =============== PRODUCT DETAILS ===============
function showProductDetails(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    
    // Populate modal with product details
    document.getElementById('modal-product-title').textContent = product.name;
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-price').textContent = `Rs. ${product.price} ${product.unit}`;
    document.getElementById('modal-farmer-name').textContent = product.farmer;
    document.getElementById('modal-product-category').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.getElementById('modal-product-quantity').textContent = `${product.quantity} kg`;
    document.getElementById('modal-product-location').textContent = product.location;
    document.getElementById('modal-harvest-date').textContent = new Date(product.harvestDate).toLocaleDateString();
    document.getElementById('modal-product-description').textContent = product.description;
    
    // Show modal
    document.getElementById('product-modal').classList.add('active');
}

function viewFarmerProfile(farmerId) {
    const farmer = allProducts.find(p => p.farmerId === farmerId);
    if (farmer) {
        const farmerProducts = allProducts.filter(p => p.farmerId === farmerId);
        const productsList = farmerProducts.map(p => `• ${p.name} - Rs. ${p.price}/kg`).join('\n');
        
        alert(`Farmer Profile:\n\nName: ${farmer.farmer}\nPhone: ${farmer.phone}\nLocation: ${farmer.location}\nTotal Products: ${farmerProducts.length}\n\nAvailable Products:\n${productsList}`);
    }
}

function contactFarmerDirect(farmerId) {
    // Check if user is logged in
    const user = localStorage.getItem('krishiConnectUser');
    if (!user) {
        showLoginModal();
        return;
    }
    
    const farmer = allProducts.find(p => p.farmerId === farmerId);
    if (farmer) {
        alert(`Contacting ${farmer.farmer} at ${farmer.phone}\n\nYou can call or send a message to discuss product details and pricing.`);
    }
}

function contactFarmer() {
    if (currentProduct) {
        contactFarmerDirect(currentProduct.farmerId);
    }
}

function addToWishlist() {
    if (!currentProduct) return;
    
    // Check if user is logged in
    const user = localStorage.getItem('krishiConnectUser');
    if (!user) {
        showLoginModal();
        return;
    }
    
    // Get existing wishlist
    const wishlist = JSON.parse(localStorage.getItem('krishiConnectWishlist') || '[]');
    
    // Check if product already in wishlist
    if (wishlist.find(item => item.id === currentProduct.id)) {
        alert('Product is already in your wishlist!');
        return;
    }
    
    // Add to wishlist
    wishlist.push(currentProduct);
    localStorage.setItem('krishiConnectWishlist', JSON.stringify(wishlist));
    
    alert('Product added to wishlist successfully!');
}

// =============== LOGIN FUNCTIONALITY ===============
function showLoginModal() {
    const loginModal = document.getElementById('login-modal');
    loginModal?.classList.add('active');
}

function handleLogin(e) {
    e.preventDefault();
    
    const userType = document.getElementById('user-type').value;
    const phone = document.getElementById('login-phone').value;
    const code = document.getElementById('login-code').value;
    
    if (!userType || !phone || !code) {
        alert('Please fill in all fields');
        return;
    }
    
    // Check credentials
    let user = null;
    
    if (userType === 'farmer' && phone === '9841234567' && code === 'FARMER123') {
        user = { id: 'farmer_1', name: 'Ram Bahadur', phone: phone, type: 'farmer' };
    } else if (userType === 'wholesaler' && phone === '9851234567' && code === 'WHOLE123') {
        user = { id: 'wholesaler_1', name: 'Shyam Traders', phone: phone, type: 'wholesaler' };
    }
    
    if (user) {
        // Save user data
        localStorage.setItem('krishiConnectUser', JSON.stringify(user));
        localStorage.setItem('krishiConnectUserType', userType);
        
        // Redirect to appropriate dashboard
        if (userType === 'farmer') {
            window.location.href = 'farmer-dashboard.html';
        } else {
            window.location.href = 'wholesaler-dashboard.html';
        }
    } else {
        alert('Invalid credentials. Please check your phone number and access code.');
    }
}

// =============== UTILITY FUNCTIONS ===============
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debounced search
const debouncedFilter = debounce(filterProducts, 300);
document.getElementById('search-filter')?.addEventListener('input', debouncedFilter);
document.getElementById('location-filter')?.addEventListener('input', debouncedFilter);

// =============== EXPORT FOR GLOBAL ACCESS ===============
window.cropListing = {
    filterProducts,
    clearFilters,
    showProductDetails,
    viewFarmerProfile,
    contactFarmerDirect,
    showLoginModal,
    loadMoreProducts
};

