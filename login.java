function switchForm() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const title = document.getElementById('form-title');

  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    title.innerText = 'Entrar na Sigma Store';
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    title.innerText = 'Cadastrar na Sigma Store';
  }
}

// Simula envio (sem backend)
document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Login realizado com sucesso!');
});

document.getElementById('register-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Cadastro concluído!');
});
