function AddUsers(users){
        const time = new Date()
        users.push({ index:users.length, time })
}

const generateTimeSlots = () => {
        const slots = []
        for (let i = 0; i < 24; i += 2) {
                slots.push({ 
                        start: i,
                        end: i + 2, 
                         count: 0
                })
        }
        return slots
}
function formatDataForChart(timeSlots) {
        return {
                labels: timeSlots.map(slot => `${slot.start}-${slot.end}`),
                data: timeSlots.map(slot => slot.count),
        }
}

function getUserActivityLast24Hours(users) {
        const now = new Date()
        const timeSlots = generateTimeSlots()

        users.forEach(({ time }) => {
                const diffInHours = (now - new Date(time)) / (1000 * 60 * 60)
                if (diffInHours <= 24) {
                        const hour = new Date(time).getHours()
                        const bucketIndex = Math.floor(hour / 2)
                        timeSlots[bucketIndex].count += 1
                }
        })

        let data = formatDataForChart(timeSlots)
        return data
}


export {
        AddUsers,
        getUserActivityLast24Hours,
}