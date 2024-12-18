const apiKey = '01887645-561a-4b99-87bd-d1072bb90a1d'; // Replace with your API key

document.getElementById('getPrice').addEventListener('click', () => {
  const crypto = document.getElementById('cryptoInput').value.toUpperCase();

  if (crypto) {
    fetchPrice(crypto);
  } else {
    alert('Please enter a cryptocurrency symbol (e.g., BTC, ETH)');
  }
});

function fetchPrice(crypto) {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}&convert=USD`;

  fetch(url, {
    method: 'GET',
    headers: {
      'X-CMC_PRO_API_KEY': apiKey,
      'Accept': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) throw new Error('Cryptocurrency not found');
      return response.json();
    })
    .then(data => displayPrice(crypto, data))
    .catch(error => {
      document.getElementById('priceDisplay').innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}

function displayPrice(crypto, data) {
  const priceDisplay = document.getElementById('priceDisplay');
  const price = data.data[crypto]?.quote?.USD?.price;

  if (price) {
    priceDisplay.innerHTML = `
      <p>💰 Current price of <strong>${crypto}</strong>: $${price.toFixed(2)}</p>
    `;
  } else {
    priceDisplay.innerHTML = `<p style="color: red;">Data not available for "${crypto}"</p>`;
  }
}
