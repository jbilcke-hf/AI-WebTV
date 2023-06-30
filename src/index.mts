import express from 'express'

const app = express()
const port = 7860

app.use(express.static('public'))

app.listen(port, () => { console.log(`Open http://localhost:${port}`) })