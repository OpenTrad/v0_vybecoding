<?php
// Démarrer la session avec des paramètres sécurisés
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.use_only_cookies', 1);
session_start();
if (!isset($_COOKIE['session_id'])) {
    $session_id = uniqid(); // Génère un identifiant unique
    setcookie('session_id', $session_id, time() + 3600, '/'); // Expire dans 1 heure
    setcookie('session_code', 0, time() + 3600, '/'); // Expire dans 1 heure
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenTranslation</title>
    <link rel="stylesheet" href="classe.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"></script>
</head>

<body>
    <div class="header">
        Header
    </div>

    <div class="body">
        <div class="titre-state0" id="titre">
            Bienvenue sur OpenTrad. Ce site est une bibliothèque de traduction collaborative. Vous êtes ici dans le hall
            d'entrée. Comme dans une vraie bibliothèque, le hall d'entrée nous permet de vérifier que vous êtes 
            autorisé à entrer (que vous n'êtes pas un bot).
        </div>

        <div id="captcha-container">
            <p> Il vous reste <span id="essais-restants"></span> essais.</p>
            <p id="question"></p>
            <input type="text" id="captcha-answer" required>
            <button onclick="verifierCaptcha()">Valider</button>
        </div>

        <p id="message-erreur" style="color: red; display: none;">
            Vous n'êtes pas autorisé à entrer.
        </p>
        <p id="message-reussite" style="color: rgb(0, 255, 0); display: none;">
            Vous êtes autorisé à entrer.
            Où voulez-vous aller ?
        </p>

            <!-- Boutons cachés par défaut -->
        <div id="boutons-suivants" class="boutons-navigation">
            <div class="choix-navigation">
                <p> L'acceuil vous permet d'en apprendre plus sur la bibliothèque et son fonctionnement.
                    Vous pouvez également suggérer de nouveaux textes à traduire.
                </p>
                <button onclick="window.location.href='acceuil.php'">Aller à l'Acceuil</button>
            </div>
            <div class="choix-navigation">
                <p> La bibliothèque recense tous les textes disponibles actuellement.
                    En choisissant un texte vous rejoingnez une salle de travail qui vous permettra de proposer des suggestions.
                    La bibliothèque recense également les textes en attente de validation.
                </p>
                <button onclick="window.location.href='biblio.php'">Aller à la Bibliothèque</button>
            </div>
        </div>
    </div>

    <div class="footer">
        Footer
    </div>

    <script src="script.js"></script>
</body>

<!-- Site imaginé, conçu et développé par deux marseillais empegués, flemmards et à 200km/h sur l'autoroute du flinguage. -->
</html>

