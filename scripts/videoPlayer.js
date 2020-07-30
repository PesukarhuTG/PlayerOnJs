import { addZero } from './supScript.js'

export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoProgress = document.querySelector('.video-progress');
    const videoFullScreen = document.querySelector('.video-button__fullscreen');
    const videoVolume = document.querySelector('.video-volume');
    const volumeDown = document.querySelector('.volume-down');
    const volumeUp = document.querySelector('.volume-up');

    //ф-ция сменяющая иконки play/pause
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.remove('fa-play');
            videoButtonPlay.classList.add('fa-pause');
        }
    };

    //ф-ция запускающая/ставящая на паузу плеер
    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    //ф-ция остановки плеера
    const stopPlay = () => {
        videoPlayer.pause(); //останавливаем видео
        videoPlayer.currentTime = 0;//время сводим к нулю у свойства currenttime
    };

    //щелкая на окно плеера запускаем видео
    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    //события play и pause есть по умолчанию у плеера
    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    //строка прогресса видео
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime; //получаем данные из плеера
        const duration = videoPlayer.duration; //получаем данные из плеера

        //строка прогресса с бегунком это input, у него есть value
        videoProgress.value = (currentTime / duration) * 100; //определяем, ск прошло времени из всего времени
        let minutePassed = Math.floor(currentTime / 60) || '0'; //округление минут
        let secondsPassed = Math.floor(currentTime % 60) || '0'; //округление секунд

        let minuteTotal = Math.floor(duration / 60) || '0'; //округление минут
        let secondsTotal = Math.floor(duration % 60) || '0'; //округление секунд

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`; //textContent выводит содержимое
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    //возможность переключения строки прогресса через обращение к input
    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100; //то место, на которое кликнули
    });

    //расшаривание экрана
    videoFullScreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    //бегунок громкости в промежутке от 0..1
    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
    });

    //начальная позиция на половине громкости
    videoPlayer.volume = 0.5;
    videoVolume.value = videoPlayer.volume * 100;

    //клики на иконках громкости
    volumeDown.addEventListener('click', () => {

        if (videoPlayer.volume != 0) {
            videoPlayer.volume = 0; //снижаем громкость
            videoVolume.value = videoPlayer.volume * 100; //сдвигаем бегунок
            volumeDown.classList.remove('fa-volume-down'); //меняем иконку
            volumeDown.classList.add('fa-volume-off');
        } else {
            videoPlayer.volume = 0.5; //возвращаем громкость
            videoVolume.value = videoPlayer.volume * 100;  //возвращаем бегунок

            volumeDown.classList.remove('fa-volume-off');
            volumeDown.classList.add('fa-volume-down');
        }
    });

    volumeUp.addEventListener('click', () => {

        if (videoPlayer.volume != 1) {
            videoPlayer.volume = 1; //повышаем громкость
            videoVolume.value = videoPlayer.volume * 100; //сдвигаем бегунок

        } else {
            videoPlayer.volume = 0.5; //возвращаем громкость
            videoVolume.value = videoPlayer.volume * 100; //возвращаем бегунок
        }
    });

    videoPlayerInit.stop = () => {
        if (!videoPlayer.paused) {
        stopPlay();
    }

    };

}