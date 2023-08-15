const currencyForm = document.getElementById('currencyForm');
const resultDiv = document.getElementById('result');

const convertButton = document.querySelector('button[type="submit"]');
convertButton.addEventListener('click', (event) => {
    event.preventDefault(); // Evita o envio do formulário

    const amount = document.getElementById('amount').value;
    fetch(`/convert?amount=${encodeURIComponent(amount)}`)
        .then((response) => response.json())
        .then((data) => {
            // Limpar o conteúdo anterior antes de exibir os novos resultados
            resultDiv.innerHTML = '';

            // Exibir os resultados na página
            data.forEach((track) => {
                const trackDiv = document.createElement('div');
                trackDiv.innerHTML = `
          <p>Música: ${track.title}</p>
          <p>Artista: ${track.artist}</p>
          <p>Álbum: ${track.album}</p>
          <audio controls>
            <source src="${track.prev}" type="audio/mp3" />
            Seu navegador não suporta HTML5
          </audio>
          <hr>
        `;
                resultDiv.appendChild(trackDiv);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
