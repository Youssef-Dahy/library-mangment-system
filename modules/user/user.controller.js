import User from "../../database/models/user.model.js"


// signUp
const signUp=async(req,res)=>{
    await User.create(req.body)
    /* create user ==>req.body has userName and Hash password and
     may be contain role
     if not contain... role will be user as default 
     */
    res.status(201).json({message:'success'})
}

// signIn
const signIn=async(req,res)=>{
     let token=req.token
res.status(200).json({message:"wlcom",token})
}

export{
    signUp,
    signIn
}