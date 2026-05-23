// =============== MARKET PRICES FUNCTIONALITY ===============

// Global variables
let allPrices = [];
let filteredPrices = [];

// =============== INITIALIZATION ===============
document.addEventListener('DOMContentLoaded', function() {
    initializeMarketPrices();
    loadMarketPrices();
    updateLastUpdated();
    updatePriceSummary();
});

function initializeMarketPrices() {
    // Set up event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Filter event listeners are already set up in HTML with onchange/oninput
    
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
    
    // Login modal
    setupLoginModal();
    
    // Scroll up button
    setupScrollUp();
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

// =============== DATA LOADING ===============
function loadMarketPrices() {
    // Extended market prices data with more variety
    allPrices = [
        // Vegetables
        { id: 1, product: 'Tomato', category: 'vegetables', market: 'kathmandu', unit: 'per kg', min: 80, max: 120, avg: 100, trend: 'up', change: '+15%' },
        { id: 2, product: 'Potato', category: 'vegetables', market: 'kathmandu', unit: 'per kg', min: 45, max: 65, avg: 55, trend: 'stable', change: '0%' },
        { id: 3, product: 'Onion', category: 'vegetables', market: 'kathmandu', unit: 'per kg', min: 70, max: 90, avg: 80, trend: 'down', change: '-8%' },
        { id: 4, product: 'Carrot', category: 'vegetables', market: 'pokhara', unit: 'per kg', min: 60, max: 80, avg: 70, trend: 'up', change: '+5%' },
        { id: 5, product: 'Cabbage', category: 'vegetables', market: 'chitwan', unit: 'per kg', min: 35, max: 55, avg: 45, trend: 'stable', change: '+2%' },
        { id: 6, product: 'Cauliflower', category: 'vegetables', market: 'kathmandu', unit: 'per kg', min: 50, max: 70, avg: 60, trend: 'up', change: '+10%' },
        { id: 7, product: 'Spinach', category: 'vegetables', market: 'dharan', unit: 'per kg', min: 40, max: 60, avg: 50, trend: 'down', change: '-5%' },
        { id: 8, product: 'Eggplant', category: 'vegetables', market: 'butwal', unit: 'per kg', min: 55, max: 75, avg: 65, trend: 'stable', change: '+1%' },
        { id: 9, product: 'Chilli', category: 'vegetables', market: 'kathmandu', unit: 'per kg', min: 200, max: 300, avg: 250, trend: 'up', change: '+20%' },
        { id: 10, product: 'Pumpkin', category: 'vegetables', market: 'pokhara', unit: 'per kg', min: 30, max: 50, avg: 40, trend: 'stable', change: '0%' },
        
        // Grains & Cereals
        { id: 11, product: 'Rice (Fine)', category: 'grains', market: 'kathmandu', unit: 'per kg', min: 85, max: 110, avg: 95, trend: 'down', change: '-3%' },
        { id: 12, product: 'Rice (Coarse)', category: 'grains', market: 'chitwan', unit: 'per kg', min: 70, max: 90, avg: 80, trend: 'stable', change: '+1%' },
        { id: 13, product: 'Wheat', category: 'grains', market: 'kathmandu', unit: 'per kg', min: 45, max: 60, avg: 52, trend: 'up', change: '+7%' },
        { id: 14, product: 'Maize', category: 'grains', market: 'pokhara', unit: 'per kg', min: 35, max: 50, avg: 42, trend: 'stable', change: '+2%' },
        { id: 15, product: 'Barley', category: 'grains', market: 'dharan', unit: 'per kg', min: 55, max: 70, avg: 62, trend: 'up', change: '+12%' },
        { id: 16, product: 'Millet', category: 'grains', market: 'butwal', unit: 'per kg', min: 80, max: 100, avg: 90, trend: 'stable', change: '0%' },
        
        // Fruits
        { id: 17, product: 'Apple', category: 'fruits', market: 'kathmandu', unit: 'per kg', min: 180, max: 250, avg: 215, trend: 'up', change: '+8%' },
        { id: 18, product: 'Banana', category: 'fruits', market: 'chitwan', unit: 'per dozen', min: 80, max: 120, avg: 100, trend: 'stable', change: '+3%' },
        { id: 19, product: 'Orange', category: 'fruits', market: 'pokhara', unit: 'per kg', min: 120, max: 160, avg: 140, trend: 'down', change: '-5%' },
        { id: 20, product: 'Mango', category: 'fruits', market: 'dharan', unit: 'per kg', min: 150, max: 200, avg: 175, trend: 'up', change: '+15%' },
        
        // Spices
        { id: 21, product: 'Turmeric', category: 'spices', market: 'kathmandu', unit: 'per kg', min: 300, max: 400, avg: 350, trend: 'up', change: '+10%' },
        { id: 22, product: 'Ginger', category: 'spices', market: 'pokhara', unit: 'per kg', min: 250, max: 350, avg: 300, trend: 'stable', change: '+2%' },
        { id: 23, product: 'Garlic', category: 'spices', market: 'chitwan', unit: 'per kg', min: 200, max: 280, avg: 240, trend: 'down', change: '-7%' },
        { id: 24, product: 'Coriander', category: 'spices', market: 'butwal', unit: 'per kg', min: 400, max: 500, avg: 450, trend: 'up', change: '+18%' },
        
        // Additional vegetables
        { id: 25, product: 'Cucumber', category: 'vegetables', market: 'kathmandu', unit: 'per kg', min: 45, max: 65, avg: 55, trend: 'stable', change: '+1%' },
        { id: 26, product: 'Radish', category: 'vegetables', market: 'pokhara', unit: 'per kg', min: 35, max: 55, avg: 45, trend: 'up', change: '+6%' },
        { id: 27, product: 'Bitter Gourd', category: 'vegetables', market: 'dharan', unit: 'per kg', min: 80, max: 120, avg: 100, trend: 'down', change: '-4%' },
        { id: 28, product: 'Bottle Gourd', category: 'vegetables', market: 'chitwan', unit: 'per kg', min: 40, max: 60, avg: 50, trend: 'stable', change: '0%' },
        { id: 29, product: 'Green Beans', category: 'vegetables', market: 'butwal', unit: 'per kg', min: 70, max: 90, avg: 80, trend: 'up', change: '+9%' },
        { id: 30, product: 'Okra', category: 'vegetables', market: 'kathmandu', unit: 'per kg', min: 60, max: 80, avg: 70, trend: 'stable', change: '+3%' }
    ];
    
    filteredPrices = [...allPrices];
    displayPrices();
    updatePriceSummary();
}

function displayPrices() {
    const tableBody = document.getElementById('prices-table-body');
    if (!tableBody) return;
    
    if (filteredPrices.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="no-data">
                    <div class="empty-state">
                        <i class="ri-search-line"></i>
                        <p>No prices found matching your criteria</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = filteredPrices.map(price => `
        <tr>
            <td class="product-cell">
                <strong>${price.product}</strong>
            </td>
            <td>
                <span class="category-badge ${price.category}">
                    ${price.category.charAt(0).toUpperCase() + price.category.slice(1)}
                </span>
            </td>
            <td>
                <span class="market-name">
                    ${price.market.charAt(0).toUpperCase() + price.market.slice(1)}
                </span>
            </td>
            <td>${price.unit}</td>
            <td class="price-cell">Rs. ${price.min}</td>
            <td class="price-cell">Rs. ${price.max}</td>
            <td class="price-cell avg-price">Rs. ${price.avg}</td>
            <td>
                <span class="price-trend ${price.trend}">
                    <i class="ri-arrow-${price.trend === 'up' ? 'up' : price.trend === 'down' ? 'down' : 'right'}-line"></i>
                    ${price.change}
                </span>
            </td>
            <td>
                <button class="btn btn-outline btn-sm" onclick="setAlert('${price.product}')">
                    <i class="ri-notification-line"></i>
                    Alert
                </button>
            </td>
        </tr>
    `).join('');
}

function updateLastUpdated() {
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        const dateString = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        lastUpdatedElement.textContent = `${dateString} at ${timeString}`;
    }
}

function updatePriceSummary() {
    const trendingUp = filteredPrices.filter(p => p.trend === 'up').length;
    const trendingDown = filteredPrices.filter(p => p.trend === 'down').length;
    const trendingStable = filteredPrices.filter(p => p.trend === 'stable').length;
    
    document.getElementById('trending-up-count').textContent = trendingUp;
    document.getElementById('trending-down-count').textContent = trendingDown;
    document.getElementById('trending-stable-count').textContent = trendingStable;
}

// =============== FILTERING FUNCTIONS ===============
function filterPrices() {
    const categoryFilter = document.getElementById('category-filter').value.toLowerCase();
    const marketFilter = document.getElementById('market-filter').value.toLowerCase();
    const searchFilter = document.getElementById('search-filter').value.toLowerCase();
    
    filteredPrices = allPrices.filter(price => {
        // Category filter
        if (categoryFilter && price.category !== categoryFilter) {
            return false;
        }
        
        // Market filter
        if (marketFilter && price.market !== marketFilter) {
            return false;
        }
        
        // Search filter
        if (searchFilter && !price.product.toLowerCase().includes(searchFilter)) {
            return false;
        }
        
        return true;
    });
    
    displayPrices();
    updatePriceSummary();
}

function clearFilters() {
    document.getElementById('category-filter').value = '';
    document.getElementById('market-filter').value = '';
    document.getElementById('search-filter').value = '';
    
    filteredPrices = [...allPrices];
    displayPrices();
    updatePriceSummary();
}

// =============== ALERT FUNCTIONS ===============
function setAlert(productName) {
    // Check if user is logged in
    const user = localStorage.getItem('krishiConnectUser');
    if (!user) {
        showLoginModal();
        return;
    }
    
    alert(`Price alert set for ${productName}! You will be notified when the price changes significantly.`);
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

// Auto-refresh prices every 5 minutes
setInterval(() => {
    updateLastUpdated();
    // In a real application, you would fetch new data from the server
}, 5 * 60 * 1000);

// =============== EXPORT FOR GLOBAL ACCESS ===============
window.marketPrices = {
    filterPrices,
    clearFilters,
    setAlert,
    showLoginModal
};

