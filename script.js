let essaisRestants = 5;
  let num1, num2, reponseAttendue;

  function genererQuestion() {
    num1 = Math.floor(Math.random() * 10);
    num2 = Math.floor(Math.random() * 10);
    const operations = ["+", "-", "*", "plus grand", "plus petit"];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    if (operation === "+") {
      document.getElementById("question").textContent = `Combien font ${num1} ${operation} ${num2} ?`;
      reponseAttendue = num1 + num2;
    } else if (operation === "-") {
      document.getElementById("question").textContent = `Combien font ${Math.max(num1, num2)} ${operation} ${Math.min(num1, num2)} ?`;
      reponseAttendue = Math.max(num1, num2) - Math.min(num1, num2);
    } else if (operation === "*") {
      document.getElementById("question").textContent = `Combien font ${num1} ${operation} ${num2} ?`;
      reponseAttendue = num1 * num2;
    } else if (operation === "plus grand") {
      document.getElementById("question").textContent = `Quel est le ${operation} entre ${num1} et ${num2} ?`;
      reponseAttendue = Math.max(num1, num2);
    } else if (operation === "plus petit") {
      document.getElementById("question").textContent = `Quel est le ${operation} entre ${num1} et ${num2} ?`;
      reponseAttendue = Math.min(num1, num2);
    }
  }

  function verifierCaptcha() {
    const reponse = parseInt(document.getElementById("captcha-answer").value);
    if (reponse === reponseAttendue) {
        // Envoie une requête au serveur pour mettre à jour le cookie
        fetch('entree_valide.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'action=valider_captcha'
        }
      );
      document.getElementById("captcha-container").style.display = "none";
      document.getElementById("message-reussite").style.display = "block";
      document.getElementById("boutons-suivants").style.display = "flex";
    } else {
      essaisRestants--;
      if (essaisRestants > 0) {
        document.getElementById("essais-restants").textContent = essaisRestants;
        genererQuestion();
        document.getElementById("captcha-answer").value = "";
      } else {
        document.getElementById("message-erreur").style.display = "block";
        document.getElementById("captcha-container").style.display = "none";
      }
    }
  }


  document.getElementById("essais-restants").textContent = essaisRestants;
  // Génère la première question
  genererQuestion();