const express = require("express")
const nodemailer = require("nodemailer")
const app = express()

const router = express.Router()

require("dotenv").config()

app.use(express.json())

const transporter = nodemailer.createTransport({
    pool: true,
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
        user: "admin@gladcityhealthcare.co.uk",
        pass: process.env.WORD
    }
})

const Jobrouter = router.post('/jobapplication', async (req, res) => {
    // console.log(req.body)
    let message = {
        from: req.body.emailTo,
        to: req.body.emailTo,
        subject: "Job Application",
        // text: "test",
        attachments: [
            {
                filename: req.body.fileName,
                path: req.body.fileUrl
            }
        ],
        html: `<h2>New Job Application from ${req.body.name}</h2>
                </br>
                <p>First Name: ${req.body.firstName}</p> 
                <p>Last Name: ${req.body.lastName}</p>  
                <p>Email: ${req.body.email}</p>  
                <p>Phone Number: ${req.body.phone}</p> 
                <p>Additional Information: ${req.body.addInfo}</p>  
        `
    }

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log("Error " + err)
            res.status(500).json(err)
        } else {
            console.log("Email sent successfully")
            res.status(200).send('Email sent successfully')
        }
    })
})

const Inforouter = router.post('/info', async (req, res) => {
    // console.log(req.body)
    const transporter = nodemailer.createTransport({
        pool: true,
        host: process.env.HOST,
        port: 465,
        secure: true,
        auth: {
            user: "info@gladcityhealthcare.co.uk",
            pass: process.env.WORD
        }
    })

    let message = {
        from: req.body.emailTo,
        to: req.body.emailTo,
        subject: "Enquiries",
        // text: "test",
        html: `<h2>New Enquiry from ${req.body.name}</h2>
                </br>
                <p>Name: ${req.body.name}</p> 
                <p>Email: ${req.body.email}</p>  
                <p>Message: ${req.body.message}</p>  
        `
    }

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log("Error " + err)
            res.status(500).json(err)
        } else {
            console.log("Email sent successfully")
            res.status(200).send('Email sent successfully')
        }
    })
})

app.use('/', Jobrouter)
app.use('/', Inforouter)

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take messages")
    }
})