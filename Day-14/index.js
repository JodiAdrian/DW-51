const express = require('express')
const path = require('path')
const app  = express()
const port = 5000

//sequelize config
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const { Console } = require('console')
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
app.post('/contact-me', sendMessage)

app.get('/testimonial', testimonials)
app.get('/blog-detail/:id', blogdetail)

app.get('/blog', blogs)
app.post('/blog', addproject)

app.get('/blog-page', viewproject)
app.post('/delete-blog/:id', deleteBlog)

app.get('/update-blog/:id', updateView)
app.post('/update-blog', postUpdate)


//function for routing
function home (req, res) {
    res.render('index', {})
}

function contact (req, res) {
    res.render('contact-me')
}

function sendMessage (req, res) {
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

async function blogdetail (req, res) {
    const { id } = req.params

    const query = `SELECT * FROM blogs WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    res.render('blog-detail', { data: obj[0] })
}

function blogs (req, res) {
    res.render('blog')
}

async function addproject(req, res) {
    try {

        const image = "continental.jpg"
        const author = "Sukro"

        let {
            project_name,
            start_date,
            end_date,
            nodejs,
            nextjs,
            reactjs,
            typescript,
            description
        } = req.body

        let tech = {
            nodejs,
            nextjs,
            reactjs,
            typescript
        }
        let technologies = techArray(tech)

        const query = `INSERT INTO blogs(project_name, start_date, end_date, technologies, description, image, author, "created_at", "updated_at") VALUES ('${project_name}', '${start_date}', '${end_date}', ARRAY[${technologies}], '${description}', '${image}', '${author}', NOW(), NOW())`

        await sequelize.query(query, {type: QueryTypes.INSERT})

        res.redirect('/blog-page')

    } catch (err) {
        console.log(err);
    }
}

async function deleteBlog (req, res) {
    const {id} = req.params
    
    const query = `DELETE FROM blogs WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.DELETE })
    
    console.log("data berhasil delete", obj);

    res.redirect('/blog-page')
}

async function viewproject (req, res) {
    const query = 'SELECT * FROM blogs'
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    console.log("ini data di database", obj)
    
    res.render('blog-page', { obj })
}

async function updateView (req, res) {
    const {id} = req.params

    const query = `SELECT * FROM blogs WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    
    console.log("dataFilter", obj)

    res.render('update-page', { filter: obj[0] })
}

async function postUpdate (req, res) {
    const {id, project_name, start_date, end_date, technologies, description } = req.body
    
    const query = `UPDATE blogs SET project_name=${project_name},  start_date=${start_date}, end_date=${end_date}, technologies=${technologies}, description=${description}, image=${image} WHERE id=${id}`

    const obj = await sequelize.query(query, { type: QueryTypes.UPDATE })
    
    res.redirect('/blog-page', {obj})
}