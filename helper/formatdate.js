module.exports = {
    dateFormatter: (data) => {
        return data.toISOString().split('T')[0]
    }
}