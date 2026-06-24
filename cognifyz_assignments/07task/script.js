
const colorBtn = document.getElementById('color-btn');

colorBtn.addEventListener('click', function() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = randomColor;
});


const fetchBtn = document.getElementById('fetch-btn');
const dataContainer = document.getElementById('data-container');

fetchBtn.addEventListener('click', async function() {
    fetchBtn.textContent = 'Loading...';
    fetchBtn.disabled = true;
    dataContainer.innerHTML = ''; 

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Network response was not ok');
        const users = await response.json();

        users.slice(0, 6).forEach(user => {
            const card = document.createElement('div');
            // Using Tailwind utility classes for the card design
            card.className = 'bg-white p-6 rounded-lg shadow-md border-l-4 border-secondary hover:-translate-y-2 transition transform duration-300';
            
            card.innerHTML = `
                <h3 class="text-xl font-bold text-primary mb-2">${user.name}</h3>
                <p class="text-sm text-gray-600 mb-1"><strong class="text-gray-800">Email:</strong> ${user.email}</p>
                <p class="text-sm text-gray-600 mb-1"><strong class="text-gray-800">Company:</strong> ${user.company.name}</p>
                <p class="text-sm text-gray-600"><strong class="text-gray-800">City:</strong> ${user.address.city}</p>
            `;
            dataContainer.appendChild(card);
        });
    } catch (error) {
        dataContainer.innerHTML = '<p class="text-red-500 col-span-full">Failed to load data.</p>';
    } finally {
        fetchBtn.textContent = 'Load User Data';
        fetchBtn.disabled = false;
    }
});


const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;
    formSuccess.textContent = '';
    
     
    function setError(input, errorEl, msg) {
        input.classList.add('border-red-500', 'bg-red-50');
        input.classList.remove('border-gray-300');
        errorEl.textContent = msg;
        isValid = false;
    }

    function clearError(input, errorEl) {
        input.classList.remove('border-red-500', 'bg-red-50');
        input.classList.add('border-gray-300');
        errorEl.textContent = '';
    }

     
    if (nameInput.value.trim() === '') {
        setError(nameInput, nameError, 'Full name is required.');
    } else {
        clearError(nameInput, nameError);
    }

   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (emailInput.value.trim() === '') {
        setError(emailInput, emailError, 'Email address is required.');
    } else if (!emailPattern.test(emailInput.value.trim())) {
        setError(emailInput, emailError, 'Please enter a valid email address.');
    } else {
        clearError(emailInput, emailError);
    }

    
    if (passwordInput.value.length < 8) {
        setError(passwordInput, passwordError, 'Password must be at least 8 characters long.');
    } else {
        clearError(passwordInput, passwordError);
    }

    if (isValid) {
        formSuccess.textContent = 'Form submitted successfully!';
        contactForm.reset(); 
    }
});