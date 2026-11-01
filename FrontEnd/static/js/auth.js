document.addEventListener('DOMContentLoaded', () => {
const tabs = document.querySelectorAll('.auth-tab');
const forms = document.querySelectorAll('.auth-form');
const passwordToggles = document.querySelectorAll('.password-toggle');
const passwordInput = document.getElementById('signup-password');
const strengthBar = document.querySelector('.password-strength');

tabs.forEach(tab => {
tab.addEventListener('click', () => {
const target = tab.dataset.tab;
tabs.forEach(t => {
t.classList.remove('active');
t.setAttribute('aria-selected', 'false');
});
tab.classList.add('active');
tab.setAttribute('aria-selected', 'true');
forms.forEach(f => {
f.classList.remove('active');
f.hidden = true;
});
const activeForm = document.getElementById(`${target}-form`);
activeForm.classList.add('active');
activeForm.hidden = false;
});
});

const eyeOpenSVG = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
const eyeClosedSVG = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';

passwordToggles.forEach(toggle => {
const svg = toggle.querySelector('svg');
svg.innerHTML = eyeOpenSVG;
toggle.addEventListener('click', () => {
const input = toggle.parentElement.querySelector('input');
const isPassword = input.type === 'password';
input.type = isPassword ? 'text' : 'password';
svg.innerHTML = isPassword ? eyeClosedSVG : eyeOpenSVG;
toggle.setAttribute('aria-label', isPassword ? 'مخفی کردن رمز عبور' : 'نمایش رمز عبور');
});
});

function calculateStrength(password) {
let score = 0;
if (password.length >= 8) score++;
if (/[A-Z]/.test(password)) score++;
if (/[a-z]/.test(password)) score++;
if (/[0-9]/.test(password)) score++;
if (/[^A-Za-z0-9]/.test(password)) score++;
return score;
}

passwordInput.addEventListener('input', () => {
const strength = calculateStrength(passwordInput.value);
strengthBar.className = 'password-strength';
if (passwordInput.value.length === 0) return;
if (strength <= 1) strengthBar.classList.add('weak');
else if (strength === 2) strengthBar.classList.add('fair');
else if (strength === 3) strengthBar.classList.add('good');
else strengthBar.classList.add('strong');
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
e.preventDefault();
const password = document.getElementById('signup-password').value;
const confirm = document.getElementById('signup-confirm').value;
if (password !== confirm) {
alert('رمز عبورها یکسان نیستند');
return;
}
console.log('ثبت‌نام:', new FormData(e.target));
});

document.getElementById('login-form').addEventListener('submit', (e) => {
e.preventDefault();
console.log('ورود:', new FormData(e.target));
});
});