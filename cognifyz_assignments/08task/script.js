// Interactive behavior for 08task
const colorBtn = document.getElementById("color-btn");
const fetchBtn = document.getElementById("fetch-btn");
const dataContainer = document.getElementById("data-container");

if (colorBtn) {
  colorBtn.addEventListener("click", () => {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    document.body.style.backgroundColor = randomColor;
  });
}

if (fetchBtn && dataContainer) {
  fetchBtn.addEventListener("click", async () => {
    fetchBtn.textContent = "Loading...";
    fetchBtn.disabled = true;
    dataContainer.innerHTML = "";

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Network response was not ok");
      const users = await res.json();

      const grid = document.createElement("div");
      grid.className = "cards-grid";

      users.slice(0, 6).forEach((user) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
					<h3 class="card-title">${user.name}</h3>
					<p class="card-meta"><strong>Email:</strong> ${user.email}</p>
					<p class="card-meta"><strong>Company:</strong> ${user.company.name}</p>
					<p class="card-meta"><strong>City:</strong> ${user.address.city}</p>
				`;
        grid.appendChild(card);
      });

      dataContainer.appendChild(grid);
    } catch (err) {
      dataContainer.innerHTML = '<p class="error">Failed to load data.</p>';
    } finally {
      fetchBtn.textContent = "Load User Data";
      fetchBtn.disabled = false;
    }
  });
}

// Small safety: log if core elements are missing
if (!colorBtn) console.warn("No #color-btn element found.");
if (!fetchBtn) console.warn("No #fetch-btn element found.");
if (!dataContainer) console.warn("No #data-container element found.");
