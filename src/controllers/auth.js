const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { default: isEmail } = require("validator/lib/isEmail");

const validateSignup = async (req, res) => {
    try{
        const { firstName, lastName, username, email, password } = req.body;

        const isUsernameTaken = await User.findOne({
            where: { username: req.body.username }
        });
        const isEmailTaken = await User.findOne({
            where: { email: req.body.email }
        });
        if (!firstName || !lastName || !username || !email || !password) {
            throw new Error("Please fill all fields");
        }

        if (isUsernameTaken) {
            throw new Error("Username already taken!");
        }

        if (isEmailTaken) {
            throw new Error("Email already taken!");
        }

        if (isEmail(req.body.email) === false) {
            throw new Error("Email is not valid!");
        }
        return new User({
            roleID: 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        })
    }catch(err){
        
        return err;
    }
}

exports.signup =  async (req, res, next) => {
    
    validateSignup(req, res);
    try{
        const user = await validateSignup(req, res);
        if(user instanceof Error){
            throw new Error(user);
        }
        await user.save()
        .then((user) => {
            res.status(200).json({success: true, msg: "User created successfully!"});
        })
        .catch(next);
    }catch(error){
        console.log(error.message);
        res.status(500).json({ success: false, msg: error.message });
        return;
    }
}

exports.signin = async (req, res) =>{
    let user;
    try{
            user = await User.findOne({
            where: { username: req.body.username }
        
        
        });
    }catch(err){
        console.log(err);
        return res.status("404").json({error: err});
    }

    if(user === null){
        return res.status(404).json({message: "User not found!"})
    }

    let passwordValidation = bcrypt.compareSync(
        req.body.password, user.password
    );
    if(!passwordValidation){
        return res.status(401).json({accessToken: null, message: "Invalid Password!"})
    }

    const token = jwt.sign({
        id: user.id
    }, process.env.API_SECRET, {
        expiresIn: 86400
    });

    user.token = token;
    await user.save();

    res.status(200)
        .send({
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
            },
            message: "Login successfull",
            accessToken: token,
        });
}

exports.loginpage = (req, res) => {
    console.log("loginpage");
    res.sendFile('login.html', { root: './public' });
}
