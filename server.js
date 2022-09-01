const express = require("express")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
url = "mongodb://localhost:27017/timetable"
const app = express()
const UserSchema = require("./User");
const StaffSchema = require("./Staff");
const TimetableSchema = require("./Timetable");
const nodemailer = require('nodemailer')
app.use(cors() );
app.use(express.json())
mongoose
  .connect(url, {
    
    keepAlive: true,
    socketTimeoutMS: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb successfully connected"))
  .catch((err) => console.error(err));
  


app.post("/register",async(req,res)=>{
  const user = await UserSchema.findOne({ email: req.body.email });
  if(!user){
   // generate salt to hash password
   const salt = await bcrypt.genSalt(10);
   // now we set user password to hashed password
   password = await bcrypt.hash(req.body.password, salt);
  const newUser = new UserSchema({
                email: req.body.email,
                password: password,
                name: req.body.name,
                department: req.body.department,
                year: req.body.year,
                semester: req.body.semester,
                role:req.body.role,
                section:req.body.section
  });
  newUser
    .save()
    .then(() => res.json({msg:"success"}))
    .catch((err) => console.error(err));
  console.log(password)
}
else{
  console.log("user already exist")
  res.json({msg:"user already exist"})
}
})




app.post("/registerstaff",async(req,res)=>{
  const user = await StaffSchema.findOne({ email: req.body.email });
  if(!user){
   // generate salt to hash password
   const salt = await bcrypt.genSalt(10);
   // now we set user password to hashed password
   password = await bcrypt.hash(req.body.password, salt);
  const newStaff = new StaffSchema({
                email: req.body.email,
                password: password,
                name: req.body.name,
                class: req.body.class,
                // year: req.body.year,
                // semester: req.body.semester,
                role:req.body.role,
                // subject:req.body.subject
  });
  newStaff
    .save()
    .then(() => res.json({msg:"success"}))
    .catch((err) => console.error(err));
  console.log(password)
}
else{
  console.log("user already exist")
  res.json({msg:"user already exist"})
}
})














app.post("/login",async(req,res)=>{
  const user = await UserSchema.findOne({ email: req.body.email });
  if(user){
 // check user password with hashed password stored in the database
 const validPassword = await bcrypt.compare(req.body.password, user.password);
 console.log(validPassword)
if(validPassword){
res.json(user)
}
else {
res.json({error:"error"})
}

console.log(req.body.email)
  }
   
  else {
    res.json({error:"user not found"})
  }
})

app.post("/loginstaff",async(req,res)=>{
  const user = await StaffSchema.findOne({ email: req.body.email });
    // check user password with hashed password stored in the database
    if(user){

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      console.log(validPassword)
      if(validPassword){
        res.json(user)
      }
      else {
        res.json({error:"error"})
      }
    }
    else{
      res.json({error:"user not found "})
    }


  console.log(req.body.email)
})








app.post("/gettable",async(req,res)=>{
  let department= req.body.department
 let year= req.body.year
 let  semester= req.body.semester
  let section = req.body.section
  console.log(req.body)

  const table = await TimetableSchema.findOne({ $and: [ { department:department }, { year:year } , {semester:semester} , { section:section } ] });
console.log(table)
 if(table){
   res.json(table)
 }
 else{
   res.json({msg:"error"})
 }
})



app.post("/createtable",async(req,res)=>{
  console.log(req.body)


  let message =`Time table has been created for Department : ${req.body.department} , year : ${req.body.year}, semester : ${req.body.semester}, section : ${req.body.section}` 

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "idhayaclg26@gmail.com",
    pass: "uncccolbdwyhtalf"
  }
});



  const table = await TimetableSchema.findOne({ $and: [ { department:req.body.department }, { year:req.body.year } , {semester:req.body.semester} , { section:req.body.section } ] });
  const user = await UserSchema.find({ $and: [ { department:req.body.department }, { year:req.body.year } , {semester:req.body.semester} , { section:req.body.section } ] });
  const staff = await StaffSchema.find({class:{$elemMatch:{department:req.body.department, year:req.body.year,semester:req.body.semester,section:req.body.section}}})
  let useremail = user.map(({ email }) => email)
  let staffemail = staff.map(({ email }) => email)
  let allmail =[...useremail,...staffemail]
  let mailOptions = {
    from: "idhayaclg@gmail.com",
    to: allmail,
    subject: 'Time table',
    text: message 
  };
console.log("user",allmail)
// console.log("user",user)/
console.log("hello",table)
 if(table){
  res.json({msg:"Table already exist" })
 }
 else{
   

  const newTimetable = new TimetableSchema({
    timeperiod: req.body.array,
                department: req.body.department,
                year: req.body.year,
                semester: req.body.semester,
                section:req.body.section
  });
  newTimetable
    .save()
    .then(() => {
      transporter.sendMail(mailOptions);
      res.json({msg:"success"})
    })
    .catch((err) => console.error(err));

 }



  // console.log("user already exist")
  // res.json({msg:"user already exist"})
})

app.post("/edittable",async(req,res)=>{
  let department= req.body.department
  let year= req.body.year
  let  semester= req.body.semester
   let section = req.body.section
  const Timetable = await TimetableSchema.findOneAndUpdate({ $and: [ { department:department }, { year:year } , {semester:semester} , { section:section } ] },{timeperiod:req.body.array});
if(Timetable){
  res.json({msg:"success"})
}
})







app.get("/all",async(req,res)=>{
  console.log("hello")
  const table = await TimetableSchema.find();
  if(table){
    res.json(table)
  }
   
  else {
    res.json({error:"table not found"})
  }
})






app.listen(4000,()=>{
  console.log("lisiterning to port 4000")
})





















