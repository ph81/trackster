
var Trackster = {};

var API_KEY = 'ea3f97421d04a8631a35d75c3e7f9838';

/* Calling function */

$(document).ready(function() {
  $('#search-btn').click(function () {

    Trackster.searchTracksByTitle($('#search-field').val());

  });
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/

Trackster.renderTracks = function(tracks) {
  console.log('render tracks');
  var $tracklist = $('#tracklist');
  console.log(tracklist);
  $tracklist.empty();

  // recorriendo json
  for (var i = 0; i < tracks.length; i++) {

    var track = tracks[i];
    console.log(i);
    var coverAlbum = track.image[1]["#text"];
  // construyendo elementos html para c/track
    var htmlTrackRow =
    '<div class="row track">' +
    '  <div class="col-xs-1 col-xs-offset-1 play-button">' +
    '    <a href="'+ track.url + '" target="_blank">' +
    '      <i class="fa fa-play-circle-o fa-2x"></i>' +
    '    </a>' +
    '  </div>' +
    '  <div class="col-xs-4">' + track.name + '</div>' +
    '  <div class="col-xs-2">' + track.artist + '</div>' +
    '  <div class="col-xs-2"><img src="' + coverAlbum + '"/></div>' +
    '  <div class="col-xs-2">' + track.listeners + '</div>' +
    '</div>';
      console.log(htmlTrackRow);
    $tracklist.append(htmlTrackRow);

  }

};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/



Trackster.searchTracksByTitle = function(title) {

//accesando API

  var api_url = 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json';
  console.log(api_url);
/*
  $.getJSON(api_url, function(response) {
	console.log('PASS');
});

*/

  $.ajax({
      url: api_url,
      success: function(response) {
        console.log('PASS');
        Trackster.renderTracks(response.results.trackmatches.track);
      },
      error: function(response) {
        console.log(response);
      }
});
};
