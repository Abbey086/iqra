(function () {
    var heroVideo = document.querySelector('.events-hero-video');
    if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.defaultMuted = true;
        heroVideo.setAttribute('muted', '');
        heroVideo.setAttribute('playsinline', '');
        heroVideo.setAttribute('webkit-playsinline', '');

        function playHeroVideo() {
            if (document.hidden) return;
            var playback = heroVideo.play();
            if (playback && typeof playback.catch === 'function') {
                playback.catch(function () {
                    // Autoplay may wait for the user's first interaction on some devices.
                });
            }
        }

        playHeroVideo();
        document.addEventListener('visibilitychange', playHeroVideo);
        ['touchstart', 'pointerdown', 'keydown'].forEach(function (eventName) {
            document.addEventListener(eventName, playHeroVideo, { once: true, passive: true });
        });
    }

    var forms = document.querySelectorAll('.whatsapp-form');
    if (!forms.length) return;

    var flightForm = document.querySelector('#flight-panel form');
    var tripTypeInputs = flightForm.querySelectorAll('input[name="tripType"]');
    var returnDate = document.getElementById('return-date');
    var returnField = document.querySelector('.return-field');
    var swapRoute = document.querySelector('.swap-route');
    var tabs = document.querySelectorAll('.flight-tab[data-panel]');
    var panels = document.querySelectorAll('.service-panel');
    var emailFields = document.querySelectorAll('input[type="email"]');

    var oneWayInput = flightForm.querySelector('input[name="tripType"][value="One way"]');
    var roundTripInput = flightForm.querySelector('input[name="tripType"][value="Round trip"]');
    oneWayInput.checked = true;
    roundTripInput.checked = false;
    oneWayInput.closest('label').parentNode.insertBefore(oneWayInput.closest('label'), roundTripInput.closest('label'));

    var countries = 'Uganda|Afghanistan|Albania|Algeria|Andorra|Angola|Antigua and Barbuda|Argentina|Armenia|Australia|Austria|Azerbaijan|Bahamas|Bahrain|Bangladesh|Barbados|Belarus|Belgium|Belize|Benin|Bhutan|Bolivia|Bosnia and Herzegovina|Botswana|Brazil|Brunei|Bulgaria|Burkina Faso|Burundi|Cabo Verde|Cambodia|Cameroon|Canada|Central African Republic|Chad|Chile|China|Colombia|Comoros|Congo|Costa Rica|Croatia|Cuba|Cyprus|Czechia|Democratic Republic of the Congo|Denmark|Djibouti|Dominica|Dominican Republic|Ecuador|Egypt|El Salvador|Equatorial Guinea|Eritrea|Estonia|Eswatini|Ethiopia|Fiji|Finland|France|Gabon|Gambia|Georgia|Germany|Ghana|Greece|Grenada|Guatemala|Guinea|Guinea-Bissau|Guyana|Haiti|Honduras|Hungary|Iceland|India|Indonesia|Iran|Iraq|Ireland|Israel|Italy|Jamaica|Japan|Jordan|Kazakhstan|Kenya|Kiribati|Kuwait|Kyrgyzstan|Laos|Latvia|Lebanon|Lesotho|Liberia|Libya|Liechtenstein|Lithuania|Luxembourg|Madagascar|Malawi|Malaysia|Maldives|Mali|Malta|Marshall Islands|Mauritania|Mauritius|Mexico|Micronesia|Moldova|Monaco|Mongolia|Montenegro|Morocco|Mozambique|Myanmar|Namibia|Nauru|Nepal|Netherlands|New Zealand|Nicaragua|Niger|Nigeria|North Korea|North Macedonia|Norway|Oman|Pakistan|Palau|Panama|Papua New Guinea|Paraguay|Peru|Philippines|Poland|Portugal|Qatar|Romania|Russia|Rwanda|Saint Kitts and Nevis|Saint Lucia|Saint Vincent and the Grenadines|Samoa|San Marino|Sao Tome and Principe|Saudi Arabia|Senegal|Serbia|Seychelles|Sierra Leone|Singapore|Slovakia|Slovenia|Solomon Islands|Somalia|South Africa|South Korea|South Sudan|Spain|Sri Lanka|Sudan|Suriname|Sweden|Switzerland|Syria|Taiwan|Tajikistan|Tanzania|Thailand|Timor-Leste|Togo|Tonga|Trinidad and Tobago|Tunisia|Turkey|Turkmenistan|Tuvalu|United Arab Emirates|United Kingdom|United States|Uruguay|Uzbekistan|Vanuatu|Vatican City|Venezuela|Vietnam|Yemen|Zambia|Zimbabwe'.split('|');
    var countryList = document.createElement('datalist');
    countryList.id = 'country-list';
    countries.forEach(function (country) {
        var option = document.createElement('option');
        option.value = country;
        countryList.appendChild(option);
    });
    document.body.appendChild(countryList);

    ['tour-destination', 'visa-country', 'visa-nationality', 'passport-nationality'].forEach(function (id) {
        var field = document.getElementById(id);
        if (field) {
            field.setAttribute('list', 'country-list');
            field.setAttribute('autocomplete', 'off');
        }
    });

    ['from', 'to'].forEach(function (id) {
        var airportField = document.getElementById(id);
        if (airportField) {
            airportField.setAttribute('aria-autocomplete', 'list');
            airportField.setAttribute('enterkeyhint', 'search');
            airportField.setAttribute('inputmode', 'search');
        }
    });

    forms.forEach(function (form) {
        var clearButton = document.createElement('button');
        clearButton.type = 'reset';
        clearButton.className = 'clear-form-button';
        clearButton.innerHTML = '<i class="fas fa-eraser"></i> Clear form';
        var submitButton = form.querySelector('[type="submit"]');
        submitButton.parentNode.insertBefore(clearButton, submitButton);
        form.addEventListener('reset', function () {
            window.setTimeout(function () {
                if (form === flightForm) updateReturnDate();
                var status = document.getElementById('flight-status');
                status.className = 'alert d-none';
                status.textContent = '';
            }, 0);
        });
    });

    Array.prototype.forEach.call(emailFields, function (emailField) {
        emailField.removeAttribute('required');
    });

    Array.prototype.forEach.call(tabs, function (tab) {
        tab.addEventListener('click', function () {
            var panelId = tab.dataset.panel;
            Array.prototype.forEach.call(tabs, function (item) {
                var selected = item === tab;
                item.classList.toggle('active', selected);
                item.setAttribute('aria-selected', selected ? 'true' : 'false');
            });
            Array.prototype.forEach.call(panels, function (panel) {
                var visible = panel.id === panelId;
                panel.classList.toggle('active', visible);
                panel.hidden = !visible;
            });
        });
    });

    function updateReturnDate() {
        var selectedTrip = flightForm.querySelector('input[name="tripType"]:checked').value;
        var isRoundTrip = selectedTrip === 'Round trip';
        returnDate.required = isRoundTrip;
        returnField.classList.toggle('is-disabled', !isRoundTrip);
        if (!isRoundTrip) returnDate.value = '';
    }

    Array.prototype.forEach.call(tripTypeInputs, function (input) {
        input.addEventListener('change', updateReturnDate);
    });
    updateReturnDate();

    swapRoute.addEventListener('click', function () {
        var from = document.getElementById('from');
        var to = document.getElementById('to');
        var currentFrom = from.value;
        from.value = to.value;
        to.value = currentFrom;
    });

    forms.forEach(function (form) {
        form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        var data = new FormData(form);
        var payload = Object.fromEntries(data.entries());
        var message = [
            'Hello Iqra Tours, I would like to make a ' + form.dataset.inquiry + '.',
            '',
        ].concat(Object.keys(payload).map(function (key) {
            return key.replace(/([A-Z])/g, ' $1') + ': ' + payload[key];
        })).join('\n');

        var whatsappUrl = 'https://wa.me/256756178904?text=' + encodeURIComponent(message);
        var whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener');
        var status = document.getElementById('flight-status');

        if (!whatsappWindow) {
            status.className = 'alert alert-warning';
            status.textContent = 'WhatsApp was blocked by your browser. Please allow pop-ups and submit again.';
            return;
        }

        status.className = 'alert alert-success';
        status.textContent = 'Your details have been added to WhatsApp.';

        });
    });
}());
