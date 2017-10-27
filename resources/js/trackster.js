
var Trackster = {};

var API_KEY = 'ea3f97421d04a8631a35d75c3e7f9838';

var query = 'none';

var sortValue = 0;
var sortOption = 1;


$(document).ready(function() {
  $('#search-btn').click(function (event) {

    // cancelling default event
    event.preventDefault();

    Trackster.searchTracksByTitle($('#search-field').val());

    //sorting by field

    $(".sort").click(function() {

      switch (sortValue) {
      case "none":
        break;
      case "track":
        switch ($(this).text()) {
          case "Song ":
            Trackster.columnSort("name");
            break;
          case "Artist ":
            Trackster.columnSort("artist");
            break;
            /*
          case "Art. ":
            Trackster.columnSort("artist");
            break;
            */
          case "Listeners ":
            Trackster.columnSort("listeners");
            break;
            /*
          case "Pop. ":
            Trackster.columnSort("listeners");
            break;
            */
        }
        break;
      case "artist":
        switch ($(this).text()) {
          case "Song ":
            break;
          case "Artist ":
            Trackster.columnSort("name");
            break;
          case "Art. ":
            Trackster.columnSort("name");
            break;
          case "Popularity ":
            Trackster.columnSort("listeners");
            break;
          case "Pop. ":
            Trackster.columnSort("listeners");
            break;
        }
        break;
      }
    });

  });
});

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/

Trackster.searchTracksByTitle = function(title) {

  // logo animated
  $('.title').addClass("animate");

  //assembling URL

  var api_url = 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json';
  console.log(api_url);

  $.ajax({
    dataType: "json",
    url: api_url,
        success: function(response) {
          console.log('PASS');
          //Trackster.renderTracks(response.results.trackmatches.track);
          Tracks = response.results.trackmatches.track;
          Trackster.renderTracks(Tracks);
          sortValue = 'track';
          //logo goes back to normal searchTracksByTitle
          $('.title').removeClass("animate");

        },
        error: function(response) {
          console.log(response);
        }
  });
};

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
    '  <div class="col-xs-2 artist">' + track.artist + '</div>' +
    '  <div class="col-xs-2"><img src="' + coverAlbum + '"/></div>' +
    '  <div class="col-xs-2">' + track.listeners + '</div>' +
    '</div>';
      console.log(htmlTrackRow);
    $tracklist.append(htmlTrackRow);

  }

};

/* Sorting fields */

Trackster.columnSort = function(columnID) {
  switch (sortValue) {
    case "track":
      if (columnID === "listeners") {
        if (sortOption === 1) {
          Tracks.sort(function(a, b) {
            sortOption = 0;
            return b[columnID] - a[columnID];
          });
        } else {
          Tracks.sort(function(a, b) {
            sortOption = 1;
            return a[columnID] - b[columnID];
          });
        }
      } else {
        if (sortOption === 1) {
          Tracks.sort(function(a, b) {
            sortOption = 0;
            return (a[columnID]).localeCompare(b[columnID]);
          });
        } else {
          Tracks.sort(function(a, b) {
            sortOption = 1;
            return (b[columnID]).localeCompare(a[columnID]);
          });
        }
      }
      Trackster.renderTracks(Tracks);
      break;
    case "artist":
      if (columnID === "listeners") {
        if (sortOption === 1) {
          Artists.sort(function(a, b) {
            sortOption = 0;
            return b[columnID] - a[columnID];
          });
        } else {
          Artists.sort(function(a, b) {
            sortOption = 1;
            return a[columnID] - b[columnID];
          });
        }
      } else {
        if (sortOption === 1) {
          Artists.sort(function(a, b) {
            sortOption = 0;
            return (a[columnID]).localeCompare(b[columnID]);
          });
        } else {
          Artists.sort(function(a, b) {
            sortOption = 1;
            return (b[columnID]).localeCompare(a[columnID]);
          });
        }
      }
      //Trackster.renderArtists(Artists);
      break;
  }
};
