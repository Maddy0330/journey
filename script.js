// ============================================
// PASSWORD PROTECTION
// ============================================

const PASSWORD = 'Mamma@1011';
const passwordInput = document.getElementById('passwordInput');
const unlockBtn = document.getElementById('unlockBtn');
const passwordScreen = document.getElementById('passwordScreen');
const mainExperience = document.getElementById('mainExperience');

// Handle password unlock
function unlockExperience() {
    if (passwordInput.value === PASSWORD) {
        passwordScreen.classList.add('hidden');
        mainExperience.classList.remove('hidden');
        startExperience();
    } else {
        passwordInput.style.borderColor = '#ff6b6b';
        passwordInput.style.background = 'rgba(255, 107, 107, 0.1)';
        setTimeout(() => {
            passwordInput.style.borderColor = '';
            passwordInput.style.background = '';
        }, 500);
        passwordInput.value = '';
    }
}

unlockBtn.addEventListener('click', unlockExperience);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        unlockExperience();
    }
});

// ============================================
// MUSIC SYSTEM
// ============================================

class MusicManager {
    constructor() {
        this.currentSongIndex = 0;
        this.songs = ['songs/song1.mp3', 'songs/song2.mp3', 'songs/song3.mp3'];
        this.audio = new Audio();
        this.isMuted = false;
        this.muteBtn = document.getElementById('muteBtn');
        
        this.setupAudio();
        this.setupMuteButton();
    }

    setupAudio() {
        this.audio.volume = 0.4;
        this.audio.addEventListener('ended', () => this.playNextSong());
        this.audio.addEventListener('error', () => this.playNextSong());
    }

    setupMuteButton() {
        this.muteBtn.addEventListener('click', () => this.toggleMute());
    }

    playSongs() {
        this.loadSong(this.currentSongIndex);
        this.audio.play().catch(() => console.log('Autoplay prevented'));
    }

    loadSong(index) {
        this.audio.src = this.songs[index];
    }

    playNextSong() {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
        this.loadSong(this.currentSongIndex);
        this.audio.play().catch(() => console.log('Autoplay prevented'));
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.audio.pause();
            this.muteBtn.classList.add('muted');
            this.muteBtn.querySelector('.mute-icon').textContent = '🔇';
        } else {
            this.audio.play().catch(() => console.log('Autoplay prevented'));
            this.muteBtn.classList.remove('muted');
            this.muteBtn.querySelector('.mute-icon').textContent = '🔊';
        }
    }
}

const musicManager = new MusicManager();

// ============================================
// PROGRESS BAR
// ============================================

function updateProgressBar() {
    const chapters = document.querySelectorAll('.chapter');
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('progressFill').style.width = scrollPercentage + '%';
}

window.addEventListener('scroll', updateProgressBar);

// ============================================
// LANDING SCREEN SEQUENCE
// ============================================

function startExperience() {
    musicManager.playSongs();
    
    const countdown = document.getElementById('countdown');
    let count = 5;
    
    const countdownInterval = setInterval(() => {
        count--;
        countdown.textContent = count;
        countdown.style.animation = 'none';
        setTimeout(() => {
            countdown.style.animation = 'pulse 1s ease-in-out';
        }, 10);
        
        if (count === 0) {
            clearInterval(countdownInterval);
            countdown.classList.add('hidden');
            showLandingTexts();
        }
    }, 1000);
}

function showLandingTexts() {
    const textIds = ['landingText1', 'landingText2', 'landingText3', 'landingText4', 'landingText5', 
                     'landingText6', 'landingText7', 'landingText8', 'landingText9'];
    
    textIds.forEach((id, index) => {
        setTimeout(() => {
            document.getElementById(id).classList.remove('hidden');
        }, (index + 1) * 800);
    });
    
    setTimeout(() => {
        document.getElementById('beginBtn').classList.remove('hidden');
    }, textIds.length * 800 + 500);
}

document.getElementById('beginBtn').addEventListener('click', () => {
    document.getElementById('landingScreen').classList.add('hidden');
    document.querySelectorAll('.chapter').forEach((ch, idx) => {
        if (idx > 0) ch.classList.add('hidden');
    });
    showChapter(1);
});

// ============================================
// CHAPTER NAVIGATION
// ============================================

let currentChapter = 1;
const totalChapters = 12; // Landing + 7 chapters + voice + promise + final + easter

function showChapter(chapterNum) {
    currentChapter = chapterNum;
    const chapters = {
        1: 'chapter1',
        2: 'chapter2',
        3: 'chapter3',
        4: 'chapter4',
        5: 'chapter5',
        6: 'chapter6',
        7: 'chapter7',
        8: 'voiceSection',
        9: 'promiseWall',
        10: 'finalScene',
        11: 'easterEgg'
    };
    
    Object.values(chapters).forEach(id => {
        const elem = document.getElementById(id);
        if (elem) elem.classList.add('hidden');
    });
    
    const chapterId = chapters[chapterNum];
    if (chapterId) {
        const elem = document.getElementById(chapterId);
        if (elem) {
            elem.classList.remove('hidden');
            setTimeout(() => window.scrollTo({ top: elem.offsetTop, behavior: 'smooth' }), 100);
        }
    }
    
    initializeChapterContent(chapterNum);
}

