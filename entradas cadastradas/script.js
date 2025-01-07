document.addEventListener("DOMContentLoaded", () => {
    buscarEntradas(); // Buscar entradas do backend ao carregar a página
});

// Função para buscar entradas do backend
function buscarEntradas() {
    axios.get('http://localhost:8080/entradas') // Ajuste a URL para o endpoint do backend
        .then(response => {
            const entradas = response.data; // Supondo que o backend retorna um array de entradas
            localStorage.setItem('entradas', JSON.stringify(entradas)); // Atualiza o localStorage
            renderEntradas(entradas); // Renderiza a tabela com os dados do backend
        })
        .catch(error => {
            console.error('Erro ao buscar entradas:', error);
            alert('Erro ao carregar os dados das entradas.');
        });
}

// Função para renderizar a tabela de entradas
function renderEntradas(entradas) {
    const tbody = document.getElementById('client-list-body');
    tbody.innerHTML = ''; // Limpa a tabela antes de renderizar

    entradas.forEach(entrada => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = entrada.id;
        row.appendChild(idCell);

        // Modificando a célula de descrição para adicionar um link
        const descricaoCell = document.createElement('td');
        const descricaoLink = document.createElement('a');
        descricaoLink.href = `detalhes-entradas.html?id=${entrada.id}`; // Link para a página de detalhes da entrada
        descricaoLink.textContent = entrada.descricao || 'Descrição não informada';
        descricaoCell.appendChild(descricaoLink);
        row.appendChild(descricaoCell);

        const valorCell = document.createElement('td');
        valorCell.textContent = entrada.valor ? `R$ ${entrada.valor.toFixed(2)}` : 'Valor não informado';
        row.appendChild(valorCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = entrada.status || 'Status não informado';

        // Garantindo que a verificação seja insensível a maiúsculas/minúsculas e sem espaços extras
        const statusNormalized = entrada.status ? entrada.status.trim().toLowerCase() : '';

        // Verificando o status e aplicando as classes apropriadas
        if (statusNormalized === 'não recebido') {
            statusCell.classList.add('status-nao-recebido');
        } else if (statusNormalized === 'recebido') {
            statusCell.classList.add('status-recebido');
        }
        
        row.appendChild(statusCell);

        // Adicionando o botão de exclusão
        const deleteCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️'; // Ícone de lixeira
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteEntrada(entrada.id); // Chama a função para excluir a entrada
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        tbody.appendChild(row);
    });
}

// Função para excluir a entrada
function deleteEntrada(entradaId) {
    if (confirm('Tem certeza que deseja excluir esta entrada?')) {
        axios.delete(`http://localhost:8080/entradas/${entradaId}`)
            .then(response => {
                alert('Entrada excluída com sucesso!');

                // Remover a entrada do localStorage
                let entradas = JSON.parse(localStorage.getItem('entradas')) || [];
                entradas = entradas.filter(entrada => entrada.id !== entradaId);
                localStorage.setItem('entradas', JSON.stringify(entradas));

                // Atualiza a lista de entradas após a exclusão
                renderEntradas(entradas);
            })
            .catch(error => {
                console.error('Erro ao excluir entrada:', error);
                alert('Erro ao excluir entrada.');
            });
    }
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

// Função para alternar páginas (exemplo básico de paginação)
function changePage(direction) {
    // Lógica para alterar a página (opcional: implementar paginação no backend)
    alert('Funcionalidade de paginação ainda não implementada.');
}
