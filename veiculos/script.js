document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("veiculoForm");
    const documentoInput = document.getElementById("documentoVeiculo");
    const clienteSelect = document.getElementById("cliente");
    const saveAndBackButton = document.getElementById("save-and-back-button");

    // Função para buscar os clientes via API e preencher o campo de seleção
    function buscarClientes() {
        axios.get("http://localhost:8080/clientes") // Substitua pela URL correta da API
            .then(response => {
                const clientes = response.data;

                if (Array.isArray(clientes)) {
                    clienteSelect.innerHTML = '<option value="" disabled selected>Selecione um cliente</option>';

                    clientes.forEach(cliente => {
                        const option = document.createElement("option");
                        option.value = cliente.id; // ID do cliente
                        option.textContent = cliente.nomeCompleto; // Nome do cliente
                        clienteSelect.appendChild(option);
                    });
                } else {
                    alert("Nenhum cliente encontrado.");
                }
            })
            .catch(error => {
                console.error("Erro ao buscar clientes:", error);
                alert("Erro ao buscar clientes.");
            });
    }

    // Função para enviar o documento para o Cloudinary
    function uploadDocumento(documentoFile) {
        const cloudinaryURL = "https://api.cloudinary.com/v1_1/dkah0zn7l/upload"; // Cloudinary URL
        const uploadPreset = "meu_preset"; // Substitua pelo seu preset de upload

        const formData = new FormData();
        formData.append("file", documentoFile);
        formData.append("upload_preset", uploadPreset);

        return axios.post(cloudinaryURL, formData)
            .then(response => response.data.secure_url)
            .catch(error => {
                console.error("Erro ao fazer upload do documento:", error);
                return null;
            });
    }

    // Função para enviar os dados do veículo
    function enviarDados(veiculoData, redirect = false) {
        axios.post("http://localhost:8080/veiculos", veiculoData, {
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
            console.log("Sucesso:", response.data);
            alert("Veículo cadastrado com sucesso!");
            form.reset();

            if (redirect) {
                window.location.href = "../veiculos cadastrados/index.html"; // Substitua pela URL correta
            }
        })
        .catch(error => {
            console.error("Erro ao cadastrar veículo:", error);
            alert("Erro ao cadastrar veículo.");
        });
    }

    // Evento de submit do formulário
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const documentoFile = documentoInput.files[0];

        if (documentoFile) {
            uploadDocumento(documentoFile).then(documentoURL => {
                if (documentoURL) {
                    const veiculoData = {
                        clienteId: clienteSelect.value,
                        apelidoMoto: document.getElementById("apelidoMoto").value,
                        placa: document.getElementById("placa").value,
                        marca: document.getElementById("marca").value,
                        modelo: document.getElementById("modelo").value,
                        anoFabricacao: document.getElementById("anoFabricacao").value,
                        cor: document.getElementById("cor").value,
                        status: document.getElementById("status").value,
                        seguro: document.getElementById("seguro").value,
                        vencimentoSeguro: document.getElementById("vencimentoSeguro").value,
                        parcelaVeiculo: document.getElementById("parcelaVeiculo").value,
                        valorSeguro: document.getElementById("valorSeguro").value,
                        documentoVeiculo: documentoURL,
                        observacoes: document.getElementById("observacoes").value,
                        fotosVeiculo: "", // Implementar upload de fotos separadamente
                    };
                    enviarDados(veiculoData);
                } else {
                    alert("Erro ao fazer upload do documento.");
                }
            });
        } else {
            alert("Por favor, anexe o documento do veículo!");
        }
    });

    // Evento do botão "Salvar e Voltar"
    saveAndBackButton.addEventListener("click", (event) => {
        event.preventDefault();

        const documentoFile = documentoInput.files[0];

        if (documentoFile) {
            uploadDocumento(documentoFile).then(documentoURL => {
                if (documentoURL) {
                    const veiculoData = {
                        clienteId: clienteSelect.value,
                        apelidoMoto: document.getElementById("apelidoMoto").value,
                        placa: document.getElementById("placa").value,
                        marca: document.getElementById("marca").value,
                        modelo: document.getElementById("modelo").value,
                        anoFabricacao: document.getElementById("anoFabricacao").value,
                        cor: document.getElementById("cor").value,
                        status: document.getElementById("status").value,
                        seguro: document.getElementById("seguro").value,
                        vencimentoSeguro: document.getElementById("vencimentoSeguro").value,
                        parcelaVeiculo: document.getElementById("parcelaVeiculo").value,
                        valorSeguro: document.getElementById("valorSeguro").value,
                        documentoVeiculo: documentoURL,
                        observacoes: document.getElementById("observacoes").value,
                        fotosVeiculo: "",
                    };
                    enviarDados(veiculoData, true); // Redireciona após o cadastro
                } else {
                    alert("Erro ao fazer upload do documento.");
                }
            });
        } else {
            alert("Por favor, anexe o documento do veículo!");
        }
    });

    // Preenche a lista de clientes ao carregar a página
    buscarClientes();
});
