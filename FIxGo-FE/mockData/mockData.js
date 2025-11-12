// mockData.ts

// dynamic metric values only
export const metrics = {
    completed: 142,
    processing: 23,
    canceled: 8,
    revenue: 12.5, // in Tr (triệu VND)
    revenueChange: 18,
    completedChange: 12,
    processingChange: 5,
    canceledChange: -3,
};

export const revenueChart = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
    datasets: [{ data: [8, 9, 10, 12, 13.5, 13] }],
};

export const statusPie = {
    completed: 142,
    processing: 23,
    canceled: 8,
};

export const jobs = [
    {
        id: "JOB-001",
        statusType: "done",
        time: "2h trước",
        title: "Thay dầu",
        car: "Toyota Camry 2020 - John Smith",
        price: 85000,
    },
    {
        id: "JOB-002",
        statusType: "process",
        time: "Bắt đầu 1h trước",
        title: "Thay thiết bị",
        car: "Honda Civic 2019 - Sarah Johnson",
        price: 150000,
    },
    {
        id: "JOB-003",
        statusType: "cancel",
        time: "Hôm qua",
        title: "Sửa xe",
        car: "Ford F-150 2018 - Mike Davis",
        price: 300000,
    },
    {
        id: "JOB-004",
        statusType: "done",
        time: "Hôm qua",
        title: "Thay lốp",
        car: "BMW X3 2021 - Lisa Wilson",
        price: 30000,
    },
];
