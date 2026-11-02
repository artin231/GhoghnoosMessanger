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

passwordToggles.forEach(toggle => {
const icon = toggle.querySelector('.bi');
toggle.addEventListener('click', () => {
const input = toggle.parentElement.querySelector('input');
const isPassword = input.type === 'password';
input.type = isPassword ? 'text' : 'password';
icon.classList.toggle('bi-eye', !isPassword);
icon.classList.toggle('bi-eye-slash', isPassword);
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

function notify(type, title, message) {
if (window.Eggy) {
window.Eggy({ type, title, message });
} else {
console.log(type, title, message);
}
}

function setBusy(btn, busy) {
btn.disabled = busy;
if (busy) {
if (!btn.dataset.label) btn.dataset.label = btn.textContent;
btn.textContent = 'لطفاً صبر کنید';
} else {
btn.textContent = btn.dataset.label;
}
}

async function request(endpoint, payload) {
const res = await fetch(endpoint, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
let data = {};
try {
data = await res.json();
} catch (e) {
data = {};
}
return { ok: res.ok, status: res.status, data };
}

document.getElementById('signup-form').addEventListener('submit', async (e) => {
e.preventDefault();
const form = e.target;
const firstName = form.firstName.value.trim();
const lastName = form.lastName.value.trim();
const name = `${firstName} ${lastName}`.trim();
if (!name) {
notify('error', 'خطا', 'نام و نام خانوادگی را وارد کنید');
return;
}
const password = form.password.value;
const confirm = form.confirmPassword.value;
if (password !== confirm) {
notify('error', 'خطا', 'رمز عبورها یکسان نیستند');
return;
}
const btn = form.querySelector('button[type=submit]');
setBusy(btn, true);
try {
const { ok, data } = await request('/api/user/signup', {
username: form.username.value,
name,
email: form.email.value,
password,
});
if (ok) {
notify('success', 'ثبت‌نام موفق', 'حساب شما ساخته شد، اکنون می‌توانید وارد شوید');
form.reset();
strengthBar.className = 'password-strength';
const loginTab = document.querySelector('.auth-tab[data-tab=login]');
loginTab.click();
} else {
notify('error', 'خطا', data.error || 'خطایی رخ داد');
}
} catch (err) {
notify('error', 'خطا', 'اتصال به سرور برقرار نشد');
} finally {
setBusy(btn, false);
}
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
e.preventDefault();
const form = e.target;
const btn = form.querySelector('button[type=submit]');
setBusy(btn, true);
try {
const { ok, data } = await request('/api/user/login', {
email: form.email.value,
password: form.password.value,
});
if (ok) {
notify('success', 'ورود موفق', 'با موفقیت وارد شدید');
} else {
notify('error', 'خطا', data.error || 'خطایی رخ داد');
}
} catch (err) {
notify('error', 'خطا', 'اتصال به سرور برقرار نشد');
} finally {
setBusy(btn, false);
}
});
});