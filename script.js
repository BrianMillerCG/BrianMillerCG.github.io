
document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city');
    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('interestForm');
    const statusRadios = document.querySelectorAll('input[name="status"]');
    const suggestionContainer = document.getElementById('suggestion-container');

    let selectedCity = ""; // To track the selected city from suggestions

    const cities = [
        // Ensure all your cities are included here
        'Albuquerque, NM', 'Alexandria, VA', 'Atlanta, GA', 'Austin, TX', 'Baltimore, MD', 'Boston, MA',
        'Charlotte, NC', 'Chicago, IL', 'Cleveland, OH', 'Colorado Springs, CO', 'Columbus, OH',
        'Dallas, TX', 'Denver, CO', 'Detroit, MI', 'El Paso, TX', 'Fort Worth, TX',
        'Fresno, CA', 'Houston, TX', 'Indianapolis, IN', 'Jacksonville, FL', 'Kansas City, MO',
        'Las Vegas, NV', 'Los Angeles, CA', 'Louisville, KY', 'Memphis, TN', 'Mesa, AZ',
        'Miami, FL', 'Milwaukee, WI', 'Minneapolis, MN', 'Nashville, TN', 'New Orleans, LA',
        'New York, NY', 'Norfolk, VA', 'Oakland, CA', 'Oklahoma City, OK', 'Omaha, NE', 'Philadelphia, PA',
        'Phoenix, AZ', 'Portland, OR', 'Raleigh, NC', 'Sacramento, CA', 'San Antonio, TX',
        'San Diego, CA', 'San Francisco, CA', 'San Jose, CA', 'Seattle, WA', 'Tampa, FL',
        'Tucson, AZ', 'Tulsa, OK', 'Virginia Beach, VA', 'Washington, DC', 'Wichita, KS',
    ];

    function enableSubmitIfValid() {
        const isEmailValid = emailInput.value.trim() !== '';
        const isStatusSelected = Array.from(statusRadios).some(radio => radio.checked);
        submitBtn.disabled = !(isStatusSelected && selectedCity && isEmailValid);
    }

    cityInput.addEventListener('input', function() {
        const inputVal = cityInput.value.toLowerCase();
        suggestionContainer.innerHTML = '';
        const matchedCities = cities.filter(city => city.toLowerCase().startsWith(inputVal));

        if (matchedCities.length) {
            suggestionContainer.style.display = 'block';
            matchedCities.forEach(city => {
                const suggestion = document.createElement('div');
                suggestion.textContent = city;
                suggestion.className = 'suggestion';
                suggestion.onclick = function() {
                    cityInput.value = city;
                    selectedCity = city; // Update the selectedCity when a suggestion is clicked
                    suggestionContainer.innerHTML = '';
                    suggestionContainer.style.display = 'none';
                    enableSubmitIfValid();
                };
                suggestionContainer.appendChild(suggestion);
            });
        } else {
            suggestionContainer.style.display = 'none';
        }
    });

    cityInput.addEventListener('blur', function() {
        if (cityInput.value && !cities.includes(cityInput.value)) {
            alert("The city you entered is not on the list. Please select a city from the suggestions.");
            cityInput.value = '';
            selectedCity = ""; // Reset selected city
        }
        enableSubmitIfValid();
    });

    emailInput.addEventListener('input', enableSubmitIfValid);
    statusRadios.forEach(radio => radio.addEventListener('change', enableSubmitIfValid));

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (submitBtn.disabled) {
            if (!selectedCity) {
                alert("Please select a city from the suggestions.");
            } else if (emailInput.value.trim() === '') {
                alert("Please enter an email address.");
            } else if (!Array.from(statusRadios).some(radio => radio.checked)) {
                alert("Please select your status.");
            }
        } else {
            alert("Your form has been submitted. Thank you!");
            clearFormFields();
        }
    });

    function clearFormFields() {
        cityInput.value = '';
        emailInput.value = '';
        statusRadios.forEach(radio => radio.checked = false);
        selectedCity = "";
        enableSubmitIfValid();
    }
});
