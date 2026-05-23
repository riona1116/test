// =============== DUMMY DATA ===============
const dummyUsers = {
    farmers: [
        { phone: '9812345678', pin: '1234', name: 'Ram Bahadur', id: 'farmer_001' },
        { phone: '9823456789', pin: '5678', name: 'Sita Devi', id: 'farmer_002' },
        { phone: '9834567890', pin: '9012', name: 'Hari Prasad', id: 'farmer_003' }
    ],
    wholesalers: [
        { phone: '9845678901', pin: '3456', name: 'Krishna Traders', business: 'Krishna Vegetable Store', id: 'wholesaler_001' },
        { phone: '9856789012', pin: '7890', name: 'Ganesh Suppliers', business: 'Ganesh Fresh Mart', id: 'wholesaler_002' }
    ]
};

const dummyProducts = [
    {
        id: 'prod_001',
        name: 'Fresh Tomatoes',
        farmer: 'Ram Bahadur',
        farmerId: 'farmer_001',
        price: 80,
        unit: 'per kg',
        quantity: '500 kg available',
        image: 'tomato.jpg',
        description: 'Fresh, vine-ripened tomatoes',
        contact: '9812345678'
    },
    {
        id: 'prod_002',
        name: 'Organic Carrots',
        farmer: 'Sita Devi',
        farmerId: 'farmer_002',
        price: 60,
        unit: 'per kg',
        quantity: '300 kg available',
        image: 'carrots.jpg',
        description: 'Organic, pesticide-free carrots',
        contact: '9823456789'
    },
    {
        id: 'prod_003',
        name: 'Fresh Onions',
        farmer: 'Hari Prasad',
        farmerId: 'farmer_003',
        price: 45,
        unit: 'per kg',
        quantity: '800 kg available',
        image: 'onions.jpg',
        description: 'High-quality red onions',
        contact: '9834567890'
    },
    {
        id: 'prod_004',
        name: 'Green Chilli',
        farmer: 'Ram Bahadur',
        farmerId: 'farmer_001',
        price: 120,
        unit: 'per kg',
        quantity: '200 kg available',
        image: 'chilli.jpg',
        description: 'Spicy green chillies',
        contact: '9812345678'
    },
    {
        id: 'prod_005',
        name: 'Fresh Potatoes',
        farmer: 'Sita Devi',
        farmerId: 'farmer_002',
        price: 35,
        unit: 'per kg',
        quantity: '1000 kg available',
        image: 'potato.jpg',
        description: 'Quality potatoes for cooking',
        contact: '9823456789'
    },
    {
        id: 'prod_006',
        name: 'Eggplant',
        farmer: 'Hari Prasad',
        farmerId: 'farmer_003',
        price: 70,
        unit: 'per kg',
        quantity: '400 kg available',
        image: 'eggplant.jpg',
        description: 'Fresh purple eggplants',
        contact: '9834567890'
    },
    {
        id: 'prod_007',
        name: 'Fresh Spinach',
        farmer: 'Ram Bahadur',
        farmerId: 'farmer_001',
        price: 40,
        unit: 'per kg',
        quantity: '150 kg available',
        image: 'spinich.jpg',
        description: 'Leafy green spinach',
        contact: '9812345678'
    },
    {
        id: 'prod_008',
        name: 'Pumpkin',
        farmer: 'Sita Devi',
        farmerId: 'farmer_002',
        price: 25,
        unit: 'per kg',
        quantity: '600 kg available',
        image: 'pumpkin.jpg',
        description: 'Fresh orange pumpkins',
        contact: '9823456789'
    },
    {
        id: 'prod_009',
        name: 'Premium Rice',
        farmer: 'Hari Prasad',
        farmerId: 'farmer_003',
        price: 85,
        unit: 'per kg',
        quantity: '2000 kg available',
        image: 'rice.jpg',
        description: 'High-quality basmati rice',
        contact: '9834567890'
    },
    {
        id: 'prod_010',
        name: 'Tea Leaves',
        farmer: 'Ram Bahadur',
        farmerId: 'farmer_001',
        price: 450,
        unit: 'per kg',
        quantity: '100 kg available',
        image: 'tea.jpg',
        description: 'Premium mountain tea leaves',
        contact: '9812345678'
    },
    {
        id: 'prod_011',
        name: 'Mixed Potatoes',
        farmer: 'Sita Devi',
        farmerId: 'farmer_002',
        price: 40,
        unit: 'per kg',
        quantity: '750 kg available',
        image: 'potatoess.jpg',
        description: 'Mixed variety potatoes',
        contact: '9823456789'
    },
    {
        id: 'prod_012',
        name: 'Wheat Cereals',
        farmer: 'Hari Prasad',
        farmerId: 'farmer_003',
        price: 55,
        unit: 'per kg',
        quantity: '1500 kg available',
        image: 'cereals.jpg',
        description: 'Fresh wheat grains',
        contact: '9834567890'
    }
];

