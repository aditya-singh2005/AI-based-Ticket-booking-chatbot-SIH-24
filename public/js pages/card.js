$(document).ready(function () {
  function capitalizeCity(city) {
    return city.charAt(0).toUpperCase() + city.slice(1);
  }

  function populateCityDropdown(selectedCity) {
    $.getJSON("../json files/full.json", function (data) {
      const $dropdown = $("#category-dropdown");
      $dropdown.empty(); // Clear existing options

      // Append a default disabled option
      $dropdown.append('<option value="" disabled>Select a City</option>');

      // Populate cities based on data
      $.each(data, function (city) {
        const cityName = capitalizeCity(city);
        const isSelected =
          city === selectedCity.toLowerCase() ? "selected" : "";
        $dropdown.append(
          $("<option></option>")
            .attr("value", city)
            .attr("selected", isSelected)
            .text(cityName)
        );
      });

      // Set the default selected option
      $dropdown.val(selectedCity.toLowerCase());
    }).fail(function () {
      console.error("Error loading city data.");
    });
  }

  function loadImages(city) {
    $.getJSON("../json files/full.json", function (data) {
      const cityData = data[city.toLowerCase()];
      if (cityData) {
        const $container = $(".destination__grid");
        $container.empty();

        $.each(cityData.museums, function (index, item) {
          const $cardContent = $("<div>").addClass("card__content");
          const $imgElement = $("<img>").attr({
            src: item.src,
            alt: item.alt,
          });
          const $nameElement = $("<h2>").text(item.name);
          const $descriptionElement = $("<p>").text(item.description);

          $cardContent.append($imgElement, $nameElement, $descriptionElement);

          const $card = $("<div>")
            .addClass("destination__card")
            .append($cardContent);

          $card.on("click", function () {
            window.location.href = `/html pages/details.html?city=${encodeURIComponent(
              city
            )}&name=${encodeURIComponent(item.name)}`;
          });

          $container.append($card);
        });

        $("#city-name").text(`${capitalizeCity(city)}`);
      } else {
        console.error(`No data found for city "${city}".`);
      }
    }).fail(function () {
      console.error("Error loading images.");
    });
  }

  function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      city: urlParams.get("city") || null,
    };
  }

  const params = getParams();
  if (params.city) {
    populateCityDropdown(params.city);
    loadImages(params.city);
  } else {
    console.error("No city specified in URL parameters.");
  }

  $("#category-dropdown").change(function () {
    const selectedCity = $(this).val();
    if (selectedCity) {
      window.location.href = `/html pages/city.html?city=${encodeURIComponent(
        selectedCity
      )}`;
    } else {
      console.error("City is missing.");
    }
  });
});
