/* =========================================
   MÚSICA DE LA INVITACIÓN
   ========================================= */

const musica = document.getElementById("musica");

function iniciarMusica() {
    if (musica && musica.paused) {
        musica.play().catch(() => {
            // El navegador puede bloquear la reproducción
            // hasta que la persona interactúe con la página.
        });
    }
}

// Activar la música con la primera interacción
document.addEventListener("click", iniciarMusica, { once: true });

document.addEventListener("touchstart", iniciarMusica, {
    once: true,
    passive: true
});

// Intentar reproducir al cargar la página
window.addEventListener("load", iniciarMusica);


/* =========================================
   ZONAS CLICABLES SOBRE LA INVITACIÓN
   ========================================= */

const imagenInvitacion = document.querySelector(".invitacion-imagen");

const zonasClicables = [
    {
        nombre: "ubicacion",
        top: 57,
        left: 33,
        width: 36,
        height: 3,
        url: "https://maps.app.goo.gl/Z9aefsGXtWVuWnjX8"
    },
    {
        nombre: "confirmar",
        top: 69.2,
        left: 33,
        width: 37,
        height: 3.2,
        url: "https://wa.me/573226723378?text=%C2%A1Hola%2C%20Jairo%20y%20Luisa!%20Confirmo%20con%20mucha%20alegr%C3%ADa%20mi%20asistencia%20a%20su%20boda.%20Gracias%20por%20invitarme%20a%20compartir%20un%20momento%20tan%20importante%20en%20sus%20vidas.%20%C2%A1Los%20acompa%C3%B1ar%C3%A9%20con%20todo%20el%20cari%C3%B1o!"
    }
];

if (imagenInvitacion) {
    imagenInvitacion.addEventListener("click", function (e) {
        const rect = imagenInvitacion.getBoundingClientRect();

        const xPct = ((e.clientX - rect.left) / rect.width) * 100;
        const yPct = ((e.clientY - rect.top) / rect.height) * 100;

        for (const zona of zonasClicables) {
            if (
                xPct >= zona.left &&
                xPct <= zona.left + zona.width &&
                yPct >= zona.top &&
                yPct <= zona.top + zona.height
            ) {
                const enlace = document.createElement("a");

                enlace.href = zona.url;
                enlace.target = "_blank";
                enlace.rel = "noopener noreferrer";

                document.body.appendChild(enlace);
                enlace.click();
                enlace.remove();

                return;
            }
        }
    });
}


/* =========================================
   SOBRE, NOTA BÍBLICA E INVITACIÓN PRINCIPAL
   ========================================= */

const sobre = document.getElementById("sobre");
const notaBiblica = document.getElementById("nota-biblica");
const invitacionCard = document.querySelector(".invitacion");

if (sobre && notaBiblica && invitacionCard) {
    sobre.addEventListener("click", function () {

        // Evitar que se active varias veces
        if (sobre.classList.contains("abriendo")) {
            return;
        }

        sobre.classList.add("abriendo");
        sobre.classList.add("abrir");

        // Esperar a que termine la animación del sobre
        setTimeout(() => {
            sobre.style.display = "none";

            // Mostrar la nota bíblica
            notaBiblica.classList.remove("oculto");
            notaBiblica.classList.add("mostrar");

            // Mantener la nota visible durante 4 segundos
            setTimeout(() => {
                notaBiblica.classList.remove("mostrar");
                notaBiblica.classList.add("oculto");

                // Mostrar la invitación principal
                invitacionCard.classList.add("mostrar");

                // Intentar activar la música tras la interacción
                iniciarMusica();

            }, 5200);

        }, 800);
    });
}