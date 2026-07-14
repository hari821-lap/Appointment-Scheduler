// ==============================
// calendar.js
// ==============================

const calendar = document.getElementById("calendar");
const currentMonth = document.getElementById("currentMonth");
const viewModeSelect = document.getElementById("viewMode");

const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const todayBtn = document.getElementById("todayBtn");

let currentDate = new Date();
let currentView = viewModeSelect ? viewModeSelect.value : "month";

function getViewLabel() {
    if (currentView === "day") {
        return currentDate.toLocaleDateString("default", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }
    return currentDate.toLocaleDateString("default", {
        month: "long",
        year: "numeric"
    });
}

// Render Calendar
function renderCalendar() {

    calendar.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    currentMonth.textContent = getViewLabel();

    const firstDay = new Date(year, month, 1).getDay();

    const totalDays = new Date(year, month + 1, 0).getDate();

    const today = new Date();

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {

        const empty = document.createElement("div");
        empty.classList.add("day");

        calendar.appendChild(empty);

    }

    const appointments = getAppointments();

    // Calendar Days
    for (let day = 1; day <= totalDays; day++) {

        const cell = document.createElement("div");
        cell.classList.add("day");

        const number = document.createElement("div");
        number.classList.add("day-number");
        number.innerText = day;

        cell.appendChild(number);

        // Highlight Today
        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            cell.classList.add("today");
        }

        // Date format YYYY-MM-DD
        const monthValue = String(month + 1).padStart(2, "0");
        const dayValue = String(day).padStart(2, "0");

        const fullDate = `${year}-${monthValue}-${dayValue}`;

        // Display appointments
        appointments.forEach(app => {

            if (app.appointmentDate === fullDate) {

                const event = document.createElement("div");

                event.classList.add("event");

                event.innerHTML = `
                    <strong>${app.appointmentTime}</strong><br>
                    ${app.patientName}<br>
                    Dr. ${app.doctorName}
                `;

                cell.appendChild(event);

            }

        });

        calendar.appendChild(cell);

    }

}

// Previous Month
prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

// Next Month
nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Today Button
todayBtn.addEventListener("click", () => {
    currentDate = new Date();
    renderCalendar();
});

if (viewModeSelect) {
    viewModeSelect.addEventListener("change", () => {
        currentView = viewModeSelect.value;
        renderCalendar();
    });
}
