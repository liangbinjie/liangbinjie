function login() {
    const loginScreen = document.getElementById('login-screen');
    loginScreen.style.opacity = '0';
    setTimeout(() => loginScreen.style.display = 'none', 2000);
}

function logout() {
    const loginScreen = document.getElementById('login-screen');
    loginScreen.style.display = 'flex';
    setTimeout(() => loginScreen.style.opacity = '1', 10);

}