// Detect Packery classes
if (document.querySelector('.grid-item')) {
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
}

// Packery for Projects page
if (document.querySelector('#projects-page')) {
    // Packery intitialize
    var elem = document.querySelector('.grid-1');
    var pckry = new Packery(elem, {
        // options
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
        itemSelector: '.grid-item',
        percentPosition: true,
        fitWidth: false
    });

    // Packery intitialize
    var elem = document.querySelector('.grid-2');
    var pckry = new Packery(elem, {
        // options
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
        itemSelector: '.grid-item',
        percentPosition: true,
        fitWidth: false
    });
    // Packery intitialize
    var elem = document.querySelector('.grid-3');
    var pckry = new Packery(elem, {
        // options
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
        itemSelector: '.grid-item',
        percentPosition: true,
        fitWidth: false
    });
}


// Change board body color
if (!document.querySelector('home-page')) {
    var body = document.querySelector('body');
    body.style.backgroundColor = '#fffde7';
}

// Add Google login for Home Page
if (document.querySelector('home-page')) {
    var body = document.querySelector('body');
    var script = document.createElement('script');
    script.src('./loginFcn.js')
    body.appendChild = script;
}