export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItems = document.querySelectorAll('.radio-item');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume-input');
    const radioVolumeDown = document.querySelector('.radio-volume-down');
    const radioVolumeUp = document.querySelector('.radio-volume-up');

    let prevVolume = 0.2;

    //работаем с конструктором, который создает audio
    const audio = new Audio();
    audio.type = 'audio/aac';
    console.dir(audio);

    //радио не выбрано - кнопка заблокирована
    radioStop.disabled = true;

    //ф-ция смены иконки play/stop
    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.remove('fa-stop');
            radioStop.classList.add('fa-play');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    };

    //ф-ция для красивости обводки выбранного элемента
    const selectItem = elem => {
        radioItems.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };


    //когда выбираем радио, нужно прописать его src
    //реализуем через делегирование события event
    //в event интересует target, т.е. то,что вызвало событие
    radioNavigation.addEventListener('change', event => {
        const target = event.target;

        //добавление красивости элементу
        const parent = target.closest('.radio-item');
        selectItem(parent);

        //нахождение у родителя названия радиостанции и подставление в заголовок
        const title = parent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        //нахождение у родителя картинки радиостанции и подставление большую иконку
        const urlImg = parent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false; //разблокируем кнопку
        audio.src = target.dataset.radioStantion; //у eventa обращаемся к свойству с адресом радиостанции
        audio.play(); //запускаем радиостанцию
        changeIconPlay(); //ф-ция смены иконки play/pause
    });

    //реализация кнопки Stop
    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay(); //ф-ция смены иконки play/pause
    });

    //бегунок громкости в промежутке от 0..1
    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
    });

    //начальная позиция на половине громкости
    audio.volume = 0.5;
    radioVolume.value = audio.volume * 100;

    //клик на левой иконке громкости
    radioVolumeDown.addEventListener('click', () => {
        if (audio.volume != 0) {
            prevVolume = audio.volume;   //запоминаем значение громкости
            audio.volume = 0;            //снижаем громкость в mute
            radioVolume.value = audio.volume * 100;   //сдвигаем бегунок на 0
            radioVolumeDown.classList.remove('fa-volume-down'); //меняем иконку
            radioVolumeDown.classList.add('fa-volume-off');
        } else {
            audio.volume = prevVolume;   //возвращаем громкость в последнее значение
            radioVolume.value = audio.volume * 100;  //возвращаем бегунок
            radioVolumeDown.classList.remove('fa-volume-off');
            radioVolumeDown.classList.add('fa-volume-down');
        }
    });

    //клик на правой иконке громкости
    radioVolumeUp.addEventListener('click', () => {

        if (audio.volume != 1) {
            prevVolume = audio.volume;   //запоминаем значение громкости
            audio.volume = 1; //повышаем громкость
            radioVolume.value = audio.volume * 100; //сдвигаем бегунок

        } else {
            audio.volume = prevVolume;   //возвращаем громкость в последнее значение
            radioVolume.value = audio.volume * 100; //возвращаем бегунок
        }
    });


};