

const STORAGE_KEY = "appointments";


function getAppointments() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}


function saveAppointments(appointments) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}


function addAppointment(appointment) {

    const appointments = getAppointments();

    appointment.id = Date.now();

    appointments.push(appointment);

    saveAppointments(appointments);

}


function updateAppointment(updatedAppointment) {

    let appointments = getAppointments();

    appointments = appointments.map(item => {

        if (item.id === updatedAppointment.id) {
            return updatedAppointment;
        }

        return item;

    });

    saveAppointments(appointments);

}


function deleteAppointment(id) {

    let appointments = getAppointments();

    appointments = appointments.filter(item => item.id !== id);

    saveAppointments(appointments);

}


function getAppointmentById(id) {

    const appointments = getAppointments();

    return appointments.find(item => item.id === id);

}


function isStorageEmpty() {
    return getAppointments().length === 0;
}


function clearAppointments() {
    localStorage.removeItem(STORAGE_KEY);
}