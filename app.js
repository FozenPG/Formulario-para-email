document.addEventListener('DOMContentLoaded', function () {
    const formularioContato = document.getElementById('formularioContato');
  
    formularioContato.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const nome = document.getElementById('nome').value;
      const telefone = document.getElementById('telefone').value;
      const email = document.getElementById('email').value;
  
      enviarEmail(nome, telefone, email);
    });
  
    function enviarEmail(nome, telefone, email) {
      fetch('/enviar-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, telefone, email }),
      })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
        })
        .catch(error => {
          console.error('Erro ao enviar e-mail:', error);
        });
    }
  });
  