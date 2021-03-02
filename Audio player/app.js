var test = document.getElementById("current-time");
var audio = document.getElementById("audio");
var buttonPlaying = document.getElementById("button-playing");

function startMusic(file) {
  audio.src = "media/" + file + ".mp3";
  audio.currentTime = 0;
  audio.volume = 0.01;
  audio.play();
}

var getTime;
buttonPlaying.addEventListener("click", function () {
  if (this.innerHTML == "Pustanje") {
    this.innerHTML = "Pauzirano";
    getTime = audio.currentTime;
    audio.pause();
  } else {
    this.innerHTML = "Pustanje";
    audio.currentTime = getTime;
    audio.play();
  }
});

setInterval(function () {
  console.log(audio.currentTime);
}, 1000);
