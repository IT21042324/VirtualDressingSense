const jwt = require("jsonwebtoken");
const BACKENDURL = process.env.BACKENDURL;
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  const secret = process.env.SECRET;
  console.log(secret);

  // Check if authorization token is provided in the request header
  if (!authorization) {
    console.log({ error: "Authorization token not found" });
    return res.status(401).json({ error: "Authorization token not found" });
  }

  // Extract the token from the authorization header
  const token = authorization.split(" ")[1];

  try {
    // Verify the token using the secret key
    const { id } = jwt.verify(token, process.env.SECRET);

    // Retrieve user data from API using the id and role from the token
    const response = await fetch(`${BACKENDURL}/api/users/${id}`);
    const data = await response.json();

    // Attach user data to the request object
    req.user = data;

    // Call next middleware function
    next();
  } catch (error) {
    console.log({ error: "Unauthorized Request" });
    res.status(401).json({ error: "Unauthorized Request" });
  }
};

module.exports = requireAuth;
