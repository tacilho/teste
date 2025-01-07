document.addEventListener("DOMContentLoaded", () => {
    buscarVeiculos(); // Buscar veículos do backend ao carregar a página
});

// Função para buscar veículos do backend
function buscarVeiculos() {
    axios.get('http://localhost:8080/veiculos')
    .then(response => {
        console.log(response.data);  // Adicione esta linha para verificar a estrutura da resposta
        const veiculos = response.data;
        localStorage.setItem('veiculos', JSON.stringify(veiculos));
        renderVeiculos(veiculos);
    })
    .catch(error => {
        console.error('Erro ao buscar veículos:', error);
        alert('Erro ao carregar os dados dos veículos.');
    });

}

// Função para excluir o veículo
function excluirVeiculo(veiculoId) {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
        axios.delete(`http://localhost:8080/veiculos/${veiculoId}`) // Substitua pela URL correta do backend
            .then(response => {
                alert('Veículo excluído com sucesso!');
                buscarVeiculos(); // Atualiza a lista de veículos após a exclusão
            })
            .catch(error => {
                console.error('Erro ao excluir veículo:', error);
                alert('Erro ao excluir veículo.');
            });
    }
}

// Função para renderizar a tabela de veículos
function renderVeiculos(veiculos) {
    const tbody = document.getElementById('vehicle-list-body');
    tbody.innerHTML = ''; // Limpa a tabela antes de renderizar

    veiculos.forEach((veiculo, index) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = veiculo.id || index + 1; // Use o ID do backend ou o índice
        row.appendChild(idCell);

        const nomeVeiculoCell = document.createElement('td');
        const nomeVeiculoLink = document.createElement('a');
        nomeVeiculoLink.href = `detalhes-veiculos.html?id=${veiculo.id}`; // Ajuste a URL conforme necessário
        nomeVeiculoLink.textContent = veiculo.modelo || 'Modelo não informado'; // Exibe o nome do veículo
        nomeVeiculoCell.appendChild(nomeVeiculoLink);
        row.appendChild(nomeVeiculoCell);

        const anoCell = document.createElement('td');
        anoCell.textContent = veiculo.anoFabricacao ? veiculo.anoFabricacao : 'Ano não informado'; // Verifique se o valor existe
        row.appendChild(anoCell);        
             

        const placaCell = document.createElement('td');
        placaCell.textContent = veiculo.placa || 'Placa não informada';
        row.appendChild(placaCell);

        // Adiciona um botão de exclusão
        const actionsCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.className = 'delete-button'; // Adicione uma classe para estilização
        deleteButton.addEventListener('click', () => excluirVeiculo(veiculo.id)); // Chama a função ao clicar
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);

        tbody.appendChild(row);
    });
}

// Eventos para alternância de menus
const cadastrosButton = document.getElementById('cadastros-button');
const dropdownMenu = document.getElementById('dropdown');

cadastrosButton.addEventListener('click', (event) => {
    event.stopPropagation();
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', () => {
    dropdownMenu.style.display = 'none';
});

const consultarButton = document.getElementById('consultar-button');
const consultarDropdown = document.getElementById('consultar-dropdown');

consultarButton.addEventListener('click', function(event) {
    event.stopPropagation();
    consultarDropdown.classList.toggle('open');
});

document.addEventListener('click', function(event) {
    if (!consultarButton.contains(event.target)) {
        consultarDropdown.classList.remove('open');
    }
});
