document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("entradaForm");
    const anexosInput = document.getElementById("anexos"); // Campo de anexos

    // Função para enviar o comprovante para o Cloudinary
    function uploadAnexo(anexoFile) {
        const cloudinaryURL = 'https://api.cloudinary.com/v1_1/dkah0zn7l/upload'; // Substitua pelo seu Cloud Name
        const uploadPreset = 'meu_preset'; // Substitua pelo seu preset de upload

        const formData = new FormData();
        formData.append('file', anexoFile);
        formData.append('upload_preset', uploadPreset);

        return axios.post(cloudinaryURL, formData)
            .then(response => response.data.secure_url) // Retorna a URL do comprovante
            .catch(error => {
                console.error('Erro ao fazer upload do anexo:', error);
                return null;
            });
    }

    // Função para obter o próximo ID disponível
    function getNextEntradaId() {
        return axios.get('http://localhost:8080/entradas') // Endpoint para entradas
            .then(response => {
                const entradas = response.data;
                if (entradas.length > 0) {
                    const maxId = Math.max(...entradas.map(entrada => entrada.id));
                    return maxId + 1;
                }
                return 1;
            })
            .catch(error => {
                console.error('Erro ao buscar entradas:', error);
                return 1;
            });
    }

    // Evento de envio do formulário
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const anexoFile = anexosInput.files[0];
        let anexoURL = null;

        if (anexoFile) {
            uploadAnexo(anexoFile).then(url => {
                if (url) {
                    anexoURL = url; // URL do anexo

                    getNextEntradaId().then(nextId => {
                        const entradaData = {
                            id: nextId, // ID obtido após checar o banco
                            descricao: document.getElementById("descricao").value,
                            categoria: document.getElementById("categoria").value,
                            valor: parseFloat(document.getElementById("valor").value),
                            vencimento: document.getElementById("vencimento").value,
                            formaPagamento: document.getElementById("formaPagamento").value,
                            cliente: document.getElementById("cliente").value || null,
                            moto: document.getElementById("moto").value || null,
                            status: document.getElementById("status").value || null,
                            centroCusto: document.getElementById("centroCusto").value || null,
                            observacoes: document.getElementById("observacoes").value || null,
                            anexo: anexoURL // URL do anexo
                        };

                        // Enviar dados para o backend
                        axios.post('http://localhost:8080/entradas', entradaData, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => {
                            console.log('Sucesso:', response.data);
                            alert('Entrada cadastrada com sucesso!');
                            form.reset(); // Limpa o formulário
                        })
                        .catch(error => {
                            console.error('Erro ao cadastrar entrada:', error);
                            alert('Erro ao cadastrar entrada.');
                        });
                    });
                } else {
                    alert('Erro ao fazer upload do comprovante.');
                }
            });
        } else {
            alert('Por favor, anexe um comprovante!');
        }
    });
});
