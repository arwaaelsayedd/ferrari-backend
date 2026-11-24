// 1. Function بتطبق الألوان على الصفحة كلها عن طريق CSS Variables
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
        headerElement.style.backgroundSize = 'cover';
        headerElement.style.backgroundPosition = 'center';
    }
}

async function loadAndApplySettings() {
    try {
        const response = await fetch('/api/settings');
        const settings = await response.json();

        applyThemeColors(settings.primaryColor, settings.backgroundColor);
        updateHeaderPhoto(settings.headerImage);
    } catch (error) {
        console.error("Error loading site settings:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadAndApplySettings);