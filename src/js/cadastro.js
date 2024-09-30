
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; // Recupera os usuários do localStorage

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastro-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita o envio do formulário

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const confirmeSenha = document.getElementById('confirme-senha').value; // Obtém o valor do campo de confirmação de senha

        if (senha === confirmeSenha) { // Verifica se as senhas coincidem
            const usuario = new Usuario(nome, email, senha);
            usuarios.push(usuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Salva os usuários no localStorage
            alert("Cadastro bem sucedido! ")
            window.open("./login.html", "_self");
      
        } else {
            alert("As senhas não coincidem. Tente novamente!"); // Exibe alerta se as senhas não coincidirem
        }
    });
});

class Usuario {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}