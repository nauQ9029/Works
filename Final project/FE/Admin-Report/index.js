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

const ctx = document.getElementById('profitChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        datasets: [
            {
                label: 'Revenue',
                data: [20000, 30000, 60000, 50000, 55000, 40000, 60000],
                borderColor: 'green',
                fill: false,
            },
            {
                label: 'Profit',
                data: [15000, 25000, 50000, 45000, 50000, 35000, 55000],
                borderColor: 'orange',
                fill: false,
            },
        ],
    },
});
