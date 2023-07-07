import express from 'express'

const app = express()
const port = 7860

app.use(express.static('public'))

app.get('/stats', async (req, res) => {
  try { 
    const results = await fetch(process.env.WEBTV_MEDIA_SERVER_API_URL)
    const json = await results.json()
    const response = Object.entries(json.live).reduce((acc, [key, channel]) => ({
      ...acc,
      [key]: (channel as any).subscribers.length
    }), {})
    res.write(JSON.stringify(response))
    res.end()
  } catch (err) {
    res.write(JSON.stringify({}))
    res.end()
  }
})

app.listen(port, () => { console.log(`Open http://localhost:${port}`) })