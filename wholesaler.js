// =============== WHOLESALER DASHBOARD FUNCTIONALITY ===============

// Global variables
let currentWholesaler = null;
let allCrops = [];
let filteredCrops = [];
let wholesalerOrders = [];
let farmerContacts = [];
let currentContactFarmer = null;
let currentContactCrop = null;

// =============== INITIALIZATION ===============
document.addEventListener('DOMContentLoaded', function() {
    initializeWholesalerDashboard();
    setupWholesalerEventListeners();
    loadWholesalerData();
    loadAllCrops();
    loadWholesalerMarketPrices();
    updateDashboardStats();
    loadOrders();
    loadFarmerContacts();
});

function initializeWholesalerDashboard() {
    // Check if user is logged in and is a wholesaler
    const savedUser = localStorage.getItem('krishiConnectUser');
    const savedUserType = localStorage.getItem('krishiConnectUserType');
    
    if (!savedUser || savedUserType !== 'wholesaler') {
        window.location.href = 'index.html';
        return;
    }
    
    currentWholesaler = JSON.parse(savedUser);
    
    // Update UI with wholesaler info
    document.getElementById('wholesaler-name').textContent = currentWholesaler.name;
    
    // Load saved data from localStorage
    const savedOrders = localStorage.getItem(`wholesalerOrders_${currentWholesaler.id}`);
    if (savedOrders) {
        wholesalerOrders = JSON.parse(savedOrders);
    }
    
    const savedContacts = localStorage.getItem(`farmerContacts_${currentWholesaler.id}`);
    if (savedContacts) {
        farmerContacts = JSON.parse(savedContacts);
    }
}

