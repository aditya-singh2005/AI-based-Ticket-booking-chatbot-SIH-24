$(document).ready(function () {
  function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      city: urlParams.get("city"),
      name: urlParams.get("name"),
    };
  }

  function loadDetails(city, name) {
    $.getJSON("../json files/full.json", function (data) {
      // Debugging
      console.log("Data loaded:", data);

      if (city) {
        // Load data for the specific city
        const cityData = data[city.toLowerCase()];
        if (cityData) {
          const item = cityData.museums.find(
            (item) => item.name.toLowerCase() === name.toLowerCase()
          );
          if (item) {
            $("#detail-image").attr("src", item.src).attr("alt", item.alt);
            $("#detail-title").text(item.name);
            $("#detail-description").text(item.description);

            // Display special events
            $("#special-events").text(
              `Special Events: ${item.special_events || "N/A"}`
            );

            // Display pricing details
            $("#price-weekday").text(
              `Weekday Entry: ${item.price_weekday || "N/A"}`
            );
            $("#price-weekend").text(
              `Weekend Entry: ${item.price_weekend || "N/A"}`
            );
            $("#price-foreign").text(
              `Foreign Entry: ${item.price_foreign || "N/A"}`
            );
          } else {
            console.error(
              `No museum found with name "${name}" in city "${city}".`
            );
          }
        } else {
          console.error(`No data found for city "${city}".`);
        }
      } else {
        // Search across all cities if no city is specified
        let found = false;
        for (const cityKey in data) {
          const items = data[cityKey].museums;
          const item = items.find(
            (item) => item.name.toLowerCase() === name.toLowerCase()
          );
          if (item) {
            $("#detail-image").attr("src", item.src).attr("alt", item.alt);
            $("#detail-title").text(item.name);
            $("#detail-description").text(item.description);

            // Display special events
            $("#special-events").text(
              `Special Events: ${item.special_events || "N/A"}`
            );

            // Display pricing details
            $("#price-weekday").text(
              `Weekday Entry: ${item.price_weekday || "N/A"}`
            );
            $("#price-weekend").text(
              `Weekend Entry: ${item.price_weekend || "N/A"}`
            );
            $("#price-foreign").text(
              `Foreign Entry: ${item.price_foreign || "N/A"}`
            );

            found = true;
            break;
          }
        }
        if (!found) {
          console.error(`No museum found with name "${name}" in any city.`);
        }
      }
    }).fail(function () {
      console.error("Error loading JSON data.");
    });
  }

  const params = getParams();
  // Debugging
  console.log("Params:", params);
  if (params.name) {
    loadDetails(params.city, params.name);
  } else {
    console.error("Name parameter is missing.");
  }
});
