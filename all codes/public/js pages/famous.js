$(document).ready(function () {
  // Function to load images and details for all cities and categories
  function loadImages() {
    $.getJSON("../json files/full.json", function (data) {
      const $container = $(".destination__grid");
      $container.empty(); // Clear existing content

      // Iterate over each city and its categories
      $.each(data, function (city, categories) {
        // Iterate over each category within the city
        $.each(categories, function (category, items) {
          items.forEach(function (item) {
            // Create card content with only name and description
            const $cardContent = $("<div>").addClass("card__content");

            const $imgElement = $("<img>").attr({
              src: item.src,
              alt: item.alt,
            });

            const $nameElement = $("<h2>").text(item.name);
            const $descriptionElement = $("<p>").text(item.description);

            // Append elements to the card content
            $cardContent.append($imgElement, $nameElement, $descriptionElement);

            // Create the card container
            const $card = $("<div>").addClass("destination__card").append($cardContent);

            // Append the card to the main container
            $container.append($card);

            // Add click event listener to each card
            $card.on("click", function () {
              window.location.href = `/html pages/details.html?city=${encodeURIComponent(
                city
              )}&name=${encodeURIComponent(item.name)}`;
            });3
          });
        });
      });
    }).fail(function () {
      console.error("Error loading images.");
    });
  }

  // Load images for all cities and categories
  loadImages();
});
