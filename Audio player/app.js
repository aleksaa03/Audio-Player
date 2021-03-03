var audio = document.getElementById("audio");
var library = document.getElementById("library");
var buttonPlaying = document.getElementById("button-playing");

var musicList = [
  {
    id: 0,
    name: "Load Indian Music",
    file: "media/loud_indian_music.mp3",
  },
  {
    id: 1,
    name: "Hot",
    file: "media/hot.mp3",
  },
];

for (var i = 0; i < musicList.length; i++) {
  library.innerHTML += `<div class="music" id="${musicList[i].id}" onclick="startMusic(${musicList[i].id})">
    <h1>${musicList[i].name}</h1>
  </div>`;
}

var musicPlaying = document.getElementById("music-playing");

function startMusic(id) {
  for (var i = 0; i < musicList.length; i++) {
    if (musicList[i].id == id) {
      musicPlaying.innerHTML = musicList[i].name;
      audio.src = musicList[i].file;
      audio.currentTime = 0;
      audio.volume = 0.01;
      buttonPlaying.className = "fas fa-play";
      audio.play();
    }
  }
}

var getTime;

buttonPlaying.addEventListener("click", function () {
  if (this.className == "fas fa-play") {
    this.className = "fas fa-pause";
    getTime = audio.currentTime;
    audio.pause();
  } else {
    this.className = "fas fa-play";
    audio.currentTime = getTime;
    audio.play();
  }
});

function test(e) {
  console.log(e.target.files[0]);
  var getValue = e.target.value;
  musicList.push({
    id: 1,
    name: "Hot",
    file: "media/" + getValue.replace("C:\\fakepath\\", ""),
    size: Math.round((e.target.files[0].size / 1048576) * 100) / 100, //to MB
  });
  console.log(musicList);
}
