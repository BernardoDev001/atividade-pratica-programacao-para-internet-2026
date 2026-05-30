// seletores de telas 
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// botoes que trocam os forms
const btnIrParaCadastro = document.getElementById('btn-ir-cadastro');
const btnIrParaLogin = document.getElementById('btn-ir-login');

// eventos para alternar a exibição dos forms
btnIrParaCadastro.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

btnIrParaLogin.addEventListener('click', () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

//logica do cadastro
const btnCadastrar = document.getElementById('register-btn');
btnCadastrar.addEventListener('click', () => {
    const nome = document.getElementById('register-nome').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const senha = document.getElementById('register-senha').value;
    const confirmarSenha = document.getElementById('register-confirmar-senha').value;
    const apelido = document.getElementById('register-apelido').value.trim();

    if (nome === '' || email === '' || senha === '' || confirmarSenha === '' || apelido === '') {
        alert('Todos os campos devem ser preenchidos');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não conferem');
        return;
    }

    //pegar banco de dados local existente
    const users = JSON.parse(localStorage.getItem('users')) || [];

    //verificar se ja existe usuario com o mesmo email
    const emailJaCadastrado = users.some(u => u.email === email);
    if (emailJaCadastrado) {
        alert('ja existe um usuario com esse email');
        return;
    }

    //salvar novo usuario
    const novoUsuario = { nome, email, senha, apelido };
    users.push(novoUsuario);
    localStorage.setItem('users', JSON.stringify(users));
    alert('conta criada com sucesso')

    //limpar campoos e mandar para tela de login
    document.getElementById('register-nome').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-senha').value = '';
    document.getElementById('register-confirmar-senha').value = '';
    document.getElementById('register-apelido').value = '';
    registerForm.style.display = 'none';
    loginForm.style.display = 'flex';


});

const btnEntrar = document.getElementById('login-entrar');
btnEntrar.addEventListener('click', () => {
    const email = document.getElementById('login-email').value.trim();
    const senha = document.getElementById('login-senha').value.trim();

    if (!email || !senha) {
        alert('Todos os campos devem ser preenchidos');
        return;
    }

    //verificar se o usuario existe
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usuarioValido = users.find(u => u.email === email && u.senha === senha);

    if (usuarioValido) {
        //salva a sessao do usuario logado
        localStorage.setItem('currentUser', JSON.stringify(usuarioValido));
        alert('Login realizado com sucesso');
        window.location.href = 'peaktrack.html';
    } else {
        alert('Usuario ou senha invalidos');
    }

});