function setupWholesalerEventListeners() {
    // Navigation
    setupNavigation();
    
    // Logout functionality
    document.getElementById('logout-btn')?.addEventListener('click', logout);
    
    // Profile picture upload
    document.getElementById('profile-picture-input')?.addEventListener('change', handleProfilePictureUpload);
    document.getElementById('profile-avatar')?.addEventListener('click', () => {
        document.getElementById('profile-picture-input').click();
    });
    
    // Profile form
    document.getElementById('profile-form')?.addEventListener('submit', handleProfileUpdate);
    
    // Contact farmer modal
    document.getElementById('contact-modal-close')?.addEventListener('click', closeContactModal);
    document.getElementById('contact-farmer-form')?.addEventListener('submit', handleContactFarmer);
    
    // Filter functionality
    document.getElementById('crop-filter')?.addEventListener('change', applyFilters);
    document.getElementById('price-filter')?.addEventListener('change', applyFilters);
    document.getElementById('location-filter')?.addEventListener('input', debounce(applyFilters, 500));
    
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
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Update active link
                navLinks.forEach(l => l.classList.remove('active-link'));
                link.classList.add('active-link');
                
                // Smooth scroll to section
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// =============== DATA LOADING FUNCTIONS ===============
function loadWholesalerData() {
    // Load profile data
    const profileData = JSON.parse(localStorage.getItem(`wholesalerProfile_${currentWholesaler.id}`)) || {};
    
    document.getElementById('profile-name').value = currentWholesaler.name;
    document.getElementById('profile-business').value = currentWholesaler.business || '';
    document.getElementById('profile-phone').value = currentWholesaler.phone;
    document.getElementById('profile-location').value = profileData.location || '';
    document.getElementById('profile-experience').value = profileData.experience || '';
    document.getElementById('profile-capacity').value = profileData.capacity || '';
    document.getElementById('profile-bio').value = profileData.bio || '';
    
    // Load profile picture
    const savedProfilePicture = localStorage.getItem(`wholesalerProfilePicture_${currentWholesaler.id}`);
    if (savedProfilePicture) {
        document.getElementById('profile-image').src = savedProfilePicture;
    }
}

function loadAllCrops() {
    // Get crops from global data and farmer listings
    allCrops = [];
    
    // Add dummy products
    if (window.KrishiConnect && window.KrishiConnect.dummyProducts) {
        allCrops = [...window.KrishiConnect.dummyProducts];
    }
    
    // Add farmer crops from all farmers
    const farmers = window.KrishiConnect?.dummyUsers?.farmers || [];
    farmers.forEach(farmer => {
        const farmerCrops = JSON.parse(localStorage.getItem(`farmerCrops_${farmer.id}`)) || [];
        farmerCrops.forEach(crop => {
            allCrops.push({
                id: crop.id,
                name: crop.name,
                farmer: crop.farmerName || farmer.name,
                farmerId: crop.farmerId || farmer.id,
                price: crop.price,
                unit: 'per kg',
                quantity: `${crop.quantity} kg available`,
                image: crop.image,
                description: crop.description,
                contact: crop.farmerPhone || farmer.phone,
                location: crop.location || 'Nepal'
            });
        });
    });
    
    filteredCrops = [...allCrops];
    displayCrops();
    displayFeaturedCrops();
}

function displayCrops() {
    const cropsGrid = document.getElementById('all-crops-grid');
    if (!cropsGrid) return;
    
    if (filteredCrops.length === 0) {
        cropsGrid.innerHTML = `
            <div class="empty-state">
                <i class="ri-search-line"></i>
                <h3>No crops found</h3>
                <p>Try adjusting your filters to find more crops</p>
                <button class="btn btn-outline" onclick="clearFilters()">
                    <i class="ri-refresh-line"></i>
                    Clear Filters
                </button>
            </div>
        `;
        return;
    }
    
    cropsGrid.innerHTML = filteredCrops.map(crop => `
        <div class="crop-card" onclick="viewCropDetails('${crop.id}')">
            <img src="${crop.image}" alt="${crop.name}" class="crop-card__image">
            <div class="crop-card__content">
                <div class="crop-card__header">
                    <h3 class="crop-card__title">${crop.name}</h3>
                </div>
                <p class="crop-card__farmer">
                    <i class="ri-user-line"></i>
                    By ${crop.farmer}
                </p>
                <div class="crop-card__details">
                    <div class="crop-card__detail">
                        <span>Quantity:</span>
                        <span>${crop.quantity}</span>
                    </div>
                    <div class="crop-card__detail">
                        <span>Location:</span>
                        <span>${crop.location || 'Nepal'}</span>
                    </div>
                    <div class="crop-card__detail">
                        <span>Contact:</span>
                        <span>${crop.contact}</span>
                    </div>
                </div>
                <div class="crop-card__price">Rs. ${crop.price} ${crop.unit}</div>
                <div class="crop-card__actions">
                    <button class="btn btn-outline" onclick="event.stopPropagation(); viewFarmerProfile('${crop.farmerId}')">
                        <i class="ri-user-line"></i>
                        View Farmer
                    </button>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); openContactModal('${crop.farmerId}', '${crop.id}')">
                        <i class="ri-message-line"></i>
                        Contact
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function displayFeaturedCrops() {
    const featuredGrid = document.getElementById('featured-crops');
    if (!featuredGrid) return;
    
    // Show first 4 crops as featured
    const featuredCrops = allCrops.slice(0, 4);
    
    featuredGrid.innerHTML = featuredCrops.map(crop => `
        <div class="crop-card" onclick="viewCropDetails('${crop.id}')">
            <img src="${crop.image}" alt="${crop.name}" class="crop-card__image">
            <div class="crop-card__content">
                <h3 class="crop-card__title">${crop.name}</h3>
                <p class="crop-card__farmer">
                    <i class="ri-user-line"></i>
                    By ${crop.farmer}
                </p>
                <div class="crop-card__price">Rs. ${crop.price} ${crop.unit}</div>
                <button class="btn btn-primary btn-full" onclick="event.stopPropagation(); openContactModal('${crop.farmerId}', '${crop.id}')">
                    <i class="ri-message-line"></i>
                    Contact Farmer
                </button>
            </div>
        </div>
    `).join('');
}

function loadWholesalerMarketPrices() {
    const tableBody = document.querySelector('#wholesaler-market-prices-table tbody');
    if (!tableBody) return;
    
    // Get market prices from main script
    const marketPrices = window.KrishiConnect?.dummyMarketPrices || [];
    
    tableBody.innerHTML = marketPrices.map(price => {
        // Count available farmers for this product
        const availableFarmers = allCrops.filter(crop => 
            crop.name.toLowerCase().includes(price.product.toLowerCase()) ||
            price.product.toLowerCase().includes(crop.name.toLowerCase())
        ).length;
        
        return `
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
                <td>
                    <span class="available-farmers">
                        ${availableFarmers} farmer${availableFarmers !== 1 ? 's' : ''}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

function updateDashboardStats() {
    const totalOrders = wholesalerOrders.length;
    const contactedFarmers = farmerContacts.length;
    const totalSpent = wholesalerOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    
    document.getElementById('total-orders').textContent = totalOrders;
    document.getElementById('contacted-farmers').textContent = contactedFarmers;
    document.getElementById('total-spent').textContent = `Rs. ${totalSpent.toLocaleString()}`;
}

// =============== FILTERING FUNCTIONS ===============
function applyFilters() {
    const cropFilter = document.getElementById('crop-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const locationFilter = document.getElementById('location-filter').value.toLowerCase();
    
    filteredCrops = allCrops.filter(crop => {
        // Crop type filter
        if (cropFilter && !crop.name.toLowerCase().includes(cropFilter.toLowerCase())) {
            return false;
        }
        
        // Price filter
        if (priceFilter) {
            const price = crop.price;
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
        if (locationFilter && !crop.location?.toLowerCase().includes(locationFilter)) {
            return false;
        }
        
        return true;
    });
    
    displayCrops();
}

function clearFilters() {
    document.getElementById('crop-filter').value = '';
    document.getElementById('price-filter').value = '';
    document.getElementById('location-filter').value = '';
    
    filteredCrops = [...allCrops];
    displayCrops();
}

// =============== CROP AND FARMER INTERACTION ===============
function viewCropDetails(cropId) {
    const crop = allCrops.find(c => c.id === cropId);
    if (crop) {
        alert(`Crop Details:\n\nName: ${crop.name}\nFarmer: ${crop.farmer}\nPrice: Rs. ${crop.price} ${crop.unit}\nQuantity: ${crop.quantity}\nDescription: ${crop.description}\nContact: ${crop.contact}`);
    }
}

function viewFarmerProfile(farmerId) {
    const farmers = window.KrishiConnect?.dummyUsers?.farmers || [];
    const farmer = farmers.find(f => f.id === farmerId);
    
    if (farmer) {
        const farmerCrops = allCrops.filter(c => c.farmerId === farmerId);
        const cropsList = farmerCrops.map(c => `• ${c.name} - Rs. ${c.price}/kg`).join('\n');
        
        alert(`Farmer Profile:\n\nName: ${farmer.name}\nPhone: ${farmer.phone}\nTotal Crops: ${farmerCrops.length}\n\nAvailable Crops:\n${cropsList}`);
    }
}

function openContactModal(farmerId, cropId) {
    const farmers = window.KrishiConnect?.dummyUsers?.farmers || [];
    const farmer = farmers.find(f => f.id === farmerId);
    const crop = allCrops.find(c => c.id === cropId);
    
    if (!farmer || !crop) return;
    
    currentContactFarmer = farmer;
    currentContactCrop = crop;
    
    // Populate farmer info
    const farmerInfo = document.getElementById('farmer-info');
    farmerInfo.innerHTML = `
        <div class="farmer-info__header">
            <div class="farmer-info__avatar">
                <i class="ri-user-line"></i>
            </div>
            <div class="farmer-info__details">
                <h3>${farmer.name}</h3>
                <p><i class="ri-phone-line"></i> ${farmer.phone}</p>
            </div>
        </div>
        <div class="farmer-info__crop">
            <img src="${crop.image}" alt="${crop.name}" class="farmer-info__crop-image">
            <div class="farmer-info__crop-details">
                <h4>${crop.name}</h4>
                <p class="farmer-info__crop-price">Rs. ${crop.price} per kg</p>
                <p>${crop.quantity}</p>
            </div>
        </div>
    `;
    
    // Set form values
    document.getElementById('contact-farmer-id').value = farmerId;
    document.getElementById('contact-crop-id').value = cropId;
    document.getElementById('contact-delivery').value = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 7 days from now
    
    // Show modal
    document.getElementById('contact-farmer-modal').classList.add('active');
}

function closeContactModal() {
    document.getElementById('contact-farmer-modal').classList.remove('active');
    currentContactFarmer = null;
    currentContactCrop = null;
    document.getElementById('contact-farmer-form').reset();
}

function handleContactFarmer(e) {
    e.preventDefault();
    
    const message = document.getElementById('contact-message').value;
    const quantity = parseInt(document.getElementById('contact-quantity').value);
    const deliveryDate = document.getElementById('contact-delivery').value;
    
    if (!message || !quantity || !deliveryDate) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Create new order
    const newOrder = {
        id: `order_${Date.now()}`,
        cropId: currentContactCrop.id,
        cropName: currentContactCrop.name,
        farmerId: currentContactFarmer.id,
        farmerName: currentContactFarmer.name,
        farmerPhone: currentContactFarmer.phone,
        quantity: quantity,
        pricePerKg: currentContactCrop.price,
        totalAmount: quantity * currentContactCrop.price,
        message: message,
        deliveryDate: deliveryDate,
        status: 'pending',
        dateCreated: new Date().toLocaleDateString(),
        wholesalerId: currentWholesaler.id
    };
    
    wholesalerOrders.push(newOrder);
    saveWholesalerOrders();
    
    // Add to farmer contacts if not already there
    if (!farmerContacts.find(c => c.farmerId === currentContactFarmer.id)) {
        farmerContacts.push({
            farmerId: currentContactFarmer.id,
            farmerName: currentContactFarmer.name,
            farmerPhone: currentContactFarmer.phone,
            totalOrders: 1,
            totalSpent: newOrder.totalAmount,
            lastContact: new Date().toLocaleDateString()
        });
    } else {
        const contact = farmerContacts.find(c => c.farmerId === currentContactFarmer.id);
        contact.totalOrders += 1;
        contact.totalSpent += newOrder.totalAmount;
        contact.lastContact = new Date().toLocaleDateString();
    }
    
    saveFarmerContacts();
    updateDashboardStats();
    loadOrders();
    loadFarmerContacts();
    closeContactModal();
    
    showMessage('Inquiry sent successfully! The farmer will contact you soon.', 'success');
}

function callFarmer() {
    if (currentContactFarmer) {
        alert(`Calling ${currentContactFarmer.name} at ${currentContactFarmer.phone}`);
    }
}

function sendSMS() {
    if (currentContactFarmer) {
        const message = document.getElementById('contact-message').value || 'Hi, I am interested in your crops. Please contact me.';
        alert(`SMS sent to ${currentContactFarmer.name} (${currentContactFarmer.phone}):\n\n${message}`);
    }
}

// =============== ORDERS MANAGEMENT ===============
function loadOrders() {
    loadPendingOrders();
    loadCompletedOrders();
}

function loadPendingOrders() {
    const pendingOrdersList = document.getElementById('pending-orders-list');
    if (!pendingOrdersList) return;
    
    const pendingOrders = wholesalerOrders.filter(order => order.status === 'pending');
    
    if (pendingOrders.length === 0) {
        pendingOrdersList.innerHTML = `
            <div class="empty-state">
                <i class="ri-file-list-line"></i>
                <h3>No pending orders</h3>
                <p>Your pending orders will appear here</p>
            </div>
        `;
        return;
    }
    
    pendingOrdersList.innerHTML = pendingOrders.map(order => `
        <div class="order-item">
            <div class="order-item__header">
                <div>
                    <h3 class="order-item__title">${order.cropName}</h3>
                    <p class="order-item__farmer">From ${order.farmerName}</p>
                </div>
                <span class="order-item__status ${order.status}">${order.status}</span>
            </div>
            <div class="order-item__details">
                <div class="order-item__detail">
                    <span>Quantity:</span>
                    <span>${order.quantity} kg</span>
                </div>
                <div class="order-item__detail">
                    <span>Price:</span>
                    <span>Rs. ${order.pricePerKg}/kg</span>
                </div>
                <div class="order-item__detail">
                    <span>Total:</span>
                    <span>Rs. ${order.totalAmount.toLocaleString()}</span>
                </div>
                <div class="order-item__detail">
                    <span>Delivery:</span>
                    <span>${order.deliveryDate}</span>
                </div>
            </div>
            <div class="order-item__actions">
                <button class="btn btn-outline" onclick="callFarmerFromOrder('${order.farmerPhone}')">
                    <i class="ri-phone-line"></i>
                    Call Farmer
                </button>
                <button class="btn btn-primary" onclick="markOrderCompleted('${order.id}')">
                    <i class="ri-check-line"></i>
                    Mark Completed
                </button>
                <button class="btn btn-outline" onclick="cancelOrder('${order.id}')" style="color: var(--error-color); border-color: var(--error-color);">
                    <i class="ri-close-line"></i>
                    Cancel
                </button>
            </div>
        </div>
    `).join('');
}

function loadCompletedOrders() {
    const completedOrdersList = document.getElementById('completed-orders-list');
    if (!completedOrdersList) return;
    
    const completedOrders = wholesalerOrders.filter(order => order.status === 'completed');
    
    if (completedOrders.length === 0) {
        completedOrdersList.innerHTML = `
            <div class="empty-state">
                <i class="ri-check-double-line"></i>
                <h3>No completed orders</h3>
                <p>Your completed orders will appear here</p>
            </div>
        `;
        return;
    }
    
    completedOrdersList.innerHTML = completedOrders.map(order => `
        <div class="order-item">
            <div class="order-item__header">
                <div>
                    <h3 class="order-item__title">${order.cropName}</h3>
                    <p class="order-item__farmer">From ${order.farmerName}</p>
                </div>
                <span class="order-item__status ${order.status}">${order.status}</span>
            </div>
            <div class="order-item__details">
                <div class="order-item__detail">
                    <span>Quantity:</span>
                    <span>${order.quantity} kg</span>
                </div>
                <div class="order-item__detail">
                    <span>Total Paid:</span>
                    <span>Rs. ${order.totalAmount.toLocaleString()}</span>
                </div>
                <div class="order-item__detail">
                    <span>Completed:</span>
                    <span>${order.completedDate || order.dateCreated}</span>
                </div>
            </div>
            <div class="order-item__actions">
                <button class="btn btn-outline" onclick="reorderCrop('${order.cropId}')">
                    <i class="ri-refresh-line"></i>
                    Reorder
                </button>
                <button class="btn btn-outline" onclick="rateFarmer('${order.farmerId}')">
                    <i class="ri-star-line"></i>
                    Rate Farmer
                </button>
            </div>
        </div>
    `).join('');
}

function loadFarmerContacts() {
    const contactsList = document.getElementById('farmer-contacts-list');
    if (!contactsList) return;
    
    if (farmerContacts.length === 0) {
        contactsList.innerHTML = `
            <div class="empty-state">
                <i class="ri-contacts-line"></i>
                <h3>No farmer contacts</h3>
                <p>Farmers you contact will appear here</p>
            </div>
        `;
        return;
    }
    
    contactsList.innerHTML = farmerContacts.map(contact => `
        <div class="contact-card">
            <div class="contact-card__avatar">
                <i class="ri-user-line"></i>
            </div>
            <h3 class="contact-card__name">${contact.farmerName}</h3>
            <p class="contact-card__phone">${contact.farmerPhone}</p>
            <div class="contact-card__stats">
                <div class="contact-card__stat">
                    <div class="contact-card__stat-number">${contact.totalOrders}</div>
                    <div class="contact-card__stat-label">Orders</div>
                </div>
                <div class="contact-card__stat">
                    <div class="contact-card__stat-number">Rs. ${contact.totalSpent.toLocaleString()}</div>
                    <div class="contact-card__stat-label">Spent</div>
                </div>
            </div>
            <div class="contact-card__actions">
                <button class="btn btn-outline" onclick="callFarmerFromOrder('${contact.farmerPhone}')">
                    <i class="ri-phone-line"></i>
                    Call
                </button>
                <button class="btn btn-primary" onclick="viewFarmerProfile('${contact.farmerId}')">
                    <i class="ri-eye-line"></i>
                    View
                </button>
            </div>
        </div>
    `).join('');
}

// =============== ORDER ACTIONS ===============
function markOrderCompleted(orderId) {
    const order = wholesalerOrders.find(o => o.id === orderId);
    if (order) {
        order.status = 'completed';
        order.completedDate = new Date().toLocaleDateString();
        saveWholesalerOrders();
        loadOrders();
        updateDashboardStats();
        showMessage('Order marked as completed!', 'success');
    }
}

function cancelOrder(orderId) {
    if (confirm('Are you sure you want to cancel this order?')) {
        wholesalerOrders = wholesalerOrders.filter(o => o.id !== orderId);
        saveWholesalerOrders();
        loadOrders();
        updateDashboardStats();
        showMessage('Order cancelled successfully', 'success');
    }
}

function callFarmerFromOrder(phone) {
    alert(`Calling farmer at ${phone}`);
}

function reorderCrop(cropId) {
    const crop = allCrops.find(c => c.id === cropId);
    if (crop) {
        openContactModal(crop.farmerId, crop.id);
    }
}

function rateFarmer(farmerId) {
    alert('Rating feature will be implemented in the full version.');
}

// =============== TABS FUNCTIONALITY ===============
function showOrderTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName === 'pending' ? 'pending-orders' : 
                           tabName === 'completed' ? 'completed-orders' : 'contacts').classList.add('active');
}

// =============== PROFILE MANAGEMENT ===============
function handleProfilePictureUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const profileImage = document.getElementById('profile-image');
        profileImage.src = e.target.result;
        
        // Save to localStorage
        localStorage.setItem(`wholesalerProfilePicture_${currentWholesaler.id}`, e.target.result);
        
        showMessage('Profile picture updated successfully!', 'success');
    };
    reader.readAsDataURL(file);
}

function handleProfileUpdate(e) {
    e.preventDefault();
    
    const profileData = {
        name: document.getElementById('profile-name').value,
        business: document.getElementById('profile-business').value,
        location: document.getElementById('profile-location').value,
        experience: document.getElementById('profile-experience').value,
        capacity: document.getElementById('profile-capacity').value,
        bio: document.getElementById('profile-bio').value
    };
    
    // Update current wholesaler name if changed
    if (profileData.name !== currentWholesaler.name) {
        currentWholesaler.name = profileData.name;
        localStorage.setItem('krishiConnectUser', JSON.stringify(currentWholesaler));
        document.getElementById('wholesaler-name').textContent = profileData.name;
    }
    
    // Update business name if changed
    if (profileData.business !== currentWholesaler.business) {
        currentWholesaler.business = profileData.business;
        localStorage.setItem('krishiConnectUser', JSON.stringify(currentWholesaler));
    }
    
    // Save profile data
    localStorage.setItem(`wholesalerProfile_${currentWholesaler.id}`, JSON.stringify(profileData));
    
    showMessage('Profile updated successfully!', 'success');
}

function resetProfileForm() {
    loadWholesalerData();
    showMessage('Profile form reset', 'success');
}

// =============== UTILITY FUNCTIONS ===============
function saveWholesalerOrders() {
    localStorage.setItem(`wholesalerOrders_${currentWholesaler.id}`, JSON.stringify(wholesalerOrders));
}

function saveFarmerContacts() {
    localStorage.setItem(`farmerContacts_${currentWholesaler.id}`, JSON.stringify(farmerContacts));
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        
        // Update active nav link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active-link');
            }
        });
    }
}

function showMessage(text, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.innerHTML = `
        <i class="ri-${type === 'success' ? 'check' : 'error-warning'}-line"></i>
        <span>${text}</span>
    `;
    
    // Insert at top of main content
    const main = document.querySelector('.main');
    if (main) {
        main.insertBefore(message, main.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('krishiConnectUser');
        localStorage.removeItem('krishiConnectUserType');
        window.location.href = 'index.html';
    }
}

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

// =============== SCROLL NAVIGATION ===============
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav__link');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active-link');
                }
            });
        }
    });
});

// =============== MODAL CLICK OUTSIDE TO CLOSE ===============
document.getElementById('contact-farmer-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'contact-farmer-modal') {
        closeContactModal();
    }
});

// =============== EXPORT FUNCTIONS FOR GLOBAL ACCESS ===============
window.wholesalerDashboard = {
    viewCropDetails,
    viewFarmerProfile,
    openContactModal,
    scrollToSection,
    showOrderTab,
    applyFilters,
    clearFilters
};

