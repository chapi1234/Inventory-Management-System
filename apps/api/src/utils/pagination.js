/**
 * Build a paginated mongoose query result
 * @param {Model} model - Mongoose model
 * @param {Object} filter - Mongoose filter object
 * @param {Object} options - { page, limit, sort, populate, select }
 */
async function paginate(model, filter = {}, options = {}) {
  const page = Math.max(1, parseInt(options.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(options.limit) || 10));
  const skip = (page - 1) * limit;
  const sort = options.sort || { createdAt: -1 };

  let query = model.find(filter).sort(sort).skip(skip).limit(limit);

  if (options.populate) {
    const populations = Array.isArray(options.populate) ? options.populate : [options.populate];
    populations.forEach((p) => { query = query.populate(p); });
  }

  if (options.select) {
    query = query.select(options.select);
  }

  const [data, total] = await Promise.all([query.exec(), model.countDocuments(filter)]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
}

module.exports = { paginate };
