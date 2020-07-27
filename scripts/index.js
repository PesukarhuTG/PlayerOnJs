import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';

//находим все элементы по разделам Радио-Музыка-Видеоплеер
let playerBtn = document.querySelectorAll('.player-btn');
let playerBlock = document.querySelectorAll('.player-block');
let temp = document.querySelector('.temp');

function deactivationPlayer() {
    temp.style.display = 'none';                    //скрываем ненужный заголовок

    playerBtn.forEach(itemBtn => itemBtn.classList.remove('active'));
    playerBlock.forEach(itemBlock => itemBlock.classList.remove('active'));
};

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
    deactivationPlayer();                           //после клика удаляем класс active предыдущего
    btn.classList.add('active');                    //после клика добавляем текущей кнопке класс active
    playerBlock[i].classList.add('active');         //а соответствующему блоку кнопке добавляем класс видимости
}));

radioPlayerInit();
musicPlayerInit();
videoPlayerInit();