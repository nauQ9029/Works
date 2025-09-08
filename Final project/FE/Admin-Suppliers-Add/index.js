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
    { name: "Richard Martin", product: "A", contact: "7687764556", email: "richard@gmail.com", type: "Đang trả hàng", OTW: 13 },
    { name: "Tom Homan", product: "B", contact: "9867545368",email: "john@gmail.com", type: "Đang trả hàng", OTW: 0 },
    { name: "Veandir", product: "B", contact: "9867545566", email: "veandier@gmail.com", type: "Không trả hàng", OTW: 9 },
    { name: "Richard Martin", product: "A", contact: "7687764556", email: "richard@gmail.com", type: "Đang trả hàng", OTW: 13 },
    { name: "Tom Homan", product: "B", contact: "9867545368",email: "john@gmail.com", type: "Đang trả hàng", OTW: 0 },
    { name: "Veandir", product: "B", contact: "9867545566", email: "veandier@gmail.com", type: "Không trả hàng", OTW: 9 },
    { name: "Richard Martin", product: "A", contact: "7687764556", email: "richard@gmail.com", type: "Đang trả hàng", OTW: 13 },
    { name: "Tom Homan", product: "B", contact: "9867545368",email: "john@gmail.com", type: "Đang trả hàng", OTW: 0 },
    { name: "Veandir", product: "B", contact: "9867545566", email: "veandier@gmail.com", type: "Không trả hàng", OTW: 9 },
    { name: "John Smith", product: "C", contact: "9876543210", email: "john@gmail.com", type: "Không trả hàng", OTW: 9 },

    { name: "Veandir", product: "B", contact: "9867545566", email: "veandier@gmail.com", type: "Không trả hàng", OTW: 9 },
    { name: "Richard Martin", product: "A", contact: "7687764556", email: "richard@gmail.com", type: "Đang trả hàng", OTW: 13 },
    { name: "Tom Homan", product: "B", contact: "9867545368", email: "john@gmail.com", type: "Đang trả hàng", OTW: 0 },
    { name: "Veandir", product: "B", contact: "9867545566", email: "veandier@gmail.com", type: "Không trả hàng", OTW: 9 },
    { name: "John Smith", product: "C", contact: "9876543210", email: "john@gmail.com", type: "Không trả hàng", OTW: 9 },
    { name: "Richard Martin", product: "A", contact: "7687764556", email: "richard@gmail.com", type: "Đang trả hàng", OTW: 13 },
    { name: "Tom Homan", product: "B", contact: "9867545368", email: "veandier@gmail.com", type: "Đang trả hàng", OTW: 0 },
    { name: "Veandir", product: "B", contact: "9867545566", email: "veandier@gmail.com", type: "Không trả hàng", OTW: 9 },
    { name: "Richard Martin", product: "A", contact: "7687764556", email: "richard@gmail.com", type: "Đang trả hàng", OTW: 13 },
    { name: "Tom Homan", product: "B", contact: "9867545368", email: "john@gmail.com", type: "Đang trả hàng", OTW: 0 },
];

const rowsPerPage = 11;
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
        const typeColorClass = supplierData[i].type === "Đang trả hàng" ? "text-success" : "text-danger";
        const row = `
        <tr>
          <td>${supplierData[i].name}</td>
          <td>${supplierData[i].product}</td>
          <td>${supplierData[i].contact}</td>
          <td>${supplierData[i].email}</td>
          <td class="${typeColorClass}">${supplierData[i].type}</td>
          <td>${supplierData[i].OTW}</td>
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

// Mở modal khi nhấn vào nút "Tạo mới"
document.querySelector('.btn.btn-success.mb-4').addEventListener('click', function () {
    var newSupplierModal = new bootstrap.Modal(document.getElementById('newSupplierModal'), {
        keyboard: false
    });
    newSupplierModal.show();
});

// Nút "Chỉnh sửa"
document.querySelector('.btn.btn-light.mb-4').addEventListener('click', function () {
    var newSupplierModal = new bootstrap.Modal(document.getElementById('editSupplierModal'), {
        keyboard: false
    });
    newSupplierModal.show();
});

// Initial render
renderTable(currentPage);