// Load header
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

// Load sidebar
fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar').innerHTML = data;
    });

// Sample data
const supplierData = [
    { ID: 1, name: "Maggi", inDate: "11/12/22", cost: "430", quantity: "43 Gói" },
    { ID: 2, name: "Bru", inDate: "8/12/22", cost: "500", quantity: "22 Gói" },
    { ID: 4, name: "C", inDate: "5/12/22", cost: "600", quantity: "36 Gói" },
    { ID: 5, name: "B", inDate: "8/12/22", cost: "502", quantity: "14 Gói" },
    { ID: 1, name: "Maggi", inDate: "11/12/22", cost: "430", quantity: "43 Gói" },
    { ID: 2, name: "Bru", inDate: "8/12/22", cost: "500", quantity: "22 Gói" },
    { ID: 4, name: "C", inDate: "5/12/22", cost: "600", quantity: "36 Gói" },
    { ID: 5, name: "B", inDate: "8/12/22", cost: "502", quantity: "14 Gói" },
    { ID: 1, name: "Maggi", inDate: "11/12/22", cost: "430", quantity: "43 Gói" },
    { ID: 2, name: "Bru", inDate: "8/12/22", cost: "500", quantity: "22 Gói" },
    
    { ID: 4, name: "C", inDate: "5/12/22", cost: "600", quantity: "36 Gói" },
    { ID: 5, name: "B", inDate: "8/12/22", cost: "502", quantity: "14 Gói" },
    { ID: 1, name: "Maggi", inDate: "11/12/22", cost: "430", quantity: "43 Gói" },
    { ID: 2, name: "Bru", inDate: "8/12/22", cost: "500", quantity: "22 Gói" },
    { ID: 4, name: "C", inDate: "5/12/22", cost: "600", quantity: "36 Gói" },
    { ID: 1, name: "Maggi", inDate: "11/12/22", cost: "430", quantity: "43 Gói" },
    { ID: 2, name: "Bru", inDate: "8/12/22", cost: "500", quantity: "22 Gói" },
    { ID: 4, name: "C", inDate: "5/12/22", cost: "600", quantity: "36 Gói" },
    { ID: 5, name: "B", inDate: "8/12/22", cost: "502", quantity: "14 Gói" },
    { ID: 1, name: "Maggi", inDate: "11/12/22", cost: "430", quantity: "43 Gói" },
    
    { ID: 2, name: "Bru", inDate: "8/12/22", cost: "500", quantity: "22 Gói" },
    { ID: 4, name: "C", inDate: "5/12/22", cost: "600", quantity: "36 Gói" },
    { ID: 5, name: "B", inDate: "8/12/22", cost: "502", quantity: "14 Gói" },
    { ID: 2, name: "Bru", inDate: "8/12/22", cost: "500", quantity: "22 Gói" },
    { ID: 4, name: "C", inDate: "5/12/22", cost: "600", quantity: "36 Gói" },
    { ID: 5, name: "B", inDate: "8/12/22", cost: "502", quantity: "14 Gói" },
    { ID: 2, name: "Bru", inDate: "8/12/22", cost: "500", quantity: "22 Gói" },
    { ID: 4, name: "C", inDate: "5/12/22", cost: "600", quantity: "36 Gói" },
    { ID: 5, name: "B", inDate: "8/12/22", cost: "502", quantity: "14 Gói" },
    { ID: 4, name: "C", inDate: "5/12/22", cost: "600", quantity: "36 Gói" },
];

const rowsPerPage = 10;
let currentPage = 1;
const totalPages = Math.ceil(supplierData.length / rowsPerPage);

function renderTable(page) {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, supplierData.length);
    const tableBody = document.querySelector("tbody");

    // Clear previous data
    tableBody.innerHTML = "";

    // Add new rows
    for (let i = startIndex; i < endIndex; i++) {
        const row = `
        <tr>
          <td>${supplierData[i].ID}</td>
          <td>${supplierData[i].name}</td>
          <td>${supplierData[i].inDate}</td>
          <td>${supplierData[i].cost}</td>
          <td>${supplierData[i].quantity}</td>
          <td>
            <button class="btn btn-outline-primary btn-sm editBtn" data-index="${i}">
                <i class="bi bi-pen"></i>
            </button>
            <button class="btn btn-outline-dark btn-sm"><i class="bi bi-eye"></i></button>
          </td>
        </tr>
      `;
        tableBody.insertAdjacentHTML("beforeend", row);
    }

    // Update page info
    document.getElementById("pageInfo").innerText = `Page ${page} of ${totalPages}`;

    // Enable/Disable buttons
    document.getElementById("prevBtn").disabled = page === 1;
    document.getElementById("nextBtn").disabled = page === totalPages;
}

// Event listeners for pagination buttons
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable(currentPage);
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderTable(currentPage);
    }
});

// Initial render
renderTable(currentPage);
