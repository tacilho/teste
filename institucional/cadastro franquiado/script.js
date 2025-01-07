document.addEventListener("DOMContentLoaded", () => {
    const cepInput = document.getElementById("cep");
    const ruaInput = document.getElementById("rua");
    const bairroInput = document.getElementById("bairro");
    const cidadeInput = document.getElementById("cidade");
    const estadoInput = document.getElementById("estado");
    const cpfInput = document.getElementById("cpf");
    const rgInput = document.getElementById("rg");
    const cnhInput = document.getElementById("cnh");
    const clienteForm = document.getElementById("clienteForm");

    // Função para buscar endereço baseado no CEP
    cepInput.addEventListener("blur", () => {
        const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        ruaInput.value = data.logradouro || '';
                        bairroInput.value = data.bairro || '';
                        cidadeInput.value = data.localidade || '';
                        estadoInput.value = data.uf || '';
                    } else {
                        alert('CEP não encontrado.');
                        clearAddressFields();
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar o CEP:', error);
                    alert('Erro ao buscar o CEP.');
                });
        } else {
            alert('CEP inválido.');
            clearAddressFields();
        }
    });

    function clearAddressFields() {
        ruaInput.value = '';
        bairroInput.value = '';
        cidadeInput.value = '';
        estadoInput.value = '';
    }

    // Formatação em tempo real para CPF
    cpfInput.addEventListener('input', function() {
        const valor = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        this.value = formatarCPF(valor); // Aplica formatação
    });

    // Formatação em tempo real para RG
    rgInput.addEventListener('input', function() {
        const valor = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        this.value = formatarRG(valor); // Aplica formatação
    });

    // Formatação em tempo real para CNH
    cnhInput.addEventListener('input', function() {
        const valor = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        this.value = formatarCNH(valor); // Aplica formatação
    });

    // Função para formatar o CPF
    function formatarCPF(cpf) {
        if (cpf.length > 11) {
            cpf = cpf.slice(0, 11); // Limita a 11 dígitos
        }
        return cpf.replace(/(\d{3})(\d)/, '$1.$2') // Coloca o primeiro ponto
                    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o segundo ponto
                    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca o hífen
    }

    // Função para formatar o RG
    function formatarRG(rg) {
        if (rg.length > 9) {
            rg = rg.slice(0, 9); // Limita a 9 dígitos
        }
        return rg.replace(/(\d{1})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4'); // Formatação padrão
    }

    // Função para formatar a CNH
    function formatarCNH(cnh) {
        if (cnh.length > 11) {
            cnh = cnh.slice(0, 11); // Limita a 11 dígitos
        }
        return cnh.replace(/(\d{10})(\d)/, '$1-$2'); // Coloca o hífen no final
    }

    // Submissão do formulário
    clienteForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário

        const formData = new FormData(event.target);
        const cpf = formData.get('cpf').replace(/\D/g, ''); // Remove caracteres não numéricos

        // Criar objeto com os dados
        const cliente = {
            nome: formData.get('nome'),
            nascimento: formData.get('nascimento'),
            cpf: cpf,
            rg: formData.get('rg'),
            cnh: formData.get('cnh'),
            tipoCnh: formData.get('tipoCnh'),
            cep: formData.get('cep'),
            rua: formData.get('rua'),
            bairro: formData.get('bairro'),
            cidade: formData.get('cidade'),
            estado: formData.get('estado'),
            contrato: formData.get('contrato'),
            foto: formData.get('foto') ? formData.get('foto').name : ''
        };

        // Exibir os dados no console (substituir por envio ao backend)
        console.log('Cliente salvo:', cliente);
        alert('Cliente cadastrado com sucesso!');

        // Limpar o formulário
        event.target.reset();
    });

});

// Inicializa o EmailJS com o seu User ID
(function() {
    emailjs.init("8yhZchhN1KdH-Da7V"); // Substitua YOUR_USER_ID pelo seu User ID do EmailJS
})();

document.getElementById('franqueadoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const formData = new FormData(event.target);
    const cpf = formData.get('cpf').replace(/\D/g, ''); // Remove caracteres não numéricos

    const cliente = {
        nome: formData.get('nome'),
        data_nascimento: formData.get('data_nascimento'),
        cpf: cpf,
        rg: formData.get('rg'),
        cnh: formData.get('cnh'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        cep: formData.get('cep'),
        rua: formData.get('rua'),
        bairro: formData.get('bairro'),
        cidade: formData.get('cidade'),
        estado: formData.get('estado'),
        numero: formData.get('numero'),
        complemento: formData.get('complemento'),
        plano: formData.get('plano'),
        // Adicione outros campos que precisar...
    };

    // Envio do email
    emailjs.send("service_0qitjvt", "template_u463enb", cliente)
        .then(() => {
            alert('Cliente cadastrado com sucesso!'); // Mensagem de sucesso
            event.target.reset(); // Limpa o formulário
        })
        .catch((error) => {
            console.error('Erro ao enviar o email:', error);
            alert('Houve um erro ao cadastrar, tente novamente.');
        });
});

// Função para exibir as imagens pré-visualizadas
function previewImage(inputId, previewId) {
    const fileInput = document.getElementById(inputId);
    const previewDiv = document.getElementById(previewId);

    fileInput.addEventListener('change', function() {
        const files = fileInput.files;

        // Verifica se o número de arquivos é maior que 2
        if (files.length > 2) {
            alert('Você pode selecionar no máximo 2 imagens.');
            fileInput.value = ''; // Limpa o campo de input
            return; // Não continua a execução
        }

        // Adiciona as novas imagens à pré-visualização sem limpar as anteriores
        Array.from(files).forEach(file => {
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100px'; // Define o tamanho máximo da imagem
                img.style.margin = '5px'; // Adiciona margem entre as imagens
                previewDiv.appendChild(img); // Adiciona a imagem na div de pré-visualização
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        });
    });
}

// Chama a função para cada campo de upload (permitindo até 2 imagens por campo)
previewImage('foto_cnh', 'preview_cnh');
previewImage('foto_documentos', 'preview_documentos');
previewImage('selfie', 'preview_selfie');

// Envio do formulário via API (permitindo até 2 imagens por campo)
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    const formData = new FormData();

    // Obtém os arquivos selecionados nos campos de upload
    const fotoCnhFiles = document.getElementById('foto_cnh').files;
    const fotoDocumentosFiles = document.getElementById('foto_documentos').files;
    const selfieFiles = document.getElementById('selfie').files;

    // Verifica se o número de arquivos não excede 2
    if (fotoCnhFiles.length > 2) {
        alert('Você pode enviar no máximo 2 imagens para o campo "Foto CNH".');
        return;
    }
    if (fotoDocumentosFiles.length > 2) {
        alert('Você pode enviar no máximo 2 imagens para o campo "Foto Documentos".');
        return;
    }
    if (selfieFiles.length > 2) {
        alert('Você pode enviar no máximo 2 imagens para o campo "Selfie".');
        return;
    }

    // Adiciona as imagens selecionadas ao FormData
    Array.from(fotoCnhFiles).forEach(file => formData.append('foto_cnh', file));
    Array.from(fotoDocumentosFiles).forEach(file => formData.append('foto_documentos', file));
    Array.from(selfieFiles).forEach(file => formData.append('selfie', file));

    // Adiciona outros dados do formulário
    formData.append('nome', document.getElementById('nome').value);
    formData.append('email', document.getElementById('email').value);

    // Envia o formulário para a API
    fetch('https://seu-servidor.com/enviar-email', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Fotos enviadas com sucesso!');
        } else {
            alert('Erro ao enviar fotos.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar fotos.');
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cepInput = document.getElementById("cep");
    const ruaInput = document.getElementById("rua");
    const bairroInput = document.getElementById("bairro");
    const cidadeInput = document.getElementById("cidade");
    const estadoInput = document.getElementById("estado");
    const cpfInput = document.getElementById("cpf");
    const rgInput = document.getElementById("rg");
    const cnhInput = document.getElementById("cnh");
    const clienteForm = document.getElementById("clienteForm");

    // Função para buscar endereço baseado no CEP
    cepInput.addEventListener("blur", () => {
        const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        ruaInput.value = data.logradouro || '';
                        bairroInput.value = data.bairro || '';
                        cidadeInput.value = data.localidade || '';
                        estadoInput.value = data.uf || '';
                    } else {
                        alert('CEP não encontrado.');
                        clearAddressFields();
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar o CEP:', error);
                    alert('Erro ao buscar o CEP.');
                });
        } else {
            alert('CEP inválido.');
            clearAddressFields();
        }
    });

    function clearAddressFields() {
        ruaInput.value = '';
        bairroInput.value = '';
        cidadeInput.value = '';
        estadoInput.value = '';
    }

    // Formatação em tempo real para CPF
    cpfInput.addEventListener('input', function() {
        const valor = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        this.value = formatarCPF(valor); // Aplica formatação
    });

    // Formatação em tempo real para RG
    rgInput.addEventListener('input', function() {
        const valor = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        this.value = formatarRG(valor); // Aplica formatação
    });

    // Formatação em tempo real para CNH
    cnhInput.addEventListener('input', function() {
        const valor = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        this.value = formatarCNH(valor); // Aplica formatação
    });

    // Função para formatar o CPF
    function formatarCPF(cpf) {
        if (cpf.length > 11) {
            cpf = cpf.slice(0, 11); // Limita a 11 dígitos
        }
        return cpf.replace(/(\d{3})(\d)/, '$1.$2') // Coloca o primeiro ponto
                    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o segundo ponto
                    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca o hífen
    }

    // Função para formatar o RG
    function formatarRG(rg) {
        if (rg.length > 9) {
            rg = rg.slice(0, 9); // Limita a 9 dígitos
        }
        return rg.replace(/(\d{1})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4'); // Formatação padrão
    }

    // Função para formatar a CNH
    function formatarCNH(cnh) {
        if (cnh.length > 11) {
            cnh = cnh.slice(0, 11); // Limita a 11 dígitos
        }
        return cnh.replace(/(\d{10})(\d)/, '$1-$2'); // Coloca o hífen no final
    }

    // Submissão do formulário
    clienteForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário

        const formData = new FormData(event.target);
        const cpf = formData.get('cpf').replace(/\D/g, ''); // Remove caracteres não numéricos

        // Criar objeto com os dados
        const cliente = {
            nome: formData.get('nome'),
            nascimento: formData.get('nascimento'),
            cpf: cpf,
            rg: formData.get('rg'),
            cnh: formData.get('cnh'),
            tipoCnh: formData.get('tipoCnh'),
            cep: formData.get('cep'),
            rua: formData.get('rua'),
            bairro: formData.get('bairro'),
            cidade: formData.get('cidade'),
            estado: formData.get('estado'),
            contrato: formData.get('contrato'),
            foto: formData.get('foto') ? formData.get('foto').name : ''
        };

        // Exibir os dados no console (substituir por envio ao backend)
        console.log('Cliente salvo:', cliente);
        alert('Cliente cadastrado com sucesso!');

        // Limpar o formulário
        event.target.reset();
    });

});

