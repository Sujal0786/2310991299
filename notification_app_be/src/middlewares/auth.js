const auth = (req, res, next) => {
  // Demo protected route middleware.
  // In production, validate JWT and extract student id from token.
  const studentId = req.header("x-student-id") || req.query.studentId || "1042";
  req.user = { studentId: Number(studentId) };
  next();
};

module.exports = auth;
