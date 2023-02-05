const express=require("express");
const { signout, signin, signup} = require("../controllers/user");
const router=express.Router();

router.get('/',(req,res)=>{
    return res.send('Welcome !');
})
router.get('/signout',signout);

router.post('/signin',signin);
router.post('/signup',signup);

module.exports=router;