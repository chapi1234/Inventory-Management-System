const User = require('../users/model');
const jwt = require('jsonwebtoken');

async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  
  // Create token
  const token = jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET || 'secret', 
    { expiresIn: '1d' }
  );
  
  return { 
    user: { id: user._id, email: user.email, firstName: user.firstName, role: user.role }, 
    token 
  };
}

module.exports = { login };
