// --- Theme Toggle ---
const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement;
const mainLogo = document.getElementById('main-logo');

themeBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    if (currentTheme === 'light') {
        root.removeAttribute('data-theme');
        themeBtn.innerHTML = '☀️';
        if (mainLogo) mainLogo.src = './Logo/Horizontal Letra Blanca.png';
    } else {
        root.setAttribute('data-theme', 'light');
        themeBtn.innerHTML = '🌙';
        if (mainLogo) mainLogo.src = './Logo/Horizontal.png';
    }
});

// --- Constellation Particle System ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles;
const PARTICLE_COUNT = 70;

// The 3 institutional brand colors
// We extract the hexes to rgb values for the canvas
const colors = [
    { r: 0, g: 154, b: 96 },   // #009A60 (Green)
    { r: 255, g: 122, b: 0 },  // #FF7A00 (Orange)
    { r: 0, g: 180, b: 216 }   // #00B4D8 (Cyan)
];

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

function initParticles() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => {
        // Assign a random color from the palette to each particle
        const color = colors[Math.floor(Math.random() * colors.length)];
        return {
            x: Math.random() * W, y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8,
            r: Math.random() * 2 + 0.5,
            color: color
        };
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    
    // Draw lines between nearby particles
    ctx.lineWidth = 0.6;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
                // Opacity decreases as distance increases
                const opacity = 0.3 - (dist / 130) * 0.3;
                
                // Use the color of the first particle for the line (or mix them, but this is faster)
                const c = particles[i].color;
                ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`;
                
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    // Move and draw particles
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        
        // Bounce off edges smoothly
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.7)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(drawParticles);
}
window.addEventListener('resize', resize);
initParticles();
drawParticles();

// --- Intersection Observer for Scroll Animations ---
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

// --- Hover Glow Effect on Cards ---
const cards = document.querySelectorAll('.card-hover');
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});

// --- Rocket Back to Top ---
const rocketBtn = document.getElementById('rocket-btn');
if (rocketBtn && themeBtn) {
    rocketBtn.addEventListener('click', () => {
        if (rocketBtn.classList.contains('launching')) return;
        rocketBtn.classList.add('launching');

        const rocketRect = rocketBtn.getBoundingClientRect();
        const themeRect = themeBtn.getBoundingClientRect();

        const flyingRocket = document.createElement('div');
        flyingRocket.className = 'flying-rocket';
        flyingRocket.style.left = rocketRect.left + 'px';
        flyingRocket.style.top = rocketRect.top + 'px';
        flyingRocket.style.width = rocketRect.width + 'px';
        flyingRocket.style.height = rocketRect.height + 'px';
        
        const innerRocket = document.createElement('div');
        innerRocket.innerHTML = rocketBtn.innerHTML;
        innerRocket.style.transform = 'rotate(-45deg)';
        innerRocket.style.fontSize = window.getComputedStyle(rocketBtn).fontSize;
        innerRocket.style.display = 'flex';
        innerRocket.style.justifyContent = 'center';
        innerRocket.style.alignItems = 'center';
        innerRocket.style.width = '100%';
        innerRocket.style.height = '100%';
        
        flyingRocket.appendChild(innerRocket);
        document.body.appendChild(flyingRocket);

        // Hide original
        rocketBtn.style.opacity = '0';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Calculate path
        const deltaX = themeRect.left - rocketRect.left;
        const deltaY = themeRect.top - rocketRect.top;
        const distance = Math.sqrt(deltaX*deltaX + deltaY*deltaY);

        const nx = -deltaY / distance;
        const ny = deltaX / distance;

        const keyframes = [];

        // Phase 1: Straighten and Vibrate (0% to 15%)
        const vibrateSteps = 15;
        for (let i = 0; i <= vibrateSteps; i++) {
            const p = i / vibrateSteps;
            const offset = p * 0.15;
            
            // Straighten from 45deg (original visual orientation) to 0deg (forward is UP)
            const rotation = 45 * (1 - p); 
            
            const shakeX = i === vibrateSteps ? 0 : (Math.random() - 0.5) * 8;
            const shakeY = i === vibrateSteps ? 0 : (Math.random() - 0.5) * 8;
            
            keyframes.push({
                transform: `translate(${shakeX}px, ${shakeY}px) rotate(${rotation}deg) scale(1)`,
                opacity: 1,
                offset: offset
            });
        }

        let prevX = 0;
        let prevY = 0;
        let prevRotation = 0; // Starts flight pointing straight UP

        // Phase 2: Erratic flight all over the screen
        const flightSteps = 80;
        for (let i = 1; i <= flightSteps; i++) {
            const p = i / flightSteps; // 0 to 1
            const offset = 0.15 + p * 0.85; // 0.15 to 1.0
            
            const easeP = p * p; // Quadratic ease-in
            
            const baseX = deltaX * easeP;
            const baseY = deltaY * easeP;
            
            // Huge erratic waves sweeping across the screen
            const maxAmplitude = window.innerWidth * 0.45;
            const amplitude = maxAmplitude * Math.sin(p * Math.PI); 
            const wave = amplitude * Math.sin(p * Math.PI * 5); 
            
            const secondaryAmplitude = window.innerHeight * 0.25 * Math.sin(p * Math.PI);
            const secondaryWave = secondaryAmplitude * Math.cos(p * Math.PI * 7);
            
            const targetX = baseX + nx * wave + ny * secondaryWave;
            const targetY = baseY + ny * wave - nx * secondaryWave;
            
            const dx = targetX - prevX;
            const dy = targetY - prevY;
            
            let rotation = prevRotation;
            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                const angleDeg = Math.atan2(dy, dx) * 180 / Math.PI;
                // +90 because Math.atan2(-1,0) is -90 for UP, and our 0deg is UP
                rotation = angleDeg + 90;
                
                while (rotation - prevRotation > 180) rotation -= 360;
                while (rotation - prevRotation < -180) rotation += 360;
                
                prevRotation = rotation;
            }
            
            const scale = 1 - (p * 0.5); // scale down to 0.5
            const opacity = p > 0.9 ? 1 - ((p - 0.9) * 10) : 1;

            keyframes.push({
                transform: `translate(${targetX}px, ${targetY}px) rotate(${rotation}deg) scale(${scale})`,
                opacity: opacity,
                offset: offset
            });
            
            prevX = targetX;
            prevY = targetY;
        }

        const duration = 5500; // 5.5 seconds total to fly all over

        const animation = flyingRocket.animate(keyframes, {
            duration: duration,
            easing: 'linear', 
            fill: 'forwards'
        });

        animation.onfinish = () => {
            flyingRocket.remove();
            rocketBtn.style.opacity = '1';
            rocketBtn.classList.remove('launching');
        };
    });
}
