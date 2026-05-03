const service = require('./service');
const { success, created, paginated, notFound } = require('../../utils/apiResponse');

/**
 * Create a new products record
 */
async function create(req, res, next) {
  try {
    const result = await service.create(req.body);
    created(res, result, 'Successfully created record in products');
  } catch (err) {
    next(err);
  }
}

/**
 * Retrieve a paginated list of products
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
      if ('products' === 'products') filter.name = { $regex: search, $options: 'i' };
      if ('products' === 'sales') filter.orderNumber = { $regex: search, $options: 'i' };
    }

    const result = await service.list(filter, { page, limit });
    paginated(res, result.data, result.pagination);
  } catch (err) {
    next(err);
  }
}

/**
 * Retrieve a specific products by ID
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
 * Update an existing products record
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
 * Delete a products record completely
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
 * Retrieve product catalog statistics
 */
async function stats(req, res, next) {
  try {
    const Model = require('./model');
    const totalProducts = await Model.countDocuments();
    const activeProducts = await Model.countDocuments({ status: 'active' });
    
    // Aggregate total value
    const valAgg = await Model.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: null, totalValue: { $sum: "$price" } } }
    ]);
    
    success(res, {
      totalProducts,
      activeProducts,
      totalCatalogValue: valAgg.length ? valAgg[0].totalValue : 0
    });
  } catch (err) {
    next(err);
  }
}


module.exports = { 
  create, 
  list, 
  getById, 
  update, 
  remove, stats 
};
