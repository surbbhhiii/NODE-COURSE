const { check, validationResult } = require("express-validator");
const User = require("../models/user");


exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
  });
};


exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: { firstName: "", lastName: "", email: "", userType: "guest" },
  });
};


exports.postSignup = [
  // Validation Rules
  check("firstName").trim().notEmpty().withMessage("First Name is required"),
  check("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
  check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  async (req, res, next) => {
    const errors = validationResult(req);
    const { firstName, lastName, email, password, userType } = req.body;

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, userType },
      });
    }

    try {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(422).render("auth/signup", {
          pageTitle: "Signup",
          currentPage: "signup",
          isLoggedIn: false,
          errors: ["Email already exists"],
          oldInput: { firstName, lastName, email, userType },
        });
      }

      const user = new User({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
        userType,
      });

      await user.save();
      res.redirect("/login");
    } catch (err) {
      console.error("Signup Error:", err);
      res.status(500).send("Signup failed");
    }
  },
];

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

    if (!user) {
      return res.status(422).render("auth/login", {
        pageTitle: "Login",
        currentPage: "login",
        isLoggedIn: false,
        errors: ["User does not exist"],
        oldInput: { email },
      });
    }

    // 2. Password 
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(422).render("auth/login", {
        pageTitle: "Login",
        currentPage: "login",
        isLoggedIn: false,
        errors: ["Invalid password"],
        oldInput: { email },
      });
    }

    
    req.session.isLoggedIn = true;
    req.session.user = {
      _id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType
    };

    
    return req.session.save((err) => {
      if (err) {
        console.log("Session Save Error:", err);
        return res.redirect("/login");
      }
      
      console.log(`Login Success! User Type: ${user.userType} ✅`);

      
      if (user.userType === 'host') {
        res.redirect("/host/host-home-list");
      } else {
        res.redirect("/homes");
      }
    });

  } catch (err) {
    console.error("Login Controller Error:", err);
    res.redirect("/login");
  }
};


exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Logout Error:", err);
    }
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
};