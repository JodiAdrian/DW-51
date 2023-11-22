const express = require('express')
const path = require('path')
const app  = express()
const port = 5000

//set up hbs
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

//set up assets
app.use('/assets', express.static('src/assets'))

// parsing data from client
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
    console.log("App listening on port 5000")
})

//routing
app.get('/', home)
app.get('/contact-me', contact)
app.post('/contact-me', sendmessage)
app.get('/testimonial', testimonials)
app.get('/blog-detail/:id', blogdetail)
app.get('/blog', blogs)
app.post('/blog', addproject)
app.get('/blog-page', postproject)


//function for routing
function home (req, res) {
    const card = [
        {
            title : "Buah Batu",
            duration : "1 Bulan 17 Hari", 
            technologies : "NodeJs",
            Description : "Muah Muah bla Bla"
        },
        {
            title : "Jakarta Fair",
            duration : "1 Bulan 1 Hari", 
            technologies : "TypeScript",
            Description : "jakarta banyak acara dah"
        },
        {
            title : "Darunnajah",
            duration : "3 Bulan 10 Hari", 
            technologies : "ReactJs",
            Description : "Ulujami Jakarta Selatan"
        }
    ]
    res.render('index', {card})
}

function contact (req, res) {
    res.render('contact-me')
}

function sendmessage (req, res) {
    const { nama, email, phone, role, pesan } = req.body
    console.log(nama)
    console.log(email)
    console.log(phone)
    console.log(role)
    console.log(pesan)
}

function testimonials (req, res) {
    res.render('testimonial')
}

function blogdetail (req, res) {
    const {id} = req.params
    const data = {
        id,
        Author: "Jodi Adrian",
        project_name: "Saya Suka susu",
        start_date: "08/11/2023",
        end_date: "25/12/2023",
        description: "loren daren keren jeren beren"
    }
    res.render('blog-detail', {data})
}

function blogs (req, res) {
    res.render('blog')
}

function addproject (req, res) {
    const {project_name, start_date, end_date, technologies, description } = req.body
    console.log(project_name)
    console.log(start_date)
    console.log(end_date)
    console.log(technologies)
    console.log(description)
}

function postproject (req, res) {
    const data = [
        {
            title : "buah naga",
            Author : "Jodi Adrian",
            Durasi : "3 Bulan 10 Hari",
            Technologies : "NodeJs",
            Description : "Muah Muah bla Bla"
        },
        {
            title : "Darunnajah",
            Author : "Jodi Adrian",
            Durasi : "5 Bulan 10 Hari",
            Technologies : "NextJs",
            Description : "Ulujami Jakarta Selatan"
        }
    ]
    res.render('blog-page', { data })
}