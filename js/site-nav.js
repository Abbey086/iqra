(function () {
    var navBar = document.querySelector('.nav-bar');
    if (!navBar) return;

    var page = window.location.pathname.split('/').pop() || 'index.html';
    var links = [
        ['index.html', 'Home'],
        ['tour-packages.html', 'Tours &amp; Packages'],
        ['visa-services.html', 'Visa Services'],
        ['flights.html', 'Flights'],
        ['about.html', 'About'],
        ['contact.html', 'Contact']
    ];

    var linkMarkup = links.map(function (link) {
        var active = page === link[0] ? ' active' : '';
        return '<a href="' + link[0] + '" class="nav-item nav-link' + active + '">' + link[1] + '</a>';
    }).join('');

    navBar.innerHTML = '<nav class="navbar navbar-expand-lg navbar-light bg-white px-4 px-lg-5 py-3 py-lg-0">' +
        '<a href="index.html" class="navbar-brand d-flex align-items-center p-0">' +
        '<span class="brand-logo-wrap"><img src="img/brand-logo-new.png" alt="Iqra Tours logo"></span>' +
        '<span class="brand-text"><span class="brand-name">Iqra Tours &amp; Travel</span><span class="brand-tag">Agency Ltd.</span></span>' +
        '</a>' +
        '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-label="Open navigation"><span class="fa fa-bars"></span></button>' +
        '<div class="collapse navbar-collapse" id="navbarCollapse">' +
        '<div class="navbar-nav ms-auto py-0">' + linkMarkup + '</div>' +
        '<a href="contact.html#contact-form" class="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-3 mb-lg-0">Inquire Now</a>' +
        '</div></nav>';

    if (!window.bootstrap || !window.bootstrap.Collapse) {
        var toggler = navBar.querySelector('.navbar-toggler');
        var collapse = navBar.querySelector('#navbarCollapse');
        toggler.addEventListener('click', function () {
            var expanded = toggler.getAttribute('aria-expanded') === 'true';
            toggler.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            collapse.classList.toggle('show', !expanded);
        });
    }
}());
