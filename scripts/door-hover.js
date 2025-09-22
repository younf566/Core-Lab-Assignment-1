// this is the JavaScript to swap door images on hover

document.addEventListener('DOMContentLoaded', function() {

    const doors = document.querySelectorAll('.gallery img');

    doors.forEach(function(door) {
      
        const closedSrc = door.getAttribute('src');
    const openSrc = closedSrc.replace('.png', '_opened.png');

        const img = new Image();
        img.src = openSrc;

        door.addEventListener('mouseenter', function() {
            door.src = openSrc;
        });
        door.addEventListener('mouseleave', function() {
            door.src = closedSrc;
        });
    });
});
