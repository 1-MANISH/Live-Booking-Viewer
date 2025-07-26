const socket = io()
const bookingList = document.getElementById('booking-list')
const prevBtn = document.getElementById('prev-btn')
const nextBtn = document.getElementById('next-btn')
const pageNumbers = document.getElementById('page-numbers')
const totalBookingsSpan = document.getElementById('total-bookings')
const totalUsersSpan = document.getElementById('total-users')
const ctx = document.getElementById('userActivityChart').getContext('2d')

let currentPage = 1
const limit = 10
let totalBookings = 0
let totalUsersConnected = 0
let userChart

async function fetchBookings(page = 1) {
        const res = await fetch(`/api/bookings?page=${page}&limit=${limit}`)
        const json = await res.json()
        totalBookings = json.total
        renderBookings(json.data)
        renderPagination()
}

function renderBookings(bookings) {
        bookingList.innerHTML = ''
        bookings.forEach(booking => {
                const li = document.createElement('li')
                li.innerHTML = `Venue <strong>${booking.venueName}</strong> - Party of ${booking.partySize} at ${booking.time}`
                bookingList.appendChild(li)
        })
        totalBookingsSpan.innerText = `Total Bookings\n ${totalBookings}`;
}

function renderPagination() {
        const totalPages = Math.ceil(totalBookings / limit);
        pageNumbers.innerHTML = ''

        for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button')
                btn.innerText = i
                btn.disabled = i === currentPage
                btn.onclick = () => {
                        currentPage = i
                        fetchBookings(currentPage)
                };
                pageNumbers.appendChild(btn)
        }

        prevBtn.disabled = currentPage === 1
        nextBtn.disabled = currentPage === totalPages
}

function showChart(data) {

        if(userChart) 
                userChart.destroy()
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        userChart = new Chart(ctx, {
                type: 'line',
                data: {
                        labels: data.labels,
                        datasets: [{
                                label: 'Users joined in last 24 Hours',
                                data: data.data,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderWidth: 1
                        }]
                },
                options: {
                        scales: {
                                y: {
                                        beginAtZero: true
                                }
                        }
                }
        })

}

prevBtn.onclick = () => {
        if (currentPage > 1) {
                currentPage--
                fetchBookings(currentPage)
        }
}


nextBtn.onclick = () => {
        const totalPages = Math.ceil(totalBookings / limit)
        if (currentPage < totalPages) {
                currentPage++
                fetchBookings(currentPage)
        }
}



socket.on('new-booking', (booking) => {

        if (currentPage === 1) {
                fetchBookings(1);
        } else {
                console.log("New booking received but you're on another page.");
        }
});


socket.on('user-connected', (userCount) => {
        totalUsersConnected = userCount;
        totalUsersSpan.innerText = `Total Users Connected\n ${totalUsersConnected}`;
})

socket.on('user-activity', (data) => {
        console.log("User activity in the last 24 hours:", data);
        showChart(data);
})


fetchBookings(currentPage);
