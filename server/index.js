import express from 'express'
import cors from 'cors'
import { Server as socketIO} from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'
import { mock } from './utils/createBookings.js'
import { AddUsers, getUserActivityLast24Hours } from './utils/users.js'


dotenv.config({
        path:"./.env"
})

const PORT = process.env.PORT || 3000;
const bookings = []
let userConnected = 0
let users = []

const app = express()
const server = http.createServer(app)
const io = new socketIO(server)


// middlewares
app.use(cors())
app.use(express.static('public'))


// on server side we sent new booking after every 5 seconds
mock(bookings, io)

// api to get all bookings
app.get('/api/bookings',(req,res)=>{
        const page = parseInt(req.query.page) || process.env.CURRENT_PAGE || 1;
        const limit = parseInt(req.query.limit) || process.env.LIMIT || 10;
        const startIndex = (page - 1) * limit;
        const endIndex= page * limit;
        const paginatedData = bookings.slice(startIndex, endIndex);
        res.json({
                success:true,
                data:paginatedData,
                total : bookings.length,
        });
})

app.get('/api/test',(req,res)=>{
        res.json({
                success:true,
                message:"Server  is working fine"
        })
})

// socket connection
io.on('connection',(socket)=>{
        console.log("Client connected")
        userConnected++;

        AddUsers(users)
        let data = getUserActivityLast24Hours(users)

        io.emit('user-activity', data) 
        
        io.emit('user-connected', userConnected)
})


server.listen(PORT, () => {
        console.log(`Server is running on port : ${PORT} 👍`)
})