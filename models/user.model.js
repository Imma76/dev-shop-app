import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: {
    type: String, required: true, unique: true
  },
  password: {
    type: String, required: true
  }
});

const userModel = mongoose.model('Users', userSchema);
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};
export default userModel;
