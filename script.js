document.addEventListener('DOMContentLoaded', () => {
    const petalsContainer = document.getElementById('petals');
    const giftBox = document.getElementById('giftBoxTrigger');
    const box = document.getElementById('box');
    const revealSection = document.getElementById('reveal-section');
    const typingText = document.getElementById('typing-text');
    const closeBtn = document.getElementById('closeBtn');
    const bgMusic = document.getElementById('bg-music');

    const message = "Chúc mừng ngày Quốc tế Phụ nữ 8/3! Chúc bạn luôn rạng rỡ như những đóa hoa, hạnh phúc bên những người thân yêu và gặt hái được nhiều thành công trong cuộc sống. Bạn là điều tuyệt vời nhất của thế giới này!";


    const playMusic = () => {
        bgMusic.play().then(() => {
            musicStarted = true;
            removeListeners();
        }).catch(e => console.log("Autoplay waiting for interaction..."));
    };

    let musicStarted = false;
    const removeListeners = () => {
        const events = ['click', 'touchstart', 'mousemove', 'scroll', 'keydown'];
        events.forEach(event => document.removeEventListener(event, playMusic));
    };

    const events = ['click', 'touchstart', 'mousemove', 'scroll', 'keydown'];
    events.forEach(event => document.addEventListener(event, playMusic, { once: true }));


    playMusic();

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const size = Math.random() * 15 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;

        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = Math.random() * 3 + 4 + 's';
        petal.style.delay = Math.random() * 5 + 's';

        petalsContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 8000);
    }

    setInterval(createPetal, 200);


    const photoSources = ['1.jpeg', '2.jpeg', '3.jpeg'];

    function createFloatingPhoto() {
        const photo = document.createElement('img');
        photo.src = photoSources[Math.floor(Math.random() * photoSources.length)];
        photo.classList.add('floating-photo');

        const size = Math.random() * 40 + 40;
        photo.style.width = `${size}px`;
        photo.style.height = `${size}px`;

        photo.style.left = Math.random() * 100 + 'vw';
        photo.style.animationDuration = Math.random() * 5 + 5 + 's';
        const startRot = (Math.random() - 0.5) * 90;
        photo.style.transform = `rotate(${startRot}deg)`;

        petalsContainer.appendChild(photo);

        setTimeout(() => {
            photo.remove();
        }, 12000);
    }

    setInterval(createFloatingPhoto, 800);


    function typeMessage(text, element, speed = 50) {
        element.innerHTML = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }


    const puzzleContainer = document.getElementById('puzzle-container');
    const rows = 5;
    const cols = 5;
    let pieces = [];

    function createPuzzle() {
        puzzleContainer.innerHTML = '';
        pieces = [];
        const containerWidth = puzzleContainer.offsetWidth;
        const containerHeight = puzzleContainer.offsetHeight;
        const pieceWidth = containerWidth / cols;
        const pieceHeight = containerHeight / rows;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.style.width = `${pieceWidth}px`;
                piece.style.height = `${pieceHeight}px`;
                piece.style.left = `${c * pieceWidth}px`;
                piece.style.top = `${r * pieceHeight}px`;
                piece.style.backgroundPosition = `-${c * pieceWidth}px -${r * pieceHeight}px`;
                piece.style.backgroundSize = `${containerWidth}px auto`;

                const angle = Math.random() * Math.PI * 2;
                const radius = 600 + Math.random() * 400;
                const startX = Math.cos(angle) * radius;
                const startY = Math.sin(angle) * radius;
                const startRot = (Math.random() - 0.5) * 1080;

                piece.style.transform = `translate(${startX}px, ${startY}px) rotate(${startRot}deg) scale(0)`;
                piece.style.opacity = '0';

                puzzleContainer.appendChild(piece);
                pieces.push({
                    element: piece,
                    angle: angle,
                    radius: radius
                });
            }
        }
    }

    function assemblePuzzle() {
        pieces.forEach((p, index) => {

            setTimeout(() => {
                p.element.style.opacity = '1';
                p.element.style.transform = `translate(${Math.cos(p.angle) * 100}px, ${Math.sin(p.angle) * 100}px) rotate(${360}deg) scale(1.2)`;


                setTimeout(() => {
                    p.element.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
                    if (index === pieces.length - 1) {

                        bgMusic.play().catch(e => console.log("Music play blocked by browser."));
                    }
                }, 800 + (index * 10));
            }, index * 20);
        });
    }


    giftBox.addEventListener('click', () => {
        box.classList.add('open');
        createPuzzle();

        setTimeout(() => {
            revealSection.classList.add('active');
            setTimeout(assemblePuzzle, 500);
            setTimeout(() => typeMessage(message, typingText), 1500);
        }, 1200);
    });

    closeBtn.addEventListener('click', () => {
        revealSection.classList.remove('active');
        box.classList.remove('open');
        typingText.innerHTML = '';
        puzzleContainer.innerHTML = '';

    });
});
