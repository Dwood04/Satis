// This file contains the main JavaScript logic for the visual organizer tool. 
// It handles tracking production rates, identifying bottlenecks, and updating the UI based on production data.

document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/data/production.json')
        .then(response => response.json())
        .then(data => {
            initializeApp(data);
        })
        .catch(error => console.error('Error loading production data:', error));
});

function initializeApp(data) {
    // Process the production data and set up the UI
    const productionRates = data.productionRates;
    const bottlenecks = identifyBottlenecks(productionRates);
    updateUI(productionRates, bottlenecks);
}

function identifyBottlenecks(productionRates) {
    // Logic to identify bottlenecks in the production rates
    const bottlenecks = [];
    // Example logic: Check for production rates below a certain threshold
    productionRates.forEach(rate => {
        if (rate.output < rate.required) {
            bottlenecks.push(rate);
        }
    });
    return bottlenecks;
}

function updateUI(productionRates, bottlenecks) {
    // Logic to update the user interface with production rates and bottlenecks
    const productionList = document.getElementById('production-list');
    productionList.innerHTML = '';

    productionRates.forEach(rate => {
        const listItem = document.createElement('li');
        listItem.textContent = `Production: ${rate.output}, Required: ${rate.required}`;
        if (bottlenecks.includes(rate)) {
            listItem.classList.add('bottleneck');
        }
        productionList.appendChild(listItem);
    });
}