import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    accounts: [{type: mongoose.Schema.Types.ObjectId, ref:'Account'}]

})


const User = mongoose.model('User', userSchema);

export default User;