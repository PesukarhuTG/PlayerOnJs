export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoProgress = document.querySelector('.video-progress');

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

    //ф-ция добавление 0 ко времени
    const addZero = n => n < 10 ? '0' + n : n;

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

        let minutePassed = Math.floor(currentTime / 60); //округление минут
        let secondsPassed = Math.floor(currentTime % 60); //округление секунд

        let minuteTotal = Math.floor(duration / 60); //округление минут
        let secondsTotal = Math.floor(duration % 60); //округление секунд

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`; //textContent выводит содержимое
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    //возможность переключения строки прогресса через событие change у input
    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100; //то место, на которое кликнули
    })

}