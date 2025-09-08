exports.isAuthenticated = async (req, res, next) => {
  try {
    console.log("o day");
    if (req.cookies.username) {
      console.log("o day 22");
      next();
    } else {
      res.status(401).json({
        message: "Unauthorized access. Please log in.",
        nextSteps: {
          login: "/users/login",
          register: "/users/register",
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
