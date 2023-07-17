// Select the weather form, location input, and weather data container elements
const weatherFormElement = document.querySelector('.weather-form');
const locationInputElement = document.querySelector('.weather-form__input');
const weatherDataContainerElement = document.querySelector('.weather-data');
const defaultLocation = 'Paris';
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
      console.log(data); // Log the location information to the console
      
      // Populate the weather data into the HTML elements
      const cityElement = document.querySelector('.weather-data__city');
      const currentWeatherElement = document.querySelector('.weather-data__current-weather');
      const temperatureElement = document.querySelector('.weather-data__temperature');
      const updatedAtElement = document.querySelector('.weather-data__updated-at');
      const windElement = document.querySelector('.weather-data__wind');
      const humidityElement = document.querySelector('.weather-data__humidity');

      cityElement.textContent = data.location.name;
      currentWeatherElement.textContent = data.current.condition.text;
      temperatureElement.textContent = `${data.current.temp_c}°C`;
      updatedAtElement.textContent = `Updated at: ${data.current.last_updated}`;
      windElement.textContent = `Wind: ${data.current.wind_kph} km/h ${data.current.wind_dir}`;
      humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
    });
};


// Function to handle errors that occur during the fetch request
const handleError = (error) => {
    console.error('Error:', error); // Log the error message to the console

    // Display an error message in the weather data container
    weatherDataContainerElement.textContent = 'Error occurred while fetching weather data';
};
displayWeatherData(defaultLocation)