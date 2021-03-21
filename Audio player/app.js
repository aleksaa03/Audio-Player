var audio = document.getElementById("audio");
var library = document.getElementById("library");
var buttonPlaying = document.getElementById("button-playing");

var musicList = [
  // {
  //   name: "Hot",
  //   id: 0,
  //   size: 4.54,
  //   file: "media/hot.mp3",
  // },
  // {
  //   name: "loud",
  //   id: 1,
  //   size: 4.54,
  //   file: "media/loud_indian_music.mp3",
  // },
];

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
var getSongId = 0;

function startMusic(id) {
  for (var i = 0; i < musicList.length; i++) {
    if (musicList[i].id == id) {
      getSongId = id;
      clearInterval(musicInterval);
      rangeDuration.style.display = "inline";

      var musicContainer = document.querySelectorAll(".music");

      for (let i = 0; i < musicContainer.length; i++) {
        musicContainer[i].style.background = "#e0e0e0";
        musicContainer[i].style.color = "#000000";
      }

      document.getElementById(id).style.background = "#2ecc71";
      document.getElementById(id).style.color = "#ffffff";

      musicPlaying.innerHTML = musicList[i].name;
      audio.src = musicList[i].file;
      audio.currentTime = 0;
      audio.volume = 0.5;
      buttonPlaying.className = "fas fa-play-circle";
      audio.play();

      musicInterval = setInterval(function () {
        audioConvertMinutesAndSeconds(audio.currentTime, audio.duration);

        rangeDuration.max = Math.floor(audio.duration);
        rangeDuration.value = Math.floor(audio.currentTime);

        if (audio.currentTime == audio.duration) {
          buttonPlaying.className = "fas fa-pause-circle";
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
    buttonPlaying.className = "fas fa-pause-circle";
  }
});

buttonPlaying.addEventListener("click", function () {
  if (this.className == "fas fa-play-circle") {
    this.className = "fas fa-pause-circle";
    getTime = audio.currentTime;
    audio.pause();
  } else {
    this.className = "fas fa-play-circle";
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

function musicVolume(e) {
  var numberDuration = document.getElementById("number-volume");
  var musicValue = e.target.value;
  numberDuration.innerHTML = Math.floor(parseFloat(musicValue) * 100) + "%";
  audio.volume = musicValue;
}

function changeSong(e) {
  if (e.target.id == "forward") {
    if (getSongId == musicList.length - 1) {
      getSongId = musicList[musicList.length - 1].id;
    } else {
      getSongId++;
    }
  } else {
    if (getSongId == 0) {
      getSongId == 0;
    } else {
      getSongId--;
    }
  }
  startMusic(getSongId);
}
