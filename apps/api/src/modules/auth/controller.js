const service = require('./service');
const { success } = require('../../utils/apiResponse');

/**
 * Handle user login and JWT generation
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    
    // Explicit logging for detailed trace
    console.log(`Login attempt for ${email}`);
    
    const result = await service.login({ email, password });
    success(res, result, 'Successfully logged in');
  } catch (err) {
    // Return a 401 for auth errors instead of generic 500
    if (err.message === 'Invalid credentials') {
      return res.status(401).json({ success: false, error: err.message });
    }
    next(err);
  }
}

module.exports = { login };
