/* ==========================================================
   PRAHASINI'S ROMANTIC BIRTHDAY SURPRISE SCRIPT
   Interactive 3D Engine, Particle Canvases, Web Audio & Logic
   ========================================================== */

// 1. EASILY CUSTOMIZABLE CONFIGURATION
const birthdayConfig = {
    name: "Prahasini",
    
    letterMessage: "Dear Prahasini, on your special day, I hope you know just how wonderfully special you are. May your life always be filled with happiness, laughter, beautiful memories and magical moments. Keep smiling, keep shining and always be the amazing person you are. Happy Birthday! ❤️✨",

    hiddenMessages: [
        { icon: "❤️", title: "Pure Heart", text: "You are truly special, Prahasini ❤️" },
        { icon: "😊", title: "Radiant Smile", text: "Keep smiling always! Your smile lights up the world. 😊" },
        { icon: "✨", title: "Magical Wish", text: "Hope your day and year ahead are as magical as you! ✨" },
        { icon: "💕", title: "Endless Love", text: "You deserve all the happiness and joy in the universe. 💕" },
        { icon: "🌟", title: "Bright Star", text: "Today is infinitely brighter and sweeter because you exist! 🌟" },
        { icon: "🤗", title: "Warm Hugs", text: "Sending you an entire universe of warm hugs and love! 🤗" },
        { icon: "🎀", title: "Shin-chan Says", text: "Shin-chan says: Keep smiling, Prahasini! You are the best! 😄❤️" },
        { icon: "🎉", title: "Party Time", text: "Even Shin-chan came to celebrate your birthday in style! 🎉" }
    ],

    balloonCompliments: [
        "You are lovely! 💖",
        "Keep Shining! ✨",
        "Queen of Hearts! 👑",
        "Sweetest Soul! 🌸",
        "Pure Joy! 🌟",
        "Super Amazing! 💫",
        "Waku Waku! 🎀",
        "Happy Birthday Prahasini! 🎂"
    ],

    finalMessage: "May this new chapter of your life be filled with happiness, love, laughter, beautiful memories and countless magical moments. Keep shining and keep smiling. You deserve all the happiness in the world. ❤️✨"
};

// ==========================================================
// 2. DOM INITIALIZATION & STATE MANAGEMENT
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
    initContent();
    initAudioPlayer();
    initParticleSystems();
    initGiftBox();
    initLetter();
    initHiddenSurprises();
    initBalloonGame();
    initCakeWish();
    initFireworksLauncher();
    initReplay();
    spawnFloatingHearts();
});

function initContent() {
    // Set dynamic text from config
    const personName = document.getElementById("birthdayPersonName");
    const letterText = document.getElementById("letterContentText");
    const finalName = document.getElementById("finalHeroName");
    const finalMsg = document.getElementById("finalMessageText");

    if (personName) personName.textContent = `❤️ ${birthdayConfig.name} ❤️`;
    if (letterText) letterText.textContent = birthdayConfig.letterMessage;
    if (finalName) finalName.textContent = birthdayConfig.name;
    if (finalMsg) finalMsg.textContent = birthdayConfig.finalMessage;
}

// ==========================================================
// 3. BACKGROUND MUSIC CONTROLLER
// ==========================================================
let audioContext = null;
let isAudioPlaying = false;
let isAudioMuted = false;

