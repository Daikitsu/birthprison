const modal = document.getElementById('message-modal');
const modalMsg = document.getElementById('message-modal-message');
const modalContent = document.getElementById('message-modal-content');
const modalAuthor = document.getElementById('message-modal-author');
const messages = [...document.getElementsByClassName('message')];
const icon = document.getElementById('icon');

const introModal = document.getElementById('intro-modal');
const btnPlay = document.getElementById('bgm-play');
const btnNoPlay = document.getElementById('bgm-noplay');
const btnMute = document.getElementById('bgm-mute');

const msgProperties = [
    'font-family',
    'font-size',
    'font-weight',
    'font-style',
    'font-stretch',
    'color',
    'width',
    'border',
    'border-radius',
    'padding'
];

icon.onerror = () => {
    icon.src = 'icons/transparent.png';
}

window.onclick = (e) => {
    if (e.target == modal) {
        modal.classList.add('fade-out');    
    }
}

modal.addEventListener('animationend', function() {
    if (this.classList.contains('fade-out')) {
        this.style.display = 'none';
        icon.src = 'transparent.png';
        modalContent.className = '';
        this.classList.remove('fade-out');
    }
});

for (const msg of messages) {
    msg.onclick = () => {
        const mstyle = window.getComputedStyle(msg);
        
        for (const prop of msgProperties) {
            modalMsg.style.setProperty(prop, mstyle.getPropertyValue(prop));
        }

        modalMsg.parentNode.className = msg.id;
        modalMsg.innerHTML = msg.innerHTML;
        
        if (msg.classList.contains('msg-read')) msg.classList.remove('msg-read');
        else msg.classList.add('msg-read');

        const padding = parseInt(mstyle.getPropertyValue('padding'));
        const width = parseInt(mstyle.getPropertyValue('width'));
        const author = msg.id.slice(4);
        const authorUnescaped = author
            .replace(/SLASH/g, ' / ')
            .replace(/LPARA/g, '&lpar;')
            .replace(/RPARA/g, '&rpar;')
            .replace(/_/g, '&nbsp;');

        modalContent.style.width = `${width + 2 * padding}px`;
        modalAuthor.innerHTML = `Written by: ${authorUnescaped}`;
        icon.src = `icons/${author}.png`;

        modal.style.display = 'block';
    }
}

// BGM stuff

const bgm = new Howl({
    src: ['coffeecats.mp3'],
    volume: 0.1,
    loop: true,
    preload: true
});

let bgmID;
let bgmPerm = false;
let bgmPlaying = true;

btnPlay.onclick = () => {
    introModal.classList.add('fade-out');
    bgmPerm = true;
    bgmID = bgm.play();
}

btnMute.onclick = () => {
    if (!bgmPerm) return;
    if (bgmPlaying) bgm.mute(true, bgmID);
    else bgm.mute(false, bgmID);
    btnMute.innerHTML = bgmPlaying ? '🔇' : '🔊';
    bgmPlaying = !bgmPlaying;
}

btnNoPlay.onclick = () => {
    introModal.classList.add('fade-out');
    btnMute.innerHTML = '🔇';
}

introModal.addEventListener('animationend', function() {
    if (this.classList.contains('fade-out')) {
        this.style.display = 'none';
        this.classList.remove('fade-out');
    }
});
