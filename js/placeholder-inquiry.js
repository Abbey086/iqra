(function () {
    var placeholderLinks = Array.prototype.filter.call(document.querySelectorAll('a[href="#"]'), function (link) {
        return !link.classList.contains('back-to-top') && !link.closest('.breadcrumb') && !link.closest('.service-item');
    });

    if (!placeholderLinks.length) {
        return;
    }

    var modalMarkup = '<div class="modal fade" id="placeholderInquiryModal" tabindex="-1" aria-labelledby="placeholderInquiryLabel" aria-hidden="true">' +
        '<div class="modal-dialog modal-dialog-centered"><div class="modal-content">' +
        '<div class="modal-header bg-primary text-white"><h2 class="modal-title h5 mb-0" id="placeholderInquiryLabel">Send an inquiry</h2>' +
        '<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
        '<form id="placeholderInquiryForm"><div class="modal-body p-4">' +
        '<div class="mb-3"><label for="placeholder-service" class="form-label">Topic</label><input type="text" class="form-control" id="placeholder-service" name="topic" readonly></div>' +
        '<div class="mb-3"><label for="placeholder-name" class="form-label">Your name</label><input type="text" class="form-control" id="placeholder-name" name="name" required></div>' +
        '<div class="mb-3"><label for="placeholder-phone" class="form-label">Phone number</label><input type="tel" class="form-control" id="placeholder-phone" name="phone" required></div>' +
        '<div class="mb-3"><label for="placeholder-email" class="form-label">Email address</label><input type="email" class="form-control" id="placeholder-email" name="email"></div>' +
        '<div><label for="placeholder-message" class="form-label">Message</label><textarea class="form-control" id="placeholder-message" name="message" rows="4" required></textarea></div>' +
        '</div><div class="modal-footer"><button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button><button type="submit" class="btn btn-primary"><i class="fab fa-whatsapp me-2"></i>Send via WhatsApp</button></div>' +
        '</form></div></div></div>';

    document.body.insertAdjacentHTML('beforeend', modalMarkup);

    var modalElement = document.getElementById('placeholderInquiryModal');
    var modal = new bootstrap.Modal(modalElement);
    var form = document.getElementById('placeholderInquiryForm');
    var topic = document.getElementById('placeholder-service');

    placeholderLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            topic.value = link.textContent.trim() || 'Website inquiry';
            modal.show();
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        var data = new FormData(form);
        var message = [
            'Hello Iqra Tours, I would like to make an inquiry.',
            '',
            'Topic: ' + data.get('topic'),
            'Name: ' + data.get('name'),
            'Phone: ' + data.get('phone'),
            'Email: ' + (data.get('email') || 'Not provided'),
            '',
            'Message: ' + data.get('message')
        ].join('\n');

        window.open('https://wa.me/256756178904?text=' + encodeURIComponent(message), '_blank', 'noopener');
        form.reset();
        modal.hide();
    });
}());
