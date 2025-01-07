// Função para pegar o ID do veículo da URL
function getVeiculoIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id'); // Obtém o parâmetro 'id' da URL
}

// Função para formatar a data para o formato 'yyyy-MM-dd' esperado no campo de input de data
function formatarDataParaInput(data) {
    if (!data) return ''; // Verifica se a data existe
    const date = new Date(data);
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexed
    const dia = String(date.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`; // Retorna no formato 'yyyy-MM-dd'
}

// Função para preencher o formulário com os dados do veículo
function preencherFormularioVeiculo(veiculo) {
    document.getElementById('apelidoMoto').value = veiculo.apelidoMoto || '';
    document.getElementById('placa').value = veiculo.placa || '';
    document.getElementById('seguro').value = veiculo.seguro || '';
    document.getElementById('parcelaVeiculo').value = veiculo.parcelaVeiculo || '';
    document.getElementById('marca').value = veiculo.marca || '';
    document.getElementById('modelo').value = veiculo.modelo || '';
    document.getElementById('anoFabricacao').value = veiculo.anoFabricacao || '';
    document.getElementById('cor').value = veiculo.cor || '';
    document.getElementById('status').value = veiculo.status || '';
    document.getElementById('vencimentoSeguro').value = formatarDataParaInput(veiculo.vencimentoSeguro) || '';
    document.getElementById('observacoes').value = veiculo.observacoes || '';

    // Preenchendo o campo de cliente associado
    if (veiculo.cliente) {
        document.getElementById('cliente').value = veiculo.cliente.id || '';
    }

    // Preenchendo o valor do seguro
    document.getElementById('valorSeguro').value = veiculo.valorSeguro || '';

    // Preenchendo o campo de manutenção associada
    if (veiculo.manutencao) {
        document.getElementById('manutencao').value = veiculo.manutencao.id || '';
    }
}

// Função para capturar os dados do formulário de veículo
function getFormDataVeiculo() {
    return {
        apelidoMoto: document.getElementById('apelidoMoto').value,
        placa: document.getElementById('placa').value,
        seguro: document.getElementById('seguro').value,
        parcelaVeiculo: document.getElementById('parcelaVeiculo').value,
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        anoFabricacao: document.getElementById('anoFabricacao').value,
        cor: document.getElementById('cor').value,
        status: document.getElementById('status').value,
        vencimentoSeguro: document.getElementById('vencimentoSeguro').value,
        observacoes: document.getElementById('observacoes').value,
        clienteId: document.getElementById('cliente').value,  // Supondo que o cliente é associado
        valorSeguro: document.getElementById('valorSeguro').value,
        manutencaoId: document.getElementById('manutencao').value  // Supondo que a manutenção é associada
    };
}

// Função para atualizar os dados do veículo
function atualizarVeiculo(veiculoId) {
    const veiculoData = getFormDataVeiculo(); // Captura os dados do formulário

    axios.put(`http://localhost:8080/veiculos/${veiculoId}`, veiculoData)
        .then(response => {
            alert("Veículo atualizado com sucesso!");
            // Atualiza o formulário com os dados mais recentes
            preencherFormularioVeiculo(response.data);
        })
        .catch(error => {
            console.error('Erro ao atualizar veículo:', error);
            alert('Erro ao atualizar o veículo!');
        });
}

// Função para buscar os dados do veículo usando axios
function getVeiculoDetails(veiculoId) {
    axios.get(`http://localhost:8080/veiculos/${veiculoId}`)
        .then(response => {
            const veiculo = response.data; // A resposta pode variar dependendo do backend
            preencherFormularioVeiculo(veiculo); // Preenche o formulário com os dados
        })
        .catch(error => {
            console.error('Erro ao buscar os dados do veículo:', error);
            alert('Erro ao carregar os dados do veículo!');
        });
}

// Adiciona o evento de clique no botão de salvar
document.getElementById('save-button').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const veiculoId = getVeiculoIdFromUrl(); // Pega o ID do veículo da URL

    if (veiculoId) {
        atualizarVeiculo(veiculoId); // Envia os dados para atualização
    } else {
        alert('ID do veículo não encontrado na URL!');
    }
});

// Pega o ID do veículo da URL e, se encontrado, faz a requisição para buscar os detalhes do veículo
const veiculoId = getVeiculoIdFromUrl();
if (veiculoId) {
    getVeiculoDetails(veiculoId);  // Certifique-se de usar veiculoId aqui
} else {
    alert('ID do veículo não encontrado na URL!');
}
