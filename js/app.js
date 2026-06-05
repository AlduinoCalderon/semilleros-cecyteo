// --- Theme Toggle ---
const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

themeBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    if (currentTheme === 'light') {
        root.removeAttribute('data-theme');
        themeBtn.innerHTML = '☀️';
    } else {
        root.setAttribute('data-theme', 'light');
        themeBtn.innerHTML = '🌙';
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
