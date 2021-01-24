const express = require('express');
const router = express.Router();

const User = require('./models/user');

router.post('/api/users', (req, res, next) => {
    User.findOne(
      { email: req.body.email }
    ).then(documents => {
      console.log('api users get and');
      console.log(documents);
  
      if(documents == null)
        {
          const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          });
          user.save()
          .then(() => {
            res.status(201).json({
            message: 'User added successfully'
            })
          })
          .catch(() => {
            res.status(401).json({
            message: 'Unable to add user'
            });
          });
        }
        else {
          res.status(402).json({
          message: 'User already exists'
          });
        }
  
    });
  
  })
  
  
  
  router.post('/api/users/login', (req,res,next) => {
    User.findOne(
      { email: req.body.email }
    ).then(documents => {
      return res.status(200).json({
        message: 'Get /api/users/email called successfully',
        user: documents,
    });
    });
  });


module.exports = router;