
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

document.getElementById("showRegister").addEventListener("click", (e) => {
    e.preventDefault();

    loginForm.classList.remove("active");
    registerForm.classList.add("active");
});

document.getElementById("showLogin").addEventListener("click", (e) => {
    e.preventDefault();

    registerForm.classList.remove("active");
    loginForm.classList.add("active");
});

// Cadastro
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
    }

    alert("Cadastro validado com sucesso, " + name + "!");

    registerForm.reset();

    registerForm.classList.remove("active");
    loginForm.classList.add("active");
});

// Login
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    alert("Formulário de login validado!\nE-mail: " + email);

    // Aqui você pode integrar sua API de autenticação.
});
