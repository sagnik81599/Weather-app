 const apiKey = "f73259f959c7dbe6d5b7afc839c84502";

    window.onload = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          getWeatherByCoords(lat, lon);
        });
      }
    };

    function getWeatherByCoords(lat, lon) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch(() => alert("Location weather not found"));
    }

    function getWeatherByCity() {
      const city = document.getElementById("cityInput").value.trim();
      if (!city) return;
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`)
        .then((response) => {
          if (!response.ok) throw new Error("City not found");
          return response.json();
        })
        .then((data) => displayWeather(data))
        .catch(() => alert("City not found. Please check the name."));
    }

    function displayWeather(data) {
      document.getElementById("location").textContent = data.name;
      document.getElementById("temperature").textContent = `${data.main.temp} °C`;
      document.getElementById("condition").textContent = data.weather[0].main;
      document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    }