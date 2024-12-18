const express = require('express')

const mysqlPool = require('./db')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))


app.use('/auth', authRoutes)
app.use('/user', userRoutes)


app.listen(3000,async ()=>{
  try{
      await mysqlPool.getConnection()
      console.log('Database connection is successful')
  }catch(err){
      console.log(err)
  }
  console.log('Server is running on port 3000')
})