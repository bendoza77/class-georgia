const { getGroqResponse } = require('../services/groqService')

async function handleChat(req, res) {
  const { messages } = req.body

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'A non-empty messages array is required.' })
  }

  try {
    const reply = await getGroqResponse(messages)
    res.json({ reply })
  } catch (err) {
    console.error('[chat]', err.message)
    res.status(500).json({ error: 'Failed to get AI response.' })
  }
}

module.exports = { handleChat }
