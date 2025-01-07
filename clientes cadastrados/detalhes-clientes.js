// Função para capturar os dados do formulário
function getFormData() {
    return {
        nomeCompleto: document.getElementById("nome").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        cpf: document.getElementById("cpf").value,
        rg: document.getElementById("rg").value,
        cnh: document.getElementById("cnh").value,
        tipoCnh: document.getElementById("tipoCnh").value,
        telefone: document.getElementById("telefone").value,
        celular1: document.getElementById("celular1").value,
        celular2: document.getElementById("celular2").value,
        email: document.getElementById("email").value,
        cep: document.getElementById("cep").value,
        rua: document.getElementById("rua").value,
        numeroCasa: document.getElementById("numeroCasa").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        idContrato: document.getElementById("contrato").value,
        planoEscolhido: document.getElementById("planoEscolhido").value,
        status: document.getElementById("status").value,
    };
}

// Função para atualizar os dados do cliente
function atualizarCliente(clienteId) {
    const clienteData = getFormData(); // Captura os dados do formulário

    axios.put(`http://localhost:8080/clientes/${clienteId}`, clienteData)
        .then(response => {
            alert("Cliente atualizado com sucesso!");
            // Aqui, você pode reescrever os dados com a resposta do backend se necessário
            preencherFormulario(response.data); // Atualiza o formulário com os dados mais recentes
        })
        .catch(error => {
            console.error('Erro ao atualizar cliente:', error);
            alert('Erro ao atualizar o cliente!');
        });
}

// Adiciona o evento de clique no botão de salvar
document.getElementById('save-button').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const clienteId = getClientIdFromUrl(); // Pega o ID do cliente da URL

    if (clienteId) {
        atualizarCliente(clienteId); // Envia os dados para atualização
    } else {
        alert('ID do cliente não encontrado na URL!');
    }
});

// Função para pegar o ID do cliente da URL
function getClientIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Função para preencher o formulário com os dados do cliente
function preencherFormulario(cliente) {
    document.getElementById("nome").value = cliente.nomeCompleto || '';
    document.getElementById("dataNascimento").value = cliente.dataNascimento 
        ? cliente.dataNascimento.split("T")[0]
        : '';
    document.getElementById("cpf").value = cliente.cpf || '';
    document.getElementById("rg").value = cliente.rg || '';
    document.getElementById("cnh").value = cliente.cnh || '';
    document.getElementById("tipoCnh").value = cliente.tipoCnh || '';
    document.getElementById("telefone").value = cliente.telefone || '';
    document.getElementById("celular1").value = cliente.celular1 || '';
    document.getElementById("celular2").value = cliente.celular2 || '';
    document.getElementById("email").value = cliente.email || '';
    document.getElementById("cep").value = cliente.cep || '';
    document.getElementById("rua").value = cliente.rua || '';
    document.getElementById("numeroCasa").value = cliente.numeroCasa || '';
    document.getElementById("bairro").value = cliente.bairro || '';
    document.getElementById("cidade").value = cliente.cidade || '';
    document.getElementById("estado").value = cliente.estado || '';
    document.getElementById("contrato").value = cliente.idContrato || '';
    document.getElementById("planoEscolhido").value = cliente.planoEscolhido || '';
    document.getElementById("status").value = cliente.status || '';
}

// Função para buscar os dados do cliente usando axios
function getClientDetails(clienteId) {
    axios.get(`http://localhost:8080/clientes/${clienteId}`)
        .then(response => {
            const cliente = response.data;
            preencherFormulario(cliente); // Preenche o formulário com os dados
        })
        .catch(error => {
            console.error('Erro ao buscar os dados do cliente:', error);
            alert('Erro ao carregar os dados do cliente!');
        });
}

// Pega o ID do cliente da URL
const clienteId = getClientIdFromUrl();
if (clienteId) {
    // Busca os detalhes do cliente com axios
    getClientDetails(clienteId);
} else {
    alert('ID do cliente não encontrado na URL!');
}
