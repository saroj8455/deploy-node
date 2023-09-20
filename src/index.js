import express from "express"
const app = express()
const port = 3000


app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message:"OK , API check done"
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
