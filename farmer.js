// =============== FARMER DASHBOARD FUNCTIONALITY ===============

// Global variables
let currentFarmer = null;
let farmerCrops = [];
let editingCropId = null;

// Crop image mapping
const cropImageMap = {
    'Tomatoes': 'tomato.jpg',
    'Onions': 'onions.jpg',
    'Potatoes': 'potato.jpg',
    'Carrots': 'carrots.jpg',
    'Chilli': 'chilli.jpg',
    'Eggplant': 'eggplant.jpg',
    'Spinach': 'spinich.jpg',
    'Pumpkin': 'pumpkin.jpg',
    'Rice': 'rice.jpg',
    'Tea': 'tea.jpg',
    'Cereals': 'cereals.jpg'
};

// =============== INITIALIZATION ===============
document.addEventListener('DOMContentLoaded', function() {
    initializeFarmerDashboard();
    setupFarmerEventListeners();
    loadFarmerData();
    loadFarmerCrops();
    loadFarmerMarketPrices();
    updateDashboardStats();
    loadRecentActivity();
});

function initializeFarmerDashboard() {
    // Check if user is logged in and is a farmer
    const savedUser = localStorage.getItem('krishiConnectUser');
    const savedUserType = localStorage.getItem('krishiConnectUserType');
    
    if (!savedUser || savedUserType !== 'farmer') {
        window.location.href = 'index.html';
        return;
    }
    
    currentFarmer = JSON.parse(savedUser);
    
    // Update UI with farmer info
    document.getElementById('farmer-name').textContent = currentFarmer.name;
    
    // Load saved farmer crops from localStorage
    const savedCrops = localStorage.getItem(`farmerCrops_${currentFarmer.id}`);
    if (savedCrops) {
        farmerCrops = JSON.parse(savedCrops);
    }
}

