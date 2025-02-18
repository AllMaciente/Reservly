function checkRole(req, role) {
  if (req.session.role == role) return true;
  else return false;
}
module.exports = checkRole;
