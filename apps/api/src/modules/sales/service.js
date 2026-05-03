const Model = require('./model');


async function create(data) {
  const session = await Model.startSession();
  session.startTransaction();
  try {
    const sale = await Model.create([data], { session });
    const Stock = require('../stock/model');
    for (let item of data.items) {
      await Stock.updateOne(
        { productId: item.productId }, 
        { $inc: { quantity: -item.quantity } }, 
        { session }
      );
    }
    await session.commitTransaction();
    session.endSession();
    return sale[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}


async function list(filter = {}, pagination = { page: 1, limit: 10 }) {
  const skip = (pagination.page - 1) * pagination.limit;
  
  let query = Model.find(filter);
  
  // Populate references based on module
  if ('sales' === 'stock') query = query.populate('productId', 'name sku');
  if ('sales' === 'sales') query = query.populate('customerId', 'firstName lastName');
  if ('sales' === 'purchases') query = query.populate('supplierId', 'name');
  if ('sales' === 'users') query = query.select('-password');

  const data = await query.skip(skip).limit(pagination.limit).sort({ createdAt: -1 });
  const total = await Model.countDocuments(filter);
  
  return { 
    data, 
    pagination: { 
      total, 
      page: parseInt(pagination.page), 
      limit: parseInt(pagination.limit), 
      pages: Math.ceil(total / pagination.limit) 
    } 
  };
}

async function getById(id) {
  let query = Model.findById(id);
  if ('sales' === 'stock') query = query.populate('productId', 'name sku');
  if ('sales' === 'sales') query = query.populate('customerId', 'firstName lastName').populate('items.productId', 'name sku');
  if ('sales' === 'purchases') query = query.populate('supplierId', 'name').populate('items.productId', 'name sku');
  if ('sales' === 'users') query = query.select('-password');
  
  return await query;
}

async function update(id, updateData) {
  if ('sales' === 'users' && updateData.password) {
    // If updating a user's password, we need to save the document to trigger pre-save hooks
    const user = await Model.findById(id);
    if (!user) throw new Error('User not found');
    Object.assign(user, updateData);
    await user.save();
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }
  
  const options = { new: true, runValidators: true };
  let query = Model.findByIdAndUpdate(id, updateData, options);
  if ('sales' === 'users') query = query.select('-password');
  
  return await query;
}

async function remove(id) {
  return await Model.findByIdAndDelete(id);
}

module.exports = { 
  create, 
  list, 
  getById, 
  update, 
  remove 
};
