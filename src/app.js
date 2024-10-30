const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

async function fetchCoffeeShops(location) {
    const response = await fetch(`https://api.coffeeshopfinder.com/shops?location=${location}&key=${apiKey}`);
    const data = await response.json();
    return data.shops;
}

function displayCoffeeShops(shops) {
    const coffeeShopsDiv = document.getElementById('coffee-shops');
    coffeeShopsDiv.innerHTML = '';

    shops.forEach(shop => {
        const shopDiv = document.createElement('div');
        shopDiv.classList.add('shop');

        const name = document.createElement('h2');
        name.textContent = shop.name;
        shopDiv.appendChild(name);

        const address = document.createElement('p');
        address.textContent = `${shop.address}, ${shop.city}, ${shop.state} ${shop.zip}`;
        shopDiv.appendChild(address);

        coffeeShopsDiv.appendChild(shopDiv);
    });
}

function displayMap(location) {
    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = '';

    const map = new google.maps.Map(mapDiv, {
        center: location,
        zoom: 12
    });

    const marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

document.getElementById('location-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;

    let location = city && state ? `${city},${state}` : zip;

    const shops = await fetchCoffeeShops(location);
    displayCoffeeShops(shops);

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': location }, (results, status) => {
        if (status === 'OK') {
            displayMap(results[0].geometry.location);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
});
