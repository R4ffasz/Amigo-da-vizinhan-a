
/* ========================================
   DADOS DOS INTEGRANTES
======================================== */

const people = [
    {
        name: "João Silva",
        description: "Desenvolvedor Front-end. Responsável pela criação das interfaces e experiência visual do projeto.",
        photo: "imagens/joao.jpg"
    },
    {
        name: "Maria Oliveira",
        description: "Designer UI/UX. Responsável pela identidade visual e prototipação das telas.",
        photo: "imagens/maria.jpg"
    },
    {
        name: "Pedro Santos",
        description: "Desenvolvedor Back-end. Responsável pela lógica e integração com o banco de dados.",
        photo: "imagens/pedro.jpg"
    },
    {
        name: "Ana Costa",
        description: "Analista de projetos. Responsável pela organização e acompanhamento das atividades do grupo.",
        photo: "imagens/ana.jpg"
    }
];


/* ========================================
   ELEMENTOS DO HTML
======================================== */

const cardsContainer = document.getElementById("cardsContainer");
const carouselStage = document.querySelector(".carousel-stage");

let currentIndex = 0;
let isAnimating = false;


/* ========================================
   INICIALIZAÇÃO
======================================== */

if (!cardsContainer || !carouselStage) {

    console.error("Elementos do carrossel não encontrados.");

} else if (people.length === 0) {

    console.error("Nenhum integrante cadastrado.");

} else {

    iniciarCarrossel();

}


function iniciarCarrossel() {

    criarCards();

    atualizarCarrossel();

    configurarTeclado();

    configurarToque();

    configurarBotoes();

}


/* ========================================
   CRIAR CARDS
======================================== */

function criarCards() {

    cardsContainer.innerHTML = "";

    people.forEach((person, index) => {

        const card = document.createElement("article");

        card.className = "person-card";

        card.dataset.index = index;


        // FOTO

        const photoContainer = document.createElement("div");

        photoContainer.className = "photo-container";

        const photo = document.createElement("img");

        photo.src = person.photo;

        photo.alt = `Foto de ${person.name}`;

        photo.onerror = function () {
            console.warn(`Imagem não encontrada: ${person.photo}`);
        };

        photoContainer.appendChild(photo);


        // INFORMAÇÕES

        const info = document.createElement("div");

        info.className = "person-info";

        const name = document.createElement("h2");

        name.textContent = person.name;

        const description = document.createElement("p");

        description.textContent = person.description;

        info.appendChild(name);

        info.appendChild(description);


        // MONTAR CARD

        card.appendChild(photoContainer);

        card.appendChild(info);


        cardsContainer.appendChild(card);

    });

}


/* ========================================
   ATUALIZAR POSIÇÃO DOS CARDS
======================================== */

function atualizarCarrossel() {

    const cards = cardsContainer.querySelectorAll(".person-card");

    cards.forEach((card, index) => {

        card.classList.remove(
            "active",
            "prev",
            "next",
            "hidden"
        );


        if (index === currentIndex) {

            card.classList.add("active");

        }

        else if (
            index === (currentIndex - 1 + people.length) % people.length
        ) {

            card.classList.add("prev");

        }

        else if (
            index === (currentIndex + 1) % people.length
        ) {

            card.classList.add("next");

        }

        else {

            card.classList.add("hidden");

        }

    });

}


/* ========================================
   ANIMAÇÃO DE NAVEGAÇÃO
======================================== */

