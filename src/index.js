import express from "express"
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
    console.log("A app deploy into ubuntu server")
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
