require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const port = process.env.PORT

const accountRouter = require('./src/routers/account')
const engineerRouter = require('./src/routers/engineer')
const skillRouter = require('./src/routers/skill')
const experienceRouter = require('./src/routers/experience')
const projectRouter = require('./src/routers/project')
const companyRouter = require('./src/routers/company')
const portofolioRouter = require('./src/routers/portofolio')
const hireRouter = require('./src/routers/hire')

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/account', accountRouter)
app.use('/engineer', engineerRouter)
app.use('/skill', skillRouter)
app.use('/experience', experienceRouter)
app.use('/project', projectRouter)
app.use('/company', companyRouter)
app.use('/portofolio', portofolioRouter)
app.use('/hire', hireRouter)
app.use(morgan('dev'))
app.use(cors())

// config cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use('/image', express.static('./uploads'))

app.get('/', (req, res) => {
  res.send('backend HireCode2')
})

app.listen(port, () => {
  console.log(`listen app backend on port ${port}`)
})
