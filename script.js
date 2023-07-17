// Select the weather form, location input, and weather data container elements
const weatherFormElement = document.querySelector('.weather-form');
const locationInputElement = document.querySelector('.weather-form__input');
const weatherDataContainerElement = document.querySelector('.weather-data');

// Add event listener to the weather form when it is submitted
weatherFormElement.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission and page refresh

    const enteredLocation = locationInputElement.value; // Get the value entered in the location input field

    // Fetch weather data for the entered location and display it
    displayWeatherData(enteredLocation)
        .catch(handleError); // Handle any errors that occur during the fetch request
});

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
            console.log(data.location); // Log the location information to the console

            // Clear the previous content in the weather data container
            weatherDataContainerElement.textContent = '';
            
            // Display the specific message with temperature information
                const temperatureMessage = `Current temperature in ${data.location.name} is ${data.current.temp_c}°C`;
                const temperatureParagraph = document.createElement('p');
                temperatureParagraph.textContent = temperatureMessage;
                weatherDataContainerElement.appendChild(temperatureParagraph);

            // Iterate over the object properties using Object.entries()
            console.log(Object.entries(data.current))
            Object.entries(data.current).forEach(([key, value]) => {
                // Create a new paragraph element
                const paragraphElement = document.createElement('p');

                // Set the content of the paragraph with the key-value pair
                paragraphElement.textContent = `${key}: ${value}`;

                // Append the paragraph element to the weather data container
                weatherDataContainerElement.appendChild(paragraphElement);
            });
        });
};


// Function to handle errors that occur during the fetch request
const handleError = (error) => {
    console.error('Error:', error); // Log the error message to the console

    // Display an error message in the weather data container
    weatherDataContainerElement.textContent = 'Error occurred while fetching weather data';
};