function initAudioPlayer() {
    const audio = document.getElementById("birthdayAudio");
    const playerBar = document.getElementById("musicPlayerBar");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const playPauseIcon = document.getElementById("playPauseIcon");
    const muteBtn = document.getElementById("muteBtn");
    const muteIcon = document.getElementById("muteIcon");
    const disc = document.getElementById("musicDisc");
    const equalizer = document.getElementById("equalizer");
    const statusText = document.getElementById("musicStatus");

    if (!audio) return;

    // Error handling if audio file is missing or unplayable
    audio.addEventListener("error", () => {
        if (statusText) statusText.textContent = "Birthday music unavailable 🎵";
        console.warn("Audio file 'birthday-song.mp3' could not be loaded. Continuing gracefully.");
    });

    function updatePlayerUI(playing) {
        isAudioPlaying = playing;
        if (playPauseIcon) playPauseIcon.textContent = playing ? "⏸️" : "▶️";
        if (statusText) statusText.textContent = playing ? "Playing Birthday Track 🎵" : "Paused";
        
        if (playing) {
            disc?.classList.add("playing");
            equalizer?.classList.add("playing");
        } else {
            disc?.classList.remove("playing");
            equalizer?.classList.remove("playing");
        }
    }

    function startPlay() {
        audio.play().then(() => {
            updatePlayerUI(true);
        }).catch(err => {
            console.log("Autoplay waiting for interaction:", err);
            updatePlayerUI(false);
        });
    }

    function pausePlay() {
        audio.pause();
        updatePlayerUI(false);
    }

    playPauseBtn?.addEventListener("click", () => {
        if (audio.paused) {
            startPlay();
        } else {
            pausePlay();
        }
    });

    document.getElementById("musicDiscBtn")?.addEventListener("click", () => {
        if (audio.paused) {
            startPlay();
        } else {
            pausePlay();
        }
    });

    muteBtn?.addEventListener("click", () => {
        isAudioMuted = !isAudioMuted;
        audio.muted = isAudioMuted;
        if (muteIcon) muteIcon.textContent = isAudioMuted ? "🔇" : "🔊";
    });

    // Expose global play starter
    window.startBirthdayMusic = () => {
        playerBar?.classList.remove("hidden");
        startPlay();
    };

    window.pauseBirthdayMusic = () => {
        pausePlay();
    };
}

// Sound synth pop sound using Web Audio API
function playSynthPop() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!audioContext) audioContext = new AudioCtx();
        if (audioContext.state === 'suspended') audioContext.resume();

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(480, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, audioContext.currentTime + 0.14);

        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.14);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start();
        osc.stop(audioContext.currentTime + 0.14);
    } catch (e) {
        // Safe fallback
    }
}

// Play magical sparkling chime chord
function playChimeChords() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!audioContext) audioContext = new AudioCtx();
        if (audioContext.state === 'suspended') audioContext.resume();

        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
        notes.forEach((freq, index) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            const startTime = audioContext.currentTime + index * 0.08;

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, startTime);

            gain.gain.setValueAtTime(0.001, startTime);
            gain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.start(startTime);
            osc.stop(startTime + 0.6);
        });
    } catch (e) {}
}

// Realistic gentle wind blow breath sound effect
function playBlowingSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!audioContext) audioContext = new AudioCtx();
        if (audioContext.state === 'suspended') audioContext.resume();

        const bufferSize = audioContext.sampleRate * 0.6; // 600ms
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1; // White noise
        }

        const noise = audioContext.createBufferSource();
        noise.buffer = buffer;

        const filter = audioContext.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(450, audioContext.currentTime);
        filter.frequency.exponentialRampToValueAtTime(280, audioContext.currentTime + 0.6);
        filter.Q.setValueAtTime(3.0, audioContext.currentTime);

        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.01, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.22, audioContext.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);

        noise.start(audioContext.currentTime);
        noise.stop(audioContext.currentTime + 0.6);
    } catch (e) {}
}

// ==========================================================
// 4. PARTICLE SYSTEMS (AMBIENT, CONFETTI, FIREWORKS)
// ==========================================================
let ambientCtx, confettiCtx, fireworksCtx;
let ambientParticles = [];
let confettiParticles = [];
let fireworkRockets = [];
let fireworkSparks = [];

function initParticleSystems() {
    const ambientCanvas = document.getElementById("ambientCanvas");
    const confettiCanvas = document.getElementById("confettiCanvas");
    const fireworksCanvas = document.getElementById("fireworksCanvas");

    function resizeCanvases() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (ambientCanvas) { ambientCanvas.width = w; ambientCanvas.height = h; }
        if (confettiCanvas) { confettiCanvas.width = w; confettiCanvas.height = h; }
        if (fireworksCanvas) { fireworksCanvas.width = w; fireworksCanvas.height = h; }
    }

    window.addEventListener("resize", resizeCanvases);
    resizeCanvases();

    if (ambientCanvas) ambientCtx = ambientCanvas.getContext("2d");
    if (confettiCanvas) confettiCtx = confettiCanvas.getContext("2d");
    if (fireworksCanvas) fireworksCtx = fireworksCanvas.getContext("2d");

    // Ambient floating stardust & glowing orbs
    for (let i = 0; i < 60; i++) {
        ambientParticles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 2.5 + 0.8,
            speedY: Math.random() * -0.6 - 0.2,
            speedX: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.7 + 0.3,
            color: Math.random() > 0.4 ? "#ff75c3" : (Math.random() > 0.5 ? "#ffd700" : "#a855f7")
        });
    }

    animateParticles();
}

