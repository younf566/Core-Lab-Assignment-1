// Research popup functionality for doors
class ResearchPopup {
    constructor() {
        this.popup = document.getElementById('research-popup');
        this.popupTitle = document.getElementById('popup-title');
        this.popupText = document.getElementById('popup-text');
        this.closeBtn = document.querySelector('.popup-close');
        
        // Research content for each door
        this.researchContent = {
            1: {
                title: "Digital Patterns & Childhood",
                content: `My research reveals the fascinating ways our <span class="highlight">childhood experiences shape our digital behaviors</span>. The watercolor aesthetics and gentle imagery throughout this project aren't just design choices they represent the innocent lens through which we first encountered technology.
                
                <br><br>Just as children find comfort in familiar patterns and colorful imagery, I discovered that <span class="highlight">my Instagram usage follows surprisingly predictable cycles</span>, mirroring the routine-seeking behavior I exhibited as a child. The irony is profound: what once brought genuine joy through finger painting and storybooks now manifests as endless scrolling through curated digital canvases.`
            },
            2: {
                title: "Data & Feelings Intertwined",
                content: `Through months of tracking my Instagram interactions, I uncovered a troubling pattern: <span class="highlight">my emotional state directly correlates with my scrolling duration and engagement patterns</span>. When I'm feeling low, I scroll longer but engage less. A passive consumption that mirrors how a child might mindlessly flip through picture books when upset.
                
                <br><br>The data shows that <span class="highlight">my dopamine seeking behavior on Instagram mirrors the instant gratification I sought through childhood treats and games</span>. The platform exploits this same neural pathway, turning what should be social connection into compulsive digital consumption. The watercolor theme reflects this childlike vulnerability in our relationship with technology.`
            },
            5: {
                title: "The Irony of Connection in Isolation",
                content: `Perhaps the most striking discovery in my research is the <span class="highlight">paradox of feeling more lonely while being more "connected" than ever</span>. My data reveals that peak usage times coincide with moments when I'm avoiding real-world social interactions—much like a child hiding behind a comfort blanket.
                
                <br><br>The gentle, watercolor kiddy like visuals throughout this project represent <span class="highlight">our collective regression to childlike states when overwhelmed by digital stimulation</span>. We seek the visual comfort of simpler times while trapped in increasingly complex digital ecosystems. Instagram becomes both the problem and the perceived solution, a digital pacifier for adult anxieties rooted in childhood patterns.`
            },
            6: {
                title: "Breaking the Cycle",
                content: `This entire project serves as both <span class="highlight">documentation and intervention</span> by visualizing my Instagram patterns through childlike imagery, I'm confronting the regression that social media encourages. The watercolor aesthetic isn't nostalgic; it's diagnostic, revealing how these platforms exploit our fundamental human need for comfort and recognition.
                
                <br><br>My research concludes that <span class="highlight">awareness is the first step toward healthier digital relationships</span>. By understanding how our childhood emotional patterns influence our adult digital behaviors, we can begin to make more conscious choices about our technology use. The innocent imagery serves as a mirror, showing us how we've been unconsciously seeking digital versions of childhood comfort.`
            }
        };
        
        this.init();
    }
    
    init() {
        // Add click handlers to popup doors
        document.querySelectorAll('.popup-door').forEach(door => {
            door.addEventListener('click', (e) => {
                const doorNumber = e.target.getAttribute('data-door');
                this.showPopup(doorNumber);
            });
        });
        
        // Close popup handlers
        this.closeBtn.addEventListener('click', () => this.hidePopup());
        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) {
                this.hidePopup();
            }
        });
        
        // Close with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('show')) {
                this.hidePopup();
            }
        });
    }
    
    showPopup(doorNumber) {
        const content = this.researchContent[doorNumber];
        if (content) {
            this.popupTitle.textContent = content.title;
            this.popupText.innerHTML = content.content;
            
            // Show popup with animation
            this.popup.style.display = 'flex';
            setTimeout(() => {
                this.popup.classList.add('show');
            }, 10);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    }
    
    hidePopup() {
        this.popup.classList.remove('show');
        
        setTimeout(() => {
            this.popup.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResearchPopup();
});