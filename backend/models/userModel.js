import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

userSchema.statics.signup = async function (email,password) {
    if (!email || !password) {
        throw new Error("All fields need to be filled");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Pleae enter a valid email");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }

    const emailExist = await this.findOne({email});

    if (emailExist) {
        throw new Error("An account with this email already exists. Please sign up with a different email");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await this.create({email,password:hashedPassword})

    return user
}

userSchema.statics.login = async function (email,password) {
    if (!email || !password) {
        throw new Error("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Please enter a valid email");
    }

    const user = await this.findOne({email});

    if (!user) {
        throw new Error("Invalid login credentials. Please check and try again");
    }

    const match = await bcrypt.compare(password,user.password)

    if (!match) {
        throw new Error("Invalid login credentials. Please check and try again");
    }

    return user

}

const User = mongoose.model("User",userSchema);

export default User