// ============================================
// CHAPTER 2: HIDDEN STARS
// ============================================

const starMessages = [
    "You're my favorite notification.",
    "Thank you for existing.",
    "Home isn't a place. It's you.",
    "My biggest flex? You're my sister.",
    "Every superhero wears different clothes. Mine just calls me 'little brother.'",
    "You are loved more than you realize.",
    "The universe definitely spoiled me.",
    "I hope one day you see yourself the way I see you.",
    "I smile whenever someone asks about my sister.",
    "You're my lifetime VIP.",
    "Some blessings have names. Mine is yours.",
    "Forever my best friend.",
    "I still need your advice.",
    "I'm still your little brother. Always.",
    "You make everything better.",
    "I'm proud to be your little brother.",
    "You've seen me at my worst and still believed in me.",
    "Thank you for all the sacrifices.",
    "You're stronger than you know.",
    "I wouldn't be here without you.",
    "Your love is my greatest treasure.",
    "You're my safe place.",
    "I learn so much from you.",
    "You inspire me every day.",
    "My life is richer because of you.",
    "You're my favorite person.",
    "I love you more than words can say.",
    "You're the best sister anyone could ask for.",
    "Thank you for being my strength.",
    "You mean the world to me.",
    "I'm lucky to call you Mamma.",
    "Your smile makes everything worth it.",
    "You're my biggest cheerleader.",
    "I trust you with everything.",
    "You're my hero.",
    "Thank you for never giving up on me.",
    "You're the heart of our family.",
    "I see your goodness and beauty.",
    "You make memories worth keeping.",
    "Forever grateful for you.",
    "You're my person.",
    "I choose you every time.",
    "You're irreplaceable.",
    "Thank you for all your love.",
    "You're my everything.",
    "I admire your strength.",
    "You're worth celebrating.",
    "My heart belongs with you.",
    "You're my anchor.",
    "In every universe, I'd still choose you."
];

function initializeStars() {
    const starsField = document.querySelector('.stars-field');
    if (!starsField) return;
    
    starsField.innerHTML = '';
    
    // Re-add cards first
    const cards = [
        "You probably never knew... Every achievement felt incomplete until I wanted to tell you about it.",
        "You never knew... Whenever someone appreciated me... I silently wished you were there to hear it too.",
        "You never knew... Sometimes I acted strong... Only because I knew you believed I could be.",
        "You never knew... Some of my happiest memories have one thing in common. You.",
        "You never knew... How lucky I feel every single day that God made you my sister."
    ];
    
    cards.forEach(text => {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = text;
        starsField.appendChild(card);
    });
    
    // Add random stars
    for (let i = 0; i < 45; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.innerHTML = '<span class="star-icon">⭐</span>';
        
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        star.style.left = randomX + '%';
        star.style.top = randomY + '%';
        
        star.addEventListener('click', (e) => {
            e.stopPropagation();
            showStarMessage(star, starMessages[Math.floor(Math.random() * starMessages.length)]);
        });
        
        starsField.appendChild(star);
    }
}

function showStarMessage(starElement, message) {
    const existingMsg = document.querySelector('.star-message');
    if (existingMsg) existingMsg.remove();
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'star-message';
    msgDiv.textContent = message;
    
    const rect = starElement.getBoundingClientRect();
    msgDiv.style.left = (rect.left + window.scrollX - 100) + 'px';
    msgDiv.style.top = (rect.top + window.scrollY - 60) + 'px';
    
    document.body.appendChild(msgDiv);
    
    setTimeout(() => msgDiv.remove(), 4000);
}

// ============================================
// CHAPTER 3: QUIZ
// ============================================

let currentQuestion = 1;

function initializeQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    questions.forEach((q, idx) => {
        if (idx === 0) q.classList.remove('hidden');
        else q.classList.add('hidden');
    });
    
    document.getElementById('quizResult').classList.add('hidden');
    
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('correct');
        option.addEventListener('click', handleQuizAnswer);
    });
}

function handleQuizAnswer(e) {
    const option = e.target;
    
    if (option.classList.contains('mamma-answer')) {
        option.classList.add('correct');
        createFlowers();
        
        setTimeout(() => {
            const currentQ = document.getElementById(`q${currentQuestion}`);
            if (currentQ) currentQ.classList.add('hidden');
            
            currentQuestion++;
            
            if (currentQuestion <= 4) {
                const nextQ = document.getElementById(`q${currentQuestion}`);
                if (nextQ) {
                    nextQ.classList.remove('hidden');
                    initializeQuiz();
                }
            } else {
                showQuizResult();
            }
        }, 1000);
    }
}

function showQuizResult() {
    document.getElementById('quizResult').classList.remove('hidden');
    
    setTimeout(() => {
        // Transition to next chapter after result
        document.getElementById('chapter3').classList.add('hidden');
        showChapter(4);
    }, 3000);
}

