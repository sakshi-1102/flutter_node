// const express = require('express');
// const  mysql = require('mysql')
// const cors = require('cors')



// const app = express()
// app.use(cors())

// const db = mysql.createConnection({
//   host: "localhost",
//   user: 'root',
//   password: 'Sakshi@123',
//   database: 'new_p'
// })


// app.get('/', (re, res)=> {
//   return res.json("From Backend Side");
// })

// // ... (existing code)

// app.get('/register', (req, res)=>{
//   const sql = "SELECT * FROM register";
//   db.query(sql, (err, data)=>{
//     if(err) return res.json(err);
//     return res.json(data); 
//   })
// })




// app.listen(8081, ()=>{
//   console.log("listening");
// })

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: 'Sakshi@123',
  database: 'new_p'
});

app.post('/login', [
  check('username').notEmpty().isString(),
  check('email').isEmail(),
  check('password').isLength({ min: 7 })
], (req, res) => {
  // Validate input data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  // Insert user data into the database
  const sql = "INSERT INTO login (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Database insertion error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Send a success response
    return res.status(200).json({ message: 'Registration successful' });
  });
});

const port = 8081;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});



