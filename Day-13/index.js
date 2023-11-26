const express = require('express')
const path = require('path')
const app  = express()
const port = 5000

//sequelize config
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

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

app.get('/blog-page', viewproject)
app.post('/delete-blog/:id', deleteBlog)

app.get('/update-blog/:id', updateBlogs)
app.post('/update-blog', editBlogs)

// Dummy Data
const dummy = [
        {
            project_name : "Project 1",
            Durasi : "3 Bulan 10 Hari",
            start_date : "21/11/2023",
            end_date : "25/12/2023",
            technologies : ['Node Js', 'React Js', 'Next Js', 'Typescript'],
            description : "Muah Muah bla Bla",
            author : "Jodi Adrian",
            created_at : new Date(),
        }
]

//function for routing
function home (req, res) {
    res.render('index', {dummy})
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
    
    const form = {
        project_name,
        start_date,
        end_date,
        technologies,
        description
    }

    dummy.unshift(form)
    console.log(form)

    res.redirect('/blog-page')
}

function deleteBlog (req, res) {
    const {id} = req.params
    dummy.splice(id, 1) 

    res.redirect('/blog-page')
}

async function viewproject (req, res) {
    const query = 'SELECT * FROM blogs'
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    console.log("ini data di database", obj)
    
    res.render('blog-page', { dummy: obj })
}

function updateBlogs (req, res) {
    const {id} = req.params

    const dataFilter = dummy[parseInt(id)]
    dataFilter.id = parseInt(id)
    
    console.log("dataFilter", dataFilter)
    res.render('update-page', { filter: dataFilter })
}

function editBlogs (req, res) {
    const {project_name, start_date, end_date, technologies, description } = req.body
    
    const form = {
        project_name,
        start_date,
        end_date,
        technologies,
        description
    }
    
    res.redirect('/blog-page', {form})
}