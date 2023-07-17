// Select the weather form, location input, and weather data container elements
const weatherFormEl = document.querySelector('.weather-form');
const locationInputEl = document.querySelector('.weather-form__input');
const weatherDataContainerEl = document.querySelector('.weather-data');

// Add event listener to the weather form when it is submitted
weatherFormEl.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission and page refresh

    const enteredLocation = locationInputEl.value.trim(); // Get the trimmed value entered in the location input field

    if (enteredLocation === '') {
        // Display an error message if the entered location is empty
        weatherDataContainerEl.textContent = 'Please enter a valid location';
    } else {
        // Fetch weather data for the entered location and display it
        displayWeatherData(enteredLocation)
            .catch(handleError); // Handle any errors that occur during the fetch request
    }
});

// Function to create a weather information div element
const createWeatherDiv = (className, textContent) => {
    const weatherDiv = document.createElement('div'); // Create a new div element
    weatherDiv.classList.add(className); // Add the specified class name to the div
    weatherDiv.textContent = textContent; // Set the text content of the div
    return weatherDiv;
};

// Function to fetch weather data from the API based on the given location and display it
const displayWeatherData = (location) => {
    const API_KEY = '3d1853a7fd9b499794571220230607';

    return fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to fetch weather data');
            }
            return response.json(); // Parse the response JSON and return the data
        })
        .then(data => {
            console.log(data); // Log the location information to the console

            // Clear the previous content in the weather data container
            weatherDataContainerEl.textContent = '';

            // Create and append the weather information elements
            const cityDiv = createWeatherDiv('weather-data__city', data.location.name);
            const temperatureDiv = createWeatherDiv('weather-data__temperature', `${data.current.temp_c}°C`);
            const humidityDiv = createWeatherDiv('weather-data__humidity', `Humidity: ${data.current.humidity}%`);
            const currentWeatherDiv = createWeatherDiv('weather-data__current-weather', data.current.condition.text);
            const updatedAtDiv = createWeatherDiv('weather-data__updated-at', `Updated at: ${data.current.last_updated}`);
            const windDiv = createWeatherDiv('weather-data__wind', `Wind: ${data.current.wind_kph} km/h ${data.current.wind_dir}`);

            // Append the weather information elements to the weather data container
            weatherDataContainerEl.appendChild(cityDiv);
            weatherDataContainerEl.appendChild(temperatureDiv);
            weatherDataContainerEl.appendChild(humidityDiv);
            weatherDataContainerEl.appendChild(currentWeatherDiv);
            weatherDataContainerEl.appendChild(updatedAtDiv);
            weatherDataContainerEl.appendChild(windDiv);
        });
};

// Function to handle errors that occur during the fetch request
const handleError = (error) => {
    console.error('Error:', error); // Log the error message to the console

    // Display an error message in the weather data container
    weatherDataContainerEl.textContent = 'Error occurred while fetching weather data';
};
    