const dummyMarketPrices = [
    { product: 'Tomatoes', unit: 'kg', min: 70, max: 90, avg: 80, trend: 'up' },
    { product: 'Onions', unit: 'kg', min: 40, max: 50, avg: 45, trend: 'stable' },
    { product: 'Potatoes', unit: 'kg', min: 30, max: 40, avg: 35, trend: 'down' },
    { product: 'Carrots', unit: 'kg', min: 55, max: 65, avg: 60, trend: 'up' },
    { product: 'Chilli', unit: 'kg', min: 110, max: 130, avg: 120, trend: 'up' },
    { product: 'Eggplant', unit: 'kg', min: 65, max: 75, avg: 70, trend: 'stable' },
    { product: 'Rice', unit: 'kg', min: 80, max: 90, avg: 85, trend: 'stable' },
    { product: 'Tea', unit: 'kg', min: 400, max: 500, avg: 450, trend: 'up' }
];

// =============== GLOBAL VARIABLES ===============
let currentUser = null;
let currentUserType = null;
let currentSlide = 0;
const totalSlides = 5;

// =============== DOM ELEMENTS ===============
const authModal = document.getElementById('auth-modal');
const loginBtn = document.getElementById('login-btn');
const modalClose = document.getElementById('modal-close');

// Auth form containers
const loginContainer = document.getElementById('login-form-container');
const roleContainer = document.getElementById('role-selection-container');
const farmerRegContainer = document.getElementById('farmer-register-container');
const wholesalerRegContainer = document.getElementById('wholesaler-register-container');

// Navigation
const navLinks = document.querySelectorAll('.nav__link');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');

// =============== INITIALIZATION ===============
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadProducts();
    loadMarketPrices();
    startSlideshow();
});

function initializeApp() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('krishiConnectUser');
    const savedUserType = localStorage.getItem('krishiConnectUserType');
    
    if (savedUser && savedUserType) {
        currentUser = JSON.parse(savedUser);
        currentUserType = savedUserType;
        updateUIForLoggedInUser();
    }
}

function setupEventListeners() {
    // Modal controls
    loginBtn?.addEventListener('click', openAuthModal);
    modalClose?.addEventListener('click', closeAuthModal);
    authModal?.addEventListener('click', (e) => {
        if (e.target === authModal) closeAuthModal();
    });

    // Navigation
    navToggle?.addEventListener('click', () => navMenu?.classList.add('show-menu'));
    navClose?.addEventListener('click', () => navMenu?.classList.remove('show-menu'));
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('show-menu');
            setActiveNavLink(link);
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Auth form navigation
    setupAuthFormNavigation();
    
    // Slideshow controls
    setupSlideshowControls();
    
    // Home page buttons
    document.getElementById('farmer-join-btn')?.addEventListener('click', () => {
        openAuthModal();
        showAuthForm('role-selection');
    });
    
    document.getElementById('wholesaler-join-btn')?.addEventListener('click', () => {
        openAuthModal();
        showAuthForm('role-selection');
    });

    // Contact form
    document.getElementById('contact-form')?.addEventListener('submit', handleContactForm);
}

function setupAuthFormNavigation() {
    // Show register from login
    document.getElementById('show-register')?.addEventListener('click', () => {
        showAuthForm('role-selection');
    });

    // Show login from register
    document.getElementById('show-login')?.addEventListener('click', () => {
        showAuthForm('login');
    });

    // Role selection
    document.getElementById('select-farmer')?.addEventListener('click', () => {
        showAuthForm('farmer-register');
    });

    document.getElementById('select-wholesaler')?.addEventListener('click', () => {
        showAuthForm('wholesaler-register');
    });

    // Back to role selection
    document.getElementById('back-to-roles-from-farmer')?.addEventListener('click', () => {
        showAuthForm('role-selection');
    });

    document.getElementById('back-to-roles-from-wholesaler')?.addEventListener('click', () => {
        showAuthForm('role-selection');
    });

    // PIN toggle functionality
    setupPinToggles();

    // Form submissions
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
    document.getElementById('farmer-register-form')?.addEventListener('submit', handleFarmerRegister);
    document.getElementById('wholesaler-register-form')?.addEventListener('submit', handleWholesalerRegister);
}

