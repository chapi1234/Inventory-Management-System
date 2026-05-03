const { forbidden } = require('../utils/apiResponse');

/**
 * Role-based access control — checks req.user.role
 * Usage: authorize('admin', 'hr')
 */
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) return forbidden(res, 'Not authenticated');
    if (!roles.includes(req.user.role)) {
      return forbidden(res, `Access denied. Required roles: ${roles.join(', ')}`);
    }
    next();
  };
}

/**
 * Permission-based access control
 * Usage: requirePermission('employees', 'delete')
 */
function requirePermission(resource, action) {
  return (req, res, next) => {
    if (!req.user) return forbidden(res, 'Not authenticated');
    // Admin bypasses all permission checks
    if (req.user.role === 'admin') return next();

    const hasPermission =
      req.user.permissions &&
      req.user.permissions.some(
        (p) => p.resource === resource && p.actions.includes(action)
      );

    if (!hasPermission) {
      return forbidden(res, `Missing permission: ${action} on ${resource}`);
    }
    next();
  };
}

module.exports = { authorize, requirePermission };
