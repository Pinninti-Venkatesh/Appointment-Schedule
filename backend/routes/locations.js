const express=require("express");
const { getLocationsByService,getServices } = require("../controllers/locations");
const router=express.Router();

router.get('/',(req,res)=>{
    return res.send('Welcome to hang in there background');
})
router.get('/service/:service',getLocationsByService);

router.get('/services',getServices);
// router.post('/signup',signup);

module.exports=router;