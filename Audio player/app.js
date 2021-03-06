var audio = document.getElementById("audio");
var library = document.getElementById("library");
var buttonPlaying = document.getElementById("button-playing");
var buttonLoop = document.getElementById("loop");

// var musicList = [
//   {
//     name: "Hot",
//     id: 0,
//     size: 4.54,
//     file: "media/hot.mp3",
//   },
//   {
//     name: "loud",
//     id: 1,
//     size: 4.54,
//     file: "media/loud_indian_music.mp3",
//   },
// ];

function saveSongs(list) {
  var save = JSON.parse(localStorage.getItem("audio-app-songs")) || [];
  save.push(list);
  localStorage.setItem("audio-app-songs", JSON.stringify(save));
}

var musicList = JSON.parse(localStorage.getItem("audio-app-songs"));

if (musicList != null) {
  for (var i = 0; i < musicList.length; i++) {
    library.innerHTML += `<div class="music" id="${musicList[i].id}" onclick="startMusic(${musicList[i].id})">
    <i id="delete" class="fas fa-trash" onclick="deleteSong(${musicList[i].id})"></i>
    <h1>${musicList[i].name}</h1>
    <h4>Size: ${musicList[i].size}MB</h4>
    <h4 class="id-playing" id="playing${musicList[i].id}"></h4>
  </div>`;
  }
}

var musicPlaying = document.getElementById("music-playing");

if (musicPlaying.innerHTML == "") {
  musicPlaying.innerHTML = "No music is playing";
}

var musicDuration = document.getElementById("music-duration");
var rangeDuration = document.getElementById("range-duration");

var musicInterval, getTime;
var songId = 0;

function startMusic(id) {
  musicList = JSON.parse(localStorage.getItem("audio-app-songs"));
  for (var i = 0; i < musicList.length; i++) {
    if (musicList[i].id == id) {
      songId = id;
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
          if (audio.loop) {
            buttonPlaying.className = "fas fa-play-circle";
          } else {
            songId++;
            startMusic(songId);
          }
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

  console.log(songId);
  if (rangeDuration.value == Math.floor(audio.duration)) {
    if (audio.loop) {
      buttonPlaying.className = "fas fa-play-circle";
    } else {
      buttonPlaying.className = "fas fa-pause-circle";
    }
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

buttonLoop.addEventListener("click", function () {
  if (this.style.color == "") {
    this.style.color = "#2ecc71";
    audio.loop = true;
  } else {
    this.style.color = "";
    audio.loop = false;
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
var song = 0;

function saveSong(status) {
  musicList = JSON.parse(localStorage.getItem("audio-app-songs"));
  var file = fileUpload.files[0];
  if (!status) {
    if (file != undefined) {
      if (musicList != null && musicList.length != 0) {
        song = musicList[musicList.length - 1].id + 1;
      } else {
        song = 0;
      }
      saveSongs({
        id: song,
        name: inputName.value,
        file: savedDir + "/" + file.name,
        size: Math.round((file.size / 1024 / 1024) * 100) / 100,
      });

      library.innerHTML = "";
      musicList = JSON.parse(localStorage.getItem("audio-app-songs"));

      for (var i = 0; i < musicList.length; i++) {
        library.innerHTML += `<div class="music" id="${musicList[i].id}" onclick="startMusic(${musicList[i].id})">
        <i class="fas fa-trash" onclick="deleteSong(${musicList[i].id})"></i>
        <h1>${musicList[i].name}</h1>
        <h4>Size: ${musicList[i].size}MB</h4>
        <h4 class="id-playing" id="playing${musicList[i].id}"></h4>
      </div>`;
      }
      inputName.value = "";
      fileDetails.innerHTML = "";
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
    if (songId == musicList.length - 1) {
      songId = musicList[musicList.length - 1].id;
    } else {
      songId++;
    }
  } else {
    if (songId == 0) {
      songId == 0;
    } else {
      songId--;
    }
  }
  startMusic(songId);
}

function deleteSong(id) {
  musicList = JSON.parse(localStorage.getItem("audio-app-songs"));
  for (var i = 0; i < musicList.length; i++) {
    if (musicList[i].id == id) {
      musicList.splice(i, 1);
      localStorage.setItem("audio-app-songs", JSON.stringify(musicList));
    }
  }
  if (musicList.length == 0) {
    localStorage.removeItem("audio-app-songs");
  }

  library.innerHTML = "";
  for (var i = 0; i < musicList.length; i++) {
    library.innerHTML += `<div class="music" id="${musicList[i].id}" onclick="startMusic(${musicList[i].id})">
      <i class="fas fa-trash" onclick="deleteSong(${musicList[i].id})"></i>
      <h1>${musicList[i].name}</h1>
      <h4>Size: ${musicList[i].size}MB</h4>
      <h4 class="id-playing" id="playing${musicList[i].id}"></h4>
    </div>`;
  }

  document.getElementById(songId).style.background = "#2ecc71";
  document.getElementById(songId).style.color = "#ffffff";
}

var importDirBcg = document.getElementById("import-dir-bcg");
var savedDir = localStorage.getItem("audio-app-dir");

if (savedDir == null) {
  importDirBcg.style.display = "block";
  importDirBcg.innerHTML = `<div class="import-dir">
    <input type="text" name="" id="dir-location" placeholder="Enter Directory name" autocomplete="off"/>
    <button onclick="saveDir(event)">Save</button>
  </div>`;
}

function saveDir(e) {
  var inputDir = e.target.parentElement.children[0].value;
  if (inputDir != "") {
    localStorage.setItem("audio-app-dir", inputDir.split("\\").join("/"));
    importDirBcg.style.display = "none";
    location.reload();
  }
}

var main = document.getElementById("main");
var settingsContainer = document.getElementById("settings");
var settingsBtn = document.getElementById("settings-btn");

function settings(status) {
  var changeDirInput = settingsContainer.children[0].children[1];
  if (!status) {
    main.style.display = "none";
    settingsContainer.style.display = "flex";
    settingsBtn.style.display = "none";
    changeDirInput.value = savedDir;
  } else {
    main.style.display = "block";
    settingsContainer.style.display = "none";
    settingsBtn.style.display = "block";

    if (changeDirInput.value != "" || changeDirInput.value != savedDir) {
      localStorage.setItem("audio-app-dir", changeDirInput.value.split("\\").join("/"));
    }

    changeDirInput.value = "";
  }
}
