import userModels from "../models/userModels.js";

export const registerController = async (req, res, next) => {


    const { name, email, password } = req.body;
    if (!name) {
        next('name is required')
    }
    if (!email) {
        next('please provide email')

    }
    if (!password) {

        next('please provide password')
    }
    const existingUser = await userModels.findOne({ email })
    if (existingUser) {
        next('Email Already Registered Please Login')


    }
    const user = await userModels.create({ name, email, password })
    const token = user.createJWT();
    res.status(201).send({
        success: true,
        message: "User Created Successfully",
        user: {
            name: user.name,
            lastname: user.lastName,
            email: user.email,
            location: user.location
        },
        token
    })


};

export const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
        next('Please Provide All fields')
    }
    //find user by email
    const user = await userModels.findOne({ email }).select("+password")
    if (!user) {
        next("Invalid UserName or Password")
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        next("Invalid UserName or Password")
    }
    user.password = undefined;

    const token = user.createJWT()
    res.status(200).json({
        success: true,
        message: "Login Successfully",
        user,
        token
    })
};
