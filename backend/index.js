const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/unisync', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => {
        console.error('Kuch To gadbadh Hai', err);
        process.exit(1);
    });

const userSchema = new mongoose.Schema({
    Name: String,
    Username: String,
    Email: String,
    Pass: String
});

const User = mongoose.model('Users', userSchema);

app.post('/register', (req, res) => {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !newPassword) {
        res.status(400).send({ message: 'Missing required fields' });
        return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({ Name, Username, Email, Pass: hashedPassword });
    user.save()
        .then(result => {
            res.send({ message: 'Registration successful' });
        })
        .catch(err => {
            res.status(500).send({ message: 'An Server Side Error Occured! Please Register Once Again' });
        });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ Username: username })
        .then(user => {
            if (!user) {
                res.status(401).send({ message: 'Invalid email or password' });
                return;
            }
            const isPasswordValid = bcrypt.compareSync(password, user.Pass);
            if (!isPasswordValid) {
                res.status(401).send({ message: 'Invalid email or password' });
                console.log('failed to login');
                return;
            }
            res.status(200).send({ message: 'Login successful' });
            console.log('Login Successful');
        })
        .catch(err => {
            res.status(500).send({ message: 'Error logging in' });
        });
});

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
