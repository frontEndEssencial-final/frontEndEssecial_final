

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
 
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita o envio do formulário
 
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value; // Obtém o valor do campo de senha
 
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; 
        const usuarioEncontrado = usuarios.find(usuario => usuario.email === email && usuario.senha === senha); // Verifica se o email e a senha correspondem a um usuário
 
        if (usuarioEncontrado) {
            window.open("../html/index.html", "_self"); // Redireciona para a página principal se as credenciais forem válidas
        } else {
            alert("Credenciais inválidas. Tente novamente."); // Exibe alerta se as credenciais forem inválidas
        }
    });
 });
 