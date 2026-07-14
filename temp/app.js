// ==============================
// app.js
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    renderCalendar();
    renderAppointments();
    initSidebarResize();
    initViewToggle();
});

function initViewToggle() {
    const calendarMenu = document.getElementById("calendarMenu");
    const dashboardMenu = document.getElementById("dashboardMenu");
    const calendarSection = document.getElementById("calendarSection");
    const dashboardSection = document.getElementById("dashboardSection");
    const calendarControls = document.querySelector(".calendar-controls");

    if (!calendarMenu || !dashboardMenu || !calendarSection || !dashboardSection) return;

    const switchView = (view) => {
        if (view === "calendar") {
            calendarSection.classList.remove("hidden");
            dashboardSection.classList.add("hidden");
            if (calendarControls) calendarControls.classList.remove("hidden");
            calendarMenu.classList.add("active");
            dashboardMenu.classList.remove("active");
            renderCalendar();
        } else {
            calendarSection.classList.add("hidden");
            dashboardSection.classList.remove("hidden");
            if (calendarControls) calendarControls.classList.add("hidden");
            calendarMenu.classList.remove("active");
            dashboardMenu.classList.add("active");
            renderAppointments();
        }
    };

    calendarMenu.addEventListener("click", () => switchView("calendar"));
    dashboardMenu.addEventListener("click", () => switchView("dashboard"));
}

function initSidebarResize() {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("sidebarToggle");
    const resizer = document.getElementById("sidebarResizer");
    if (!sidebar || !toggleBtn || !resizer) return;

    let isResizing = false;
    let startX = 0;
    let startWidth = 0;

    const contentWrapper = document.querySelector(".content-wrapper");
    const toggleIcon = toggleBtn.querySelector(".menu-icon");

    const updateToggleIcon = () => {
        if (!toggleIcon) return;
        if (sidebar.classList.contains("collapsed")) {
            toggleIcon.src = "assets/side_bar_grow_icon.svg";
            toggleIcon.alt = "Expand sidebar";
        } else {
            toggleIcon.src = "assets/side_bar_reduce.svg";
            toggleIcon.alt = "Collapse sidebar";
        }
    };

    updateToggleIcon();

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        if (sidebar.classList.contains("collapsed")) {
            sidebar.style.width = "70px";
            contentWrapper?.classList.add("sidebar-collapsed");
        } else {
            sidebar.style.width = "240px";
            contentWrapper?.classList.remove("sidebar-collapsed");
        }
        updateToggleIcon();
    });

    resizer.addEventListener("mousedown", (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = sidebar.offsetWidth;
        resizer.classList.add("active");
        document.body.style.cursor = "col-resize";
        e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
        if (!isResizing) return;
        const delta = e.clientX - startX;
        const width = Math.max(70, Math.min(500, startWidth + delta));
        sidebar.style.width = width + "px";
        sidebar.classList.remove("collapsed");
        contentWrapper?.classList.remove("sidebar-collapsed");
    });

    document.addEventListener("mouseup", () => {
        if (!isResizing) return;
        isResizing = false;
        resizer.classList.remove("active");
        document.body.style.cursor = "";
    });
}