function animateParticles() {
    requestAnimationFrame(animateParticles);

    const w = window.innerWidth;
    const h = window.innerHeight;

    // 1. Ambient Particles
    if (ambientCtx) {
        ambientCtx.clearRect(0, 0, w, h);
        ambientParticles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            if (p.y < -10) p.y = h + 10;
            if (p.x < -10) p.x = w + 10;
            if (p.x > w + 10) p.x = -10;

            ambientCtx.beginPath();
            ambientCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ambientCtx.fillStyle = p.color;
            ambientCtx.globalAlpha = p.opacity;
            ambientCtx.shadowBlur = 8;
            ambientCtx.shadowColor = p.color;
            ambientCtx.fill();
        });
        ambientCtx.globalAlpha = 1;
        ambientCtx.shadowBlur = 0;
    }

    // 2. Confetti Particles
    if (confettiCtx) {
        confettiCtx.clearRect(0, 0, w, h);
        for (let i = confettiParticles.length - 1; i >= 0; i--) {
            const c = confettiParticles[i];
            c.x += c.vx;
            c.y += c.vy;
            c.vy += c.gravity;
            c.rotation += c.rotSpeed;
            c.opacity -= c.decay;

            if (c.opacity <= 0 || c.y > h + 50) {
                confettiParticles.splice(i, 1);
                continue;
            }

            confettiCtx.save();
            confettiCtx.translate(c.x, c.y);
            confettiCtx.rotate(c.rotation);
            confettiCtx.fillStyle = c.color;
            confettiCtx.globalAlpha = c.opacity;

            if (c.shape === "heart") {
                drawMiniHeart(confettiCtx, 0, 0, c.size);
            } else if (c.shape === "circle") {
                confettiCtx.beginPath();
                confettiCtx.arc(0, 0, c.size / 2, 0, Math.PI * 2);
                confettiCtx.fill();
            } else {
                confettiCtx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
            }
            confettiCtx.restore();
        }
    }

    // 3. Fireworks Simulation
    if (fireworksCtx) {
        fireworksCtx.clearRect(0, 0, w, h);

        // Rockets
        for (let i = fireworkRockets.length - 1; i >= 0; i--) {
            const r = fireworkRockets[i];
            r.x += r.vx;
            r.y += r.vy;
            r.vy += 0.08;

            fireworksCtx.beginPath();
            fireworksCtx.arc(r.x, r.y, 3, 0, Math.PI * 2);
            fireworksCtx.fillStyle = r.color;
            fireworksCtx.shadowBlur = 10;
            fireworksCtx.shadowColor = r.color;
            fireworksCtx.fill();

            if (r.vy >= 0 || r.y <= r.targetY) {
                createExplosion(r.x, r.y, r.color);
                fireworkRockets.splice(i, 1);
            }
        }

        // Sparks
        for (let i = fireworkSparks.length - 1; i >= 0; i--) {
            const s = fireworkSparks[i];
            s.x += s.vx;
            s.y += s.vy;
            s.vy += 0.04;
            s.vx *= 0.98;
            s.vy *= 0.98;
            s.opacity -= s.decay;

            if (s.opacity <= 0) {
                fireworkSparks.splice(i, 1);
                continue;
            }

            fireworksCtx.beginPath();
            fireworksCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            fireworksCtx.fillStyle = s.color;
            fireworksCtx.globalAlpha = s.opacity;
            fireworksCtx.shadowBlur = 8;
            fireworksCtx.shadowColor = s.color;
            fireworksCtx.fill();
        }
        fireworksCtx.globalAlpha = 1;
        fireworksCtx.shadowBlur = 0;
    }
}

function drawMiniHeart(ctx, x, y, size) {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size);
    ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
}

// Confetti burst helper
window.triggerConfetti = (originX, originY, count = 75) => {
    const colors = ["#ff2a85", "#ffd700", "#a855f7", "#38bdf8", "#ff75c3", "#ffffff", "#e879f9"];
    const shapes = ["rect", "circle", "heart"];
    const x = originX || window.innerWidth / 2;
    const y = originY || window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 4;
        confettiParticles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 3,
            gravity: 0.22,
            size: Math.random() * 10 + 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.2,
            opacity: 1,
            decay: Math.random() * 0.012 + 0.008
        });
    }
};

