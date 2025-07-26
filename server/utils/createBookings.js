
import Randomstring from 'randomstring';

function mock(bookings, io) {
        setInterval(()=>{
                const booking = {
                        venueName: `${Randomstring.generate(5)}`,
                        partySize: Math.floor(Math.random() * 10) + 1,
                        time: new Date().toLocaleTimeString()
                }
                bookings.unshift(booking) 
                io.emit('new-booking', booking) // emit new booking to all connected clients
        },5000)
}

export {
        mock
}