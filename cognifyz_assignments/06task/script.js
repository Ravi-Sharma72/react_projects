const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const formSuccess = document.getElementById("form-success");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;
  formSuccess.textContent = "";

  function setError(inputElement, errorElement, message) {
    inputElement.classList.add("input-error");
    errorElement.textContent = message;
    isValid = false;
  }

  function clearError(inputElement, errorElement) {
    inputElement.classList.remove("input-error");
    errorElement.textContent = "";
  }

  if (nameInput.value.trim() === "") {
    setError(nameInput, nameError, "Full name is required.");
  } else {
    clearError(nameInput, nameError);
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    setError(emailInput, emailError, "Email address is required.");
  } else if (!emailPattern.test(emailInput.value.trim())) {
    setError(emailInput, emailError, "Please enter a valid email address.");
  } else {
    clearError(emailInput, emailError);
  }

  if (passwordInput.value.length < 8) {
    setError(
      passwordInput,
      passwordError,
      "Password must be at least 8 characters long.",
    );
  } else {
    clearError(passwordInput, passwordError);
  }

  if (isValid) {
    formSuccess.textContent = "Form submitted successfully!";
    contactForm.reset();
  }
});
