const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTop');
const cookieBox = document.getElementById('cookieBox');
const acceptCookies = document.getElementById('acceptCookies');
const form = document.getElementById('registerForm');
const password = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  scrollTopBtn.classList.toggle('show', window.scrollY > 300);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

if (localStorage.getItem('cookiesAccepted') === 'yes') {
  cookieBox.classList.add('hide');
}

acceptCookies.addEventListener('click', () => {
  localStorage.setItem('cookiesAccepted', 'yes');
  cookieBox.classList.add('hide');
});

togglePassword.addEventListener('click', () => {
  const isHidden = password.type === 'password';
  password.type = isHidden ? 'text' : 'password';
  togglePassword.textContent = isHidden ? 'დამალვა' : 'ჩვენება';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const successMsg = document.getElementById('successMsg');
  let valid = true;

  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';
  successMsg.hidden = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  if (name.value.trim() === '') {
    document.getElementById('nameError').textContent = 'სახელი აუცილებელია';
    valid = false;
  }
  if (!emailRegex.test(email.value.trim())) {
    document.getElementById('emailError').textContent = 'შეიყვანე სწორი ელ-ფოსტა';
    valid = false;
  }
  if (!passwordRegex.test(password.value)) {
    document.getElementById('passwordError').textContent = 'პაროლი უნდა იყოს მინ. 8 სიმბოლო და შეიცავდეს ციფრს';
    valid = false;
  }
  if (valid) {
    successMsg.hidden = false;
    form.reset();
    password.type = 'password';
    togglePassword.textContent = 'ჩვენება';
  }
});

async function loadTours() {
  const tourList = document.getElementById('tourList');
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
    const data = await response.json();
    const names = ['კახეთის ტური', 'ყაზბეგის ტური', 'ბათუმის ტური'];

    tourList.innerHTML = data.map((item, index) => `
      <article class="card">
        <h3>${names[index]}</h3>
        <p>${item.body.slice(0, 90)}...</p>
      </article>
    `).join('');
  } catch (error) {
    tourList.innerHTML = '<p>მონაცემები ვერ ჩაიტვირთა.</p>';
  }
}

loadTours();
