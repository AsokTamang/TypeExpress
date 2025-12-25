export async function requireAuth(req, res, next) {
  try {
    if (!req.session.userId) {
      console.log("Access has been blocked");
      return res.status(401).json({ error: "Unauthorized" });
    }
    next(); //if the req session has userId then it means the user is logged in, so we can move to next step
  } catch (error) {
    console.error(error.message);
    return;
  }
}