// Fireworks helper
function launchRocket(startX, targetY, color) {
    fireworkRockets.push({
        x: startX,
        y: window.innerHeight,
        targetY: targetY,
        vx: (Math.random() - 0.5) * 2,
        vy: -(Math.random() * 6 + 10),
        color: color
    });
}

function createExplosion(x, y, baseColor) {
    const colors = [baseColor, "#ffd700", "#ff75c3", "#ffffff", "#a855f7"];
    for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 1.5;
        fireworkSparks.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 2.5 + 1.2,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: 1,
            decay: Math.random() * 0.02 + 0.015
        });
    }
}

window.launchGrandFireworks = () => {
    const colors = ["#ff2a85", "#ffd700", "#38bdf8", "#a855f7", "#ff4d94"];
    for (let i = 0; i < 7; i++) {
        setTimeout(() => {
            const startX = Math.random() * (window.innerWidth * 0.8) + window.innerWidth * 0.1;
            const targetY = Math.random() * (window.innerHeight * 0.45) + 80;
            const color = colors[i % colors.length];
            launchRocket(startX, targetY, color);
        }, i * 350);
    }
};

// ==========================================================
// 5. OPENING SCREEN - 3D GIFT BOX UNBOXING
// ==========================================================
function initGiftBox() {
    const openBtn = document.getElementById("openGiftBtn");
    const giftBox = document.getElementById("giftBox3D");
    const openingSection = document.getElementById("openingSection");
    const hub = document.getElementById("celebrationHub");

    let isOpening = false;

    function handleOpen() {
        if (!giftBox || giftBox.classList.contains("opened") || isOpening) return;
        isOpening = true;
        
        // 1. Initial anticipation shake & sound
        giftBox.classList.add("shaking");
        playSynthPop();

        // 2. Dramatic burst opening after 280ms
        setTimeout(() => {
            giftBox.classList.remove("shaking");
            giftBox.classList.add("opened");
            playChimeChords();

            // Trigger massive burst of confetti and light
            const rect = giftBox.getBoundingClientRect();
            window.triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 130);

            // Start birthday background music
            window.startBirthdayMusic();

            // Smooth transition to celebration hub
            setTimeout(() => {
                hub?.classList.remove("hidden");
                hub?.scrollIntoView({ behavior: "smooth" });
                isOpening = false;
            }, 1300);
        }, 280);
    }

    openBtn?.addEventListener("click", handleOpen);
    document.getElementById("giftScene")?.addEventListener("click", handleOpen);
}

// ==========================================================
// 6. ANIMATED BIRTHDAY LETTER 💌
// ==========================================================
function initLetter() {
    const openLetterBtn = document.getElementById("openLetterBtn");
    const envelopeWrapper = document.getElementById("envelopeWrapper");
    const waxSeal = document.getElementById("waxSeal");
    const letterBtnText = document.getElementById("letterBtnText");

    let isLetterOpen = false;

    function toggleLetter() {
        isLetterOpen = !isLetterOpen;
        envelopeWrapper?.classList.toggle("opened", isLetterOpen);
        
        if (isLetterOpen) {
            playSynthPop();
            const rect = envelopeWrapper?.getBoundingClientRect();
            if (rect) window.triggerConfetti(rect.left + rect.width / 2, rect.top, 50);
            if (letterBtnText) letterBtnText.textContent = "Fold Letter 💌";
        } else {
            if (letterBtnText) letterBtnText.textContent = "Open Your Letter 💌";
        }
    }

    openLetterBtn?.addEventListener("click", toggleLetter);
    envelopeWrapper?.addEventListener("click", toggleLetter);
    waxSeal?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleLetter();
    });
}