function setupFarmerEventListeners() {
    // Navigation
    setupNavigation();
    
    // Logout functionality
    document.getElementById('logout-btn')?.addEventListener('click', logout);
    
    // Add crop form
    document.getElementById('add-crop-form')?.addEventListener('submit', handleAddCrop);
    
    // Crop image upload
    document.getElementById('crop-image')?.addEventListener('change', handleCropImageUpload);
    
    // Profile picture upload
    document.getElementById('profile-picture-input')?.addEventListener('change', handleProfilePictureUpload);
    document.getElementById('profile-avatar')?.addEventListener('click', () => {
        document.getElementById('profile-picture-input').click();
    });
    
    // Profile form
    document.getElementById('profile-form')?.addEventListener('submit', handleProfileUpdate);
    
    // Edit crop modal
    document.getElementById('edit-modal-close')?.addEventListener('click', closeEditModal);
    document.getElementById('edit-crop-form')?.addEventListener('submit', handleEditCrop);
    
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
function loadFarmerData() {
    // Load profile data
    const profileData = JSON.parse(localStorage.getItem(`farmerProfile_${currentFarmer.id}`)) || {};
    
    document.getElementById('profile-name').value = currentFarmer.name;
    document.getElementById('profile-phone').value = currentFarmer.phone;
    document.getElementById('profile-location').value = profileData.location || '';
    document.getElementById('profile-experience').value = profileData.experience || '';
    document.getElementById('profile-bio').value = profileData.bio || '';
    
    // Load profile picture
    const savedProfilePicture = localStorage.getItem(`farmerProfilePicture_${currentFarmer.id}`);
    if (savedProfilePicture) {
        document.getElementById('profile-image').src = savedProfilePicture;
    }
}

function loadFarmerCrops() {
    const cropsGrid = document.getElementById('farmer-crops-grid');
    if (!cropsGrid) return;
    
    if (farmerCrops.length === 0) {
        cropsGrid.innerHTML = `
            <div class="empty-state">
                <i class="ri-plant-line"></i>
                <h3>No crops listed yet</h3>
                <p>Start by adding your first crop to connect with buyers</p>
                <button class="btn btn-primary" onclick="scrollToSection('add-crop')">
                    <i class="ri-add-line"></i>
                    Add Your First Crop
                </button>
            </div>
        `;
        return;
    }
    
    cropsGrid.innerHTML = farmerCrops.map(crop => `
        <div class="crop-card">
            <img src="${crop.image}" alt="${crop.name}" class="crop-card__image">
            <div class="crop-card__content">
                <div class="crop-card__header">
                    <h3 class="crop-card__title">${crop.name}</h3>
                    <span class="crop-card__status ${crop.status || 'active'}">${crop.status || 'Active'}</span>
                </div>
                <div class="crop-card__details">
                    <div class="crop-card__detail">
                        <span>Quantity:</span>
                        <span>${crop.quantity} kg</span>
                    </div>
                    <div class="crop-card__detail">
                        <span>Location:</span>
                        <span>${crop.location}</span>
                    </div>
                    <div class="crop-card__detail">
                        <span>Listed:</span>
                        <span>${crop.dateAdded}</span>
                    </div>
                </div>
                <div class="crop-card__price">Rs. ${crop.price} per kg</div>
                <div class="crop-card__actions">
                    <button class="btn btn-outline" onclick="editCrop('${crop.id}')">
                        <i class="ri-edit-line"></i>
                        Edit
                    </button>
                    <button class="btn btn-primary" onclick="viewCropInquiries('${crop.id}')">
                        <i class="ri-message-line"></i>
                        Inquiries
                    </button>
                    <button class="btn btn-outline" onclick="deleteCrop('${crop.id}')" style="color: var(--error-color); border-color: var(--error-color);">
                        <i class="ri-delete-bin-line"></i>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadFarmerMarketPrices() {
    const tableBody = document.querySelector('#farmer-market-prices-table tbody');
    if (!tableBody) return;
    
    // Get market prices from main script
    const marketPrices = window.KrishiConnect?.dummyMarketPrices || [];
    
    tableBody.innerHTML = marketPrices.map(price => {
        // Find farmer's price for this product
        const farmerCrop = farmerCrops.find(crop => 
            crop.name.toLowerCase().includes(price.product.toLowerCase()) ||
            price.product.toLowerCase().includes(crop.name.toLowerCase())
        );
        
        const farmerPrice = farmerCrop ? farmerCrop.price : '-';
        const priceComparison = farmerCrop ? 
            (farmerCrop.price > price.avg ? 'above' : 
             farmerCrop.price < price.avg ? 'below' : 'equal') : '';
        
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
                    <span class="farmer-price ${priceComparison}">
                        ${farmerPrice === '-' ? '-' : `Rs. ${farmerPrice}`}
                        ${priceComparison === 'above' ? '<i class="ri-arrow-up-line" style="color: var(--success-color);"></i>' : 
                          priceComparison === 'below' ? '<i class="ri-arrow-down-line" style="color: var(--error-color);"></i>' : ''}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

function updateDashboardStats() {
    const totalCrops = farmerCrops.length;
    const totalEarnings = farmerCrops.reduce((sum, crop) => sum + (crop.price * crop.quantity), 0);
    const totalInquiries = farmerCrops.reduce((sum, crop) => sum + (crop.inquiries || 0), 0);
    
    document.getElementById('total-crops').textContent = totalCrops;
    document.getElementById('total-earnings').textContent = `Rs. ${totalEarnings.toLocaleString()}`;
    document.getElementById('total-inquiries').textContent = totalInquiries;
}

function loadRecentActivity() {
    const activityList = document.getElementById('recent-activity');
    if (!activityList) return;
    
    // Generate some dummy recent activities
    const activities = [
        {
            icon: 'ri-add-circle-line',
            title: 'New crop added',
            description: 'You listed fresh tomatoes for sale',
            time: '2 hours ago'
        },
        {
            icon: 'ri-message-line',
            title: 'New inquiry received',
            description: 'A buyer is interested in your onions',
            time: '5 hours ago'
        },
        {
            icon: 'ri-edit-line',
            title: 'Price updated',
            description: 'You updated the price for carrots',
            time: '1 day ago'
        }
    ];
    
    if (activities.length === 0) {
        activityList.innerHTML = `
            <div class="empty-state">
                <i class="ri-history-line"></i>
                <h3>No recent activity</h3>
                <p>Your recent activities will appear here</p>
            </div>
        `;
        return;
    }
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-item__icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-item__content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
            </div>
            <div class="activity-item__time">${activity.time}</div>
        </div>
    `).join('');
}

// =============== CROP MANAGEMENT FUNCTIONS ===============
function handleAddCrop(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const cropName = document.getElementById('crop-name').value;
    const quantity = parseInt(document.getElementById('crop-quantity').value);
    const price = parseInt(document.getElementById('crop-price').value);
    const location = document.getElementById('crop-location').value;
    const description = document.getElementById('crop-description').value;
    
    if (!cropName || !quantity || !price || !location) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    
    const newCrop = {
        id: `crop_${Date.now()}`,
        name: cropName,
        quantity: quantity,
        price: price,
        location: location,
        description: description,
        image: cropImageMap[cropName] || 'tomato.jpg',
        dateAdded: new Date().toLocaleDateString(),
        status: 'active',
        farmerId: currentFarmer.id,
        farmerName: currentFarmer.name,
        farmerPhone: currentFarmer.phone,
        inquiries: 0
    };
    
    farmerCrops.push(newCrop);
    saveFarmerCrops();
    
    // Add to global products list
    if (window.KrishiConnect && window.KrishiConnect.dummyProducts) {
        window.KrishiConnect.dummyProducts.push({
            id: newCrop.id,
            name: newCrop.name,
            farmer: newCrop.farmerName,
            farmerId: newCrop.farmerId,
            price: newCrop.price,
            unit: 'per kg',
            quantity: `${newCrop.quantity} kg available`,
            image: newCrop.image,
            description: newCrop.description,
            contact: newCrop.farmerPhone
        });
    }
    
    showMessage('Crop added successfully!', 'success');
    e.target.reset();
    resetImagePreview();
    loadFarmerCrops();
    updateDashboardStats();
    
    // Scroll to my crops section
    setTimeout(() => {
        scrollToSection('my-crops');
    }, 1000);
}

function editCrop(cropId) {
    const crop = farmerCrops.find(c => c.id === cropId);
    if (!crop) return;
    
    editingCropId = cropId;
    
    // Populate edit form
    document.getElementById('edit-crop-id').value = crop.id;
    document.getElementById('edit-crop-name').value = crop.name;
    document.getElementById('edit-crop-quantity').value = crop.quantity;
    document.getElementById('edit-crop-price').value = crop.price;
    document.getElementById('edit-crop-location').value = crop.location;
    document.getElementById('edit-crop-description').value = crop.description;
    
    // Show edit modal
    document.getElementById('edit-crop-modal').classList.add('active');
}

function handleEditCrop(e) {
    e.preventDefault();
    
    const cropId = document.getElementById('edit-crop-id').value;
    const quantity = parseInt(document.getElementById('edit-crop-quantity').value);
    const price = parseInt(document.getElementById('edit-crop-price').value);
    const location = document.getElementById('edit-crop-location').value;
    const description = document.getElementById('edit-crop-description').value;
    
    const cropIndex = farmerCrops.findIndex(c => c.id === cropId);
    if (cropIndex === -1) return;
    
    // Update crop
    farmerCrops[cropIndex] = {
        ...farmerCrops[cropIndex],
        quantity: quantity,
        price: price,
        location: location,
        description: description
    };
    
    saveFarmerCrops();
    loadFarmerCrops();
    updateDashboardStats();
    closeEditModal();
    
    showMessage('Crop updated successfully!', 'success');
}

function deleteCrop(cropId) {
    if (!confirm('Are you sure you want to delete this crop?')) return;
    
    farmerCrops = farmerCrops.filter(c => c.id !== cropId);
    saveFarmerCrops();
    loadFarmerCrops();
    updateDashboardStats();
    
    showMessage('Crop deleted successfully!', 'success');
}

function viewCropInquiries(cropId) {
    const crop = farmerCrops.find(c => c.id === cropId);
    if (!crop) return;
    
    alert(`Inquiries for ${crop.name}:\n\nTotal inquiries: ${crop.inquiries || 0}\n\nThis feature will show detailed inquiry management in the full version.`);
}

function closeEditModal() {
    document.getElementById('edit-crop-modal').classList.remove('active');
    editingCropId = null;
}

// =============== IMAGE UPLOAD FUNCTIONS ===============
function handleCropImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('crop-image-preview');
        preview.innerHTML = `<img src="${e.target.result}" alt="Crop preview">`;
        preview.classList.add('has-image');
    };
    reader.readAsDataURL(file);
}

function handleProfilePictureUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const profileImage = document.getElementById('profile-image');
        profileImage.src = e.target.result;
        
        // Save to localStorage
        localStorage.setItem(`farmerProfilePicture_${currentFarmer.id}`, e.target.result);
        
        showMessage('Profile picture updated successfully!', 'success');
    };
    reader.readAsDataURL(file);
}

function resetImagePreview() {
    const preview = document.getElementById('crop-image-preview');
    preview.innerHTML = `
        <i class="ri-image-add-line"></i>
        <span>Click to upload crop image</span>
    `;
    preview.classList.remove('has-image');
}

// =============== PROFILE MANAGEMENT ===============
function handleProfileUpdate(e) {
    e.preventDefault();
    
    const profileData = {
        name: document.getElementById('profile-name').value,
        location: document.getElementById('profile-location').value,
        experience: document.getElementById('profile-experience').value,
        bio: document.getElementById('profile-bio').value
    };
    
    // Update current farmer name if changed
    if (profileData.name !== currentFarmer.name) {
        currentFarmer.name = profileData.name;
        localStorage.setItem('krishiConnectUser', JSON.stringify(currentFarmer));
        document.getElementById('farmer-name').textContent = profileData.name;
    }
    
    // Save profile data
    localStorage.setItem(`farmerProfile_${currentFarmer.id}`, JSON.stringify(profileData));
    
    showMessage('Profile updated successfully!', 'success');
}

function resetProfileForm() {
    loadFarmerData();
    showMessage('Profile form reset', 'success');
}

// =============== UTILITY FUNCTIONS ===============
function saveFarmerCrops() {
    localStorage.setItem(`farmerCrops_${currentFarmer.id}`, JSON.stringify(farmerCrops));
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
document.getElementById('edit-crop-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'edit-crop-modal') {
        closeEditModal();
    }
});

// =============== EXPORT FUNCTIONS FOR GLOBAL ACCESS ===============
window.farmerDashboard = {
    editCrop,
    deleteCrop,
    viewCropInquiries,
    scrollToSection
};

