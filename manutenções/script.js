document.getElementById('clienteForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtenha os dados do formulário
    const formData = new FormData(event.target);

document.addEventListener("DOMContentLoaded", () => {
    const uploadArea = document.querySelector('.upload-area'); // Altere para o seletor correto da área de upload
    const fileInput = document.getElementById('foto'); // O input de arquivo
    const uploadLabel = document.querySelector('.upload-label'); // O label para upload

    // Evita o comportamento padrão de arrastar e soltar
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);    
        document.body.addEventListener(eventName, preventDefaults, false); 
    });

    // Destaca a área de upload durante o arraste
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    // Lida com o arquivo ao soltá-lo
    uploadArea.addEventListener('drop', handleDrop, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        uploadArea.classList.add('highlight'); // Adicione uma classe para a animação de destaque
    }

    function unhighlight() {
        uploadArea.classList.remove('highlight'); // Remove a classe de destaque
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0) {
            uploadFile(files[0]); // Envia o primeiro arquivo solto
        }
    }

    function uploadFile(file) {
        const formData = new FormData();
        formData.append('foto', file); // Adicione o arquivo ao FormData

        // Aqui você pode adicionar a lógica para enviar o arquivo ao seu backend
        fetch('URL_DO_SEU_BACKEND', { // Substitua pela URL correta
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                alert('Arquivo enviado com sucesso!');
            } else {
                alert('Erro ao enviar o arquivo.');
            }
        })
        .catch(error => {
            console.error('Erro ao enviar o arquivo:', error);
            alert('Erro ao enviar o arquivo.');
        });
    }
});

// Quando eu clicar no botão de cadastro

const cadastrosButton = document.getElementById('cadastros-button');
const dropdownMenu = document.getElementById('dropdown');

// Alternar visibilidade do menu ao clicar no botão
cadastrosButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Impede que o clique se propague e feche o menu
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Fechar menu se clicar fora dele
document.addEventListener('click', () => {
    dropdownMenu.style.display = 'none';
});

// Seleciona os botões "Consultar cadastros"
const consultarButton = document.getElementById('consultar-button');
const consultarDropdown = document.getElementById('consultar-dropdown');

// Adiciona o evento de clique no botão para alternar a exibição do menu
consultarButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Impede que o clique se propague para o documento
    consultarDropdown.classList.toggle('open');
});

// Fecha o menu se o usuário clicar fora do botão
document.addEventListener('click', function(event) {
    if (!consultarButton.contains(event.target)) {
        consultarDropdown.classList.remove('open');
    }
});

// Função para salvar a manutenção no localStorage (simulação)
function salvarManutencao(event) {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const intervaloKm = document.getElementById("intervaloKm").value;
    const intervaloMeses = document.getElementById("intervaloMeses").value;
    const custoEstimado = document.getElementById("custoEstimado").value;
    const observacoes = document.getElementById("observacoes").value;
    const recorrente = document.getElementById("recorrente").checked;
    const intervaloRecorrenteMeses = document.getElementById("intervaloRecorrenteMeses").value;

    const manutencao = {
        descricao,
        intervaloKm,
        intervaloMeses,
        custoEstimado,
        observacoes,
        recorrente,
        intervaloRecorrenteMeses,
        dataCadastro: new Date().toISOString()
    };

    // Salvar no localStorage (ou banco de dados real)
    let manutenções = JSON.parse(localStorage.getItem("manutencoes")) || [];
    manutenções.push(manutencao);
    localStorage.setItem("manutencoes", JSON.stringify(manutenções));

    alert("Manutenção cadastrada com sucesso!");
}

// Função para verificar se a manutenção está próxima
function verificarManutencao() {
    const manutenções = JSON.parse(localStorage.getItem("manutencoes")) || [];
    const hoje = new Date();
    
    manutenções.forEach(manutencao => {
        let dataManutencao = new Date(manutencao.dataCadastro);
        if (manutencao.recorrente) {
            // Se for recorrente, ajusta a data de vencimento com base no intervalo em meses
            dataManutencao.setMonth(dataManutencao.getMonth() + parseInt(manutencao.intervaloRecorrenteMeses));
        } else {
            // Para manutenções não recorrentes, verifica a data inicial
            // Suponhamos que o usuário tenha cadastrado a data de vencimento diretamente
            // Você pode modificar isso conforme necessário
            dataManutencao = new Date(manutencao.dataCadastro); 
        }

        // Verifica se a manutenção está dentro de 7 dias a partir de hoje
        if (dataManutencao - hoje <= 7 * 24 * 60 * 60 * 1000) {
            // Aqui você chama a função para enviar a notificação via WhatsApp
            enviarNotificacaoWhatsApp(manutencao);
        }
    });
}

// Função para enviar notificação via WhatsApp
function enviarNotificacaoWhatsApp(manutencao) {
    const telefone = "5519987363747"; // Substitua pelo número do telefone do usuário
    const mensagem = `Lembrete: A manutenção "${manutencao.descricao}" está próxima!`;

    // Formatar a URL para abrir o WhatsApp com a mensagem
    const url = `https://wa.me/${5519987363747}?text=${encodeURIComponent(mensagem)}`;

    // Abrir a URL do WhatsApp
    window.open(url, "_blank");
}

// Para rodar a verificação periodicamente (exemplo, a cada 24 horas)
setInterval(verificarManutencao, 24 * 60 * 60 * 1000);  // 24h em milissegundos

});