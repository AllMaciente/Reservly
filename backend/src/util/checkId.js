function checkId(req, id) {
  return req.session.id == String(id);
}

module.exports = checkId;
