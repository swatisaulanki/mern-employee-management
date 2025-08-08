// middleware/validateStringFields.js

const validateStringFields = (fields) => {
    return (req, res, next) => {
      for (let field of fields) {
        if (typeof req.body[field] !== 'string') {
          return res.status(400).json({ error: `${field} must be a string` });
        }
      }
      next();
    };
  };
  
  module.exports = validateStringFields;
  