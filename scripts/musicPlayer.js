import { addZero } from './supScript.js'

export const musicPlayerInit = () => {

    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');

    const playlist = ['hello', 'flow', 'speed'];
    let trackIndex = 0; //индекс того трека, что играет

    //ф-ция запуска трека
    const loadTrack = () => {
        const isPlayed = audioPlayer.paused; //стоит ли текущая песня на паузе
        const track = playlist[trackIndex]; //из плейлиста по индексу получаем  название трека (Hello, Flow...)

        audioImg.src = `./audio/${track}.jpg`; //путь к картинке трека
        audioHeader.textContent = track.toUpperCase(); //изменяем название трека
        audioPlayer.src = `./audio/${track}.mp3`; //путь к файлу трека

        if (isPlayed) { //играла ли музыка в момент переключения
            audioPlayer.pause(); //если остановлена то isPlayed = true и следующий трек мы тоже тормозим
        } else {
            audioPlayer.play(); //если играла то isPlayed = false и следующий трек запускаем сразу
        }
    };

    //ф-ция переключения на пред. трек
    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;//убавляем индекс
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    };

    //ф-ция переключения на след трек
    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    }


    //через делегирование будем определять, на какую из кнопок нажал пользователь
    //и выполнять определенные действия
    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        //клик на play
        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }

            const track = playlist[trackIndex]; //из плейлиста по индексу получаем  название трека (Hello, Flow...)
            audioHeader.textContent = track.toUpperCase(); //изменяем название трека
        }

        //клик на prev
        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        //клик на next
        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    //когда трек закончился, автоматом переключается на следующий
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    //отображение прогресса бегунка скролл-бара + время
    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime; //получаем данные из плеера
        const duration = audioPlayer.duration; //получаем данные из плеера
        const progress = (currentTime / duration) * 100; //определяем, ск прошло времени из всего времени в %

        audioProgressTiming.style.width = progress + '%'; //css св-во, знак % обязателен

        let minutePassed = Math.floor(currentTime / 60) || '0'; //округление минут
        let secondsPassed = Math.floor(currentTime % 60) || '0'; //округление секунд

        let minuteTotal = Math.floor(duration / 60) || '0'; //округление минут
        let secondsTotal = Math.floor(duration % 60) || '0'; //округление секунд

        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`; //textContent выводит содержимое
        audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    //возможность переключения по треку через строку прогресса
    audioProgress.addEventListener('click', event => { //получить координаты через event
        const x = event.offsetX; //клик отсчитывается от крайней левой точки элемента
        const allWidth = audioProgress.clientWidth; //получить длину строки прогресса
        const progress = (x / allWidth) * audioPlayer.duration; //получаем значение прогресса
        audioPlayer.currentTime = progress; //то место, на которое кликнули
     });

     //добавим метод стоп к ф-ции
     musicPlayerInit.stop = () => {
      if (!audioPlayer.paused) {
          audioPlayer.pause();
          audio.classList.remove('play');
          audioButtonPlay.classList.remove('fa-pause');
          audioButtonPlay.classList.add('fa-play');
      }
     };

}