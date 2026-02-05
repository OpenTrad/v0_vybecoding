<?php
session_start();
if (isset($_POST['action']) && $_POST['action'] === 'valider_captcha') {
    setcookie('session_code', 1, time() + 3600, '/');
}
?>
