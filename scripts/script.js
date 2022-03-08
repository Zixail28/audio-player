const fW = document.querySelector('.forward');
const bW = document.querySelector('.backward');
const btn = document.querySelector('.play');
const aImg = document.querySelector('.audio-img');
const bg = document.querySelector('.background');
const sA = document.querySelector('.song-artist');
const sN = document.querySelector('.song-name');
const cT = document.querySelector('.currentTime');
const dT = document.querySelector('.durationTime');
const pB = document.querySelector('.progress-bar');

let songs = ['hello', 'dior', 'wykbl', 'money'];
let numSong = 0; // 0-3
let isPlay = false;
let absTime = pB.value;

const audio = new Audio();


function playAudio(song) {
	audio.src = `./assets/audio/${song}.mp3`;
	audio.currentTime = absTime;
	audio.play();
}
function pauseAudio() {
	absTime = audio.currentTime;
	aImg.style.transform = 'scale(1)'
	audio.pause();
}

function valid() {
	if (numSong === 4) {
		numSong = 0;
	} else if(numSong === -1){
		numSong = 3;
	}
	btn.setAttribute('src', './assets/svg/pause.png')
}

function changePics(song) {
	aImg.setAttribute('src', `./assets/img/${song}.png`);
	aImg.style.transform = 'scale(1.15)'
	bg.setAttribute('src', `./assets/img/${song}.png`);
}

function changeText(song){
	if(song === 'money'){
		sA.innerHTML = 'Yeat';
	} else sA.innerHTML = 'Pop Smoke';
	switch(song){
		case 'hello': sN.innerHTML = 'Hello'; break;
		case 'dior': sN.innerHTML = 'Dior'; break;
		case 'wykbl': sN.innerHTML = 'What you know'; break;
		case 'money': sN.innerHTML = 'Monёy So Big'; break;
	}
}

function autoPlay() {
	isPlay = true;
	valid();
	playAudio(songs[numSong]);
	changePics(songs[numSong]);
	changeText(songs[numSong]);
}

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;
	if(isNaN(seconds)){return '3:10'};
  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

function changeProgressBar() {
	audio.currentTime = pB.value;
	absTime = pB.value;
}

btn.addEventListener('click', () => {
	if(isPlay){
		pauseAudio();
		btn.setAttribute('src', './assets/svg/play.png')
		isPlay = false;
	} else{autoPlay()}
})

fW.addEventListener('click', () => {
	numSong += 1;
	absTime = 0;
	cT.innerHTML = '0:00';
	autoPlay();
})
bW.addEventListener('click', () => {
	numSong -= 1;
	absTime = 0;
	cT.innerHTML = '0:00';
	autoPlay();
})


setInterval(() => {
	if(isNaN(audio.duration)){
		pB.setAttribute('max', 190.589388)
		dT.innerHTML = '3:10';
	} else {
	pB.setAttribute('max', audio.duration)
	dT.innerHTML = getTimeCodeFromNum(audio.duration);
	}
	if(audio.currentTime === audio.duration){
		numSong += 1;
		absTime = 0;
		cT.innerHTML = '0:00';
		autoPlay();
	}
	cT.innerHTML = getTimeCodeFromNum(audio.currentTime);
	pB.value = audio.currentTime;
}, 500);