/* =============================================
   RECURSOS Y MATERIALES — JS
   ============================================= */

// ── Datos de recursos ──────────────────────────────────────────────────────────
// Ajusta los href e img según tu estructura de archivos real.
const recursos = {
    multimedia: [
        {
            title: "Himno Nacional",
            img: "IMG/Recursos/HimnoNacional.JPG",
            href: "https://drive.google.com/file/d/1lzANwylWFK_gKxsFLaYn_AkvLh5JYvVt/view?usp=sharing",
            tag: "Multimedia"
        },
        {
            title: "Himno Aventureros",
            img: "IMG/Recursos/HimnoAventureros.JPG",
            href: "https://drive.google.com/file/d/10_os_tGt9fubqcbsIBj1ZBuNszB4EcMv/view?usp=sharing",
            tag: "Multimedia"
        },
        {
            title: "Himno Conquistadores",
            img: "IMG/Recursos/HimnoConquistadores.JPG",
            href: "https://drive.google.com/file/d/1lo0jDdjrIry__Lto7lwuFFBeomvQa31-/view?usp=sharing",
            tag: "Multimedia"
        },
        {
            title: "Himno Guías Mayores",
            img: "IMG/Recursos/HimnoGuiasMayores.JPG",
            href: "https://drive.google.com/file/d/1yCHOFhhbJoE7cIXkfGBsTnNYsJ8JbbcC/view?usp=sharing",
            tag: "Multimedia"
        },
        {
            title: "Ideales",
            img: "IMG/Recursos/Ideales.JPG",
            href: "https://drive.google.com/file/d/15guQlmBzcBY7xFb-gcoR2Y_EIFIJyVlR/view?usp=sharing",
            tag: "Multimedia"
        }
    ],
    manuales: [
        {
            title: "Reglamento de Uniformes",
            img: "IMG/Recursos/uniformidad.png",
            href: "https://drive.google.com/file/d/1jQGc7c8mVUaZYIFs4QxJfVebJDAfu-tx/view?usp=sharing",
            tag: "Manual"
        },
        {
            title: "Manual Administrativo y de Especialidades",
            img: "IMG/ManualAventureros.png",
            href: "https://drive.google.com/file/d/1SXvEtcgCj5Z2YZSmmbAg3jvITYG3tf9q/view?usp=sharing",
            tag: "Manual"
        },
        {
            title: "Manual de Especialidades",
            img: "IMG/ManualDeEspecialidades.png",
            href: "https://drive.google.com/file/d/1gBA1PGsrgn1sMRNlTUPfqeAs7xI7_1Of/view?usp=sharing",
            tag: "Manual"
        },
        {
            title: "Reglamentos de Uniformidad",
            img: "IMG/ReglamentosUniformes.png",
            href: "https://drive.google.com/file/d/102DqZ_yv_Ie6PlXs6HyKLo42uCNaOBdS/view?usp=sharing",
            tag: "Manual"
        }
    ],
    cartas: [
        {
            title: "Modelos de Cartas",
            img: "IMG/LogoIglesia.JPG",
            href: "https://drive.google.com/file/d/110DVMvA-05OiQ1mtN8ND7wdKVFKFhUNw/view",
            tag: "Carta",
            icon: "bx bx-envelope"
        }
    ],
    aventureros: [
        {
            title: "Corderitos",
            img: "IMG/Recursos/corderitos.png",
            href: "https://drive.google.com/file/d/1-CxN_t0hdYa5i1jx6gt7nQWmXT2DvpRi/view?usp=sharing",
            tag: "Aventureros"
        },
        {
            title: "Aves Madrugadoras",
            img: "IMG/Recursos/AvesMadrugadoras.png",
            href: "https://drive.google.com/file/d/18FOHc32JZWegUA3FN1bQZmh8oocYswIn/view?usp=sharing",
            tag: "Aventureros"
        },
        {
            title: "Abejas Industriosas",
            img: "IMG/Recursos/AbejasIndustriosas.png",
            href: "https://drive.google.com/file/d/1nzn6UeEMh6KNXFB7cvCcUW9F4ndAvduk/view?usp=sharin",
            tag: "Aventureros"
        },
        {
            title: "Rayos de Sol",
            img: "IMG/Recursos/RayitosDeSol.png",
            href: "https://drive.google.com/file/d/1dRR1flSU6HeTno3aXBwFPUrpRnTep2Hc/view?usp=sharing",
            tag: "Aventureros"
        },
        {
            title: "Constructor",
            img: "IMG/Recursos/Constructor.png",
            href: "https://drive.google.com/file/d/1XzyA-1oiPtK2OYI6RBpV7EdfbZaug9a5/view?usp=sharing",
            tag: "Aventureros"
        },
        {
            title: "Manos Ayudadoras",
            img: "IMG/Recursos/ManosAyudadoras.jpg",
            href: "https://drive.google.com/file/d/1janoTDqekiWT9bk5bgNoLy_XIsMm4eN3/view?usp=sharing",
            tag: "Aventureros"
        }
    ],
    conquistadores: [
        // Agrega aquí tus recursos de Conquistadores
        {
            title: "Amigo de la Senda",
            img: "IMG/Recursos/Logos-Clases-Conquistadores/Clase-Amigo.png",
            href: "https://drive.google.com/file/d/1xpCu7pduXE2SjDE7faJ_o95nH-Z9Jx_W/view?usp=sharing",
            tag: "Conquistadores",
            icon: "bx bxs-shield"
        },
        {
            title: "Compañero de Caminata",
            img: "IMG/Recursos/Logos-Clases-Conquistadores/Clase-Compañero.png",
            href: "https://drive.google.com/file/d/1KQwo3-YaHWQB8jqKJLNsMKx6aQpRanUK/view?usp=sharing",
            tag: "Conquistadores",
            icon: "bx bxs-shield"
        },
        {
            title: "Explorador de la Selva",
            img: "IMG/Recursos/Logos-Clases-Conquistadores/Clase-Explorador.png",
            href: "https://drive.google.com/file/d/1lXsIOZEhRYmAAd9RbnBXihozumz5R0CZ/view?usp=sharing",
            tag: "Conquistadores",
            icon: "bx bxs-shield"
        },
        {
            title: "Orientador de Nuevas Fronteras",
            img: "IMG/Recursos/Logos-Clases-Conquistadores/Clase-Orientador.png",
            href: "https://drive.google.com/file/d/1CNIw2q-5Zar5WNCFLx1XFzVotd9CbaV_/view?usp=sharing",
            tag: "Conquistadores",
            icon: "bx bxs-shield"
        },
        {
            title: "Viajero en el Bosque ",
            img: "IMG/Recursos/Logos-Clases-Conquistadores/Clase-Viajero.png",
            href: "https://drive.google.com/file/d/1Bca0K0rPM3xd0RWfPNa9qO4mvBg-yIic/view?usp=sharing",
            tag: "Conquistadores",
            icon: "bx bxs-shield"
        },
        {
            title: "Guía de Exploración",
            img: "IMG/Recursos/Logos-Clases-Conquistadores/Clase-Guia.png",
            href: "https://drive.google.com/file/d/1ut-B5xLS7SvLmGM3FY6wE_nUdMYOqMa1/view?usp=sharing",
            tag: "Conquistadores",
            icon: "bx bxs-shield"
        }
    ]
};