// ==========================================================
// 7. HIDDEN SURPRISE MESSAGES 💖
// ==========================================================
function initHiddenSurprises() {
    const grid = document.getElementById("surpriseGrid");
    const modal = document.getElementById("surpriseModal");
    const modalIcon = document.getElementById("modalIcon");
    const modalTitle = document.getElementById("modalTitle");
    const modalMsg = document.getElementById("modalMessage");
    const closeBtn = document.getElementById("closeModalBtn");

    if (!grid) return;

    birthdayConfig.hiddenMessages.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "surprise-token-card";
        card.innerHTML = `
            <div class="token-icon">${item.icon}</div>
            <span class="token-label">${item.title}</span>
        `;

        card.addEventListener("click", (e) => {
            playSynthPop();
            const rect = card.getBoundingClientRect();
            window.triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);

            if (modalIcon) modalIcon.textContent = item.icon;
            if (modalTitle) modalTitle.textContent = item.title;
            if (modalMsg) modalMsg.textContent = item.text;

            modal?.classList.remove("hidden");
        });

        grid.appendChild(card);
    });

    closeBtn?.addEventListener("click", () => {
        modal?.classList.add("hidden");
    });

    modal?.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.add("hidden");
    });
}

// ==========================================================
// 8. BALLOON MINI GAME 🎈
// ==========================================================
function initBalloonGame() {
    const arena = document.getElementById("balloonArena");
    const poppedCountEl = document.getElementById("poppedCount");
    const speechEl = document.getElementById("shinchanGameSpeech");
    const victoryBanner = document.getElementById("balloonVictoryBanner");
    const resetBtn = document.getElementById("resetBalloonsBtn");

    const totalBalloons = 8;
    let poppedCount = 0;
    const balloonClasses = ["balloon-pink", "balloon-purple", "balloon-gold", "balloon-cyan", "balloon-red"];
    const balloonIcons = ["❤️", "⭐", "🎀", "💖", "🌸", "✨", "🎈", "👑"];

    function spawnBalloons() {
        if (!arena) return;
        arena.innerHTML = "";
        poppedCount = 0;
        if (poppedCountEl) poppedCountEl.textContent = `0 / ${totalBalloons}`;
        if (victoryBanner) victoryBanner.classList.add("hidden");
        if (speechEl) speechEl.textContent = `"Yay! Help me pop all the balloons for Prahasini's surprise! 🎉"`;

        for (let i = 0; i < totalBalloons; i++) {
            const balloon = document.createElement("div");
            const colorClass = balloonClasses[i % balloonClasses.length];
            balloon.className = `game-balloon ${colorClass}`;
            balloon.innerHTML = `<span>${balloonIcons[i % balloonIcons.length]}</span>`;
            
            // Random horizontal positioning & staggered animation delays
            balloon.style.left = `${(i * 11) + 6}%`;
            balloon.style.animationDelay = `${(i * 0.75)}s`;
            balloon.style.animationDuration = `${5 + (i % 3)}s`;

            balloon.addEventListener("click", () => {
                if (balloon.dataset.popped === "true") return;
                balloon.dataset.popped = "true";
                
                playSynthPop();
                const rect = balloon.getBoundingClientRect();
                window.triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);

                // Balloon pop effect
                balloon.style.transform = "scale(1.5)";
                balloon.style.opacity = "0";
                setTimeout(() => balloon.remove(), 200);

                poppedCount++;
                if (poppedCountEl) poppedCountEl.textContent = `${poppedCount} / ${totalBalloons}`;

                const compliment = birthdayConfig.balloonCompliments[poppedCount - 1] || "Amazing! 💖";
                if (speechEl) speechEl.textContent = `"Shin-chan says: ${compliment}"`;

                if (poppedCount >= totalBalloons) {
                    // VICTORY
                    setTimeout(() => {
                        victoryBanner?.classList.remove("hidden");
                        if (speechEl) speechEl.textContent = `"Waku Waku! Prahasini unlocked the grand balloon prize! 🎉"`;
                        window.launchGrandFireworks();
                        window.triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
                    }, 400);
                }
            });

            arena.appendChild(balloon);
        }
    }

    resetBtn?.addEventListener("click", spawnBalloons);
    spawnBalloons();
}

