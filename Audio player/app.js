var audio = document.getElementById("audio");
var library = document.getElementById("library");
var buttonPlaying = document.getElementById("button-playing");

var musicList = [];

for (var i = 0; i < musicList.length; i++) {
  library.innerHTML += `<div class="music" id="${musicList[i].id}" onclick="startMusic(${musicList[i].id})">
    <h1>${musicList[i].name}</h1>
    <h4>Size: ${musicList[i].size}MB</h4>
  </div>`;
}

var musicPlaying = document.getElementById("music-playing");

if (musicPlaying.innerHTML == "") {
  musicPlaying.innerHTML = "No music is playing";
}

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

function getFile(e) {
  var file = e.target.files[0];
  fileDetails.innerHTML = `File Name: ${file.name} <br> Size: ${
    Math.round((file.size / 1024 / 1024) * 100) / 100
  }MB`;
  inputName.value = file.name.replace(".mp3", "");
}

var fileUpload = document.getElementById("file-upload");
var importFileBcg = document.getElementById("import-file-bcg");
var fileDetails = document.getElementById("file-details");

function openFile() {
  fileUpload.click();
}

var inputName = document.getElementById("name");
var idCounter = 0;

function saveSong(status) {
  var file = fileUpload.files[0];
  if (!status) {
    if (file != undefined) {
      musicList.push({
        id: idCounter++,
        name: inputName.value,
        file: "media/" + file.name,
        size: Math.round((file.size / 1024 / 1024) * 100) / 100,
      });
      library.innerHTML = "";
      for (var i = 0; i < musicList.length; i++) {
        library.innerHTML += `<div class="music" id="${musicList[i].id}" onclick="startMusic(${musicList[i].id})">
        <h1>${musicList[i].name}</h1>
        <h4>Size: ${musicList[i].size}MB</h4>
      </div>`;
      }
      inputName.value = "";
      importFileBcg.style.display = "none";
    }
  } else {
    importFileBcg.style.display = "block";
  }
}
