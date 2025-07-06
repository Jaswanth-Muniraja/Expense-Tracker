const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    profileImageUrl:{type:String, default:null}
},
{timestamps:true}
);

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next()
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcryptjs.compare(candidatePassword, this.password);
}

module.exports = mongoose.model("User", userSchema)