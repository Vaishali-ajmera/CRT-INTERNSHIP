const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const singer = document.getElementById("singer");
const cover = document.getElementById("cover");


// Songs info
// console.log(songs_list);

function getDarkColor(color) {
    const darkFactor = 0.6; // Adjust this value for desired darkness level
    const rgbValues = color.match(/\d+/g);
    const darkColor = rgbValues.map(value => Math.floor(value * darkFactor));
    return `rgb(${darkColor.join(", ")})`;
  }
  

//random background color
function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
   
    // Construct a color with the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    // console.log(bgColor)
   
    // Set the background to the new color
    const darkColor = getDarkColor(bgColor);
    document.body.style.background = bgColor;
    progress.style.backgroundColor = darkColor;
}

// KeepTrack of song
let songIndex = 0;
// Initially load song details into DOM
loadSong(songs_list[songIndex]);
// Update song details
function loadSong(song) {
    title.innerText = song.name;
    singer.innerText = song.Singer;
    audio.src = song.Song;
    cover.src = song.Image;

    // Apply a random background color
    random_bg_color();
}
// Play Song
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fa").classList.remove("fa-play-circle");
    playBtn.querySelector("i.fa").classList.add("fa-pause-circle");
    audio.play();
}
// Pause Song
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fa").classList.add("fa-play-circle");
    playBtn.querySelector("i.fa").classList.remove("fa-pause-circle");
    audio.pause();
}
// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs_list.length - 1;
    }
    loadSong(songs_list[songIndex]);
    playSong();
}
// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs_list.length - 1) {
        songIndex = 0;
    }
    loadSong(songs_list[songIndex]);
    playSong();
}
// Update Progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPerCent = (currentTime / duration) * 100;
    progress.style.width = `${progressPerCent}%`;
}
// Set Progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
// Event Listeners
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});
// Change Song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
// Time/Song Update
audio.addEventListener("timeupdate", updateProgress);
// Click On progress Bar
progressContainer.addEventListener("click", setProgress);
// Song End
audio.addEventListener("ended", nextSong);