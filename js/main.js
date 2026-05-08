// js/main.js

// 1. TAMNA I SVETLA TEMA (DARK/LIGHT MODE)
// Ovaj deo koda pamti temu koju korisnik izabere, tako da kada menja stranice sajt ne "bljeska" belo
const themeToggleBtn = document.getElementById('theme-toggle');

// Proveravamo da li je korisnik već odabrao temu (čuvamo u pretraživaču)
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Menjanje teme na klik dugmeta u navigaciji
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// 2. PRIPREMA ZA DVOJEZIČNOST (SR / EN)
// Dugme za promenu jezika menja stanje i pamti koji je jezik izabran
const langToggleBtn = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('lang') || 'EN';

if (langToggleBtn) {
    // Postavljamo tekst na dugmetu u zavisnosti od jezika (ako je EN, nudi SR)
    langToggleBtn.innerText = currentLang === 'EN' ? 'SR' : 'EN';

    langToggleBtn.addEventListener('click', () => {
        // Menjamo jezik
        currentLang = currentLang === 'EN' ? 'SR' : 'EN';
        localStorage.setItem('lang', currentLang);
        langToggleBtn.innerText = currentLang === 'EN' ? 'SR' : 'EN';
        
        // Za sada osvežavamo stranicu kako bi se u kasnijoj fazi učitao rečnik sa prevodima.
        location.reload();
    });
}