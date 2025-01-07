document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("despesaForm");
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
    function getNextDespesaId() {
        return axios.get('http://localhost:8080/despesas') // Endpoint para despesas
            .then(response => {
                const despesas = response.data;
                if (despesas.length > 0) {
                    const maxId = Math.max(...despesas.map(despesa => despesa.id));
                    return maxId + 1;
                }
                return 1;
            })
            .catch(error => {
                console.error('Erro ao buscar despesas:', error);
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

                    getNextDespesaId().then(nextId => {
                        const despesaData = {
                            id: nextId, // ID obtido após checar o banco
                            descricao: document.getElementById("descricao").value,
                            categoria: document.getElementById("categoria").value,
                            valor: parseFloat(document.getElementById("valor").value),
                            data: document.getElementById("data").value,
                            pagamento: document.getElementById("pagamento").value,
                            fornecedor: document.getElementById("fornecedor").value || null,
                            moto: document.getElementById("moto").value || null,
                            centroCusto: document.getElementById("centroCusto").value || null,
                            observacoes: document.getElementById("observacoes").value || null,
                            anexo: anexoURL // URL do anexo
                        };

                        // Enviar dados para o backend
                        axios.post('http://localhost:8080/despesas', despesaData, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => {
                            console.log('Sucesso:', response.data);
                            alert('Despesa cadastrada com sucesso!');
                            form.reset(); // Limpa o formulário
                        })
                        .catch(error => {
                            console.error('Erro ao cadastrar despesa:', error);
                            alert('Erro ao cadastrar despesa.');
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
