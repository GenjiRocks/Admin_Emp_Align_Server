const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// registering the user
exports.register = async (req,res)=>{
    try{
        const {name,email,password} = req.body
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).send({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const [user] = await db.query('Insert into users (name,email,password) values (?,?,?)',[name,email,hashedPassword])
        res.status(201).send({message:'user registered successfully',user})

    }catch(err){ 
        res.status(409).send({message:err.message})
    }
}

// loggin in the user
/* exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body
        const [user] = await db.query('Select * from users where email = ?',[email])
        if(!user || !(await bcrypt.compare(password,user[0].password))){
            res.status(401).send({message:'invalid email or password'})
        }

        const token = jwt.sign({id:user[0].id},process.env.JWT_SECRET,{expiresIn:'1h'})
        console.log(`token =`,token);
        
        res.status(200).send({message:'user logged in successfully',token})
    }catch(err){
        res.status(409).send({message:err.message})
    }
} */

// loggin in the user
exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body
        const [user] = await db.query('Select * from users where email = ?',[email])
        if(!user || !(await bcrypt.compare(password,user[0].password))){
            res.status(401).send({message:'invalid email or password'})
        }

       /*  const token = jwt.sign({id:user[0].id},process.env.JWT_SECRET,{expiresIn:'1h'}) */ // this is for normal logging in but we need to send role also to check login data

       const token = jwt.sign({id:user[0].id,role:user[0].role},process.env.JWT_SECRET,{expiresIn:'1h'})

        console.log(`token =`,token);
        
        res.status(200).send({message:'user logged in successfully',token})
    }catch(err){
        res.status(409).send({message:err.message})
    }
}