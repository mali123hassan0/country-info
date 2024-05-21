async function getCountryInfo() {
    const countryName = document.getElementById('country-input').value;
    if (countryName === '') {
        alert('Please enter a country name');
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) {
            throw new Error('Country not found');
        }
        const countryData = await response.json();
        displayCountryInfo(countryData[0]);
    } catch (error) {
        alert(error.message);
    }
}

function displayCountryInfo(country) {
    const countryInfoDiv = document.getElementById('country-info');
    countryInfoDiv.innerHTML = `
    <p><strong>Flag:</strong></p>
    <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="100">
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
        <p><strong>Currencies:</strong> ${Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</p>
   
       
    `;
}