const baseUrl = "http://localhost:8092/employees";

// Load employees on page load
window.onload = function () {
    loadEmployees();
};

// ADD EMPLOYEE
function addEmployee() {
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;

    fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            department: department
        })
    })
    .then(() => {
        loadEmployees();
        document.getElementById("name").value = "";
        document.getElementById("department").value = "";
    });
}

// GET ALL EMPLOYEES
function loadEmployees() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById("employeeTable");
            table.innerHTML = "";

            data.forEach(emp => {
                table.innerHTML += `
                    <tr>
                        <td>${emp.id}</td>
                        <td>${emp.name}</td>
                        <td>${emp.department}</td>
                        <td>
                            <button onclick="deleteEmployee(${emp.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

// DELETE EMPLOYEE
function deleteEmployee(id) {
    fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
    })
    .then(() => loadEmployees());
}
