$(document).ready(function() {
    // Smooth scrolling
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 80
        }, 800, 'swing');
    });

    // Navbar background on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Fade-in dan animasi untuk section
    function checkVisibility() {
        $('.animate-section').each(function() {
            var top = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();
            if (top < windowBottom - 50) {
                $(this).addClass('visible');
                $(this).find('.animate-text, .animate-image, .animate-card').each(function(index) {
                    var $element = $(this);
                    setTimeout(function() {
                        $element.addClass('visible');
                    }, index * 100);
                });
            }
        });

        // Animasi untuk ikon di section tools
        $('#tools .tools img').each(function(index) {
            var top = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();
            if (top < windowBottom - 50) {
                var $element = $(this);
                setTimeout(function() {
                    $element.addClass('visible');
                    console.log('Ikon ke-' + (index + 1) + ' muncul');
                }, index * 150);
            }
        });
    }

    checkVisibility();
    $(window).on('scroll', checkVisibility);

    // Sprinkle Animation untuk Semua Section
    const sprinkleContainers = $('.sprinkle-container');
    const colors = ['#ff6f61', '#ffd700', '#ff69b4', '#00ff7f', '#1e90ff'];
    const shapes = ['circle', 'heart', 'star'];

    function createSprinkle(container) {
        const sprinkle = $('<div class="sprinkle"></div>');
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const direction = Math.random() > 0.5 ? 1 : -1;

        sprinkle.addClass(shape);
        sprinkle.css({
            width: size + 'px',
            height: size + 'px',
            left: left + '%',
            backgroundColor: shape === 'circle' ? color : 'transparent',
            color: shape !== 'circle' ? color : 'transparent',
            animationDuration: duration + 's',
            animationDelay: Math.random() + 's',
            '--direction': direction
        });

        container.append(sprinkle);

        setTimeout(() => {
            sprinkle.remove();
        }, duration * 1000);
    }

    sprinkleContainers.each(function() {
        const interval = $(this).parent().attr('id') === 'home' ? 150 : 200;
        setInterval(() => createSprinkle($(this)), interval);
    });

    // Parallax effect untuk home section
    $(window).on('scroll', function() {
        const scrollPos = $(this).scrollTop();
        $('#home').css('background-position-y', -(scrollPos * 0.2) + 'px');
    });

    // Typewriter Animation
    const typewriterElement = $('#typewriter');
    const phrases = ['Web Developer', 'Design Grafis'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        let displayedText = currentPhrase.substring(0, charIndex);

        typewriterElement.text(displayedText);

        if (!isDeleting && charIndex < currentPhrase.length) {
            charIndex++;
            setTimeout(typeWriter, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeWriter, 50);
        } else if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeWriter, 200);
        }
    }

    typeWriter();
});