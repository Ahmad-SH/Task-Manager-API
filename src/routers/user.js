const express = require("express");
const User = require("../models/users");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require("multer");
const sharp = require('sharp')
const {sendWelcomeEmail,sendCancelingEmail} = require('../Emails/account')

//post for resource creation
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail(user.email,user.name)
    const token = user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//200 okay, 400 client error,500 server error
//201 created

router.post("/users/login", async (req, res) => {
  try {
    //we can create our own method like findByCredentials, generateAuthToken
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    //provide auth token to the user.
    const token = await user.generateAuthToken();
    res.send({
      user: user,
      token: token,
    });
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body); // return of strings of the obj properties
  const allowedUpdates = ["name", "email", "age", "password"];
  const isValidOperation = updates.every((update) => {
    // runs for every item in the array and return true/false
    // every will return true only if all are true, and false even if one of them is false
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid operation" });
  }

  try {
    updates.forEach((updates) => (req.user[updates] = req.body[updates]));

    await req.user.save();

    // //to update a user
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // to handle uppdate situation
    // if (!user) {
    //   return res.status(404).send();
    // }

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    //since we are already authenticated, we can fetch the user directly
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    sendCancelingEmail(req.user.email,req.user.name)
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
//Resoruce reading endpoints
//fetching multiple users
router.get("/users/me", auth, async (req, res) => {
  //make user get their profile
  // no need for id as we are using auth token
  res.send(req.user);

  //find({}) with empty obj will fetch all users
  // try {
  //   const users = await User.find({});
  //   res.send(users);
  // } catch (e) {
  //   res.status(500).send();
  // }

  // User.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((err) => {
  //     res.status(500).send();
  //   });
});
// router.get("/users/:id", async (req, res) => {
//   // after users/, access the dynamic / query string after this "/"
//   // console.log(req.params);

//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send();
//   }

//   // User.findById(_id)
//   //   .then((user) => {
//   //     if (!user) {
//   //       return res.status(404).send();
//   //     }
//   //     res.send(user);
//   //   })
//   //   .catch((err) => {
//   //     res.status(500).send();
//   //   });
// });

//deleting a user
router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.params.id);
    // if (!user) {
    //   return res.status(404).send();
    // }

    //remove the user who is authenticated
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  // dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error("Only, jpg, png, jpeg file extensions are accepted!")
      );
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    //we receive the data here from multer after comment out "dest"
    //we want to save the image onto user profile
    //store the value on the user avatar field.
      //resize and convert to png 
      // console.log(sharp(req.file.buffer));
      const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
      console.log(buffer);

     req.user.avatar = buffer
    await req.user.save();

    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
router.delete(
  "/users/me/avatar",
  auth,
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.status(200).send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
//fetching an avatart, giving an image back
router.get("/users/:id/avatar",  async (req, res) => {
  try {
    // fetch image by userID
    const user = await User.findById(req.param.id);

    if (!user || !user.avatar) {
      throw new Error();
    }
    //send back data// what type of data (png,jpg..)
    //set response header
    res.set('Content-Type','image/png')
    res.send(user.avatar)

  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
