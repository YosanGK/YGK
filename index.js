let currentSlide = 0;
const slides = document.getElementsByClassName("slide");

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[currentSlide].style.display = "block";
}

function changeSlide(n) {
    currentSlide += n;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    showSlides();
}

// Initialize slideshow
showSlides();

function createSparkles() {
    const text = document.querySelector('.anniversary-text');
    const rect = text.getBoundingClientRect();
    
    for(let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * rect.width + rect.left + 'px';
        sparkle.style.top = Math.random() * rect.height + rect.top + 'px';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(sparkle);
    }
}

const emojis = ['💫', '✨', '💝', '💕', '💓'];

function createEmoji() {
    const wrapper = document.querySelector('.heart-wrapper');
    const emoji = document.createElement('div');
    
    // Random starting position and movement
    const startX = Math.random() * window.innerWidth;
    const moveX = (Math.random() - 0.5) * 400; // Random horizontal drift
    
    emoji.className = 'floating-emoji';
    emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${startX}px`;
    emoji.style.setProperty('--moveX', `${moveX}px`);
    
    wrapper.appendChild(emoji);
    
    emoji.addEventListener('animationend', () => emoji.remove());
}

setTimeout(() => {
    emoji.remove();
    emojiCount--
}, 1200);

function startAnimation() {
    setInterval(createEmoji, 1000);
}

function stopAnimation() {
    clearInterval(animationInterval);
    const wrapper = document.querySelector('.heart-wrapper');
    const emojis = wrapper.querySelectorAll('.floating-emoji');
    emojis.forEach(emoji => emoji.remove());
}

let animationInterval;

window.addEventListener('load', startAnimation);

const puzzle = {
    grid: [
        ['S','U','S','H','I','*','*','*','*'],
        ['A','R','C','A','N','E','*','*','*'],
        ['V','I','R','G','I','N','*','*','*'],
        ['I','*','L','O','V','E','*','U','*'],
        ['T','A','B','L','E','T','*','*','*'],
        ['A','D','D','I','C','T','I','O','N']
    ]
};

function createCrossword() {
    const grid = document.getElementById('crossword');
    
    puzzle.grid.forEach((row, i) => {
        row.forEach((cell, j) => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            
            if (cell === '*') {
                cellDiv.className += ' black';
            } else {
                const input = document.createElement('input');
                input.maxLength = 1;
                input.dataset.answer = cell;
                cellDiv.appendChild(input);
            }
            
            grid.appendChild(cellDiv);
        });
    });
}

function addKeyboardNavigation() {
    const cells = document.querySelectorAll('.cell input');
    const gridSize = 9;
    
    cells.forEach((cell, index) => {
        cell.addEventListener('keydown', (e) => {
            let nextIndex;
            
            switch(e.key) {
                case 'ArrowRight':
                    nextIndex = index + 1;
                    break;
                case 'ArrowLeft':
                    nextIndex = index - 1;
                    break;
                case 'ArrowDown':
                    nextIndex = index + gridSize;
                    break;
                case 'ArrowUp':
                    nextIndex = index - gridSize;
                    break;
                default:
                    if (e.key.match(/^[a-zA-Z]$/)) {
                        cell.value = e.key.toUpperCase();
                        nextIndex = index + 1;
                        e.preventDefault();
                    }
                    return;
            }
            
            if (nextIndex >= 0 && nextIndex < cells.length) {
                const nextCell = cells[nextIndex];
                if (nextCell && !nextCell.parentElement.classList.contains('black')) {
                    nextCell.focus();
                    e.preventDefault();
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createCrossword();
    addKeyboardNavigation();
});

function updateCounter() {
    const startDate = new Date('2023-12-19'); 
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('anniversary-counter').innerHTML = 
        `${days} Days of Love ❤️`;
}

updateCounter();
setInterval(updateCounter, 86400000);

