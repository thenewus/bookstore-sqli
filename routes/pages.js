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

router.get("/dune", authController.isLoggedIn, (req, res) => {
  res.render("dune", {
    user: req.user
  })
})

router.get("/farenheit", authController.isLoggedIn, (req, res) => {
  res.render("farenheit", {
    user: req.user
  })
})

router.get("/got", authController.isLoggedIn, (req, res) => {
  res.render("got", {
    user: req.user
  })
})

router.get("/1984", authController.isLoggedIn, (req, res) => {
  res.render("1984", {
    user: req.user
  })
})

router.get("/crimeandp", authController.isLoggedIn, (req, res) => {
  res.render("crimeandp", {
    user: req.user
  })
})

router.get("/fireandblood", authController.isLoggedIn, (req, res) => {
  res.render("fireandblood", {
    user: req.user
  })
})

router.get("/12rules", authController.isLoggedIn, (req, res) => {
  res.render("12rules", {
    user: req.user
  })
})

router.get("/33strategies", authController.isLoggedIn, (req, res) => {
  res.render("33strategies", {
    user: req.user
  })
})

router.get("/48laws", authController.isLoggedIn, (req, res) => {
  res.render("48laws", {
    user: req.user
  })
})

router.get("/beyondorder", authController.isLoggedIn, (req, res) => {
  res.render("beyondorder", {
    user: req.user
  })
})

router.get("/karamazov", authController.isLoggedIn, (req, res) => {
  res.render("karamazov", {
    user: req.user
  })
})

router.get("/chamber", authController.isLoggedIn, (req, res) => {
  res.render("chamber", {
    user: req.user
  })
})

router.get("/hallows", authController.isLoggedIn, (req, res) => {
  res.render("hallows", {
    user: req.user
  })
})

router.get("/idiot", authController.isLoggedIn, (req, res) => {
  res.render("idiot", {
    user: req.user
  })
})

router.get("/symbols", authController.isLoggedIn, (req, res) => {
  res.render("symbols", {
    user: req.user
  })
})

router.get("/goblet", authController.isLoggedIn, (req, res) => {
  res.render("goblet", {
    user: req.user
  })
})

router.get("/philosopher", authController.isLoggedIn, (req, res) => {
  res.render("philosopher", {
    user: req.user
  })
})

router.get("/house", authController.isLoggedIn, (req, res) => {
  res.render("house", {
    user: req.user
  })
})

router.get("/maps", authController.isLoggedIn, (req, res) => {
  res.render("maps", {
    user: req.user
  })
})

router.get("/martin", authController.isLoggedIn, (req, res) => {
  res.render("martin", {
    user: req.user
  })
})

router.get("/sorcerer", authController.isLoggedIn, (req, res) => {
  res.render("sorcerer", {
    user: req.user
  })
})

router.get("/rebirth", authController.isLoggedIn, (req, res) => {
  res.render("rebirth", {
    user: req.user
  })
})

router.get("/mastery", authController.isLoggedIn, (req, res) => {
  res.render("mastery", {
    user: req.user
  })
})

router.get("/leader", authController.isLoggedIn, (req, res) => {
  res.render("leader", {
    user: req.user
  })
})

router.get("/underground", authController.isLoggedIn, (req, res) => {
  res.render("underground", {
    user: req.user
  })
})

router.get("/redbook", authController.isLoggedIn, (req, res) => {
  res.render("redbook", {
    user: req.user
  })
})

router.get("/richdad", authController.isLoggedIn, (req, res) => {
  res.render("richdad", {
    user: req.user
  })
})

router.get("/babylon", authController.isLoggedIn, (req, res) => {
  res.render("babylon", {
    user: req.user
  })
})

router.get("/undiscovered", authController.isLoggedIn, (req, res) => {
  res.render("undiscovered", {
    user: req.user
  })
})

router.get("/mindofgiants", authController.isLoggedIn, (req, res) => {
  res.render("mindofgiants", {
    user: req.user
  })
})

router.get("/wimhof", authController.isLoggedIn, (req, res) => {
  res.render("wimhof", {
    user: req.user
  })
})

router.get("/worldofice", authController.isLoggedIn, (req, res) => {
  res.render("worldofice", {
    user: req.user
  })
})

router.get("/littleprince", authController.isLoggedIn, (req, res) => {
  res.render("littleprince", {
    user: req.user
  })
})

router.get("/it", authController.isLoggedIn, (req, res) => {
  res.render("it", {
    user: req.user
  })
})

router.get("/carrie", authController.isLoggedIn, (req, res) => {
  res.render("carrie", {
    user: req.user
  })
})

router.get("/fiverings", authController.isLoggedIn, (req, res) => {
  res.render("fiverings", {
    user: req.user
  })
})

router.get("/habits", authController.isLoggedIn, (req, res) => {
  res.render("habits", {
    user: req.user
  })
})

router.get("/thinking", authController.isLoggedIn, (req, res) => {
  res.render("thinking", {
    user: req.user
  })
})

router.get("/artofwar", authController.isLoggedIn, (req, res) => {
  res.render("artofwar", {
    user: req.user
  })
})

router.get("/biohack", authController.isLoggedIn, (req, res) => {
  res.render("biohack", {
    user: req.user
  })
})

router.get("/principles", authController.isLoggedIn, (req, res) => {
  res.render("principles", {
    user: req.user
  })
})

router.get("/bitcoin", authController.isLoggedIn, (req, res) => {
  res.render("bitcoin", {
    user: req.user
  })
})

router.get("/young", authController.isLoggedIn, (req, res) => {
  res.render("young", {
    user: req.user
  })
})

router.get("/misery", authController.isLoggedIn, (req, res) => {
  res.render("misery", {
    user: req.user
  })
})

router.get("/awaken", authController.isLoggedIn, (req, res) => {
  res.render("awaken", {
    user: req.user
  })
})

router.get("/showyourwork", authController.isLoggedIn, (req, res) => {
  res.render("showyourwork", {
    user: req.user
  })
})

router.get("/ego", authController.isLoggedIn, (req, res) => {
  res.render("ego", {
    user: req.user
  })
})

router.get("/meditations", authController.isLoggedIn, (req, res) => {
  res.render("meditations", {
    user: req.user
  })
})


module.exports = router