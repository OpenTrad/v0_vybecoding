<?php
session_start();

// Vérifie si le cookie de session existe
if (!isset($_COOKIE['session_id'])) {
    header("Location: securite.html");
    exit();
}

// Vérifie si le cookie de session existe et si le code est égal à 1
if (!isset($_COOKIE['session_code']) || $_COOKIE['session_code'] != 1) {
    header("Location: securite.html");
    exit();
}
?>

