// js/main.js

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. TAMNA / SVETLA TEMA (SADA MENJA I IKONICU)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Funkcija koja menja boju sajta i ikonicu
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        if(themeToggleBtn) {
            themeToggleBtn.innerText = theme === 'dark' ? '☼' : '☾';
        }
    };

    setTheme(currentTheme); // Postavlja temu čim se sajt učita

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // 2. MOBILE HAMBURGER MENI (ZA TELEFON)
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            // Otvara/zatvara meni i animira ikonicu
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('active');
        });
    }

    // 3. SISTEM ZA JEZIKE (SR / EN) - NOVO!
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('lang') || 'EN';

    // Rečnik sa tačnim prevodima sa tvojih slika
    const dict = {
        'EN': { 
            btn: 'SR',
            home: 'HOME', about: 'ABOUT', services: 'SERVICES', gallery: 'GALLERY', calc: 'CALCULATOR',
            heroSub: 'EST. 2005 — BELGRADE, SERBIA',
            heroTitle: 'PRECISION<br>PROTECTION',
            heroDesc: 'Premium Alu & PVC windows, doors, and facades<br>— engineered for lasting performance.',
            quoteBtn: 'GET A QUOTE ↗',
            projectsBtn: 'VIEW PROJECTS'
        },
        'SR': { 
            btn: 'EN',
            home: 'POČETNA', about: 'O NAMA', services: 'USLUGE', gallery: 'GALERIJA', calc: 'KALKULATOR',
            heroSub: 'OSNOVANO 2005 — BEOGRAD, SRBIJA',
            heroTitle: 'PRECIZNOST<br>ZAŠTITA',
            heroDesc: 'Premium Alu i PVC prozori, vrata i fasade<br>— projektovani za trajne performanse.',
            quoteBtn: 'ZATRAŽITE PONUDU ↗',
            projectsBtn: 'POGLEDAJTE PROJEKTE'
        }
    };

    const applyLanguage = (lang) => {
        // Menja dugme za jezik
        if(langToggleBtn) langToggleBtn.innerText = dict[lang].btn;
        
        // Prevodi navigaciju
        if(document.querySelector('.lang-home')) document.querySelector('.lang-home').innerText = dict[lang].home;
        if(document.querySelector('.lang-about')) document.querySelector('.lang-about').innerText = dict[lang].about;
        if(document.querySelector('.lang-services')) document.querySelector('.lang-services').innerText = dict[lang].services;
        if(document.querySelector('.lang-gallery')) document.querySelector('.lang-gallery').innerText = dict[lang].gallery;
        if(document.querySelector('.lang-calc')) document.querySelector('.lang-calc').innerText = dict[lang].calc;

        // Prevodi tekstove na početnoj strani
        if(document.querySelector('.hero-section .subtitle')) document.querySelector('.hero-section .subtitle').innerText = dict[lang].heroSub;
        if(document.querySelector('.hero-section .main-title')) document.querySelector('.hero-section .main-title').innerHTML = dict[lang].heroTitle;
        if(document.querySelector('.hero-section .description')) document.querySelector('.hero-section .description').innerHTML = dict[lang].heroDesc;
        if(document.querySelector('.btn-solid')) document.querySelector('.btn-solid').innerText = dict[lang].quoteBtn;
        if(document.querySelector('.btn-outline')) document.querySelector('.btn-outline').innerText = dict[lang].projectsBtn;
    };

    applyLanguage(currentLang); // Prevodi sajt čim se učita

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'EN' ? 'SR' : 'EN';
            localStorage.setItem('lang', currentLang);
            applyLanguage(currentLang);
        });
    }

    // 4. ANIMACIJE NA SKROL (SCROLL-IN EFFECT)
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