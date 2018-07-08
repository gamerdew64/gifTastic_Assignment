// This code will need to be executed when the DOM has fully loaded
$(document).ready(function()
{
  // This function controls the timing and fade of our loading gif. This will last for 3 seconds.
  $("#loader").delay(5000).fadeOut("fast");
});

// This populates and/or initializes the buttons with the contents from the array when the page loads
$(function(){
  initializeButtons(teamsArray,'searchButton','#teamButtons');
  // Added a console.log() to make sure that the page loaded successfully - so that I can make sure that the items in the array are getting loaded.
   // console.log("The page has successfully loaded");
});

// Initial array of NBA Teams
var teamsArray = ["Boston Celtics", "Chicago Bulls", "Dallas Mavericks", "Detroit Pistons", "Houston Rockets", "Los Angeles Clippers", "Memphis Grizzlies", "Milwaukee Bucks",
"New Orleans Pelicans", "Oklahoma City Thunder", "Philadelphia 76ers", "Portland Trail Blazers", "San Antonio Spurs", "Utah Jazz"];

// This function populates the buttons with the following parameters - the array of teams, the new class to add to every button, and the area that it is getting added to
function initializeButtons(teamsArray,newClass,addMeArea)
{
  // Empties out the buttons area every time we add a new button, or else we will have copies of the buttons
  $(addMeArea).empty();

  for(var i=0;i<teamsArray.length;i++)
  {
    // Creating a new button, and assigning it to a new variable, called "newVariable"
    var newVariable = $('<button>');
    // Adding a class to the above created button
    newVariable.addClass(newClass);
    // We will be adding a type of data that is equal to the string in our array
    newVariable.attr('data-type',teamsArray[i]);
    // text of button will be equal to an item in the teamsArray
    newVariable.text(teamsArray[i]);
    // Adds this info to the new button that was created
    $(addMeArea).append(newVariable);
  }
}

$(document).on('click','.searchButton',function()
{
  $("#gifsDiv").empty();
  // Grabbing and storing the type property value from the button
  var team = $(this).data('type');
  // Constructing a queryURL using the team name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +team+ "&api_key=THiMziPpTvbLOhEZiNu85WdpXqoeyFp9&limit=10";
  // Performing an AJAX request with the queryURL
  $.ajax({
    url:queryURL,
    method:'GET'
  })
    // After data comes back from the request
    .done(function(response)
    {
      // Making sure that responses were showing in the console - commenting out
      // console.log(response);

      // Looping through the response.data.length item, but this goes through the data from the AJAX request until we reach the length of the array.
      for(var i=0; i<response.data.length;i++)
      {
        //Creating a new variable called teamDiv that is assigned to an empty div with the class of search-item
        var teamDiv = $('<div class="search-item">');
        // Creating a new variable that stores the title data for the GIF
        var teamTitle = response.data[i].title;
        // Creating a paragraph tag with the result GIF's title
        var pTitle = $("<p>").text("Gif Title: " +teamTitle);
        // Creating a new variable that stores the rating data for the GIF
        var teamRating = response.data[i].rating;
        // Creating a paragraph tag with the result GIF's rating
        var pRating = $('<p>').text('GIF Rating: '+teamRating);
        // Creating a new variable that stores the URL data for the GIF
        var teamURL = response.data[i].url;
        // Creating a paragraph tag with the result GIF's URL
        var pURL = $('<p>').text('GIF URL: '+teamURL);
        // Creating a new animated variable assigning it to the fixed height response data (animiated) url
        var animatedState = response.data[i].images.fixed_height.url;
        // Creating a new animated variable assigning it to the fixed height response data (still) url
        var stillState = response.data[i].images.fixed_height_still.url;
        // Creating and storing an image tag
        var image = $('<img>');

        image.attr('src',stillState);
        image.attr('data-still',stillState);
        image.attr('data-animated',animatedState);
        image.attr('data-state','still');
        image.addClass('searchImage');
        // Appending the paragraph tag with the title to the teamDiv
        teamDiv.append(pTitle);
        // Appending the paragraph tag with the rating to the teamDiv
        teamDiv.append(pRating);
        // Appending the paragraph tag with the URL to the teamDiv
        teamDiv.append(pURL);
        // Appending image to the teamDiv
        teamDiv.append(image);
        // Prependng the teamDiv to the HTML page in the "#gifsDiv" div
        $('#gifsDiv').append(teamDiv);
      }
    })
});

// This function uses the input from the user to generate a new button in our list with another NBA team
$('#addTeam').on('click',function(){
  // Creating a new variable that is assigned to the input that the user enters in the "Add A Team" input box.
  var newTeam = $('input').val();
  // This pushes the newly inputed team into the teamsArray
  teamsArray.push(newTeam);
  // This populates and/or initializes the buttons with the contents from the array when the page loads
  initializeButtons(teamsArray,'searchButton','#teamButtons');
  // This is a submit type button that will try to reload the page, anytime it is clicked. Adding a return false will prevent the website from reloading after submitting.
  return false;
});

// When the user clicks the gif, this fuction will run, toggling the state from still to animate, and vice versa.
$(document).on('click','.searchImage',function()
{
  var state = $(this).attr('data-state');
  if(state == 'still')
  {
    // This toggles the state to animated
    $(this).attr('src',$(this).data('animated'));
    $(this).attr('data-state','animated');
  } else
  {
    // This toggles the state to still
    $(this).attr('src',$(this).data('still'));
    $(this).attr('data-state','still');
  }
});
