$(document).ready(function () {
  let cities = [];
  let museums = {};

  // Load data from JSON file
  $.getJSON("../json files/full.json", function (data) {
    // Convert keys to lowercase and store city names
    cities = Object.keys(data).map((city) => city.toLowerCase());

    // Store museums data with city as key
    museums = data;
  });

  // Handle search form submission
  $("#search-form").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission

    var query = $("#city-input").val().trim().toLowerCase(); // Get the search query

    if (query) {
      // Check if query matches any city
      if (cities.includes(query)) {
        // Redirect to city.html with the city query as a URL parameter
        window.location.href =
          "/html pages/city.html?city=" + encodeURIComponent(query);
      } else {
        // Check if query matches any museum in any city
        let foundMuseum = false;
        for (let city in museums) {
          const museumList = museums[city].museums;
          if (
            museumList.some((museum) => museum.name.toLowerCase() === query)
          ) {
            // Redirect to museum.html with the museum query as a URL parameter
            window.location.href =
              "/html pages/details.html?name=" + encodeURIComponent(query);
            foundMuseum = true;
            break;
          }
        }

        if (!foundMuseum) {
          alert("No matching city or museum found. Please try again.");
        }
      }
    } else {
      alert("Please enter a city or museum name.");
    }
  });
});
