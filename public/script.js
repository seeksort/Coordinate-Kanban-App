// Packery intitialize
var elem = document.querySelector('.grid');
var pckry = new Packery(elem, {
    // options
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    itemSelector: '.grid-item',
    percentPosition: true,
    fitWidth: false
});
// Packery + Draggabilly
// Drag Lists
pckry.getItemElements().forEach(function(itemElem) {
    var draggie = new Draggabilly(itemElem);
    pckry.bindDraggabillyEvents(draggie);
});

// Change board body color
var body = document.querySelector('body');
body.style.backgroundColor = '#fffde7';
