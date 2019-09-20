//players
var players = ["LeBron James", "Kevin Durant", "James Harden", "Giannis Antetokounmpo", "Anthony Davis", "Russel Westbrook", "Stephen Curry", "Kawhi Leonard"];
var button;
var newPlayer = "";

// function to add players
var playerGenerator = function () {

	$("#buttonArea").empty();

	for (i = 0; i < players.length; i++) {
		button = $("<button type=" + "button" + ">" + players[i] + "</button>").addClass("btn btn-warning").attr("data", players[i]);
		$("#buttonArea").append(button);
	};
}


//click to add static gifs
$("#buttonArea").on("click", ".btn", function () {
	var thing = $(this).attr("data");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thing + "&api_key=uuiPQbmofHAVIMt6hFWzF5xD0kUlX5Vp&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function (response) {

		var results = response.data;

		for (var i = 0; i < results.length; i++) {

			var playerDiv = $("<div>");

			//rating
			var p = $("<p>");
			p.text(results[i].rating);
			var p = $("<p>").text("Rating: " + results[i].rating);

			var playerImage = $("<img>").addClass("greenBorder");

			//animate states
			playerImage.attr("src", results[i].images.fixed_height_still.url);
			playerImage.attr("data-still", results[i].images.fixed_height_still.url);
			playerImage.attr("data-animate", results[i].images.fixed_height.url)
			playerImage.attr("data-state", "still")
			playerImage.addClass("gif");

			playerDiv.append(playerImage);
			playerDiv.append(p);
			$("#gifArea").prepend(playerDiv);
		}
	})
})


//animate on click
$("#gifArea").on("click", ".gif", function (event) {
	event.preventDefault();

	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
	else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}

})

//generate player
$(".submit").on("click", function (event) {
	event.preventDefault();

	newPlayer = $("#topic-input").val();

	players.push(newPlayer);
	playerGenerator();
});

playerGenerator();