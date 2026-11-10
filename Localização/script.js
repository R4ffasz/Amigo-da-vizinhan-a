
/* ========================================
   INICIALIZAÇÃO DO MAPA
======================================== */

// Criar mapa centralizado no Brasil

const map = L.map("map").setView(
    [-14.2350, -51.9253],
    4
);


// Carregar mapa OpenStreetMap

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19
    }
).addTo(map);


// Ajustar tamanho do mapa após carregar a página

window.addEventListener("load", function () {

    map.invalidateSize();

});


/* ========================================
   ELEMENTOS DO HTML
======================================== */

let marker = null;

const searchForm = document.getElementById("searchForm");

const addressInput = document.getElementById("address");

const message = document.getElementById("message");

const searchButton = document.getElementById("searchButton");

const locationButton = document.getElementById("locationButton");


/* ========================================
   EXIBIR MENSAGENS
======================================== */

function showMessage(text, type = "") {

    message.textContent = text;

    message.className = type;

}


/* ========================================
   ADICIONAR MARCADOR AO MAPA
======================================== */

function addMarker(lat, lon, title) {

    // Remover marcador anterior

    if (marker) {

        map.removeLayer(marker);

    }


    // Criar novo marcador

    marker = L.marker([lat, lon]).addTo(map);


    // Adicionar informações

    marker.bindPopup(title).openPopup();


    // Movimentar mapa suavemente

    map.flyTo(
        [lat, lon],
        16,
        {
            duration: 1.5
        }
    );

}


/* ========================================
   PESQUISAR ENDEREÇO
======================================== */

searchForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const address = addressInput.value.trim();


    // Verificar endereço

    if (!address) {

        showMessage(
            "Digite um endereço válido.",
            "error"
        );

        return;

    }


    // Bloquear botão durante pesquisa

    searchButton.disabled = true;

    searchButton.querySelector("span").textContent = "Buscando...";


    showMessage(
        "Localizando endereço...",
        "loading"
    );


    try {

        // Consultar serviço de geolocalização

        const url =
            `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(address)}`;


        const response = await fetch(url);


        if (!response.ok) {

            throw new Error("Erro na pesquisa.");

        }


        const data = await response.json();


        // Verificar resultado

        if (data.length === 0) {

            showMessage(
                "Endereço não encontrado. Verifique os dados digitados.",
                "error"
            );

            return;

        }


        // Obter coordenadas

        const latitude = Number(data[0].lat);

        const longitude = Number(data[0].lon);


        // Adicionar localização

        addMarker(
            latitude,
            longitude,
            data[0].display_name
        );


        showMessage(
            "Endereço encontrado com sucesso!",
            "success"
        );


    } catch (error) {

        showMessage(
            "Não foi possível localizar o endereço. Tente novamente.",
            "error"
        );

        console.error("Erro na pesquisa:", error);


    } finally {

        // Liberar botão

        searchButton.disabled = false;

        searchButton.querySelector("span").textContent = "Buscar endereço";

    }

});


/* ========================================
   LOCALIZAÇÃO ATUAL
======================================== */

locationButton.addEventListener("click", function () {


    // Verificar suporte do navegador

    if (!navigator.geolocation) {

        showMessage(
            "Seu navegador não suporta geolocalização.",
            "error"
        );

        return;

    }


    // Bloquear botão

    locationButton.disabled = true;

    showMessage(
        "Obtendo sua localização...",
        "loading"
    );


    // Solicitar localização

    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude = position.coords.latitude;

            const longitude = position.coords.longitude;


            // Adicionar marcador

            addMarker(
                latitude,
                longitude,
                "Você está aqui!"
            );


            showMessage(
                "Sua localização foi encontrada com sucesso!",
                "success"
            );


            locationButton.disabled = false;

        },


        function (error) {

            let errorMessage;


            switch (error.code) {

                case error.PERMISSION_DENIED:

                    errorMessage =
                        "Permissão de localização negada. Autorize o acesso ao GPS.";

                    break;


                case error.POSITION_UNAVAILABLE:

                    errorMessage =
                        "Não foi possível identificar sua localização.";

                    break;


                case error.TIMEOUT:

                    errorMessage =
                        "O tempo para obter sua localização expirou.";

                    break;


                default:

                    errorMessage =
                        "Ocorreu um erro ao obter sua localização.";

            }


            showMessage(
                errorMessage,
                "error"
            );


            console.error("Erro de localização:", error);


            locationButton.disabled = false;

        },


        {

            enableHighAccuracy: true,

            timeout: 15000,

            maximumAge: 0

        }

    );

});
