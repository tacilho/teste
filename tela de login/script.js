document.querySelector('form[action="#"]').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Email:', email);
    console.log('Password:', password);

    const correctEmail = 'admin@mail.com';
    const correctPassword = 'admin';

    if (email === correctEmail && password === correctPassword) {
        console.log('Credentials are correct. Redirecting...');
        
        window.location.href = '../tela inicial/index.html';
    } else {
        console.log('Incorrect credentials');

        alert('Usuário ou senha incorretos');
    } 
}); 
