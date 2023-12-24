"use server"

import mongoose from "mongoose";
import { User } from "./models";
import bcrypt from "bcrypt"
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// connect DB =======================================================
const connectDB = async () => {
    const connection = {};
    try {
        if (connection.isConnected) return;
        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
};

const registerUser = async (email, password) => {
    try {
        connectDB()
        const isExisiting = await User.findOne({ email })
        if (isExisiting) {
            return { error: "Email Already Registered" }
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        await User.create({ email, password: hashedPassword })
        return { success: "Registration successfull" }
    } catch (error) {
        console.log({ error });
        return { error: "An error occurred, try after sometime" }
    }
}

const loginUser = async (formData) => {
    const { email, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { email, password, redirect: false });
        return ({ success: "login successfull" })
    } catch (error) {
        console.error(error);
        return { error: "Invalid credentials" };
    }
};

export { connectDB, registerUser, loginUser }