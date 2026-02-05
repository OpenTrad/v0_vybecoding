<?php
require('verif.php');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenTranslation</title>
    <link rel="stylesheet" href="classes/lecture.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"></script>
</head>

<body>
    <div class="header">
        Header
    </div>

    <div class="body">
        <div class="titre-state0" id="titre">
            Voici une traduction XXXX(langue) de la préface du texte Geometria Organica (titre) initialement réalisée par l'IA le chat de Mistral et dont la transcription n'a pas encore été vérifiée [par XXXX (nom du vérificateur)]. <br>
            La qualité de la traduction est actuellement : craignos(qualité de la trad). N'hésitez pas à participer pour l'améliorer. <br>
            L'édition est celle de 1720(métadonnées d'édition), les scans utilisés sont disponibles sur le portail numérique e-rara XXXX(origine des scans) [et sont disponibles à l'adresse XXXX(lien cliquable)].
            <br>
            <div style="border: 1mm solid rgb(0, 0, 0);">
            Références bibliographiques complètes des scans utilisés : <br>
            MacLaurin, Colin: Geometria organica: sive descriptio linearum curvarum universalis. <br>
            Londini : impensis Gul. & Joh. Innys, Regiae Societatis Typographorum in Areâ Occidentali D. Pauli, MDCCXX. [1720].<br>
            ETH-Bibliothek Zürich, Rar 2970, <a href="https://doi.org/10.3931/e-rara-52719">https://doi.org/10.3931/e-rara-52719</a> <br>
            Public Domain Mark
            </div>
        </div>

        <div class="langues-dispo" id="langues-dispo">
            <button class="bouton-langue" data-lang="fr">Français</button>
            <button class="bouton-langue" data-lang="it">Italien</button>
            <button class="bouton-langue" data-lang="an">Anglais</button>
            <button class="bouton-langue" data-lang="al">Allemand</button>
            <button class="bouton-langue" data-lang="es">Espagnol</button>
        </div>
        
        <div class="navigation-pdf">
            <button id="page-precedente">Page précédente</button>
            <select id="select-page" style="margin: 10px; padding: 5px;">
            <!-- Les options seront ajoutées dynamiquement par JavaScript -->
            </select>
            <span id="numero-page"></span>
            <button id="page-suivante">Page suivante</button>
        </div>
        
        
        <button id="toggle-comment" style="margin: 10px; padding: 5px;">Ajouter un commentaire</button>


        <div class="c0" id="c0">
            <div class="c1-state0">
                <div id="pdf-ocr-viewer" class="pdf-viewer"></div>
            </div>

            <div class="c2-state0">
                <div id="pdf-trad-viewer" class="pdf-viewer"></div>
            </div>

        </div>

    </div>

    <div class="footer">
        Footer
    </div>

    <script src="scripts/lecture.js"></script>
</body>

<!-- Site imaginé, conçu et développé par deux marseillais empegués, flemmards et à 200km/h sur l'autoroute du flinguage. -->
</html>

