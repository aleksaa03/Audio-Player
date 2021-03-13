var audio = document.getElementById("audio");
var library = document.getElementById("library");
var buttonPlaying = document.getElementById("button-playing");

var musicList = [];

for (var i = 0; i < musicList.length; i++) {
  library.innerHTML += `<div class="music" id="${musicList[i].id}" onclick="startMusic(${musicList[i].id})">
    <h1>${musicList[i].name}</h1>
    <h4>Size: ${musicList[i].size}MB</h4>
    <h4 class="id-playing" id="playing${musicList[i].id}"></h4>
  </div>`;
}

var musicPlaying = document.getElementById("music-playing");

if (musicPlaying.innerHTML == "") {
  musicPlaying.innerHTML = "No music is playing";
}

var musicDuration = document.getElementById("music-duration");
var rangeDuration = document.getElementById("range-duration");

var musicInterval, getTime;

function startMusic(id) {
  for (var i = 0; i < musicList.length; i++) {
    if (musicList[i].id == id) {
      clearInterval(musicInterval);
      rangeDuration.style.display = "inline";
      var idPlayingClass = document.querySelectorAll(".id-playing");
      idPlayingClass.forEach((id) => {
        id.innerHTML = "";
      });
      var idPlaying = document.getElementById("playing" + musicList[i].id);
      idPlaying.innerHTML = "Playing...";
      musicPlaying.innerHTML = musicList[i].name;
      audio.src = musicList[i].file;
      audio.currentTime = 0;
      audio.volume = 0.01;
      buttonPlaying.className = "fas fa-play";
      audio.play();

      musicInterval = setInterval(function () {
        audioConvertMinutesAndSeconds(audio.currentTime, audio.duration);

        rangeDuration.max = Math.floor(audio.duration);
        rangeDuration.value = Math.floor(audio.currentTime);

        if (audio.currentTime == audio.duration) {
          buttonPlaying.className = "fas fa-pause";
        }
      });
    }
  }
}

function audioConvertMinutesAndSeconds(audioCurrentTime, audioDuration) {
  var audioCurrentTimeMinutes = Math.floor(audioCurrentTime / 60);
  var audioCurrentTimeSeconds = Math.floor(audioCurrentTime) - audioCurrentTimeMinutes * 60;

  var audioDurationMinutes = Math.floor(audioDuration / 60);
  var audioDurtaionSeconds = Math.floor(audioDuration) - audioDurationMinutes * 60;

  if (audioCurrentTimeMinutes < 10) {
    audioCurrentTimeMinutes = "0" + audioCurrentTimeMinutes;
  }
  if (audioCurrentTimeSeconds < 10) {
    audioCurrentTimeSeconds = "0" + audioCurrentTimeSeconds;
  }
  if (audioDurationMinutes < 10) {
    audioDurationMinutes = "0" + audioDurationMinutes;
  }
  if (audioDurtaionSeconds < 10) {
    audioDurtaionSeconds = "0" + audioDurtaionSeconds;
  }

  musicDuration.innerHTML = `${audioCurrentTimeMinutes}:${audioCurrentTimeSeconds} / ${audioDurationMinutes}:${audioDurtaionSeconds}`;
}

rangeDuration.addEventListener("input", function () {
  audio.currentTime = rangeDuration.value;
  getTime = rangeDuration.value;

  if (rangeDuration.value == Math.floor(audio.duration)) {
    buttonPlaying.className = "fas fa-pause";
  }
});

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
        <h4 class="id-playing" id="playing${musicList[i].id}"></h4>
      </div>`;
      }
      inputName.value = "";
      importFileBcg.style.display = "none";
    }
  } else {
    importFileBcg.style.display = "block";
  }
}

function closeSection() {
  importFileBcg.style.display = "none";
}
