(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top shadow-sm');
        } else {
            $('.nav-bar').removeClass('sticky-top shadow-sm');
        }
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });

    // Slider inquiry form modal
    $(document).on('click', '.slider-inquiry-btn', function (event) {
        event.preventDefault();
        var inquiryType = $(this).data('inquiry') || 'Travel Inquiry';
        $('#inquiry_type').val(inquiryType);
        $('#inquireModalLabel').text(inquiryType);
        var modal = new bootstrap.Modal(document.getElementById('inquireModal'));
        modal.show();
    });

    $('#sliderInquiryForm').on('submit', function (event) {
        event.preventDefault();

        var inquiryType = $('#inquiry_type').val() || 'Travel Inquiry';
        var name = $('#inquirer_name').val().trim();
        var phone = $('#inquirer_phone').val().trim();
        var email = $('#inquirer_email').val().trim();
        var message = $('#inquirer_message').val().trim();

        if (!name || !phone || !email || !message) {
            return;
        }

        var recipient = 'iqratoursandtravelltd@gmail.com';
        var subject = encodeURIComponent(inquiryType + ' from ' + name);
        var body = encodeURIComponent(
            'Inquiry Type: ' + inquiryType + '\n' +
            'Name: ' + name + '\n' +
            'Phone Number: ' + phone + '\n' +
            'Email: ' + email + '\n\n' +
            'Message:\n' + message
        );

        window.location.href = 'mailto:' + recipient + '?subject=' + subject + '&body=' + body;

        var inquiryModal = bootstrap.Modal.getInstance(document.getElementById('inquireModal'));
        if (inquiryModal) {
            inquiryModal.hide();
        }
        this.reset();
    });

    // Testimonial-carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });

    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


   

})(jQuery);

