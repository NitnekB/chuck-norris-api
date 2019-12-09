const withAuth = (req, res, next) => {
  const incomingToken = req.headers['x-live-button-token'];

  if (!incomingToken) {
    res.status(401).send('Unauthorized: No tokens provided');
  } else if (checkValidToken(incomingToken)) {
    next();
  } else {
    res.status(401).send('Unauthorized: Invalid token');
  }
}

const checkValidToken = token => {
  return String(token) === String(process.env.FLIC_AUTHENTICATION);
}

module.exports = withAuth;
