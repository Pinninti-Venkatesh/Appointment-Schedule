const express=require("express");
const { create,getAppointments } = require("../controllers/appointments");
// const { signout, signin, signup, isSignedIn} = require("../controllers/user");
const router=express.Router();

router.get('/',(req,res)=>{
    return res.send('Welcome to hang in there background');
})
router.get('/fetch/:user',getAppointments);

router.post('/create',create);
// router.post('/signup',signup);

module.exports=router;