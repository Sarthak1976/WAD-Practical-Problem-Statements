const btn = document.getElementById("searchBtn");

let localWeatherMap = {};
fetch("weather.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Could not load weather.json");
    }
    return response.json();
  })
  .then((data) => {
    localWeatherMap = data;
    console.log("Data loaded successfully into memory!");
    console.log("Here is the full data object:", localWeatherMap);
  })
  .catch((error) => {
    console.log("Error:" + error);
  });

btn.addEventListener("click", function () {
  const city = document.getElementById("cityInput").value.trim().toLowerCase();

  if (city === "") {
    alert("Enter the city name first !");
    return;
  }

  if (localWeatherMap[city]) {
    document.getElementById("resultsCard").innerHTML =
      `<h3 class="card-title fw-bold text-primary">${city.toUpperCase()}</h3>
                        <p class="fs-5 mb-1">Temperature: <span class="fw-bold">${localWeatherMap[city].temperature}</span></p>
                        <p class="fs-5 mb-1">Humidity: <span class="fw-bold">${localWeatherMap[city].humidity}</span></p>
                        <p class="fs-5 mb-0">Condition: <span class="fw-bold">${localWeatherMap[city].condition}</span></p>`;

    document.getElementById("resultsCard").style.display = "block";
  } else {
    document.getElementById("errorMsg").style.display = "block";
  }
});
