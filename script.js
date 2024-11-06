// Room class
class Room {
    constructor(id, name, capacity) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.reservations = [];
    }

    isAvailable(date) {
        return !this.reservations.some(reservation => reservation.date === date);
    }

    addReservation(reservation) {
        this.reservations.push(reservation);
    }

    removeReservation(reservationId) {
        this.reservations = this.reservations.filter(reservation => reservation.id !== reservationId);
    }
}

// Reservation class
class Reservation {
    constructor(id, roomId, date, name) {
        this.id = id;
        this.roomId = roomId;
        this.date = date;
        this.name = name;
    }
}

// Initialize rooms
const rooms = [
    new Room(1, 'Conference Room', 25),
    new Room(2, 'Main Hall', 35),
    new Room(3, 'Meeting Room', 20),
    new Room(4, 'Continental Room', 20),
];

// Reservation ID counter
let reservationIdCounter = 1;

// Add new reservation
function addNewReservation(roomId, date, name) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) {
        alert("Room not found.");
        return;
    }

    if (!room.isAvailable(date)) {
        alert("Room is not available on the selected date.");
        return;
    }

    const newReservation = new Reservation(reservationIdCounter++, roomId, date, name);
    room.addReservation(newReservation);
    alert("Reservation added successfully.");
    renderReservations();
}

// Render rooms list
function renderRooms() {
    const roomList = document.getElementById('room-list');
    roomList.innerHTML = "<h3>Available Rooms</h3>";

    rooms.forEach(room => {
        const roomElement = document.createElement('div');
        roomElement.classList.add('room-card');
        roomElement.innerHTML = `
            <h5>${room.name}</h5>
            <p>Capacity: ${room.capacity}</p>
            <p>ID: ${room.id}</p>
        `;
        roomList.appendChild(roomElement);
    });
}

// Render reservations list
function renderReservations() {
    const reservationList = document.getElementById('reservation-list');
    reservationList.innerHTML = "<h3>Reservation List</h3>";

    rooms.forEach(room => {
        room.reservations.forEach(reservation => {
            const reservationElement = document.createElement('div');
            reservationElement.classList.add('reservation-card');
            reservationElement.innerHTML = `
                <p><strong>Room:</strong> ${room.name} | <strong>Date:</strong> ${reservation.date} | <strong>Name:</strong> ${reservation.name}</p>
            `;
            
            // Create cancel button
            const cancelButton = document.createElement('button');
            cancelButton.classList.add('cancel-btn');
            cancelButton.innerText = "Cancel";
            cancelButton.onclick = () => cancelReservation(reservation.id, room.id);
            reservationElement.appendChild(cancelButton);

            reservationList.appendChild(reservationElement);
        });
    });
}

// Cancel reservation
function cancelReservation(reservationId, roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
        room.removeReservation(reservationId);
        alert("Reservation cancelled.");
        renderReservations();
    } else {
        alert("Room not found.");
    }
}

// Handle form submission
function handleAddReservation() {
    const roomId = parseInt(document.getElementById('roomId').value);
    const date = document.getElementById('date').value;
    const name = document.getElementById('name').value;

    if (roomId && date && name) {
        addNewReservation(roomId, date, name);
    } else {
        alert("Please fill out all fields.");
    }
}

// Event listener for the form submission
document.getElementById('addReservationBtn').addEventListener('click', handleAddReservation);

// Initialize room and reservation render
renderRooms();
renderReservations();
