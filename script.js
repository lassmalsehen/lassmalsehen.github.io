document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.language-switcher button');
    const allTranslatableElements = document.querySelectorAll('[data-lang-de], [data-lang-en], [data-lang-de-placeholder], [data-lang-en-placeholder]');
    const htmlElement = document.documentElement;
    let currentLang = 'de'; // Default language

    const hamburgerButton = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('nav');

    // Function to set the language
    function setLanguage(lang) {
        currentLang = lang;
        htmlElement.lang = lang;

        allTranslatableElements.forEach(element => {
            if (element.hasAttribute(`data-lang-${lang}`)) {
                element.textContent = element.getAttribute(`data-lang-${lang}`);
            }
            if (element.hasAttribute(`data-lang-${lang}-placeholder`)) {
                element.placeholder = element.getAttribute(`data-lang-${lang}-placeholder`);
            }
        });

        // Update active class for language buttons
        langButtons.forEach(button => {
            if (button.id === `lang-${lang}`) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Event listeners for language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.id.split('-')[1];
            setLanguage(lang);
        });
    });

    // Initialize language on page load
    setLanguage(currentLang);

    // Toggle hamburger menu
    hamburgerButton.addEventListener('click', () => {
        hamburgerButton.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Smooth scrolling for navigation links and close menu
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close the mobile menu after clicking a link
            if (navMenu.classList.contains('open')) {
                hamburgerButton.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    });

    // Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});