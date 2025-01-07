document.addEventListener("DOMContentLoaded", () => {
    buscarClientes(); // Buscar clientes do backend ao carregar a página
});

// Função para buscar clientes do backend
function buscarClientes() {
    axios.get('http://localhost:8080/clientes') // Ajuste a URL para o backend correto
        .then(response => {
            const clientes = response.data; // Supondo que o backend retorna um array de clientes
            localStorage.setItem('clientes', JSON.stringify(clientes)); // Atualiza o localStorage
            renderClients(clientes); // Renderiza a tabela com os dados do backend
        })
        .catch(error => {
            console.error('Erro ao buscar clientes:', error);
            alert('Erro ao carregar os dados dos clientes.');
        });
}

function renderClients(clientes) {
    const tbody = document.getElementById('client-list-body');
    tbody.innerHTML = ''; // Limpa a tabela antes de renderizar

    clientes.forEach(cliente => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = cliente.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        const nameLink = document.createElement('a');
        nameLink.href = `detalhes-cliente.html?id=${cliente.id}`;
        nameLink.textContent = cliente.nomeCompleto || 'Nome não informado';
        nameCell.appendChild(nameLink);
        row.appendChild(nameCell);

        const cpfCell = document.createElement('td');
        cpfCell.textContent = cliente.cpf || 'CPF não informado';
        row.appendChild(cpfCell);

        const contratoCell = document.createElement('td');
        contratoCell.textContent = cliente.idContrato || 'Contrato não informado';
        row.appendChild(contratoCell);

        // Adicionando o botão de lixeira para exclusão
        const deleteCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️'; // Ícone de lixeira
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteClient(cliente.id); // Chama a função para excluir o cliente
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        tbody.appendChild(row);
    });
}

// Função para excluir o cliente
function deleteClient(clientId) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        axios.delete(`http://localhost:8080/clientes/${clientId}`)
            .then(response => {
                alert('Cliente excluído com sucesso!');
                
                // Remover o cliente do localStorage
                let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
                clientes = clientes.filter(cliente => cliente.id !== clientId);
                localStorage.setItem('clientes', JSON.stringify(clientes));

                // Atualiza a lista de clientes após a exclusão
                renderClients(clientes);
            })
            .catch(error => {
                console.error('Erro ao excluir cliente:', error);
                alert('Erro ao excluir cliente.');
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
