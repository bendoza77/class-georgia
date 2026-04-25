const { getGroqStream } = require('../services/groqService')

async function handleChat(req, res) {
  const { messages } = req.body

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'A non-empty messages array is required.' })
  }

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')

  try {
    const stream = await getGroqStream(messages)

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || ''
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`)
      }
    }

    res.write('data: [DONE]\n\n')
  } catch (err) {
    console.error('[chat]', err.message)
    res.write(`data: ${JSON.stringify({ error: 'Failed to get AI response.' })}\n\n`)
  }

  res.end()
}

module.exports = { handleChat }
