/* ===================================================================
   MUHAMMAD ZARYAB HASSAN - 3D AI ENGINEER PORTFOLIO
   Interactive Engine & 3rd Eye Neural Scanner System
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ===============================================================
       1. PARTICLES BACKGROUND
       =============================================================== */
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const mouse = { x: null, y: null, radius: 140 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = (Math.random() - 0.5) * 0.8;
            this.color = Math.random() > 0.5 ? 'rgba(0, 212, 255, ' : 'rgba(108, 99, 255, ';
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
            if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

            // Mouse proximity interaction
            if (mouse.x && mouse.y) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    this.x -= Math.cos(angle) * 1.5;
                    this.y -= Math.sin(angle) * 1.5;
                }
            }
        }
        draw() {
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 16000), 75);
        for (let i = 0; i < count; i++) {
            particlesArray.push(new Particle());
        }
    }
    initParticles();
    window.addEventListener('resize', initParticles);

    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 110) {
                    const opacity = (1 - dist / 110) * 0.25;
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();


    /* ===============================================================
       2. CURSOR GLOW TRACKER
       =============================================================== */
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }


    /* ===============================================================
       3. TYPEWRITER EFFECT
       =============================================================== */
    const typewriterEl = document.getElementById('typewriter');
    const roles = [
        "Autonomous AI Agents 🤖",
        "Intelligent RAG Systems 🧬",
        "Full-Stack Web Applications 🌐",
        "Next-Gen AI Platforms 🚀",
        "Enterprise Scalable Tech 🏢"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function typeEffect() {
        const currentRole = roles[roleIdx];
        if (isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 45;
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            typeSpeed = 1800; // Pause at end of text
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            typeSpeed = 400; // Pause before next word
        }
        setTimeout(typeEffect, typeSpeed);
    }
    if (typewriterEl) typeEffect();


    /* ===============================================================
       4. ANIMATED COUNTERS
       =============================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    function countUpStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'), 10);
            let current = 0;
            const increment = target / 35;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            updateCount();
        });
    }

    const heroSection = document.getElementById('home');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    countUpStats();
                }
            });
        }, { threshold: 0.3 });
        observer.observe(heroSection);
    }


    /* ===============================================================
       5. AVATAR NATURAL EYES BLINKING & DYNAMIC MODULE SYSTEM
       =============================================================== */
    const avatarEyesSystem = document.getElementById('avatarEyesSystem');
    const avatarContainer = document.getElementById('avatarContainer');

    // HUD Elements
    const hudModuleBody = document.getElementById('hudModuleBody');
    const hudScanCounter = document.getElementById('hudScanCounter');
    const hudAchievementBadge = document.getElementById('hudAchievementBadge');
    const hudTitle = document.getElementById('hudTitle');
    const hudCategory = document.getElementById('hudCategory');
    const hudDesc = document.getElementById('hudDesc');
    const hudTech = document.getElementById('hudTech');
    const hudMetric = document.getElementById('hudMetric');
    const hudPrimaryBtn = document.getElementById('hudPrimaryBtn');
    const hudSecondaryBtn = document.getElementById('hudSecondaryBtn');
    const hudBlinkBtn = document.getElementById('hudBlinkBtn');
    const hudProgressBar = document.getElementById('hudProgressBar');
    const hudSfxBtn = document.getElementById('hudSfxBtn');
    const sfxIcon = document.getElementById('sfxIcon');

    // Modules Array containing Achievements and Project Actions
    const eyeModules = [
        {
            scanIndex: "MODULE #1/5",
            badge: '<i class="fas fa-trophy"></i> TOP AI AGENT ACHIEVEMENT',
            badgeClass: "badge-gold",
            title: "Impact-StudyAgent AI",
            category: "🤖 Autonomous Tutoring Agent",
            desc: "Engineered an intelligent study companion agent featuring conversational learning, automated concept synthesis, and real-time knowledge evaluation.",
            tech: "TypeScript • Next.js • Vercel",
            metric: "99.4% Precision • 100% Autonomous",
            primaryBtnText: '<i class="fas fa-external-link-alt"></i> Launch Live App',
            primaryBtnUrl: "https://studyagent-one.vercel.app",
            secondaryBtnText: '<i class="fab fa-github"></i> View Repo',
            secondaryBtnUrl: "https://github.com/zaryab124/Impact-StudyAgent"
        },
        {
            scanIndex: "MODULE #2/5",
            badge: '<i class="fas fa-star"></i> ENTERPRISE SCALE ACHIEVEMENT',
            badgeClass: "badge-blue",
            title: "IMPACT Enterprise Platform",
            category: "🏢 Enterprise Management & Cloud Ops",
            desc: "Full-scale corporate workflow platform with robust multi-tenant synchronization, analytics telemetry, and high-performance serverless endpoints.",
            tech: "TypeScript • React • Cloud Ops",
            metric: "100% Production Uptime",
            primaryBtnText: '<i class="fas fa-external-link-alt"></i> Open Enterprise App',
            primaryBtnUrl: "https://impact-enterprise.vercel.app",
            secondaryBtnText: '<i class="fab fa-github"></i> View Architecture',
            secondaryBtnUrl: "https://github.com/zaryab124/IMPACT-Enterprise"
        },
        {
            scanIndex: "MODULE #3/5",
            badge: '<i class="fas fa-award"></i> NEURAL WORKFLOWS RECOGNITION',
            badgeClass: "badge-purple",
            title: "Xynvora AI Automation",
            category: "🧠 Scalable Agentic Platform",
            desc: "Next-gen intelligent system orchestrating tool invocation, automated workflows, and complex reasoning pipelines for dynamic tasks.",
            tech: "Next.js • TypeScript • Cloud AI",
            metric: "Low Latency Reasoning",
            primaryBtnText: '<i class="fas fa-external-link-alt"></i> Test Xynvora AI',
            primaryBtnUrl: "https://xynvora-ai.vercel.app",
            secondaryBtnText: '<i class="fab fa-github"></i> Star on GitHub',
            secondaryBtnUrl: "https://github.com/zaryab124/Xynvora-AI"
        },
        {
            scanIndex: "MODULE #4/5",
            badge: '<i class="fas fa-fire"></i> COMPUTER VISION ML ACHIEVEMENT',
            badgeClass: "badge-orange",
            title: "AI Video Transformer",
            category: "🎥 Deep Learning Media Synthesis",
            desc: "Neural video generation pipeline built with Python, turning static images into smooth AI-generated video sequences using state-of-the-art vision models.",
            tech: "Python • Deep Learning • OpenCV",
            metric: "Neural Frame Synthesis",
            primaryBtnText: '<i class="fab fa-github"></i> Inspect Python Code',
            primaryBtnUrl: "https://github.com/zaryab124/ai-video-transformer",
            secondaryBtnText: '<i class="fas fa-laptop-code"></i> View Projects',
            secondaryBtnUrl: "#projects"
        },
        {
            scanIndex: "MODULE #5/5",
            badge: '<i class="fas fa-crown"></i> 11+ PRODUCTION APPS DEPLOYED',
            badgeClass: "badge-green",
            title: "DigitalOS & Full-Stack Suite",
            category: "💻 Web Operating System & Active Suite",
            desc: "Comprehensive suite of 11+ deployed web applications including browser operating systems, real-time sports scorers, and business portal engines.",
            tech: "TypeScript • JavaScript • Vercel",
            metric: "11 Live Deployments • 20 Repos",
            primaryBtnText: '<i class="fas fa-external-link-alt"></i> Explore DigitalOS',
            primaryBtnUrl: "https://digitalos-eight.vercel.app",
            secondaryBtnText: '<i class="fas fa-baseball-bat-ball"></i> Cricket Scoring',
            secondaryBtnUrl: "https://cricket-scoring-cyan.vercel.app"
        }
    ];

    let currentModuleIndex = 0;
    let sfxEnabled = true;
    let audioCtx = null;

    // Sci-Fi Sound Synthesizer via Web Audio API
    function playSciFiChirp() {
        if (!sfxEnabled) return;
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            const now = audioCtx.currentTime;

            // Futuristic gentle optic chirp frequency glide
            osc.frequency.setValueAtTime(740, now);
            osc.frequency.exponentialRampToValueAtTime(1480, now + 0.08);
            osc.frequency.exponentialRampToValueAtTime(1108, now + 0.16);

            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(now);
            osc.stop(now + 0.22);
        } catch (e) {
            // Audio policy or unsupported
        }
    }

    // SFX Toggle
    if (hudSfxBtn) {
        hudSfxBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sfxEnabled = !sfxEnabled;
            if (sfxEnabled) {
                sfxIcon.className = 'fas fa-volume-up';
                hudSfxBtn.style.color = 'var(--cyan)';
                playSciFiChirp();
            } else {
                sfxIcon.className = 'fas fa-volume-mute';
                hudSfxBtn.style.color = 'var(--text-muted)';
            }
        });
    }

    // Avatar Natural Eyes Blink & Module Advance Function
    function triggerAvatarBlink(targetIndex = null) {
        if (!avatarContainer) return;

        // 1. Play subtle audio chirp
        playSciFiChirp();

        // 2. Seamlessly close the avatar's actual face eyes
        avatarContainer.classList.add('blinking');

        // 3. Fade out current module content
        if (hudModuleBody) hudModuleBody.classList.add('updating');

        // 4. Calculate next module index
        if (targetIndex !== null) {
            currentModuleIndex = targetIndex % eyeModules.length;
        } else {
            currentModuleIndex = (currentModuleIndex + 1) % eyeModules.length;
        }

        const data = eyeModules[currentModuleIndex];

        // 5. Update content mid-blink
        setTimeout(() => {
            if (hudScanCounter) hudScanCounter.textContent = data.scanIndex;
            if (hudAchievementBadge) hudAchievementBadge.innerHTML = data.badge;
            if (hudTitle) hudTitle.textContent = data.title;
            if (hudCategory) hudCategory.textContent = data.category;
            if (hudDesc) hudDesc.textContent = data.desc;
            if (hudTech) hudTech.textContent = data.tech;
            if (hudMetric) hudMetric.textContent = data.metric;

            if (hudPrimaryBtn) {
                hudPrimaryBtn.innerHTML = data.primaryBtnText;
                hudPrimaryBtn.href = data.primaryBtnUrl;
            }
            if (hudSecondaryBtn) {
                hudSecondaryBtn.innerHTML = data.secondaryBtnText;
                hudSecondaryBtn.href = data.secondaryBtnUrl;
            }

            // Restore module visibility
            if (hudModuleBody) hudModuleBody.classList.remove('updating');
        }, 120);

        // 6. Avatar eyes naturally reopen after blink
        setTimeout(() => {
            avatarContainer.classList.remove('blinking');
        }, 180);

        // Reset progress bar animation
        resetProgressTimer();
    }

    // Auto-blink Timer (Every 4.5 seconds)
    const AUTO_BLINK_TIME = 4500;
    let timerStartTime = Date.now();
    let progressInterval = null;

    function resetProgressTimer() {
        timerStartTime = Date.now();
    }

    function startProgressLoop() {
        if (progressInterval) clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            const elapsed = Date.now() - timerStartTime;
            const percentage = Math.min((elapsed / AUTO_BLINK_TIME) * 100, 100);

            if (hudProgressBar) {
                hudProgressBar.style.width = `${percentage}%`;
            }

            if (elapsed >= AUTO_BLINK_TIME) {
                triggerAvatarBlink();
            }
        }, 50);
    }
    startProgressLoop();

    // Event: Click directly on avatar face to trigger natural blink
    if (avatarContainer) {
        avatarContainer.addEventListener('click', (e) => {
            triggerAvatarBlink();
        });
    }

    // Event: Click on "Blink Avatar Eyes" button in HUD
    if (hudBlinkBtn) {
        hudBlinkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            triggerAvatarBlink();
        });
    }


    /* ===============================================================
       6. PROJECT FILTERS
       =============================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });


    /* ===============================================================
       7. NAVBAR SCROLL & MOBILE TOGGLE
       =============================================================== */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }


    /* ===============================================================
       8. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
       =============================================================== */
    const animatedElements = document.querySelectorAll('[data-animate]');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    animatedElements.forEach(el => scrollObserver.observe(el));


    /* ===============================================================
       9. CONTACT FORM INTERACTION
       =============================================================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Prepared!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #00d4ff)';

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Direct mailto opening as fallback
            const mailtoUrl = `mailto:mmzaryabhassan@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;
            window.open(mailtoUrl, '_blank');

            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

});
