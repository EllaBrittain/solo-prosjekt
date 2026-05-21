document.querySelectorAll(".handlekurv-knapp").forEach(knapp => {
    knapp.addEventListener("click", () => {
        const produkt = {
            navn: knapp.dataset.navn,
            volume: knapp.dataset.volume,
            pris: knapp.dataset.pris,
            bilde: knapp.dataset.bilde
        };
        const handlekurv = JSON.parse(localStorage.getItem("handlekurv") || "[]");
        handlekurv.push(produkt);
        localStorage.setItem("handlekurv", JSON.stringify(handlekurv));
    });
});


const container = document.querySelector(".ordre-oppsumering");
if (container) {
    const handlekurv = JSON.parse(localStorage.getItem("handlekurv") || "[]");
    handlekurv.forEach(produkt => {
        const vare = document.createElement("div");
        vare.classList.add("vare");
        vare.innerHTML = `
            <div class="prikk"></div>
            <div class="img"><img src="${produkt.bilde}" alt=""></div>
            <div class="vare-info">
                <h4>${produkt.navn}</h4>
                <div class="volume">${produkt.volume}</div>
                <div class="price">${produkt.pris}</div>
            </div>
        `;
        container.appendChild(vare);

        const strek = document.createElement("div");
        strek.classList.add("strek");
        container.appendChild(strek);
    });
}



const tomKnapp = document.querySelector("#tom-knapp");
if (tomKnapp) {
    tomKnapp.addEventListener("click", () => {
        localStorage.removeItem("handlekurv");
        location.reload(); // refresher siden så varene forsvinner
    });
}