const bikesRentedElement = document.getElementById("bikesRented");
const clientsServedElement = document.getElementById("clientsServed");

const bikesRentedGoal = 120; // Número imaginário para motos alugadas
const clientsServedGoal = 250; // Número imaginário para clientes atendidos

let bikesRentedCount = 0;
let clientsServedCount = 0;
let animationStarted = false;

const animateCounters = () => {
    const incrementBikes = setInterval(() => {
        if (bikesRentedCount < bikesRentedGoal) {
            bikesRentedCount++;
            bikesRentedElement.innerText = bikesRentedCount;
        } else {
            clearInterval(incrementBikes);
        }
    }, 20); // Altera o número a cada 20ms (mais rápido)

    const incrementClients = setInterval(() => {
        if (clientsServedCount < clientsServedGoal) {
            clientsServedCount++;
            clientsServedElement.innerText = clientsServedCount;
        } else {
            clearInterval(incrementClients);
        }
    }, 20); // Altera o número a cada 20ms (mais rápido)
};

// Função para verificar se a seção está visível
const checkVisibility = () => {
    const statsSection = document.getElementById("stats");
    const sectionPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5; // A seção deve aparecer na parte superior da tela

    if (sectionPosition < screenPosition && !animationStarted) {
        animateCounters();
        animationStarted = true; // Garante que a animação ocorra apenas uma vez
    }
};

// Adiciona o evento de rolagem
window.addEventListener("scroll", checkVisibility);

// Seleciona o botão de WhatsApp
const whatsappButton = document.getElementById('whatsapp-button');

// Adiciona a classe para garantir que o botão esteja sempre visível
whatsappButton.classList.add('show');


// Seletor para todas as perguntas com setas
const faqQuestions = document.querySelectorAll('.faq-question');

// Adiciona evento de clique para cada pergunta
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling; // A resposta fica logo após a pergunta
        const arrow = question.querySelector('.arrow'); // A seta na pergunta
        
        // Toggle de abrir e fechar a resposta
        if (answer.style.display === 'none' || answer.style.display === '') {
            answer.style.display = 'block'; // Exibe a resposta
            arrow.classList.add('open'); // Gira a seta
        } else {
            answer.style.display = 'none'; // Esconde a resposta
            arrow.classList.remove('open'); // Restaura a seta
        }
    });
});

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})