function setupPinToggles() {
    const pinToggles = document.querySelectorAll('.pin-toggle');
    pinToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const pinInput = toggle.parentElement.querySelector('input[type="password"], input[type="text"]');
            const icon = toggle.querySelector('i');
            
            if (pinInput.type === 'password') {
                pinInput.type = 'text';
                icon.className = 'ri-eye-off-line';
            } else {
                pinInput.type = 'password';
                icon.className = 'ri-eye-line';
            }
        });
    });
}

function setupSlideshowControls() {
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const indicators = document.querySelectorAll('.indicator');

    prevBtn?.addEventListener('click', () => changeSlide(-1));
    nextBtn?.addEventListener('click', () => changeSlide(1));

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
}

// =============== MODAL FUNCTIONS ===============
function openAuthModal() {
    authModal?.classList.add('active');
    showAuthForm('login');
}

function closeAuthModal() {
    authModal?.classList.remove('active');
}

function showAuthForm(formType) {
    // Hide all forms
    const forms = [loginContainer, roleContainer, farmerRegContainer, wholesalerRegContainer];
    forms.forEach(form => {
        if (form) form.style.display = 'none';
    });

    // Show selected form
    const modalTitle = document.getElementById('modal-title');
    switch (formType) {
        case 'login':
            if (loginContainer) loginContainer.style.display = 'block';
            if (modalTitle) modalTitle.textContent = 'Welcome Back!';
            break;
        case 'role-selection':
            if (roleContainer) roleContainer.style.display = 'block';
            if (modalTitle) modalTitle.textContent = 'Join Krishi Connect';
            break;
        case 'farmer-register':
            if (farmerRegContainer) farmerRegContainer.style.display = 'block';
            if (modalTitle) modalTitle.textContent = 'Farmer Registration';
            break;
        case 'wholesaler-register':
            if (wholesalerRegContainer) wholesalerRegContainer.style.display = 'block';
            if (modalTitle) modalTitle.textContent = 'Wholesaler Registration';
            break;
    }
}

// =============== AUTHENTICATION FUNCTIONS ===============
function handleLogin(e) {
    e.preventDefault();
    const phone = document.getElementById('login-phone').value;
    const pin = document.getElementById('login-pin').value;

    if (!phone || !pin) {
        alert('Please fill in all fields');
        return;
    }

    // Check farmers
    const farmer = dummyUsers.farmers.find(f => f.phone === phone && f.pin === pin);
    if (farmer) {
        loginUser(farmer, 'farmer');
        return;
    }

    // Check wholesalers
    const wholesaler = dummyUsers.wholesalers.find(w => w.phone === phone && w.pin === pin);
    if (wholesaler) {
        loginUser(wholesaler, 'wholesaler');
        return;
    }

    alert('Invalid phone number or PIN');
}

function handleFarmerRegister(e) {
    e.preventDefault();
    const name = document.getElementById('farmer-name').value;
    const phone = document.getElementById('farmer-phone').value;
    const pin = document.getElementById('farmer-pin').value;

    if (!name || !phone || !pin) {
        alert('Please fill in all fields');
        return;
    }

    if (pin.length !== 4) {
        alert('PIN must be 4 digits');
        return;
    }

    // Check if phone already exists
    const existingUser = [...dummyUsers.farmers, ...dummyUsers.wholesalers]
        .find(u => u.phone === phone);
    
    if (existingUser) {
        alert('Phone number already registered');
        return;
    }

    const newFarmer = {
        phone,
        pin,
        name,
        id: `farmer_${Date.now()}`
    };

    dummyUsers.farmers.push(newFarmer);
    loginUser(newFarmer, 'farmer');
}

function handleWholesalerRegister(e) {
    e.preventDefault();
    const name = document.getElementById('wholesaler-name').value;
    const business = document.getElementById('wholesaler-business').value;
    const phone = document.getElementById('wholesaler-phone').value;
    const pin = document.getElementById('wholesaler-pin').value;

    if (!name || !business || !phone || !pin) {
        alert('Please fill in all fields');
        return;
    }

    if (pin.length !== 4) {
        alert('PIN must be 4 digits');
        return;
    }

    // Check if phone already exists
    const existingUser = [...dummyUsers.farmers, ...dummyUsers.wholesalers]
        .find(u => u.phone === phone);
    
    if (existingUser) {
        alert('Phone number already registered');
        return;
    }

    const newWholesaler = {
        phone,
        pin,
        name,
        business,
        id: `wholesaler_${Date.now()}`
    };

    dummyUsers.wholesalers.push(newWholesaler);
    loginUser(newWholesaler, 'wholesaler');
}

