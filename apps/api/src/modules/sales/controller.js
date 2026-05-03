const service = require('./service');
const { success, created, paginated, notFound } = require('../../utils/apiResponse');

/**
 * Create a new sales record
 */
async function create(req, res, next) {
  try {
    const result = await service.create(req.body);
    created(res, result, 'Successfully created record in sales');
  } catch (err) {
    next(err);
  }
}

/**
 * Retrieve a paginated list of sales
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
      if ('sales' === 'products') filter.name = { $regex: search, $options: 'i' };
      if ('sales' === 'sales') filter.orderNumber = { $regex: search, $options: 'i' };
    }

    const result = await service.list(filter, { page, limit });
    paginated(res, result.data, result.pagination);
  } catch (err) {
    next(err);
  }
}

/**
 * Retrieve a specific sales by ID
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
 * Update an existing sales record
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
 * Delete a sales record completely
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



module.exports = { 
  create, 
  list, 
  getById, 
  update, 
  remove 
};
