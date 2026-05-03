const service = require('./service');
const { success, created, paginated, notFound } = require('../../utils/apiResponse');

/**
 * Create a new purchases record
 */
async function create(req, res, next) {
  try {
    const result = await service.create(req.body);
    created(res, result, 'Successfully created record in purchases');
  } catch (err) {
    next(err);
  }
}

/**
 * Retrieve a paginated list of purchases
 */
async function list(req, res, next) {
  try {
    const { page = 1, limit = 10, search, status, category } = req.query;
    
    // Build dynamic filter
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (search) {
      // Basic text search on relevant fields depending on module
      if ('purchases' === 'products') filter.name = { $regex: search, $options: 'i' };
      if ('purchases' === 'sales') filter.orderNumber = { $regex: search, $options: 'i' };
    }

    const result = await service.list(filter, { page, limit });
    paginated(res, result.data, result.pagination);
  } catch (err) {
    next(err);
  }
}

/**
 * Retrieve a specific purchases by ID
 */
async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const result = await service.getById(id);
    
    if (!result) {
      return notFound(res, 'Record not found');
    }
    
    success(res, result);
  } catch (err) {
    next(err);
  }
}

/**
 * Update an existing purchases record
 */
async function update(req, res, next) {
  try {
    const { id } = req.params;
    const result = await service.update(id, req.body);
    
    if (!result) {
      return notFound(res, 'Record not found to update');
    }
    
    success(res, result, 'Successfully updated record');
  } catch (err) {
    next(err);
  }
}

/**
 * Delete a purchases record completely
 */
async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const result = await service.remove(id);
    
    if (!result) {
      return notFound(res, 'Record not found to delete');
    }
    
    success(res, null, 'Successfully deleted record');
  } catch (err) {
    next(err);
  }
}


/**
 * Update Purchase Order status (triggers stock receive)
 */
async function updateStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    
    const result = await service.updateStatus(id, status);
    success(res, result, 'Purchase status updated successfully');
  } catch (err) {
    next(err);
  }
}


module.exports = { 
  create, 
  list, 
  getById, 
  update, 
  remove, updateStatus 
};
