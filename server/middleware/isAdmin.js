const User = require('../models/User');

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user.isAdmin) throw new Error('you must be admin to complete...');
  next(); 
};
module.exports = isAdmin;