const labels = {
    multimedia:    "Multimedia",
    manuales:      "Manuales",
    cartas:        "Cartas",
    aventureros:   "Aventureros",
    conquistadores:"Conquistadores"
};

// ── Referencias DOM ────────────────────────────────────────────────────────────
const heroSelector = document.querySelector(".hero-selector");
const contentArea  = document.getElementById("contentArea");
const contentTitle = document.getElementById("contentTitle");
const itemCount    = document.getElementById("itemCount");
const recursosGrid = document.getElementById("recursosGrid");
const backBtn      = document.getElementById("backBtn");

// ── Helpers ────────────────────────────────────────────────────────────────────
function buildCard(item, index) {
    const card = document.createElement("a");
    card.classList.add("rec-card");
    card.href   = item.href || "#";
    card.target = item.href && item.href !== "#" ? "_blank" : "_self";
    card.rel    = "noopener noreferrer";
    card.style.animationDelay = `${index * 0.06}s`;

    let thumbHTML;
    if (item.img) {
        thumbHTML = `<img class="rec-card-thumb"
                          src="${item.img}"
                          alt="${item.title}"
                          onerror="this.outerHTML='<div class=\\'rec-card-thumb-placeholder\\'><i class=\\'bx bxs-image-alt\\'></i></div>'">`;
    } else {
        const icon = item.icon || "bx bxs-package";
        thumbHTML = `<div class="rec-card-thumb-placeholder"><i class="${icon}"></i></div>`;
    }

    card.innerHTML = `
        ${thumbHTML}
        <div class="rec-card-body">
            <span class="rec-card-title">${item.title}</span>
            <span class="rec-card-tag">${item.tag}</span>
        </div>`;

    return card;
}

function showCategory(category) {
    const items = recursos[category] || [];

    // Título e indicador
    contentTitle.textContent = labels[category] || category;
    itemCount.textContent    = `${items.length} recurso${items.length !== 1 ? "s" : ""}`;

    // Vaciar grid
    recursosGrid.innerHTML = "";

    if (items.length === 0) {
        recursosGrid.innerHTML = `
            <div class="empty-state">
                <i class='bx bx-folder-open'></i>
                <p>No hay recursos disponibles en esta categoría aún.</p>
            </div>`;
    } else {
        items.forEach((item, i) => recursosGrid.appendChild(buildCard(item, i)));
    }

    // Mostrar / ocultar secciones
    heroSelector.style.display = "none";
    contentArea.style.display  = "block";

    // Scroll suave al top del contenido
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHero() {
    contentArea.style.display  = "none";
    heroSelector.style.display = "flex";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── Eventos ────────────────────────────────────────────────────────────────────
document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const cat = btn.dataset.category;
        if (cat) showCategory(cat);
    });
});

backBtn.addEventListener("click", showHero);

// ── Estado inicial: hero visible, content oculto ───────────────────────────────
// (ya gestionado con style="display:none;" en el HTML)