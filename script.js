console.log("welcome to spotify");
let Songindex = 0;
let audioelement = new Audio('songs/2.mp3');
let masterPlay = document.getElementById('masterplay');
let gif = document.getElementById('gif');
let myprogressbar = document.getElementById('progressbar');
let sname=document.getElementById('sname');
let songs = [
  { songName: "salame-Ishq", path: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Alison by Elvis Costello", path: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Come Out Tonight", path: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "tun jo ayae ", path: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Good Golly, Miss Molly", path: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Black Betty", path: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Jolene", path: "songs/9.mp3", coverPath: "covers/9.jpg" },
];

let songitem = Array.from(document.getElementsByClassName('song-item'));

songitem.forEach((element, i) => {
  element.getElementsByTagName('img')[0].src = songs[i].coverPath;
  element.getElementsByClassName('text')[0].innerText = songs[i].songName;
});

// Function to pause the audio and change the play button icon
const pausePreviousSong = () => {
  audioelement.pause();
  masterPlay.classList.remove('fa-pause');
  masterPlay.classList.add('fa-play-circle');
  gif.style.opacity = 0;
};

masterPlay.addEventListener('click', () => {
  if (audioelement.paused || audioelement.currentTime <= 0) {
    audioelement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
  } else {
    audioelement.pause();
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});

audioelement.addEventListener('timeupdate', () => {
  const progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
  myprogressbar.value = progress;
});

myprogressbar.addEventListener('input', () => {
  audioelement.currentTime = myprogressbar.value * audioelement.duration / 100;
});

Array.from(document.getElementsByClassName('song-play')).forEach((element) => {
  element.addEventListener('click', (e) => {
    const newIndex = parseInt(e.target.id);
    if (newIndex !== Songindex) {
      // If clicking on a different song than the currently playing one
      pausePreviousSong();
      Songindex = newIndex;
      sname.innerText=songs[Songindex].songName;
      audioelement.src = `songs/${Songindex + 1}.mp3`;
      audioelement.currentTime = 0;
      audioelement.play();
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause');
      gif.style.opacity = 1;
    } else {
      // If clicking on the currently playing song, toggle play/pause
      if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
      } else {
        audioelement.pause();
        sname.innerText=songs[Songindex].songName;
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
      }
    }
  });
});

const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');

previousButton.addEventListener('click', () => {
  if (Songindex > 0) {
    pausePreviousSong(); // Pause the previous song when clicking "Previous"
    Songindex -= 1;
  } else {
    // If at the first song and clicking "Previous," go to the last song
    pausePreviousSong();
    Songindex = songs.length - 1;
  }
  sname.innerText=songs[Songindex].songName;
  audioelement.src = `songs/${Songindex + 1}.mp3`;
  audioelement.currentTime = 0;
  audioelement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause');
  gif.style.opacity = 1;
});

nextButton.addEventListener('click', () => {
  if (Songindex < songs.length - 1) {
    pausePreviousSong(); // Pause the previous song when clicking "Next"
    Songindex += 1;
  } else {
    // If at the last song and clicking "Next," go to the first song
    pausePreviousSong();
    Songindex = 0;
  }
  sname.innerText=songs[Songindex].songName;
  audioelement.src = `songs/${Songindex + 1}.mp3`;
  audioelement.currentTime = 0;
  audioelement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause');
  gif.style.opacity = 1;
});
