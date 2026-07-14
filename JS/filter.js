// ==============================
// filter.js
// ==============================

const patientSearch = document.getElementById("patientSearch");
const doctorSearch = document.getElementById("doctorSearch");
const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");
const filterBtn = document.getElementById("filterBtn");
const appointmentTable = document.getElementById("appointmentTable");

// Render Appointment Table
function renderAppointments() {

    let appointments = getAppointments();

    const patientValue = patientSearch.value.toLowerCase().trim();
    const doctorValue = doctorSearch.value.toLowerCase().trim();
    const fromValue = fromDate.value;
    const toValue = toDate.value;

    // Patient Search
    if (patientValue !== "") {
        appointments = appointments.filter(app =>
            app.patientName.toLowerCase().includes(patientValue)
        );
    }

    // Doctor Search
    if (doctorValue !== "") {
        appointments = appointments.filter(app =>
            app.doctorName.toLowerCase().includes(doctorValue)
        );
    }

    // Date Filter
    if (fromValue !== "") {
        appointments = appointments.filter(app =>
            app.appointmentDate >= fromValue
        );
    }

    if (toValue !== "") {
        appointments = appointments.filter(app =>
            app.appointmentDate <= toValue
        );
    }

    appointmentTable.innerHTML = "";

   

    appointments.forEach(app => {

        appointmentTable.innerHTML += `
            <tr>

                <td>${app.patientName}</td>

                <td>${app.doctorName}</td>

                <td>${app.hospitalName}</td>

                <td>${app.specialty}</td>

                <td>${app.appointmentDate}</td>

                <td>${app.appointmentTime}</td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        onclick="editAppointment(${app.id})"
                        title="Edit appointment">

                        <img src="assets/carbon_edit.svg" alt="Edit">

                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="removeAppointment(${app.id})"
                        title="Delete appointment">

                        <img src="assets/material-symbols_delete-outline.svg" alt="Delete">

                    </button>

                </td>

            </tr>
        `;

    });

    appendEmptyRows();
}

function appendEmptyRows() {
    const container = document.querySelector('.table-container');
    const table = container?.querySelector('table');
    const tbody = appointmentTable;

    if (!container || !table || !tbody) return;

    const headerHeight = table.querySelector('thead')?.offsetHeight || 0;
    const containerHeight = container.clientHeight;
    const rowHeight = 58;
    const currentRows = tbody.querySelectorAll('tr').length;
    const targetRows = Math.max(0, Math.ceil((containerHeight+50 - headerHeight) / rowHeight));
    const emptyRows = Math.max(0, targetRows - currentRows + 1);

    for (let i = 0; i < emptyRows-4; i++) {
        appointmentTable.innerHTML += `
            <tr class="empty-row">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
             <tr class="empty-row">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            
            
        `;
    }
}

// Delete Appointment
function removeAppointment(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this appointment?"
    );

    if (!confirmDelete) return;

    deleteAppointment(id);

    renderAppointments();

    renderCalendar();

}

// Search Events
patientSearch.addEventListener("input", renderAppointments);

doctorSearch.addEventListener("input", renderAppointments);

filterBtn.addEventListener("click", renderAppointments);

fromDate.addEventListener("change", renderAppointments);

toDate.addEventListener("change", renderAppointments);