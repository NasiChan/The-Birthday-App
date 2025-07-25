
let litCandles = 0;
let currentSlideIndex = 0;
const totalCandles = 5;

// Candle lighting functionality
document.addEventListener('DOMContentLoaded', function() {
    const candles = document.querySelectorAll('.candle');
    
    candles.forEach(candle => {
        candle.addEventListener('click', function() {
            if (!this.classList.contains('lit')) {
                this.classList.add('lit');
                litCandles++;
                
                // Play lighting sound effect (optional)
                playLightSound();
                
                // Check if all candles are lit
                if (litCandles === totalCandles) {
                    setTimeout(() => {
                        transitionToSlideshow();
                    }, 1500);
                }
            }
        });
    });
});

function playLightSound() {
    // Create a simple audio context for a lighting sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('Audio not supported');
    }
}

function transitionToSlideshow() {
    const cakePage = document.getElementById('cake-page');
    const slideshowPage = document.getElementById('slideshow-page');
    
    // Fade out cake page
    cakePage.classList.remove('active');
    
    // Fade in slideshow page after a delay
    setTimeout(() => {
        slideshowPage.classList.add('active');
        startSlideshow();
    }, 1000);
}

// Slideshow functionality
function startSlideshow() {
    // Auto-advance slides every 4 seconds
    setInterval(() => {
        changeSlide(1);
    }, 4000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from current slide and dot
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    // Calculate new slide index
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    // Add active class to new slide and dot
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function currentSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from current slide and dot
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    // Set new slide index
    currentSlideIndex = slideIndex - 1;
    
    // Add active class to new slide and dot
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Add some celebration effects when all candles are lit
function addCelebrationEffects() {
    // Create confetti effect
    const colors = ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 50);
    }
}

function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    confetti.style.animation = 'fall 3s linear forwards';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// Add CSS animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);
