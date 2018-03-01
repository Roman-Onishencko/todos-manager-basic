const express = require('express'),
      router = express.Router(),
      User = require('../models/user');

// router.get('/tasks', (req, res) => {
//   Task.get((err, tasks) => {
//     res.send(tasks)
//   })
// })

router.post('/createUser', (req, res) => {
  User.create(req.body, (err, user) => {
  	console.log(err, user);
    res.send(user)
  })
})

// router.put('/tasks', (req, res) => {
//   Task.update(req.body, (err, result) => {
//     res.send(result)
//   })
// })

// router.delete('/tasks', (req, res) => {
//   Task.delete(req.body, (err, result) => {
//     res.send(result)
//   })
// })

module.exports = router
