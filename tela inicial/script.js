// URLs do backend
const clientesUrl = 'http://localhost:8080/clientes';
const veiculosUrl = 'http://localhost:8080/veiculos';

// Variáveis para o gráfico
let chart;

// Função para inicializar o gráfico
function initializeChart(clientesCount = 0, veiculosCount = 0) {
    const ctx = document.getElementById('dashboard-chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Clientes', 'Veículos'],
            datasets: [{
                label: 'Total de Cadastros',
                data: [clientesCount, veiculosCount],
                backgroundColor: ['#4CAF50', '#2196F3'],
                borderColor: ['#388E3C', '#1976D2'],
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                },
                title: {
                    display: true,
                    text: 'Cadastros no Sistema'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Função para buscar o total de clientes
function fetchClientesCount() {
    axios.get(clientesUrl)
        .then(response => {
            const totalClientes = response.data.length; // Conta o número de clientes no array
            document.getElementById('clientes-count').textContent = totalClientes || 0;
            updateChartData(0, totalClientes); // Atualiza o gráfico
            displayRecentClientes(response.data); // Exibe os últimos 5 clientes
        })
        .catch(error => {
            console.error('Erro ao buscar total de clientes:', error);
            document.getElementById('clientes-count').textContent = 'Erro';
        });
}

// Função para buscar o total de veículos
function fetchVeiculosCount() {
    axios.get(veiculosUrl)
        .then(response => {
            const totalVeiculos = response.data.length; // Conta o número de veículos no array
            document.getElementById('veiculos-count').textContent = totalVeiculos || 0;
            updateChartData(1, totalVeiculos); // Atualiza o gráfico
            displayRecentVeiculos(response.data); // Exibe os últimos 5 veículos
        })
        .catch(error => {
            console.error('Erro ao buscar total de veículos:', error);
            document.getElementById('veiculos-count').textContent = 'Erro';
        });
}

// Função para atualizar os dados no gráfico
function updateChartData(index, value) {
    if (chart) {
        chart.data.datasets[0].data[index] = value;
        chart.update();
    }
}

// Função para exibir os últimos 5 clientes
function displayRecentClientes(clientes) {
    const clientesList = document.getElementById('clientes-list');
    clientesList.innerHTML = ''; // Limpa a lista antes de adicionar os novos dados

    // Exibe os últimos 5 clientes
    clientes.slice(-5).forEach(cliente => {
        const li = document.createElement('li');
        li.textContent = `${cliente.nomeCompleto}`; // Modifique conforme os dados do seu cliente
        clientesList.appendChild(li);
    });
}

// Função para exibir os últimos 5 veículos
function displayRecentVeiculos(veiculos) {
    const veiculosList = document.getElementById('veiculos-list');
    veiculosList.innerHTML = ''; // Limpa a lista antes de adicionar os novos dados

    // Exibe os últimos 5 veículos
    veiculos.slice(-5).forEach(veiculo => {
        const li = document.createElement('li');
        li.textContent = `${veiculo.modelo} - ${veiculo.placa}`; // Modifique conforme os dados do seu veículo
        veiculosList.appendChild(li);
    });
}

// Inicializa o gráfico vazio
initializeChart();

// Chama as funções ao carregar a página
window.onload = function() {
    fetchClientesCount();
    fetchVeiculosCount();
}
