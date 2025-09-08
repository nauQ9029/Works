exports.isAuthenticated_Session = async (req, res, next) => {
  try {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).json({
        message: "Unauthorized access. Please log in.",
        nextSteps: {
          login: "/users/login",
          register: "/users/signup",
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
