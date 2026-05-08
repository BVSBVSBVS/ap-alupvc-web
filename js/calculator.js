document.addEventListener("DOMContentLoaded", () => {
    // Hvatanje HTML elemenata
    const widthSlider = document.getElementById("width-slider");
    const heightSlider = document.getElementById("height-slider");
    const widthVal = document.getElementById("width-val");
    const heightVal = document.getElementById("height-val");
    
    const displayWidth = document.getElementById("display-width");
    const displayHeight = document.getElementById("display-height");
    const displayArea = document.getElementById("display-area");
    const summaryArea = document.getElementById("summary-area");
    
    const pricePerUnit = document.getElementById("price-per-unit");
    const priceTotal = document.getElementById("price-total");
    
    const visualizerFrame = document.querySelector(".window-frame");

    // Objekat koji čuva trenutno odabrane vrednosti
    let state = {
        width: 120,
        height: 140,
        material: 'pvc',
        product: 'window',
        chambers: 5,
        glass: 'double',
        color: 'white'
    };

    // Funkcija koja menja aktivno dugme i ažurira podatke levo
    function setupToggle(groupId, stateKey, specId = null) {
        const buttons = document.querySelectorAll(`#${groupId} button`);
        buttons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                // Skida .active sa svih i stavlja na onaj koji je kliknut
                buttons.forEach(b => b.classList.remove("active"));
                e.target.classList.add("active");
                
                // Čuva vrednost i menja tekst u listi specifikacija
                state[stateKey] = e.target.getAttribute("data-val");
                if(specId) {
                    document.getElementById(specId).innerText = e.target.innerText;
                }
                calculatePrice(); // Svaki klik preračunava cenu
            });
        });
    }

    // Aktivacija svih grupa dugmića
    setupToggle("material-toggle", "material", "spec-material");
    setupToggle("product-type-toggle", "product");
    setupToggle("chamber-options", "chambers", "spec-chambers");
    setupToggle("glass-toggle", "glass", "spec-glass");
    setupToggle("color-options", "color", "spec-color");

    // Funkcija za slajdere (kada se povlače)
    function updateSliders() {
        state.width = parseInt(widthSlider.value);
        state.height = parseInt(heightSlider.value);
        
        // Ažuriranje teksta iznad slajdera i ispod slike prozora
        widthVal.innerText = state.width;
        heightVal.innerText = state.height;
        displayWidth.innerText = state.width + "cm";
        displayHeight.innerText = state.height + "cm";
        
        calculatePrice();
    }

    widthSlider.addEventListener("input", updateSliders);
    heightSlider.addEventListener("input", updateSliders);

    // Glavni kalkulator cene
    function calculatePrice() {
        // Matematika površine (cm u m)
        let area = (state.width / 100) * (state.height / 100);
        displayArea.innerText = area.toFixed(2);
        summaryArea.innerText = area.toFixed(2);

        // Vizuelno animiranje prozora (zadržavamo max visinu 180px, a širinu srazmerno menjamo)
        let ratio = state.width / state.height;
        visualizerFrame.style.height = "180px";
        visualizerFrame.style.width = Math.max(60, (180 * ratio)) + "px";

        // Bazične cene po kvadratu (Ove cifre ti posle menjaš kako klijentu odgovara)
        let basePrice = state.material === 'pvc' ? 135 : 270;
        
        // Dodaci i množioci na osnovu ostalih faktora
        if (state.product === 'door') basePrice *= 1.3;
        if (state.product === 'sliding') basePrice *= 1.8;
        if (state.glass === 'triple') basePrice += 45; // Fiksni dodatak za troslojno staklo
        if (state.chambers == 7) basePrice += 20;
        if (state.color !== 'white') basePrice *= 1.15; // Ako nije bela, skuplje 15%

        // Konačno računanje
        let unitPrice = area * basePrice;
        
        // Ispis na ekranu (sa zarezima za hiljade, kao pravi)
        let formattedPrice = Math.round(unitPrice).toLocaleString('en-US');
        pricePerUnit.innerText = "€" + formattedPrice;
        priceTotal.innerText = "€" + formattedPrice;
    }

    // Prvo pokretanje da bi se učitale startne cene
    calculatePrice();
});