// js/main.js

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. TAMNA / SVETLA TEMA
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // 2. MOBILE HAMBURGER MENI (ZA TELEFON) - NOVO!
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            // Otvara/zatvara meni i animira ikonicu
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('active');
        });
    }

    // 3. ANIMACIJE NA SKROL (SCROLL-IN EFFECT) - NOVO!
    // Ovo čini da sekcije sajta "ušeću" glatko dok skrolaš
    const revealSections = document.querySelectorAll('section, main, .site-footer');

    const revealOnScroll = () => {
        for (let i = 0; i < revealSections.length; i++) {
            let windowHeight = window.innerHeight;
            let revealTop = revealSections[i].getBoundingClientRect().top;
            let revealPoint = 150; // Koliko piksela pre nego što se pojavi

            if (revealTop < windowHeight - revealPoint) {
                revealSections[i].classList.add('active-section');
            }
        }
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Pokreće proveru odmah na load-u
});