// Inicializa o EmailJS com o seu User ID
(function() {
    emailjs.init("8yhZchhN1KdH-Da7V"); // Substitua YOUR_USER_ID pelo seu User ID do EmailJS
})();

document.getElementById('franqueadoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const formData = new FormData(event.target);
    const cpf = formData.get('cpf').replace(/\D/g, ''); // Remove caracteres não numéricos

    const cliente = {
        nome: formData.get('nome'),
        data_nascimento: formData.get('data_nascimento'),
        cpf: cpf,
        rg: formData.get('rg'),
        cnh: formData.get('cnh'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        cep: formData.get('cep'),
        rua: formData.get('rua'),
        bairro: formData.get('bairro'),
        cidade: formData.get('cidade'),
        estado: formData.get('estado'),
        numero: formData.get('numero'),
        complemento: formData.get('complemento'),
        plano: formData.get('plano'),
        // Adicione outros campos que precisar...
    };

    // Envio do email
    emailjs.send("service_0qitjvt", "template_u463enb", cliente)
        .then(() => {
            alert('Cliente cadastrado com sucesso!'); // Mensagem de sucesso
            event.target.reset(); // Limpa o formulário
        })
        .catch((error) => {
            console.error('Erro ao enviar o email:', error);
            alert('Houve um erro ao cadastrar, tente novamente.');
        });
});

// Função para exibir o preview da imagem ao fazer o upload
function mostrarPreview(input, previewId) {
    const file = input.files[0]; // Pega o arquivo selecionado
    const preview = document.getElementById(previewId); // Seleciona a área de preview

    if (file) {
        const reader = new FileReader(); // Cria o objeto FileReader
        reader.onload = function(e) {
            // Cria a tag <img> para mostrar a imagem no preview
            const img = document.createElement('img');
            img.src = e.target.result; // Carrega a imagem
            img.alt = 'Preview';
            img.style.maxWidth = '200px'; // Define um tamanho para a miniatura
            img.style.maxHeight = '200px'; // Define um tamanho para a miniatura
            preview.innerHTML = ''; // Limpa o conteúdo do preview antes de adicionar a nova imagem
            preview.appendChild(img); // Adiciona a imagem ao preview
        };
        reader.readAsDataURL(file); // Lê o arquivo selecionado como uma URL de dados (base64)
    }
}

// Função para limpar o preview da imagem e remover a seção
function limparPreview(previewId, inputId) {
    const preview = document.getElementById(previewId);
    const input = document.getElementById(inputId);

    // Remove a div inteira que contém o preview
    preview.parentElement.removeChild(preview);

    // Limpa o campo de input de arquivo
    input.value = ''; 

    console.log(`Preview e input limpos, e a seção foi removida: ${previewId}`);
}

// Adiciona eventos para cada campo de upload
document.getElementById('foto_cnh').addEventListener('change', function() {
    mostrarPreview(this, 'preview_cnh');
});

document.getElementById('foto_documentos').addEventListener('change', function() {
    mostrarPreview(this, 'preview_documentos');
});

document.getElementById('selfie').addEventListener('change', function() {
    mostrarPreview(this, 'preview_selfie');
});

// Adiciona eventos de clique para os botões de limpar
document.getElementById('clear_cnh').addEventListener('click', function() {
    limparPreview('preview_cnh', 'foto_cnh');
});

document.getElementById('clear_documentos').addEventListener('click', function() {
    limparPreview('preview_documentos', 'foto_documentos');
});

document.getElementById('clear_selfie').addEventListener('click', function() {
    limparPreview('preview_selfie', 'selfie');
});

const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})