function createFlowers() {
    for (let i = 0; i < 20; i++) {
        const flower = document.createElement('div');
        flower.style.position = 'fixed';
        flower.style.left = Math.random() * 100 + '%';
        flower.style.top = Math.random() * 100 + '%';
        flower.style.fontSize = (Math.random() * 20 + 20) + 'px';
        flower.style.opacity = '1';
        flower.style.pointerEvents = 'none';
        flower.style.zIndex = '1000';
        flower.textContent = '🌸';
        flower.style.animation = 'bloom 1.5s ease-out forwards';
        
        document.body.appendChild(flower);
        
        setTimeout(() => flower.remove(), 1500);
    }
}

// ============================================
// CHAPTER 4: MEMORY TIMELINE WITH PHOTO TRANSITIONS
// ============================================

function initializeChapter4() {
    const moments = document.querySelectorAll('.memory-moment');
    
    moments.forEach((moment, index) => {
        const photo = moment.querySelector('.moment-photo');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Text is visible, wait a bit then show photo
                    setTimeout(() => {
                        photo.classList.add('active');
                    }, 500);
                    
                    // Keep photo visible for 2-3 seconds
                    setTimeout(() => {
                        photo.classList.add('fade-out');
                    }, 3000);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(moment);
    });
}

// ============================================
// CHAPTER 6: MUSEUM PARAGRAPHS
// ============================================

const museumTexts = {
    kindness: "Your kindness isn't just something you do—it's who you are. I've watched you extend compassion to people even when it cost you something. You've been kind to me when I didn't deserve it, and that's shaped who I am today.",
    
    strength: "You are stronger than you realize. I've seen you face hardships that would break most people, and yet you keep standing. You don't make a show of it, but I notice. Your quiet strength is the backbone of everything.",
    
    love: "The way you love is unconditional and absolute. You've loved me through my mistakes, my doubts, and my failures. That kind of love doesn't ask for anything in return—it just is. It's the most beautiful thing I know.",
    
    sacrifice: "You've given so much without ever asking for recognition. Your sacrifices have shaped my path, given me opportunities, and protected my dreams. I see it. I feel it. I'm grateful for it every single day.",
    
    laughter: "Life would be colorless without your laugh. You make me laugh in ways that heal me. Your sense of humor, your silly jokes, the way you can find light even in dark moments—that's pure magic.",
    
    memories: "Every meaningful memory I have has you in it. You've been there for the victories, the defeats, the quiet moments, and the celebrations. These memories are my greatest treasure, and they're all connected to you."
};

function initializeMuseum() {
    Object.keys(museumTexts).forEach(key => {
        const elem = document.getElementById(`${key}Para`);
        if (elem) elem.textContent = museumTexts[key];
    });
}

// ============================================
// FINAL SCENE & EASTER EGG
// ============================================

document.getElementById('oneLastSurpriseBtn').addEventListener('click', () => {
    document.getElementById('finalScene').classList.add('hidden');
    showChapter(11);
    startFireworks();
});

function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 2;
            this.speedX = (Math.random() - 0.5) * 10;
            this.speedY = (Math.random() - 0.5) * 10 - 5;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.015;
            this.color = ['#ffd9e8', '#e8d5f2', '#d4e5f7', '#f0f0f0'][Math.floor(Math.random() * 4)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += 0.2; // gravity
            this.life -= this.decay;
        }
        
        draw() {
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function explode(x, y) {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(x, y));
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }
    
    // Create multiple explosions
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.6;
            explode(x, y);
            animate();
        }, i * 300);
    }
}

// ============================================
// CHAPTER INITIALIZATION
// ============================================

function initializeChapterContent(chapterNum) {
    switch(chapterNum) {
        case 2:
            initializeStars();
            break;
        case 3:
            initializeQuiz();
            break;
        case 4:
            initializeChapter4();
            break;
        case 6:
            initializeMuseum();
            break;
    }
}

// ============================================
// SCROLL MONITORING FOR AUTO-CHAPTER TRANSITION
// ============================================

window.addEventListener('scroll', () => {
    const chapters = document.querySelectorAll('.chapter:not(.hidden)');
    if (chapters.length === 0) return;
    
    const currentChapterElem = chapters[chapters.length - 1];
    const rect = currentChapterElem.getBoundingClientRect();
    
    if (rect.bottom < window.innerHeight && currentChapter < 12) {
        // User reached the bottom of current chapter
        const nextChapter = currentChapter + 1;
        if (nextChapter <= 12) {
            showChapter(nextChapter);
        }
    }
});

// ============================================
// HANDLE WINDOW RESIZE
// ============================================

window.addEventListener('resize', () => {
    const canvas = document.getElementById('fireworksCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// ============================================
// PREVENT BACK NAVIGATION AFTER UNLOCK
// ============================================

window.addEventListener('beforeunload', (e) => {
    if (!passwordScreen.classList.contains('hidden')) {
        return;
    }
});

// Add CSS animation for flowers bloom
const style = document.createElement('style');
style.textContent = `
    @keyframes bloom {
        0% {
            transform: scale(0) translateY(0);
            opacity: 1;
        }
        100% {
            transform: scale(1) translateY(-100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
