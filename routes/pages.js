const express = require("express")
const authController = require('../controllers/auth')

const router = express.Router()

router.get('/', authController.isLoggedIn, (req, res) => {
  res.render('index', {
    user: req.user
  })
})

router.get("/signup", (req, res) => {
  res.render("signup")
})


router.get("/login", (req, res) => {
  res.render("login")
})

router.get('/profile', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
  
})

router.get("/library", authController.isLoggedIn, (req, res) => {
  res.render("library", {
    user: req.user
  })
})

router.get("/about", authController.isLoggedIn, (req, res) => {
  res.render("about", {
    user: req.user
  })
})




router.get("/library-page2", authController.isLoggedIn, (req, res) => {
  res.render("library-page2", {
    user: req.user
  })
})

router.get("/library-page3", authController.isLoggedIn, (req, res) => {
  res.render("library-page3", {
    user: req.user
  })
})

router.get("/library-page4", authController.isLoggedIn, (req, res) => {
  res.render("library-page4", {
    user: req.user
  })
})

module.exports = router