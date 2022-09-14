const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
})

//signup methods
UserSchema.statics.signup = async function(email, password) {
    const exists = await this.findOne({ email });

    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash})

    return user;
}
UserSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('Must provide both an Email and a Password')
    };

    const user = await this.findOne({ email });

    if(!user){
        throw Error('Email doesn\'t exist')
    }
    //compare the password given with the hashed PWD in the DB
    const comparePWDs = await bcrypt.compare(password, user.password);

    if(!comparePWDs){
        throw Error('Password Incorrect')
    }

    return user
}

module.exports = mongoose.model('User', UserSchema)