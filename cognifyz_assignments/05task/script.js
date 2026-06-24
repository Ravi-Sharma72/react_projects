const fetchBtn = document.getElementById("fetch-btn");
const dataContainer = document.getElementById("data-container");

fetchBtn.addEventListener("click", async function () {
  fetchBtn.textContent = "Loading...";
  fetchBtn.disabled = true;
  dataContainer.innerHTML = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();

    users.slice(0, 6).forEach((user) => {
      const card = document.createElement("div");
      card.classList.add("data-card");
      card.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
                <p><strong>City:</strong> ${user.address.city}</p>
            `;

      dataContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    dataContainer.innerHTML =
      '<p style="color: red;">Failed to load data. Please check your connection and try again.</p>';
  } finally {
    fetchBtn.textContent = "Load User Data";
    fetchBtn.disabled = false;
  }
});
