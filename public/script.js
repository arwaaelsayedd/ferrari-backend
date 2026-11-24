function applyThemeColors(primaryColor, backgroundColor) {
    const root = document.documentElement;
    if (primaryColor) {
        root.style.setProperty('--primary-color', primaryColor);
    }
    if (backgroundColor) {
        root.style.setProperty('--bg-color', backgroundColor);
    }
}

function updateHeaderPhoto(imageUrl) {
    const headerElement = document.querySelector('header');
    if (headerElement && imageUrl) {
        headerElement.style.backgroundImage = `url('${imageUrl}')`;
    }
}

async function loadSiteSettings() {
    try {
        const response = await fetch('/api/settings');
        if (!response.ok) return;

        const settings = await response.json();
        applyThemeColors(settings.primaryColor, settings.backgroundColor);
        updateHeaderPhoto(settings.headerImage);
    } catch (err) {
        console.error('Settings load skipped or failed:', err);
    }
}

async function loadServices() {
    const container = document.getElementById('services-container');
    if (!container) return;

    try {
        const response = await fetch('/api/services');
        const items = await response.json();

        container.innerHTML = items.map(item => `
            <div class="card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="tech-tag">${item.tech || 'Node.js / Express'}</span>
            </div>
        `).join('');
    } catch (err) {
        console.error('Failed to load services:', err);
        container.innerHTML = '<p>Unable to load telemetry data right now.</p>';
    }
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    const responseEl = document.getElementById('form-response');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const payload = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                responseEl.style.color = '#22c55e';
                responseEl.textContent = result.message || 'Transmission received!';
                form.reset();
            } else {
                responseEl.style.color = '#ef4444';
                responseEl.textContent = result.error || 'Failed to send message.';
            }
        } catch (err) {
            responseEl.style.color = '#ef4444';
            responseEl.textContent = 'Server connection error.';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadSiteSettings();
    loadServices();
    setupContactForm();
});