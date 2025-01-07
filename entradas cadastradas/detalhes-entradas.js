// Função para capturar os dados do formulário
function getFormData() {
    return {
        descricao: document.getElementById("descricao").value,
        categoria: document.getElementById("categoria").value,
        valor: document.getElementById("valor").value,
        vencimento: document.getElementById("vencimento").value,
        formaPagamento: document.getElementById("formaPagamento").value,
        cliente: document.getElementById("cliente").value,
        moto: document.getElementById("moto").value,
        centroCusto: document.getElementById("centroCusto").value,
        status: document.getElementById("status").value,
        observacoes: document.getElementById("observacoes").value
    };
}

// Função para enviar os dados de uma nova entrada
function cadastrarEntrada() {
    const entradaData = getFormData(); // Captura os dados do formulário

    const formData = new FormData();
    for (const key in entradaData) {
        formData.append(key, entradaData[key]);
    }

    axios.post('http://localhost:8080/entradas', formData) // Envia os dados para o backend
        .then(response => {
            alert("Entrada cadastrada com sucesso!");
            // Se necessário, limpa o formulário
            document.getElementById("entradaForm").reset();
        })
        .catch(error => {
            console.error('Erro ao cadastrar entrada:', error);
            alert('Erro ao cadastrar a entrada!');
        });
}

// Função para buscar os dados da entrada para editar
function getEntradaDetails(entradaId) {
    axios.get(`http://localhost:8080/entradas/${entradaId}`)
        .then(response => {
            const entrada = response.data;
            preencherFormulario(entrada); // Preenche o formulário com os dados
        })
        .catch(error => {
            console.error('Erro ao buscar os dados da entrada:', error);
            alert('Erro ao carregar os dados da entrada!');
        });
}

// Função para preencher o formulário com os dados da entrada
function preencherFormulario(entrada) {
    document.getElementById("descricao").value = entrada.descricao || '';
    document.getElementById("categoria").value = entrada.categoria || '';
    document.getElementById("valor").value = entrada.valor || '';
    document.getElementById("vencimento").value = entrada.vencimento 
        ? entrada.vencimento.split("T")[0] // Converte a data para o formato yyyy-MM-dd
        : '';
    document.getElementById("formaPagamento").value = entrada.formaPagamento || '';
    document.getElementById("cliente").value = entrada.cliente || '';
    document.getElementById("moto").value = entrada.moto || '';
    document.getElementById("centroCusto").value = entrada.centroCusto || '';
    document.getElementById("status").value = entrada.status || '';
    document.getElementById("observacoes").value = entrada.observacoes || '';
}


// Função para pegar o ID da entrada da URL
function getEntradaIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Adiciona o evento de clique no botão de salvar
document.getElementById('entradaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const entradaId = getEntradaIdFromUrl(); // Pega o ID da entrada da URL

    if (entradaId) {
        // Se o ID da entrada for encontrado, realiza a atualização
        cadastrarEntrada(); 
    } else {
        // Caso contrário, cria uma nova entrada
        cadastrarEntrada(); 
    }
});

// Pega o ID da entrada da URL para editar, se disponível
const entradaId = getEntradaIdFromUrl();
if (entradaId) {
    // Busca os detalhes da entrada com axios
    getEntradaDetails(entradaId);
}
