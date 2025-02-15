function checkRole(req, role) {
  if (req.session.role == role) true;
  else false;
}
module.exports = checkRole;
