const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/location', (req, res) => {
    const { latitude, longitude } = req.body;

    // Example of sending an email with the location
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your.email@example.com',
            pass: 'yourpassword'
        }
    });

    const mailOptions = {
        from: 'your.email@example.com',
        to: 'recipient@example.com',
        subject: 'New Location Data',
        text: `Latitude: ${latitude}, Longitude: ${longitude}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Location data received and email sent');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
