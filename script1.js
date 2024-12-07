filterButton.addEventListener("click", () => {
    const filterDate = filterDateInput.value;
    loadAttendanceRecords(filterDate);
});

resetFilterButton.addEventListener("click", () => {
    filterDateInput.value = "";
    loadAttendanceRecords();
});

function saveRecord(record) {
    let records = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
    records.push(record);
    localStorage.setItem("attendanceRecords", JSON.stringify(records));
}

function loadAttendanceRecords(filterDate = "") {
    attendanceTableBody.innerHTML = "";
    const records = JSON.parse(localStorage.getItem("attendanceRecords")) || [];

    records.forEach(record => {
        const recordDate = new Date(record.date).toISOString().split('T')[0];
        if (filterDate && recordDate !== filterDate) return;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.name}</td>
            <td>${recordDate}</td>
            <td>${record.status}</td>
            <td class="actions">
                <button class="edit-btn" data-id="${record.id}">Edit</button>
                <button class="delete-btn" data-id="${record.id}">Delete</button>
            </td>
        `;
        attendanceTableBody.appendChild(row);
    });

    // Attach event listeners for edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => {
            editRecord(button.getAttribute('data-id'));
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            deleteRecord(button.getAttribute('data-id'));
        });
    });
}

// Function to edit a record
function editRecord(id) {
    const records = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
    const recordToEdit = records.find(record => record.id === parseInt(id));
    
    if (recordToEdit) {
        document.getElementById("studentName").value = recordToEdit.name;
        document.getElementById("attendanceDate").value = recordToEdit.date;
        document.getElementById("attendanceStatus").value = recordToEdit.status;
        deleteRecord(id); // Remove the record after loading it for editing
    }
}

// Function to delete a record
function deleteRecord(id) {
    let records = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
    records = records.filter(record => record.id !== parseInt(id));
    localStorage.setItem("attendanceRecords", JSON.stringify(records));
    loadAttendanceRecords(); // Reload the records
}