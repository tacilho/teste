document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('citySelect');
    const confirmButton = document.getElementById('confirmButton');

    // Desabilitar botão inicialmente
    confirmButton.disabled = true;

    // Habilitar botão quando uma cidade for selecionada
    citySelect.addEventListener('change', () => {
        confirmButton.disabled = citySelect.value === "";
    });

    // Redirecionar para a página da cidade selecionada
    confirmButton.addEventListener('click', () => {
        const selectedCity = citySelect.value;
        if (selectedCity) {
            window.location.href = selectedCity;
        }
    });
});

// Seleciona o botão de alternância de tema
const themeToggleButton = document.getElementById('theme-toggle');

// Adiciona evento de clique ao botão
themeToggleButton.addEventListener('click', () => {
    // Alterna a classe do body entre dark-mode e light-mode
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    // Altera o ícone do botão com base no tema
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggleButton.textContent = isDarkMode ? '☀️' : '🌙';
});

// Define o tema padrão como claro
document.body.classList.add('light-mode');
