// Typewriter effect for h1

document.addEventListener('DOMContentLoaded', function() {
    const h1 = document.querySelector('h1');
    if (!h1) return;
    const text = h1.textContent;
    h1.innerHTML = '<span class="typewriter-text"></span><span class="typewriter-cursor">|</span>';
    const textSpan = h1.querySelector('.typewriter-text');
    const cursorSpan = h1.querySelector('.typewriter-cursor');
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            textSpan.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    typeWriter();
});
