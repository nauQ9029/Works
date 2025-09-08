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

// Sample data - Bạn có thể thay bằng dữ liệu thực tế của mình
const supplierData = [
    { name: "Richard Martin", contact: "7687764556", email: "richard@gmail.com", address: "123 Đường Hoa Hồng, Phường 7, Quận Phú Nhuận, TP. Hồ Chí Minh" },
    { name: "Tom Homan", contact: "9867545368", email: "tomhoman@gmail.com", address: "123 Đường Hoa Hồng, Phường 7, Quận Phú Nhuận, TP. Hồ Chí Minh" },
    { name: "Veandir", contact: "9867545566", email: "veandier@gmail.com", address: "123 Đường Hoa Hồng, Phường 7, Quận Phú Nhuận, TP. Hồ Chí Minh" },
    { name: "Jane Doe", contact: "1234567890", email: "jane@gmail.com", address: "456 Đường Xuân Thủy, TP. Hồ Chí Minh" },
    { name: "John Smith", contact: "9876543210", email: "john@gmail.com", address: "789 Đường Lê Lợi, TP. Hà Nội" },
    { name: "Richard Martin", contact: "7687764556", email: "richard@gmail.com", address: "123 Đường Hoa Hồng, Phường 7, Quận Phú Nhuận, TP. Hồ Chí Minh" },
    { name: "Tom Homan", contact: "9867545368", email: "tomhoman@gmail.com", address: "123 Đường Hoa Hồng, Phường 7, Quận Phú Nhuận, TP. Hồ Chí Minh" },
    { name: "Veandir", contact: "9867545566", email: "veandier@gmail.com", address: "123 Đường Hoa Hồng, Phường 7, Quận Phú Nhuận, TP. Hồ Chí Minh" },
    { name: "Jane Doe", contact: "1234567890", email: "jane@gmail.com", address: "456 Đường Xuân Thủy, TP. Hồ Chí Minh" },
    { name: "John Smith", contact: "9876543210", email: "john@gmail.com", address: "789 Đường Lê Lợi, TP. Hà Nội" },
    
    { name: "Richard Martin", contact: "7687764556", email: "richard@gmail.com", address: "123 Đường Hoa Hồng, Phường 7, Quận Phú Nhuận, TP. Hồ Chí Minh" },
    { name: "Tom Homan", contact: "9867545368", email: "tomhoman@gmail.com", address: "123 Đường Hoa Hồng, Phường 7, Quận Phú Nhuận, TP. Hồ Chí Minh" },
    { name: "Veandir", contact: "9867545566", email: "veandier@gmail.com", address: "123 Đường Hoa Hồng, Phường 7, Quận Phú Nhuận, TP. Hồ Chí Minh" },
    { name: "Veandir", contact: "9867545566", email: "veandier@gmail.com", address: "123 Đường Hoa Hồng, Phường 7, Quận Phú Nhuận, TP. Hồ Chí Minh" },
    { name: "Jane Doe", contact: "1234567890", email: "jane@gmail.com", address: "456 Đường Xuân Thủy, TP. Hồ Chí Minh" },
    { name: "John Smith", contact: "9876543210", email: "john@gmail.com", address: "789 Đường Lê Lợi, TP. Hà Nội" },
    { name: "Jane Doe", contact: "1234567890", email: "jane@gmail.com", address: "456 Đường Xuân Thủy, TP. Hồ Chí Minh" },
    { name: "John Smith", contact: "9876543210", email: "john@gmail.com", address: "789 Đường Lê Lợi, TP. Hà Nội" },
    { name: "Richard Martin", contact: "7687764556", email: "richard@gmail.com", address: "123 Đường Hoa Hồng, Phường 7, Quận Phú Nhuận, TP. Hồ Chí Minh" },
    { name: "Tom Homan", contact: "9867545368", email: "tomhoman@gmail.com", address: "123 Đường Hoa Hồng, Phường 7, Quận Phú Nhuận, TP. Hồ Chí Minh" },

    // Thêm vào đây cho đến khi đủ 30 phần tử chẳng hạn
    // ...
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
          <td>${supplierData[i].name}</td>
          <td>${supplierData[i].contact}</td>
          <td>${supplierData[i].email}</td>
          <td>${supplierData[i].address}</td>
          <td><button class="btn btn-outline-primary btn-sm"><i class="bi bi-pen"></i></button></td>
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