const { adminModel } = require("../models/adminModel");
const { courseModel } = require("../models/courseModel");
const bcrypt = require("bcrypt");
const zod = requre("zod");


async function adminSignup(req, res) {
    const schema = zod.object({
        email: zod.string().email().min(5),
        password: zod.string().min(5),
        firstName: zod.string().min(3),
        lastName: zod.string().min(3),
    })

    const result = schema.safeParse(req.body);

    if (!result.success) {
        res.json({
            msg: "incorrect data format",
            error: result.error

        })
    }

    const { firstName, lastName, password, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await adminModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })
    }
    catch (error) {
        res.status(400).json({
            msg: "admin already exists"
        })
    }

}

async function adminSignin(req, res) {
    const schema = zod.object({
        email: zod.string().email().min(5),
        password: zod.string().min(5)
    })

    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.json({
            msg: "incorrect data format",
            error: result.error

        })

    }

    const { email, password } = req.body;

    try {
        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.status(403).json({
                msg: "incorrect credentials"
            })
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (passwordMatch) {
            req.session.adminId = admin._id;
            res.status(200).json({ message: "Signin successful!" });

        }
        else {
            res.status(403).json({ message: "Invalid Credentials!" });
        }
    } catch (error) {
        res.status(400).json({
            msg: "invalid credentials"
        })
    }
}


async function createCourse(req, res) {
    const schema = zod.object({
        title: zod.string().min(3),
        description: zod.string().min(10),
        imageUrl: zod.string().url(),
        price: zod.number().positive(),
    })

    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.json({
            msg: "incorrect data format",
            error: result.error

        })
    }

    const { title, description, imageUrl, price } = req.body;

    try {
        const course = await courseModel.create({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            creatorId: req.adminId
        })

        res.status(201).json({ message: "Course created!", courseId: course._id }); //return success msg & id of the course which is created

    } catch (error) {
        res.status(400).json({
            msg: "course already exists"
        })
    }

}


async function updateCourse(req, res) {
    const schema = zod.object({
        courseId: zod.string().min(5), //courseId is compulsory rest things are optional
        title: zod.string().min(3).optional(),
        description: zod.string().min(5).optional(),
        imageUrl: zod.string().url().optional(),
        price: zod.number().positive().optional(),
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.json({ message: "Incorrect data format", error: result.error });
    }

    const { courseId, title, description, imageUrl, price } = req.body;


    try {
        //finds course with this certain id & makes sure if it was created by this admin only
        const course = await courseModel.findOne({ creatorId: req.adminId, _id: courseId });


        if (!course) {
            return res.status(404).json({ message: "Course not found!" });
        }

        //make update changes to db
        await courseModel.updateOne(
            {
                _id: courseId, creatorId: req.adminId
            },
            { //as updating each n every info is optional & so we used ||
                title: title || course.title,
                description: description || course.description,
                price: price || course.price,
                imageUrl: imageUrl || course.imageUrl
            })

        res.status(200).json({ message: "Course updated!" });
    }
    catch (error) {
        res.status(400).json({
            msg: "course already updated / exists"
        })
    }
}


async function deleteCourse(req, res) {
    const schema = zod.object({
        courseId: zod.string().min(5),
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.json({ message: "Incorrect data format", error: result.error });
    }

    const { courseId } = req.body;

    try {
        //finds course with this certain id & makes sure if it was created by this admin only
        const course = await courseModel.findOne({ _id: courseId, creatorId: req.adminId });

        if (!course) {
            return res.status(404).json({ message: "Course not found!" });
        }

        await courseModel.deleteOne({ _id: courseId, creatorId: req.adminId });
        res.status(200).json({ message: "Course deleted!" });
    }
    catch (error) {
         res.status(400).json({
            msg: "course doesnt exist"
        })
    }
}

//get all courses from a creator(admin) 
async function getAllCourses(req, res) {
    try {
        //searches the db for all courses of requested adminId & returns it 
        const courses = await courseModel.find({ creatorId: req.adminId });
        res.status(200).json({ courses });
        
    } catch (error) {
        res.status(400).json({
            msg: "creator doesnt exist"
        })
    }
}


module.exports = {
    adminSignup,
    adminSignin,
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourses
};
