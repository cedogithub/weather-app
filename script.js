// Select the weather form, location input, and weather data container elements
const weatherFormEl = document.querySelector(".weather-form");
const locationInputEl = document.querySelector(".weather-form__input");
const weatherDataContainerEl = document.querySelector(".weather-data");
const defaultLocation = "Montreal";

// Add event listener to the weather form when it is submitted
weatherFormEl.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission and page refresh

  const enteredLocation = locationInputEl.value.trim(); // Get the trimmed value entered in the location input field

  if (enteredLocation === "") {
    // Display an error message if the entered location is empty
    weatherDataContainerEl.textContent = "Please enter a valid location";
  } else {
    // Fetch weather data for the entered location and display it
    displayWeatherData(enteredLocation).catch(handleError); // Handle any errors that occur during the fetch request
  }
});

// Function to create a weather information div element
const createWeatherDiv = (className, textContent) => {
  const weatherDiv = document.createElement("div"); // Create a new div element
  weatherDiv.classList.add(className); // Add the specified class name to the div
  weatherDiv.textContent = textContent; // Set the text content of the div
  return weatherDiv;
};

// Function to fetch weather data from the API based on the given location and display it
const displayWeatherData = (location) => {
  const API_KEY = "3d1853a7fd9b499794571220230607";

  return fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to fetch weather data");
      }
      return response.json(); // Parse the response JSON and return the data
    })
    .then((data) => {
      // Clear the previous content in the weather data container
      weatherDataContainerEl.textContent = "";

      // Create the card div
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("weather-card");

      // Create the card body div
      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.classList.add("weather-card__body");

      // Create and append the weather information elements to the card body div
      const cityDiv = createWeatherDiv(
        "weather-data__city",
        data.location.name
      );
      const humidityDiv = createWeatherDiv("weather-data__humidity");
      humidityDiv.innerHTML = `<i class="fas fa-droplet"></i> ${data.current.humidity}%`;
      const currentWeatherDiv = createWeatherDiv(
        "weather-data__current-weather",
        data.current.condition.text
      );
      const last_updated = data.current.last_updated;
      const timeString = last_updated.split(" ")[1];
      const updatedAtDiv = createWeatherDiv(
        "weather-data__updated-at",
        `Updated at : ${timeString}`
      );
      const windDiv = createWeatherDiv("weather-data__wind");
      windDiv.innerHTML = `<i class="fas fa-wind"></i> ${data.current.wind_kph} km/h ${data.current.wind_dir}`;

      // Create two separate temperature divs for Celsius and Fahrenheit
      const temperatureDivC = createWeatherDiv(
        "weather-data__temperature",
        `${data.current.temp_c}°C`
      );
      const temperatureDivF = createWeatherDiv(
        "weather-data__temperature",
        `${data.current.temp_f}°F`
      );
      // Initially hide the Fahrenheit temperature div
      temperatureDivF.style.display = "none";

      // Append the temperature divs to the card body div

      // Create the weather icon element
      const weatherIconUrl = data.current.condition.icon;
      const weatherIconEl = document.createElement("img");
      weatherIconEl.src = weatherIconUrl;
      weatherIconEl.style.width = "90px";
      weatherIconEl.classList.add("weather-data__icon");

      // Append the weather information elements to the card body div
      cardBodyDiv.appendChild(cityDiv);
      cardBodyDiv.appendChild(updatedAtDiv);
      cardBodyDiv.appendChild(weatherIconEl); // Add the weather icon element
      cardBodyDiv.appendChild(temperatureDivC);
      cardBodyDiv.appendChild(temperatureDivF);
      cardBodyDiv.appendChild(currentWeatherDiv);
      cardBodyDiv.appendChild(humidityDiv);
      cardBodyDiv.appendChild(windDiv);

      // Append the card body div to the card div
      cardDiv.appendChild(cardBodyDiv);

      // Append the card div to the weather data container
      weatherDataContainerEl.appendChild(cardDiv);

      // Trigger the animation using GSAP
      gsap.fromTo(
        cardDiv,
        {
          opacity: 0,
          scale: 0.5,
          transformOrigin: "bottom",
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.2,
        }
      );

      // Add event listener to the toggle button
      const toggleCheckbox = document.getElementById("check");
      toggleCheckbox.addEventListener("change", () => {
        // Toggle the display of Celsius and Fahrenheit temperature divs
        temperatureDivC.style.display = toggleCheckbox.checked
          ? "none"
          : "block";
        temperatureDivF.style.display = toggleCheckbox.checked
          ? "block"
          : "none";
      });
    });
};

// Function to handle errors that occur during the fetch request
const handleError = (error) => {
  console.error("Error:", error); // Log the error message to the console

  // Display an error message in the weather data container
  weatherDataContainerEl.textContent =
    "Error occurred while fetching weather data, check the spelling.";
};

displayWeatherData(defaultLocation);
