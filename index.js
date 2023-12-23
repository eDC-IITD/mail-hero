import express from 'express'
const app = express()

import cors from 'cors'
app.use(cors())
app.use(express.json())

// Send Mail api
import sendMail from './sendMail.js'
app.use('/api/sendMail', sendMail)

// Sending Client Files
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'client')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
