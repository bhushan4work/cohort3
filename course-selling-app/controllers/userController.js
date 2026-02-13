const { userModel } = require("../models/userModel");
const { courseModel } = require("../models/courseModel");
const { purchaseModel } = require("../models/purchaseModel");
const bcrypt = require("bcrypt");
const { mongo, default: mongoose } = require("mongoose");
const zod = require("zod");

async function userSignup(req, res) {

    const schema = zod.object({
        email: zod.string().email().min(5),
        password: zod.string().min(5),
        firstName: zod.string().min(3),
        lastName: zod.string().min(3),
    })

    const result = schema.safeParse(req.body); //validates req.body against this schema, & tells if it worked or not, doesnt throw an error

    if (!result.success) {
        return res.status(400).json({ //we return\terminate here itself as, if data format is improper we cant move further
            msg: "invalid data format",
            error: result.error
        })
    }

    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); //hashing the pass using bcrypt with salt of 10

    try {
        await userModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword //we dont store exact str of pass in db , instead we store hashed string of pass for security concern
        })

        res.status(200).json({
            msg: "signed up successfully"
        })
    }
    catch (error) {
        //extra check to determine if it's server error or user already exists
        if (error.code === 11000) { // MongoDB duplicate key error to check if input data already exists in db
            return res.status(400).json({
                message: "User already exists",
            });
        }
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

async function userSignin(req, res) {

    const schema = zod.object({
        email: zod.string().email().min(5),
        password: zod.string().min(5)
    })

    const result = schema.safeParse(req.body); //validates req.body against this schema, & tells if it worked or not, doesnt throw an error

    if (!result.success) {
        return res.status(400).json({ //we return\terminate here itself as, if data format is improper we cant move further
            msg: "invalid data format",
            error: result.error
        })
    }

    const { email, password } = req.body; 

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(403).json({
            msg: "incorrect credentials"
        })
    }

    const passwordMatch = await bcrypt.compare(password, user.password);  //compares pass of input & pass stored in usermodel db

    if (passwordMatch) {
        req.session.userId = user._id; // Store userId in session

        return res.status(200).json({
            message: "Signin Successful!",
        });
    } else {
        return res.status(403).json({
            message: "Invalid Credentials!",
        });
    }

}

function userSignout(req, res) {
    //deletes user's session from session storage\server
    req.session.destroy((err) => { //we pass a callback if any error is catched return it else give success response
        if (err) {
            return res.status(500).json({
                message: "Failed to sign out",
            });
        }
        res.status(200).json({
            message: "Signout Successful!",
        });
    });
}

async function getUserPurchases(req, res) {
    const userId = req.session.userId; //use the session id created during sign in of a user

    if (!userId) { //checks if user is signed in or if session is terminated\signed out 
        return res.status(401).json({
            message: "Unauthorized access",
        });
    }

    const purchases = await purchaseModel.find({ userId });

    if (!purchases.length) { //checks if arr of purchases is empty
        return res.status(404).json({
            message: "No purchases found",
        });
    }

    const purchasesCourseIds = purchases.map(purchase => purchase.courseId); //get the courseId of each course purchased
    
    //$in is mongodb operator which matches value in arr
    const coursesData = await courseModel.find({
        _id: {
            $in: purchasesCourseIds
        }
    }
    );

    res.status(200).json({
        purchases,
        coursesData,
    });
}

module.exports = {
    userSignup,
    userSignin,
    userSignout,
    getUserPurchases,
};