function navegar(direction) {

    if (isAnimating || people.length < 2) return;

    isAnimating = true;

    const cards = [
        ...cardsContainer.querySelectorAll(".person-card")
    ];

    const oldIndex = currentIndex;

    const newIndex =
        (currentIndex + direction + people.length) % people.length;

    const oldCard = cards[oldIndex];

    const newCard = cards[newIndex];

    const width = carouselStage.offsetWidth;

    const distance = width * 0.95;

    const exitX = direction === 1 ? -distance : distance;

    const enterX = direction === 1 ? distance : -distance;


    // PREPARAR CAMADAS

    oldCard.style.zIndex = "5";

    newCard.style.zIndex = "6";

    newCard.style.visibility = "visible";

    newCard.style.opacity = "0";


    // FORÇAR ESTADO INICIAL

    void newCard.offsetWidth;


    // ANIMAÇÃO DE SAÍDA

    const animationOut = oldCard.animate([

        {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: 1
        },

        {
            transform:
                `translate(calc(-50% + ${exitX}px), -50%) scale(0.82)`,
            opacity: 0
        }

    ], {

        duration: 750,

        easing: "cubic-bezier(0.22, 1, 0.36, 1)",

        fill: "forwards"

    });


    // ANIMAÇÃO DE ENTRADA

    const animationIn = newCard.animate([

        {
            transform:
                `translate(calc(-50% + ${enterX}px), -50%) scale(0.82)`,
            opacity: 0
        },

        {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: 1
        }

    ], {

        duration: 750,

        easing: "cubic-bezier(0.22, 1, 0.36, 1)",

        fill: "forwards"

    });


    // FINALIZAR ANIMAÇÃO

    Promise.all([
        animationOut.finished,
        animationIn.finished
    ])

    .then(() => {

        currentIndex = newIndex;

        cards.forEach(card => {

            card.style.visibility = "";

            card.style.opacity = "";

            card.style.zIndex = "";

            card.getAnimations().forEach(animation => {
                animation.cancel();
            });

        });

        atualizarCarrossel();

        isAnimating = false;

    })

    .catch(error => {

        console.error("Erro na animação:", error);

        cards.forEach(card => {

            card.getAnimations().forEach(animation => {
                animation.cancel();
            });

            card.style.visibility = "";

            card.style.opacity = "";

            card.style.zIndex = "";

        });

        atualizarCarrossel();

        isAnimating = false;

    });

}


/* ========================================
   PRÓXIMO INTEGRANTE
======================================== */

function nextPerson() {

    navegar(1);

}


/* ========================================
   INTEGRANTE ANTERIOR
======================================== */

function previousPerson() {

    navegar(-1);

}


/* ========================================
   CLIQUE NOS CARDS LATERAIS
======================================== */

function configurarCliques() {

    cardsContainer.addEventListener("click", function (event) {

        if (isAnimating) return;

        const card = event.target.closest(".person-card");

        if (!card) return;

        const clickedIndex = Number(card.dataset.index);

        const previousIndex =
            (currentIndex - 1 + people.length) % people.length;

        const nextIndex =
            (currentIndex + 1) % people.length;

        if (clickedIndex === previousIndex) {

            previousPerson();

        } else if (clickedIndex === nextIndex) {

            nextPerson();

        }

    });

}

/* ========================================
   NAVEGAÇÃO PELO TECLADO
======================================== */

function configurarTeclado() {

    document.addEventListener("keydown", function (event) {

        if (
            event.target.matches("input, textarea, select") ||
            event.target.isContentEditable
        ) {
            return;
        }

        if (event.key === "ArrowRight") {

            nextPerson();

        }

        if (event.key === "ArrowLeft") {

            previousPerson();

        }

    });

}


/* ========================================
   NAVEGAÇÃO PELO CELULAR
======================================== */

function configurarToque() {

    let touchStartX = 0;

    carouselStage.addEventListener("touchstart", function (event) {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });


    carouselStage.addEventListener("touchend", function (event) {

        if (isAnimating) return;

        const touchEndX = event.changedTouches[0].screenX;

        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) < 50) return;

        if (difference > 0) {

            nextPerson();

        } else {

            previousPerson();

        }

    }, { passive: true });

}


/* ========================================
   BOTÕES DE NAVEGAÇÃO
======================================== */

function configurarBotoes() {

    const prevControl = document.getElementById("prevControl");
    const nextControl = document.getElementById("nextControl");

    if (!prevControl || !nextControl) {
        console.error("Botões do carrossel não encontrados.");
        return;
    }

    prevControl.addEventListener("click", previousPerson);

    nextControl.addEventListener("click", nextPerson);

}