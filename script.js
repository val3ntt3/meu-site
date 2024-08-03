function renderLots(filter = 'all') {
    const container = document.getElementById('lotsContainer');
    container.innerHTML = '';
    const filteredLots = filter === 'favorites' ? lots.filter(lot => lot.favorito) : lots;

    // Aqui criamos uma linha flexível para cada 3 lotes
    let row;
    filteredLots.forEach((lot, index) => {
        if (index % 3 === 0) {
            row = document.createElement('div');
            row.className = 'lot-row';
            container.appendChild(row);
        }
        const lotElement = document.createElement('div');
        lotElement.className = 'lot';
        lotElement.innerHTML = `
            <span class="favorite ${lot.favorito ? 'active' : ''}" onclick="toggleFavorite('${lot.lote}')">&#10084;</span>
            <img src="${lot.img}" alt="${lot.nome}">
            <div class="lot-header">Lote ${lot.lote}</div>
            <div class="lot-info">
                <h3>${lot.nome}</h3>
                <p>R$ ${lot.preco}</p>
                <button onclick="calcularLote('${lot.lote}')">Calcular</button>
            </div>
        `;
        row.appendChild(lotElement);
    });
}

function toggleFavorite(lote) {
    const lot = lots.find(l => l.lote === lote);
    lot.favorito = !lot.favorito;
    renderLots(document.querySelector('.navbar-buttons .active').innerText.toLowerCase().includes('favoritos') ? 'favorites' : 'all');
}

function filterLots(filter) {
    const allButton = document.querySelector('.navbar-buttons button:nth-child(1)');
    const favoritesButton = document.querySelector('.navbar-buttons button:nth-child(2)');
    if (filter === 'all') {
        allButton.classList.add('active');
        favoritesButton.classList.remove('active');
    } else {
        allButton.classList.remove('active');
        favoritesButton.classList.add('active');
    }
    renderLots(filter);
}

function calcularLote(lote) {
    const lot = lots.find(l => l.lote === lote);
    sessionStorage.setItem('selectedLote', JSON.stringify(lot));
    window.location.href = 'calculadora.html';
}

renderLots();
