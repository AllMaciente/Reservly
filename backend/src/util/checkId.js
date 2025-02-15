function checkId(req, id) {
  if (req.session.userId == id) true;
  else false;
}
