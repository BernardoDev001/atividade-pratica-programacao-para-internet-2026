// seletores de telas 
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// botoes que trocam os forms
const btnIrParaCadastro = document.getElementById('login-cadastrar');
const btnIrParaLogin = document.getElementById('register-ir-login');

// eventos paraa alternar a exibição dos forms
btnIrParaCadastro.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
});

btnIrParaLogin.addEventListener('click', () => {
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';
});

btnIrParaLogin.addEventListener('click', () => {
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';
})