function loginUser(user, userType) {
    currentUser = user;
    currentUserType = userType;
    
    // Save to localStorage
    localStorage.setItem('krishiConnectUser', JSON.stringify(user));
    localStorage.setItem('krishiConnectUserType', userType);
    
    updateUIForLoggedInUser();
    closeAuthModal();
    
    // Redirect to appropriate dashboard
    if (userType === 'farmer') {
        window.location.href = 'farmer-dashboard.html';
    } else if (userType === 'wholesaler') {
        window.location.href = 'wholesaler-dashboard.html';
    }
}

function updateUIForLoggedInUser() {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn && currentUser) {
        loginBtn.innerHTML = `
            <i class="ri-user-line"></i>
            ${currentUser.name}
        `;
        loginBtn.onclick = logout;
    }
}

function logout() {
    currentUser = null;
    currentUserType = null;
    localStorage.removeItem('krishiConnectUser');
    localStorage.removeItem('krishiConnectUserType');
    
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.innerHTML = `
            <i class="ri-user-line"></i>
            Login
        `;
        loginBtn.onclick = openAuthModal;
    }
    
    // Redirect to home if on dashboard
    if (window.location.pathname.includes('dashboard')) {
        window.location.href = 'index.html';
    }
}

// =============== SLIDESHOW FUNCTIONS ===============
function startSlideshow() {
    setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!slides.length) return;

    // Remove active class from current slide and indicator
    slides[currentSlide]?.classList.remove('active');
    indicators[currentSlide]?.classList.remove('active');

    // Calculate next slide
    currentSlide += direction;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;

    // Add active class to new slide and indicator
    slides[currentSlide]?.classList.add('active');
    indicators[currentSlide]?.classList.add('active');
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!slides.length) return;

    // Remove active class from current slide and indicator
    slides[currentSlide]?.classList.remove('active');
    indicators[currentSlide]?.classList.remove('active');

    // Set new slide
    currentSlide = slideIndex;

    // Add active class to new slide and indicator
    slides[currentSlide]?.classList.add('active');
    indicators[currentSlide]?.classList.add('active');
}

// =============== PRODUCTS FUNCTIONS ===============
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    // Show first 8 products on home page
    const productsToShow = dummyProducts.slice(0, 8);
    
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" onclick="viewProduct('${product.id}')">
            <img src="${product.image}" alt="${product.name}" class="product-card__image">
            <div class="product-card__content">
                <h3 class="product-card__title">${product.name}</h3>
                <p class="product-card__farmer">By ${product.farmer}</p>
                <p class="product-card__price">Rs. ${product.price} ${product.unit}</p>
                <p class="product-card__quantity">${product.quantity}</p>
                <div class="product-card__actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); contactFarmer('${product.contact}')">
                        <i class="ri-phone-line"></i>
                        Contact
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function viewProduct(productId) {
    const product = dummyProducts.find(p => p.id === productId);
    if (product) {
        alert(`Product: ${product.name}\nFarmer: ${product.farmer}\nPrice: Rs. ${product.price} ${product.unit}\nDescription: ${product.description}\nContact: ${product.contact}`);
    }
}

function contactFarmer(phone) {
    alert(`Contact farmer at: ${phone}`);
}

// =============== MARKET PRICES FUNCTIONS ===============
function loadMarketPrices() {
    const tableBody = document.querySelector('#market-prices-table tbody');
    if (!tableBody) return;

    tableBody.innerHTML = dummyMarketPrices.map(price => `
        <tr>
            <td>${price.product}</td>
            <td>${price.unit}</td>
            <td>Rs. ${price.min}</td>
            <td>Rs. ${price.max}</td>
            <td>Rs. ${price.avg}</td>
            <td>
                <span class="price-trend ${price.trend}">
                    <i class="ri-arrow-${price.trend === 'up' ? 'up' : price.trend === 'down' ? 'down' : 'right'}-line"></i>
                    ${price.trend}
                </span>
            </td>
        </tr>
    `).join('');
}

// =============== NAVIGATION FUNCTIONS ===============
function setActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active-link'));
    activeLink.classList.add('active-link');
}

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            if (correspondingLink) {
                setActiveNavLink(correspondingLink);
            }
        }
    });
});

// =============== CONTACT FORM ===============
function handleContactForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || e.target.querySelector('textarea').value;
    
    if (name && email && message) {
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    } else {
        alert('Please fill in all fields.');
    }
}

// =============== UTILITY FUNCTIONS ===============
function formatPrice(price) {
    return `Rs. ${price.toLocaleString()}`;
}

function formatPhone(phone) {
    return `+977-${phone}`;
}

// =============== EXPORT FOR OTHER PAGES ===============
window.KrishiConnect = {
    currentUser,
    currentUserType,
    dummyUsers,
    dummyProducts,
    dummyMarketPrices,
    loginUser,
    logout,
    updateUIForLoggedInUser
};

