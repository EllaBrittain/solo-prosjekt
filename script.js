document.addEventListener("DOMContentLoaded", () => {

    frakt = 4.5

    const tottalAntallVarer = document.getElementById("totVarer")
    const tottalSum = document.getElementById("aaBetale")

    if (tottalAntallVarer) {
        tottalAntallVarer.innerHTML = 0
        tottalSum.innerHTML = "€" + frakt.toFixed(2)
    }

    function oppdaterAntall() {
        const valgte = document.querySelectorAll(".vare .prikk.valgt")
        tottalAntallVarer.innerHTML = valgte.length

        let sum = 0
        valgte.forEach(prikk => {
            const pris = prikk.closest(".vare").querySelector(".price").innerHTML
            sum += parseFloat(pris.replace("€", ""))
        })
        tottalSum.innerHTML = "€" + (sum + frakt).toFixed(2)
    }

    document.querySelectorAll(".handlekurv-knapp").forEach(knapp => {
        knapp.addEventListener("click", () => {
            const produkt = {
                navn: knapp.dataset.navn,
                volume: knapp.dataset.volume,
                pris: knapp.dataset.pris,
                bilde: knapp.dataset.bilde
            }
            const handlekurv = JSON.parse(localStorage.getItem("handlekurv") || "[]")
            handlekurv.push(produkt)
            localStorage.setItem("handlekurv", JSON.stringify(handlekurv))
        })
    })

    const container = document.querySelector(".ordre-oppsumering")
    if (container) {
        const handlekurv = JSON.parse(localStorage.getItem("handlekurv") || "[]")
        handlekurv.forEach(produkt => {
            const vare = document.createElement("div")
            vare.classList.add("vare")
            vare.innerHTML = `
                <div class="prikk"></div>
                <div class="img"><img src="${produkt.bilde}" alt=""></div>
                <div class="vare-info">
                    <h4>${produkt.navn}</h4>
                    <div class="volume">${produkt.volume}</div>
                    <div class="price">${produkt.pris}</div>
                </div>
            `
            container.appendChild(vare)

            const strek = document.createElement("div")
            strek.classList.add("strek")
            container.appendChild(strek)
        })

        document.querySelectorAll(".vare .prikk").forEach(prikk => {
            prikk.addEventListener("click", () => {
                prikk.classList.toggle("valgt")
                oppdaterAntall()
            })
        })

        const alleKnapp = document.getElementById("alle-prikk")
        if (alleKnapp) {
            alleKnapp.addEventListener("click", () => {
                document.querySelectorAll(".vare .prikk").forEach(prikk => {
                    prikk.classList.add("valgt")
                    alleKnapp.classList.add("valgt")
                })
                oppdaterAntall()
            })
        }
    }

    const tomKnapp = document.querySelector("#tom-knapp")
    if (tomKnapp) {
        tomKnapp.addEventListener("click", () => {
            localStorage.removeItem("handlekurv")
            location.reload()
        })
    }

})