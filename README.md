# Appointment Scheduler

## Overview

Appointment Scheduler is a responsive web application built using **HTML, CSS, and JavaScript**. It allows users to schedule, edit, delete, search, and manage appointments through an interactive calendar interface. Appointment data is stored in the browser using **localStorage**, so it remains available after refreshing the page.

## Features

- Monthly calendar view
- Book new appointments
- Edit existing appointments
- Delete appointments
- Search by patient name
- Search by doctor name
- Filter by date or date range
- Responsive design for Desktop, Tablet, and Mobile
- Data persistence using localStorage
- Pure HTML, CSS, and JavaScript (No external libraries)

---

## Folder Structure

```
Appointment Scheduler/
│── index.html
│
├── css/
│   ├── style.css
│   └── responsive.css
│
├── js/
│   ├── storage.js
│   ├── modal.js
│   ├── calendar.js
│   ├── filter.js
│   └── app.js
│
└── assets/
    ├── icons/
    └── images/
```

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage

---

## Functionality

### Calendar
- Displays a monthly calendar.
- Navigate between months.
- Highlights the current date.
- Displays appointments on their scheduled dates.

### Appointment Management
- Create appointments.
- Edit appointment details.
- Delete appointments.
- Automatically update both the calendar and dashboard.

### Search & Filter
- Search by patient name.
- Search by doctor name.
- Filter appointments by date or date range.

### Data Storage
- Uses browser localStorage.
- Data persists after page refresh.

---

## Validation

The appointment form validates the following required fields:

- Patient Name
- Doctor Name
- Hospital Name
- Specialty
- Date
- Time
- Reason

---

## Responsive Design

The application is optimized for:

- Desktop
- Laptop
- Tablet
- Mobile

---

## How to Run

1. Download or clone the project.
2. Extract the project folder.
3. Open `index.html` in any modern web browser.

No installation or server is required.

---

## Future Improvements

- Dark mode
- Weekly and daily calendar views
- Appointment reminders
- Export appointments
- Backend database integration
- User authentication

---

## Author

Hari M    
