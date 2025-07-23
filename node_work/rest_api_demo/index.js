const exprss = require('express');
const app = exprss();
const PORT = 3000;

//data
let users = [
    {id: 1, name: "Node.js"},
    {id: 2, name: "Express.js"},
    {id: 3, name: "JavaScript"},
];

//Middleware to parse JSON requests
app.use(exprss.json());
const path = require('path');
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// app.use(express.static(path.join(__dirname, 'public')));

//GET endpoint to retrieve all users
app.get('/users', (req, res) => {
    res.json(users);
});

//POST endpoint to add a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1; // Simple ID assignment
    users.push(newUser);
    res.status(201).json(newUser);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});