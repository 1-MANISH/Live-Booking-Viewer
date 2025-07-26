# 📊 Live Bookings Viewer

A lightweight, real-time web application built with **Vanilla JavaScript** and **Chart.js** that visualizes user join activity over the last 24 hours. The graph displays how many users joined the platform in 2-hour time slots.

---

## 🚀 Features

- 📈 **Real-time 
- ⏱️ Tracks users who joined in the last 24 hours
- 🕑 Divides time into 12 slots (each 2 hours)
- ⚡ Fast and minimal — no frameworks like React or Vue
- 💡 Easy to integrate into any booking, analytics, or dashboard platform

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Charting**: [Chart.js](https://www.chartjs.org/)
- **Backend**: Node.js or any server that provides user join timestamps + socket.io

---

## 📁 Folder Structure

-**LIVE BOOKINGS VIEWER**
        |---[public] (frontend)
                |----index.html
                |----style.css
                |----script.js
        |----[server]
                |----[utils]
                        |----createBookings.js
                        |----user.js
                |----sample.env(later u have  to change as.env)
                |----index.js(main)



---

## 🖥️ Getting Started (Run Locally)

### 1. Clone the Repository

```bash
                git clone "url"
                cd live-bookings-viewer
                npm i
                npm run dev

## 📌 Future Improvements

        -💾 Connect to backend DB (MongoDB, Redis) to persist users

        -📅 Filter by specific date ranges (last 7 days, custom)
