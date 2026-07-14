// ==============================
// modal.js
// ==============================

const modal = document.getElementById("appointmentModal");
const bookBtn = document.getElementById("bookBtn");
const closeModalBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const appointmentForm = document.getElementById("appointmentForm");

// Current editing appointment ID
let editingAppointmentId = null;

// Open modal
function openModal() {
    modal.style.display = "flex";
}

// Close modal
function closeModal() {
    modal.style.display = "none";
    appointmentForm.reset();
    editingAppointmentId = null;
}

// Event Listeners
bookBtn.addEventListener("click", openModal);

closeModalBtn.addEventListener("click", closeModal);

cancelBtn.addEventListener("click", closeModal);

// Close modal when clicking outside
window.addEventListener("click", function (e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Save Appointment
appointmentForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const patientName = document.getElementById("patientName").value.trim();
    const doctorName = document.getElementById("doctorName").value.trim();
    const hospitalName = document.getElementById("hospitalName").value.trim();
    const specialty = document.getElementById("specialty").value.trim();
    const appointmentDate = document.getElementById("appointmentDate").value;
    const appointmentTime = document.getElementById("appointmentTime").value;
    const reason = document.getElementById("reason").value.trim();

    // Validation
    if (
        patientName === "" ||
        doctorName === "" ||
        hospitalName === "" ||
        specialty === "" ||
        appointmentDate === "" ||
        appointmentTime === "" ||
        reason === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    const appointment = {
        patientName,
        doctorName,
        hospitalName,
        specialty,
        appointmentDate,
        appointmentTime,
        reason
    };

    if (editingAppointmentId !== null) {

        appointment.id = editingAppointmentId;

        updateAppointment(appointment);

    } else {

        addAppointment(appointment);

    }

    closeModal();

    if (typeof renderAppointments === "function") {
        renderAppointments();
    }

    if (typeof renderCalendar === "function") {
        renderCalendar();
    }

});

// Edit Appointment
function editAppointment(id) {

    const appointment = getAppointmentById(id);

    if (!appointment) return;

    editingAppointmentId = appointment.id;

    document.getElementById("patientName").value = appointment.patientName;
    document.getElementById("doctorName").value = appointment.doctorName;
    document.getElementById("hospitalName").value = appointment.hospitalName;
    document.getElementById("specialty").value = appointment.specialty;
    document.getElementById("appointmentDate").value = appointment.appointmentDate;
    document.getElementById("appointmentTime").value = appointment.appointmentTime;
    document.getElementById("reason").value = appointment.reason;

    openModal();
}