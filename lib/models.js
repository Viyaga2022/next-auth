import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
        },
        gender: {
            type: String,
        },
        dob: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        address: {
            houseNo: String,
            street: String,
            landmark: String,
            city: String,
            state: String,
            country: {
                type: String,
                default: "India"
            },
            pincode: String,
        },
        profileImg: {
            type: String,
        },
        panNo: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        sponsorId: {
            type: String,
        },
        upline: [{
            id: String,
            side: String,
        }]
    },
    {
        timestamps: true
    }
);

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
        },
        img: {
            type: String,
        },
        color: {
            type: String,
        },
        size: {
            type: String,
        },
    },
    { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
//export const Product =
//mongoose.models.Product || mongoose.model("Product", productSchema);
