let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement("audio");

// Define the tracks that have to be played
let track_list = [
  {
    name: "The Cut That Always Bleeds",
    artist: "Conan Gray",
    image: "https://dearbornmusic.net/Photo/418462162476",
    path: "audio/Conan Gray - The Cut That Always Bleeds (Official Lyric Video).mp3",
  },
  {
    name: "To The Bone",
    artist: "Pamungkas",
    image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSA7nPPEM5GUEUwIqmpqE-6qogpYMf2lCPuC_qAfJqLk_bAjqKa",
    path: "audio/To the Bone.mp3",
  },
  {
    name: "Serpihan Hati",
    artist: "Utopia",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCEQfHhSfDF_r3n44_11q5kOK2TUTq2eUljyAtWzEt6gPz9vbw",
    path: "audio/Utopia - Serpihan Hati _ Official Video.mp3",
  },
  {
    name: "Drunk Text",
    artist: "Henry Moodie",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/61/3d/a6/613da60e-5b3d-7305-19db-ed79f5aa0b05/196589768643.jpg/1200x1200bf-60.jpg",
    path: "audio/Henry Moodie - drunk text (official video).mp3",
  },
  {
    name: "Best Part ft. H.E.R.",
    artist: "Daniel Caesar",
    image: "https://i.scdn.co/image/ab67616d0000b2733138f891f3075c9c5d944037",
    path: "audio/Daniel Caesar - Best Part (Audio) ft. H.E.R..mp3",
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
    "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

lightbox.option({
  resizeDuration: 200,
  wrapAround: true,
});
