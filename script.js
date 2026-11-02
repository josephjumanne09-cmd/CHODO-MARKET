// Switch Pages Function
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    const target = document.getElementById(`page-${pageId}`);
    if (target) {
        target.classList.add('active-page');
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.getAttribute('data-target') === pageId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Select Product from Picture Catalog and auto-fill form securely
function selectPresetProduct(productName, category, estimatedPrice) {
    // 1. Switch to the Sourcing/Catalog page first
    switchPage('sourcing');

    // 2. Safely find category dropdown and set it
    const catSelect = document.getElementById('productCategory');
    if (catSelect) {
        catSelect.value = category;
    }

    // 3. Safely find text area and fill details
    const detailsInput = document.getElementById('productDetails');
    if (detailsInput) {
        detailsInput.value = `I want to order: ${productName}. (Estimated Market Price: ~$${estimatedPrice} USD). Please check availability and confirm.`;
    }

    // 4. Smooth scroll down directly to the order form card
    setTimeout(() => {
        const formCard = document.querySelector('.form-card');
        if (formCard) {
            formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

// Quick WhatsApp Send from Home
function quickWhatsAppSend() {
    const product = document.getElementById('quickProduct').value;
    if (!product) {
        alert('Please enter a product name or link');
        return;
    }
    const message = `Hello Chodo Market, I want to source this product: ${product}`;
    window.open(`https://wa.me/255698039513?text=${encodeURIComponent(message)}`, '_blank');
}

// Submit Order Form to WhatsApp
function submitOrder(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('clientName');
    const phoneInput = document.getElementById('clientPhone');
    const cityInput = document.getElementById('clientCity');
    const categorySelect = document.getElementById('productCategory');
    const detailsInput = document.getElementById('productDetails');
    const qtyInput = document.getElementById('productQty');
    const shippingSelect = document.getElementById('shippingMode');

    if (!nameInput || !phoneInput || !detailsInput) {
        alert('Form fields could not be found. Please check your HTML IDs.');
        return;
    }

    const name = nameInput.value;
    const phone = phoneInput.value;
    const city = cityInput.value;
    const category = categorySelect.value;
    const details = detailsInput.value;
    const qty = qtyInput.value;
    const shipping = shippingSelect.value;

    const message = `*NEW ORDER REQUEST - CHODO MARKET* %0A` +
                    `---------------------------------- %0A` +
                    `*Name:* ${name} %0A` +
                    `*Phone:* ${phone} %0A` +
                    `*Destination:* ${city} %0A` +
                    `*Category:* ${category} %0A` +
                    `*Details:* ${details} %0A` +
                    `*Quantity:* ${qty} %0A` +
                    `*Shipping:* ${shipping} %0A` +
                    `----------------------------------`;

    window.open(`https://wa.me/255698039513?text=${message}`, '_blank');
}

// Calculator Mode & Math
let currentCalcMode = 'air';

function setCalcMode(mode) {
    currentCalcMode = mode;
    const tabs = document.querySelectorAll('.calc-tab');
    if (tabs.length < 2) return;

    if (mode === 'air') {
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
        document.getElementById('airInputs').style.display = 'block';
        document.getElementById('seaInputs').style.display = 'none';
    } else {
        tabs[1].classList.add('active');
        tabs[0].classList.remove('active');
        document.getElementById('airInputs').style.display = 'none';
        document.getElementById('seaInputs').style.display = 'block';
    }
    calculateCost();
}

function calculateCost() {
    let usd = 0;
    if (currentCalcMode === 'air') {
        const weightEl = document.getElementById('airWeight');
        usd = (weightEl ? weightEl.value : 5) * 12;
    } else {
        const cbmEl = document.getElementById('seaCbm');
        usd = (cbmEl ? cbmEl.value : 1) * 350;
    }

    let tzs = usd * 2700;
    const usdDisplay = document.getElementById('estimatedUsd');
    const tzsDisplay = document.getElementById('estimatedTzs');

    if (usdDisplay) usdDisplay.innerText = `$${usd.toFixed(2)} USD`;
    if (tzsDisplay) tzsDisplay.innerText = `Approx. ${tzs.toLocaleString()} TZS`;
}

// Tracking
function trackOrder() {
    const inputEl = document.getElementById('trackingCodeInput');
    if (!inputEl) return;

    const code = inputEl.value.trim();
    if (!code) {
        alert('Please enter a tracking ID');
        return;
    }
    
    const idDisplay = document.getElementById('resTrackingId');
    const resultBox = document.getElementById('trackingResult');

    if (idDisplay) idDisplay.innerText = code;
    if (resultBox) resultBox.classList.remove('hidden');
}