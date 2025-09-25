// Grid effects for page 3
class GridEffects {
    constructor() {
        this.grid = document.querySelector('.insta-grid');
        this.posts = [];
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        setTimeout(() => {
            this.posts = document.querySelectorAll('.insta-post');
            this.setupEffects();
        }, 100);
    }

    setupEffects() {
        this.addStaggeredAnimation();
        this.addHoverEffects();
        this.addWaveEffect();
        this.addMouseFollowEffect();
        this.addKeyboardEffects();
    }

    addStaggeredAnimation() {
        this.posts.forEach((post, index) => {
            post.style.animationDelay = `${index * 0.05}s`;
        });
    }

    addHoverEffects() {
        this.posts.forEach((post, index) => {
            // Skip effects for no-effects posts
            if (post.classList.contains('no-effects')) {
                return;
            }
            
            let hoverTimeout;
            
            post.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                this.rippleEffect(index);
                this.addGlowToNeighbors(index);
            });

            post.addEventListener('mouseleave', () => {
                // Delay removing glow to prevent flickering
                hoverTimeout = setTimeout(() => {
                    this.removeGlowFromNeighbors();
                }, 150);
            });

            post.addEventListener('click', () => {
                this.explosionEffect(post);
            });
        });
    }

    rippleEffect(centerIndex) {
        const centerRow = Math.floor(centerIndex / 12);
        const centerCol = centerIndex % 12;

        this.posts.forEach((post, index) => {
            // Skip no-effects posts
            if (post.classList.contains('no-effects')) {
                return;
            }
            
            const row = Math.floor(index / 12);
            const col = index % 12;
            const distance = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2));
            
            setTimeout(() => {
                post.classList.add('wave');
                setTimeout(() => post.classList.remove('wave'), 1200);
            }, distance * 80);
        });
    }

    addGlowToNeighbors(index) {
        const neighbors = this.getNeighbors(index);
        neighbors.forEach(neighborIndex => {
            if (this.posts[neighborIndex] && !this.posts[neighborIndex].classList.contains('no-effects')) {
                this.posts[neighborIndex].classList.add('glow');
            }
        });
    }

    removeGlowFromNeighbors() {
        this.posts.forEach(post => {
            post.classList.remove('glow');
        });
    }

    getNeighbors(index) {
        const row = Math.floor(index / 12);
        const col = index % 12;
        const neighbors = [];

        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                if (r === 0 && c === 0) continue;
                const newRow = row + r;
                const newCol = col + c;
                if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 12) {
                    neighbors.push(newRow * 12 + newCol);
                }
            }
        }
        return neighbors;
    }

    explosionEffect(post) {
        post.style.transform = 'scale(1.3) rotateZ(10deg)';
        post.style.transition = 'transform 0.1s ease-out';
        
        setTimeout(() => {
            post.style.transform = '';
            post.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }, 100);

        // Create particle effect
        this.createParticles(post);
    }

    createParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            document.body.appendChild(particle);

            const angle = (i / 12) * Math.PI * 2;
            const velocity = 100 + Math.random() * 50;
            const size = 4 + Math.random() * 8;

            particle.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, #ff6b6b, #feca57);
                border-radius: 50%;
                left: ${centerX}px;
                top: ${centerY}px;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 0 10px rgba(255, 107, 107, 0.8);
            `;

            const deltaX = Math.cos(angle) * velocity;
            const deltaY = Math.sin(angle) * velocity;

            particle.animate([
                {
                    transform: 'translate(0px, 0px) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${deltaX}px, ${deltaY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }

    addWaveEffect() {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                const randomIndex = Math.floor(Math.random() * this.posts.length);
                this.createRandomWave(randomIndex);
            }
        }, 2000);
    }

    createRandomWave(startIndex) {
        const directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1], // cardinal directions
            [-1, -1], [-1, 1], [1, -1], [1, 1] // diagonal directions
        ];
        const direction = directions[Math.floor(Math.random() * directions.length)];
        
        let currentIndex = startIndex;
        let delay = 0;

        while (this.posts[currentIndex]) {
            setTimeout(() => {
                if (this.posts[currentIndex] && !this.posts[currentIndex].classList.contains('no-effects')) {
                    this.posts[currentIndex].classList.add('wave');
                    setTimeout(() => {
                        if (this.posts[currentIndex]) {
                            this.posts[currentIndex].classList.remove('wave');
                        }
                    }, 1200);
                }
            }, delay);

            const row = Math.floor(currentIndex / 12);
            const col = currentIndex % 12;
            const newRow = row + direction[0];
            const newCol = col + direction[1];

            if (newRow < 0 || newRow >= 10 || newCol < 0 || newCol >= 12) break;
            
            currentIndex = newRow * 12 + newCol;
            delay += 100;
        }
    }

    addMouseFollowEffect() {
        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Subtle mouse follow effect for posts
        this.posts.forEach((post, index) => {
            // Skip no-effects posts
            if (post.classList.contains('no-effects')) {
                return;
            }
            
            post.addEventListener('mouseenter', () => {
                const updateRotation = () => {
                    const rect = post.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    
                    const deltaX = mouseX - centerX;
                    const deltaY = mouseY - centerY;
                    
                    const rotateX = (deltaY / rect.height) * -10;
                    const rotateY = (deltaX / rect.width) * 10;
                    
                    post.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                };

                const mouseMoveHandler = () => updateRotation();
                document.addEventListener('mousemove', mouseMoveHandler);

                post.addEventListener('mouseleave', () => {
                    document.removeEventListener('mousemove', mouseMoveHandler);
                    post.style.transform = '';
                }, { once: true });
            });
        });
    }

    addKeyboardEffects() {
        document.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case 'w':
                    this.createWaveFromDirection('up');
                    break;
                case 's':
                    this.createWaveFromDirection('down');
                    break;
                case 'a':
                    this.createWaveFromDirection('left');
                    break;
                case 'd':
                    this.createWaveFromDirection('right');
                    break;
                case ' ':
                    e.preventDefault();
                    this.randomColorPulse();
                    break;
                case 'r':
                    this.rainEffect();
                    break;
            }
        });
    }

    createWaveFromDirection(direction) {
        let startIndices = [];
        
        switch(direction) {
            case 'up':
                startIndices = Array.from({length: 12}, (_, i) => i);
                break;
            case 'down':
                startIndices = Array.from({length: 12}, (_, i) => 104 + i);
                break;
            case 'left':
                startIndices = Array.from({length: 10}, (_, i) => i * 12);
                break;
            case 'right':
                startIndices = Array.from({length: 10}, (_, i) => i * 12 + 11);
                break;
        }

        startIndices.forEach(index => {
            this.createDirectionalWave(index, direction);
        });
    }

    createDirectionalWave(startIndex, direction) {
        const directionMap = {
            'up': [1, 0],
            'down': [-1, 0],
            'left': [0, 1],
            'right': [0, -1]
        };

        const [rowDelta, colDelta] = directionMap[direction];
        let currentIndex = startIndex;
        let delay = 0;

        while (this.posts[currentIndex]) {
            setTimeout(() => {
                if (this.posts[currentIndex] && !this.posts[currentIndex].classList.contains('no-effects')) {
                    this.posts[currentIndex].classList.add('wave');
                    setTimeout(() => {
                        if (this.posts[currentIndex]) {
                            this.posts[currentIndex].classList.remove('wave');
                        }
                    }, 1200);
                }
            }, delay);

            const row = Math.floor(currentIndex / 12);
            const col = currentIndex % 12;
            const newRow = row + rowDelta;
            const newCol = col + colDelta;

            if (newRow < 0 || newRow >= 10 || newCol < 0 || newCol >= 12) break;
            
            currentIndex = newRow * 12 + newCol;
            delay += 50;
        }
    }

    randomColorPulse() {
        this.posts.forEach((post, index) => {
            // Skip no-effects posts
            if (post.classList.contains('no-effects')) {
                return;
            }
            
            setTimeout(() => {
                const originalTransition = post.style.transition;
                post.style.transition = 'all 0.3s ease';
                post.style.filter = 'hue-rotate(180deg) saturate(1.5)';
                
                setTimeout(() => {
                    post.style.filter = '';
                    post.style.transition = originalTransition;
                }, 300);
            }, index * 10);
        });
    }

    rainEffect() {
        for (let col = 0; col < 12; col++) {
            setTimeout(() => {
                for (let row = 0; row < 10; row++) {
                    setTimeout(() => {
                        const index = row * 12 + col;
                        if (this.posts[index] && !this.posts[index].classList.contains('no-effects')) {
                            this.posts[index].classList.add('wave');
                            setTimeout(() => {
                                this.posts[index].classList.remove('wave');
                            }, 1200);
                        }
                    }, row * 100);
                }
            }, col * 50);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GridEffects();
});