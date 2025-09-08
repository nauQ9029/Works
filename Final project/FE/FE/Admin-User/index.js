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
    { ID: 1, name: "Richard Martin", contact: "7687764556", email: "richard@gmail.com", role: "Manager" },
    { ID: 2, name: "Anna Smith", contact: "7687764557", email: "anna@gmail.com", role: "Staff" },
    { ID: 4, name: "C", contact: "1234567890", email: "C@gmail.com", role: "Shipper" },
    { ID: 5, name: "B", contact: "0987654321", email: "B@gmail.com", role: "Block" },
    { ID: 1, name: "Richard Martin", contact: "7687764556", email: "richard@gmail.com", role: "Manager" },
    { ID: 2, name: "Anna Smith", contact: "7687764557", email: "anna@gmail.com", role: "Staff" },
    { ID: 4, name: "C", contact: "1234567890", email: "C@gmail.com", role: "Shipper" },
    { ID: 5, name: "B", contact: "0987654321", email: "B@gmail.com", role: "Block" },
    { ID: 1, name: "Richard Martin", contact: "7687764556", email: "richard@gmail.com", role: "Manager" },
    { ID: 2, name: "Anna Smith", contact: "7687764557", email: "anna@gmail.com", role: "Staff" },

    { ID: 4, name: "Richard Martin", contact: "1234567890", email: "C@gmail.com", role: "Shipper" },
    { ID: 5, name: "B", contact: "0987654321", email: "B@gmail.com", role: "Block" },
    { ID: 2, name: "Anna Smith", contact: "7687764557", email: "anna@gmail.com", role: "Staff" },
    { ID: 4, name: "C", contact: "1234567890", email: "C@gmail.com", role: "Shipper" },
    { ID: 5, name: "B", contact: "0987654321", email: "B@gmail.com", role: "Block" },
    { ID: 4, name: "C", contact: "1234567890", email: "C@gmail.com", role: "Shipper" },
    { ID: 5, name: "B", contact: "0987654321", email: "B@gmail.com", role: "Block" },
    { ID: 2, name: "Anna Smith", contact: "7687764557", email: "anna@gmail.com", role: "Staff" },
    { ID: 4, name: "C", contact: "1234567890", email: "C@gmail.com", role: "Shipper" },
    { ID: 5, name: "B", contact: "0987654321", email: "B@gmail.com", role: "Block" },
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
        // Màu cho các roles
        switch (supplierData[i].role) {
            case "Manager":
                typeColorClass = "text-primary";
                break;
            case "Staff":
                typeColorClass = "text-success";
                break;
            case "Shipper":
                typeColorClass = "text-info";
                break;
            case "Block":
                typeColorClass = "text-danger";
                break;
            default:
                typeColorClass = ""; // Class fallback
        }

        const row = `
        <tr>
          <td>${supplierData[i].ID}</td>
          <td>${supplierData[i].name}</td>
          <td>${supplierData[i].contact}</td>
          <td>${supplierData[i].email}</td>
          <td class="${typeColorClass}">${supplierData[i].role}</td>
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

    // Add click event for edit buttons
    document.querySelectorAll('.editBtn').forEach(button => {
        button.addEventListener('click', function () {
            const userIndex = this.getAttribute('data-index');
            const user = supplierData[userIndex];

            // Set modal input values
            document.getElementById('userName').value = user.name;
            document.getElementById('userContact').value = user.contact;
            document.getElementById('userEmail').value = user.email;
            document.getElementById('userRole').value = user.role;

            // Show modal
            const modal = new bootstrap.Modal(document.getElementById('editModal'));
            modal.show();
        });
    });

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
}

// Initial render
renderTable(currentPage);