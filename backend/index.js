const connectToMongo = require('./db');
const express = require('express') 
var cors = require('cors')

connectToMongo();

//express code gets request ----------
const app = express()
const port = 5000

app.use(cors())
app.use(express.json()); //middleware to  use req body--


//available routes
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/api/v1/login', (req, res) => {
//   res.send(' You are on login Page!')
// })

// app.get('/api/v1/signup', (req, res) => {
//   res.send(' You are on signup Page!')
// })



app.listen(port, () => {
  console.log(` iNOTEBOOK backend is listening on port http://localhost:${port}`)
})

