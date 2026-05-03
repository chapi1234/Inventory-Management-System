const AuditLog = require('../models/AuditLog');

/**
 * Factory that returns an audit-log middleware for a specific resource.
 * Usage: router.post('/', auditLog('Employee', 'created'), controller.create)
 */
function auditLog(resource, action) {
  return async (req, res, next) => {
    // Store original json method
    const originalJson = res.json.bind(res);

    res.json = async function (body) {
      // Only log successful mutations
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        try {
          await AuditLog.create({
            user: req.user._id,
            action,
            resource,
            resourceId: body?.data?._id || req.params?.id || null,
            changes: req.body,
            ip: req.ip,
            userAgent: req.get('user-agent'),
            company: req.user.company,
          });
        } catch (e) {
          console.error('Audit log error:', e.message);
        }
      }
      return originalJson(body);
    };

    next();
  };
}

module.exports = auditLog;
