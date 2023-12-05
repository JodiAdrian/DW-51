const express = require('express')
const path = require('path')
const app  = express()
const port = 5000

//sequelize config
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const { Console } = require('console')
const sequelize = new Sequelize(config.development)

//import
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const upload = require('./src/middleware/uploadFile')

//set up hbs
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

//set up assets
app.use('/assets', express.static('src/assets'))
app.use('/uploads', express.static('src/uploads'))

// parsing data from client
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
    console.log("App listening on port 5000")
})

// setup flash
app.use(flash())

// setup session express
app.use(session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 2
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: 'JodiAdrian'
  })
)

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/login'); 
      }
    });
  });

//routing
app.get('/', home)

app.get('/contact-me', contact)
app.post('/contact-me', sendMessage)

app.get('/testimonial', testimonials)
app.get('/blog-detail/:id', blogdetail)

app.get('/blog', blogs)
app.post('/blog', upload.single("image"), addproject)

app.get('/blog-page', viewproject)
app.post('/delete-blog/:id', deleteBlog)

app.get('/update-blog/:id', updateView)
app.post('/update-blog', postUpdate)

app.get('/login', formLogin)
app.post('/login', userLogin)
app.get('/register', formRegister)
app.post('/register', addUser)


//function for routing
async function home (req, res) {
    const id =  1

    const query = `SELECT * FROM blogs WHERE id=${id}`
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log("ini data profile", obj);

    const isLogin = req.session.isLogin
    const user = req.session.user

    res.render('index', {data: obj[0], user: req.session.user, isLogin, user})
}

function contact (req, res) {
    const isLogin = req.session.isLogin
    const user = req.session.user

    res.render('contact-me', {isLogin, user})
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
    const isLogin = req.session.isLogin
    const user = req.session.user

    res.render('testimonial', { isLogin, user })
}

async function blogdetail (req, res) {
    const { id } = req.params

    const query = `SELECT blogs.id, blogs.project_name, blogs.start_date, blogs.end_date, blogs.description, blogs.image, 
    users.id, users.name AS author, blogs."createdAt", blogs."updatedAt" FROM blogs INNER JOIN users ON blogs."authorId" = users.id WHERE blogs.id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    
    console.log("data detail", obj)

    const isLogin = req.session.isLogin
    const user = req.session.user

    res.render('blog-detail', { data: obj[0], isLogin, user })
}

function blogs (req, res) {
    res.render('blog')
}

async function addproject(req, res) {
    try {

        const image = req.file.filename
        const authorId = req.session.user.id

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

        const query = `INSERT INTO blogs(project_name, start_date, end_date, technologies, description, image, authorId, "createdAt", "updatedAt") VALUES ('${project_name}', '${start_date}', '${end_date}', ARRAY[${technologies}], '${description}', '${image}', '${authorId}', NOW(), NOW())`

        await sequelize.query(query, {type: QueryTypes.INSERT})

        const isLogin = req.session.isLogin
        const user = req.session.user

        res.redirect('/blog-page',  {isLogin, user})

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
    const query = `SELECT blogs.id, blogs.project_name, blogs.start_date, blogs.end_date, blogs.description, blogs.image, 
    users.id, users.name AS author, blogs."createdAt", blogs."updatedAt" FROM blogs INNER JOIN users ON blogs."authorId" = users.id`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    console.log("ini data di database", obj)

    const isLogin = req.session.isLogin
    const user = req.session.user
    
    res.render('blog-page', { obj, isLogin, user })
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

function formLogin(req, res) {
    res.render('login', {
        title: "Login"
    })
  }

async function userLogin(req, res) {
    const { email, password } = req.body

    const query = `SELECT * FROM users WHERE email = '${email}'`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    if(!obj.length) {
        console.error("user not registered")
        return res.redirect('/login')
    }

    bcrypt.compare(password, obj[0].password, (err, result) => {
    if (err) {
        req.flash('danger', 'Email or password mismatch')
        console.error("Internal server error")
        return res.redirect('/login')
    }
    if (!result) {
        req.flash('danger', 'Email or password mismatch')
        console.error("Email or Password mismatch")
        return res.redirect('/login')
    }

    console.log('login successful')
    req.flash('success', 'login success')
    req.session.isLogin = true,
    req.session.user = {
        id: obj[0].id,
        name: obj[0].name,
        email: obj[0].email,
    }
    res.redirect('/')
  })
}

function formRegister(req, res) {
    res.render('register', {
        title: "Register"
    })
  }

async function addUser(req, res) {
    const { name, email, password } = req.body

    console.log("name", name);
    console.log("email", email);
    console.log("password", password);

    const salt = 10

    bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
            console.error("Password error");
            req.flash('danger', 'Email or password mismatch')
            res.redirect('/register')
        }

        console.log("hash result :", hash);
        const query = `INSERT INTO users(name, email, password) VALUES ('${name}', '${email}', '${hash}')`
        
        await sequelize.query(query, {type: QueryTypes.INSERT})
    
        req.flash('success', 'login success')
        res.redirect('/')
    })
}   