// ==========================================================
// 9. 3D BIRTHDAY CAKE & MAKE A WISH 🎂
// ==========================================================
function initCakeWish() {
    const wishBtn = document.getElementById("makeWishBtn");
    const msgContainer = document.getElementById("wishMessageContainer");
    const step1 = document.getElementById("wishStep1");
    const step2 = document.getElementById("wishStep2");
    const flames = document.querySelectorAll(".flame");
    const candles = document.querySelectorAll(".candle");

    let isWished = false;

    wishBtn?.addEventListener("click", () => {
        if (isWished) return;
        isWished = true;

        // Play gentle realistic blowing breath sound
        playBlowingSound();

        // Staggered candle extinguishing with realistic wind blow effect
        candles.forEach((candle, index) => {
            const flame = candle.querySelector(".flame");
            const wick = candle.querySelector(".wick");

            setTimeout(() => {
                if (flame) {
                    flame.classList.add("blowing");
                    setTimeout(() => {
                        flame.classList.remove("blowing");
                        flame.classList.add("extinguished");

                        // Spawn curling animated smoke wisps
                        if (wick) {
                            for (let s = 0; s < 2; s++) {
                                const smoke = document.createElement("div");
                                smoke.className = "smoke-wisp";
                                const driftX = (index - 2) * 5 + (Math.random() * 8 - 4);
                                const driftXEnd = driftX * 2.4 + (Math.random() * 10 - 5);
                                smoke.style.setProperty("--drift-x", `${driftX}px`);
                                smoke.style.setProperty("--drift-x-end", `${driftXEnd}px`);
                                smoke.style.animationDelay = `${s * 0.18}s`;
                                wick.appendChild(smoke);

                                setTimeout(() => smoke.remove(), 2000);
                            }
                        }
                    }, 180);
                }
            }, index * 80);
        });

        // After all candles are blown out: trigger sparkling chords & reveal heartfelt wish
        setTimeout(() => {
            playChimeChords();

            const cake3D = document.getElementById("cake3D");
            if (cake3D) {
                const rect = cake3D.getBoundingClientRect();
                window.triggerConfetti(rect.left + rect.width / 2, rect.top + 20, 85);
            }

            // Show Wish Text Progressively
            if (msgContainer) msgContainer.classList.remove("hidden");
            if (step1) step1.classList.remove("hidden");
            if (step2) step2.classList.add("hidden");

            setTimeout(() => {
                if (step2) {
                    step2.classList.remove("hidden");
                    window.triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, 75);
                }
            }, 1800);
        }, candles.length * 80 + 220);
    });

    window.resetCakeCandles = () => {
        isWished = false;
        flames.forEach(flame => {
            flame.classList.remove("blowing", "extinguished");
        });
        document.querySelectorAll(".smoke-wisp").forEach(w => w.remove());
        if (msgContainer) msgContainer.classList.add("hidden");
        if (step2) step2.classList.add("hidden");
    };
}

// ==========================================================
// 10. FIREWORKS LAUNCHER & REPLAY SURPRISE 🔄
// ==========================================================
function initFireworksLauncher() {
    const btn = document.getElementById("launchFireworksBtn");
    btn?.addEventListener("click", () => {
        playSynthPop();
        window.launchGrandFireworks();
        window.triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 90);
    });
}

function initReplay() {
    const replayBtn = document.getElementById("replaySurpriseBtn");
    replayBtn?.addEventListener("click", () => {
        // Reset 3D Box
        const giftBox = document.getElementById("giftBox3D");
        giftBox?.classList.remove("opened", "shaking");

        // Reset Envelope
        const envelopeWrapper = document.getElementById("envelopeWrapper");
        envelopeWrapper?.classList.remove("opened");
        const letterBtnText = document.getElementById("letterBtnText");
        if (letterBtnText) letterBtnText.textContent = "Open Your Letter 💌";

        // Reset Cake
        if (window.resetCakeCandles) window.resetCakeCandles();

        // Reset Balloons
        const resetBalloonsBtn = document.getElementById("resetBalloonsBtn");
        resetBalloonsBtn?.click();

        // Scroll back to top
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Confetti burst to welcome replay
        setTimeout(() => {
            window.triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, 50);
        }, 800);
    });
}

// ==========================================================
// 11. FLOATING BACKGROUND HEARTS SPAWNER
// ==========================================================
function spawnFloatingHearts() {
    const container = document.getElementById("floatingHeartsContainer");
    if (!container) return;

    const emojis = ["❤️", "💖", "✨", "💕", "🌸", "⭐", "🎀"];

    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "floating-bg-heart";
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 6 + 8}s`;
        heart.style.fontSize = `${Math.random() * 1.2 + 1}rem`;

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 14000);
    }, 900);
}
