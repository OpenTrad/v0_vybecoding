pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// Dictionnaire pour associer chaque langue à son fichier PDF
const pdfParLangue = {
    fr: "pdf_trad/00_MacLaurin_1720_preface_trad_fr.pdf",
    it: "pdf_trad/00_MacLaurin_1720_preface_trad_it.pdf",
    an: "pdf_trad/00_MacLaurin_1720_preface_trad_an.pdf",
    al: "pdf_trad/00_MacLaurin_1720_preface_trad_al.pdf",
    es: "pdf_trad/00_MacLaurin_1720_preface_trad_es.pdf"
};

// Variable pour stocker la langue actuelle
let langueActuelle = "fr";

let pageActuelle = 1; // Page actuelle pour les deux PDFs

// Variable globale pour stocker le nombre total de pages
let totalPages = 1;

let modeCommentaire = false;
let commentaires = []; // Tableau pour stocker les commentaires


// Fonction pour afficher une page spécifique
async function afficherPDF(url, conteneurId, pageNumber, scale = 5.0) {
    const conteneur = document.getElementById(conteneurId);
    conteneur.innerHTML = "";

    const loadingTask = pdfjsLib.getDocument(url);
    const pdfDocument = await loadingTask.promise;
    const page = await pdfDocument.getPage(pageNumber);
    const viewport = page.getViewport({ scale: scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.width = `${conteneur.clientWidth}px`;
    canvas.style.height = `${conteneur.clientHeight}px`;

    conteneur.appendChild(canvas);
    await page.render({
        canvasContext: context,
        viewport: viewport
    }).promise;

    return pdfDocument.numPages; // Retourne le nombre total de pages
}

// Fonction pour mettre à jour le menu déroulant
function mettreAJourMenuPages(maxPages) {
    const select = document.getElementById("select-page");
    select.innerHTML = "";
    for (let i = 1; i <= maxPages; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `Page ${i}`;
        if (i === pageActuelle) option.selected = true;
        select.appendChild(option);
    }
}

// Écoute le changement de page via le menu déroulant
document.getElementById("select-page").addEventListener("change", (e) => {
    changerPage(parseInt(e.target.value));
});

// Modifie la fonction changerPage pour mettre à jour le menu
async function changerPage(pageNumber) {
    pageActuelle = pageNumber;
    const totalPagesOCR = await afficherPDF("pdf_ocr/00_MacLaurin_1720_preface_ocr_latin.pdf", "pdf-ocr-viewer", pageActuelle, 5.0);
    const totalPagesTrad = await afficherPDF(pdfParLangue[langueActuelle], "pdf-trad-viewer", pageActuelle, 5.0);
    totalPages = Math.min(totalPagesOCR, totalPagesTrad);
    document.getElementById("numero-page").textContent = `/${totalPages}`;
    mettreAJourMenuPages(totalPages);

    // Désactive les boutons si nécessaire
    document.getElementById("page-precedente").disabled = pageActuelle <= 1;
    document.getElementById("page-suivante").disabled = pageActuelle >= totalPages;
}

// Initialise le menu au chargement
document.addEventListener("DOMContentLoaded", () => {
    initialiserBoutonsLangue();
    changerPage(1);
});

// Écoute les clics sur les boutons de langue
document.querySelectorAll(".bouton-langue").forEach(bouton => {
    bouton.addEventListener("click", () => {
        langueActuelle = bouton.getAttribute("data-lang");
        changerPage(pageActuelle); // Recharge la page actuelle avec la nouvelle langue
    });
});

// Écoute les clics sur les boutons de navigation
document.getElementById("page-precedente").addEventListener("click", () => {
    if (pageActuelle > 1) {
        changerPage(pageActuelle - 1);
    }
});

document.getElementById("page-suivante").addEventListener("click", () => {
    changerPage(pageActuelle + 1);
});

// Fonction pour vérifier si le PDF existe
async function pdfExiste(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Fonction pour activer/désactiver les boutons
async function initialiserBoutonsLangue() {
    const boutons = document.querySelectorAll(".bouton-langue");

    for (const bouton of boutons) {
        const langue = bouton.getAttribute("data-lang");
        const urlPDF = pdfParLangue[langue];

        if (await pdfExiste(urlPDF)) {
            bouton.disabled = false; // Active le bouton
            bouton.style.opacity = 1; // Rend le bouton visible
        } else {
            bouton.disabled = true; // Désactive le bouton
            bouton.style.opacity = 0.5; // Rend le bouton semi-transparent
        }
    }
}

// Écoute les clics sur les boutons de langue
document.querySelectorAll(".bouton-langue").forEach(bouton => {
    bouton.addEventListener("click", async () => {
        const langue = bouton.getAttribute("data-lang");
        // Affiche la page actuelle pour le nouveau PDF de traduction
        await afficherPDF(pdfParLangue[langue], "pdf-trad-viewer", pageActuelle, 5.0);
    });
});


// Active/désactive le mode commentaire
document.getElementById("toggle-comment").addEventListener("click", () => {
    modeCommentaire = !modeCommentaire;
    const bouton = document.getElementById("toggle-comment");
    bouton.textContent = modeCommentaire ? "Désactiver les commentaires" : "Ajouter un commentaire";
    bouton.style.backgroundColor = modeCommentaire ? "#ffcc00" : "";
});

document.getElementById("pdf-trad-viewer").addEventListener("click", (e) => {
    if (modeCommentaire) {
        const conteneur = document.getElementById("pdf-trad-viewer");
        const rect = conteneur.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const texte = prompt("Saisis ton commentaire :");
        if (texte) {
            // Crée un point
            const point = document.createElement("div");
            point.className = "point-commentaire";
            point.style.left = `${x}px`;
            point.style.top = `${y}px`;

            // Crée une infobulle (masquée par défaut)
            const infobulle = document.createElement("div");
            infobulle.className = "infobulle-commentaire";
            infobulle.textContent = texte;
            infobulle.style.left = `${x}px`;
            infobulle.style.top = `${y - 30}px`;

            // Crée une bulle permanente (masquée par défaut)
            const bulle = document.createElement("div");
            bulle.className = "bulle-commentaire";
            bulle.textContent = texte;
            bulle.style.left = `${x}px`;
            bulle.style.top = `${y - 50}px`;

            // Gère le survol du point pour afficher l'infobulle (si la bulle est fermée)
            point.addEventListener("mouseenter", () => {
                if (bulle.style.display !== "block") {
                    infobulle.style.display = "block";
                }
            });

            point.addEventListener("mouseleave", () => {
                infobulle.style.display = "none";
            });

            // Gère le clic sur le point pour afficher/masquer la bulle
            point.addEventListener("click", (e) => {
                e.stopPropagation();
                if (bulle.style.display === "block") {
                    bulle.style.display = "none";
                } else {
                    bulle.style.display = "block";
                    infobulle.style.display = "none"; // Cache l'infobulle si la bulle est ouverte
                }
            });

            conteneur.appendChild(point);
            conteneur.appendChild(infobulle);
            conteneur.appendChild(bulle);

            // Sauvegarde le commentaire
            commentaires.push({ x, y, texte, page: pageActuelle, point, bulle, infobulle });
        }
    }
});


// Initialise les boutons au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    initialiserBoutonsLangue();
    changerPage(1); // Affiche la première page pour les deux PDFs
});

// Initialise les boutons au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    initialiserBoutonsLangue();
    // Affiche le PDF français par défaut (si disponible)
    if (pdfParLangue.fr) {
        afficherPDF(pdfParLangue.fr, "pdf-trad-viewer", 1, 5.0);
    }
});