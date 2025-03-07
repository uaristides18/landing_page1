document.addEventListener("DOMContentLoaded", function() {
    console.log("¡Landing Page cargada!");

    // Inicializar el carrusel
    $('.carousel-container').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    // Validación del formulario de contacto
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name === "" || email === "" || message === "") {
            alert("Todos los campos son obligatorios.");
            event.preventDefault();
        } else if (!validateEmail(email)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            event.preventDefault();
        }
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    window.addEventListener("scroll", function() {
        const sections = document.querySelectorAll("section");
        const triggerHeight = window.innerHeight / 5 * 4;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerHeight) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });
    });
});
