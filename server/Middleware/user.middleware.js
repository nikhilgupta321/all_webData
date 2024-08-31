// // verifyUser.js
// // import jwt from 'jsonwebtoken';
// const jwt = require('jsonwebtoken')
// const express = require('express');
// const app = express();

// // const verifyUser = (req, res, next) => {
// //   const token = req.cookies.token;
// //   if (!token) {
// //     return res.json({ Message: "Please Provide the Token" });
// //   } else {
// //     jwt.verify(token, "MLqjN80VjuRKQpqVFxdCJrgH4mvdgWmp", (err, decoded) => {
// //       if (err) {
// //         return res.json({ Message: "Authentication Error" });
// //       } else {
// //         req.name = decoded.name;
// //         next();
// //       }
// //     });
// //   }
// // };

// const verifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (token) {
//     jwt.verify(token, "MLqjN80VjuRKQpqVFxdCJrgH4mvdgWmp", (err, decoded) => {
//       if (err) return res.json({ Status: false, Error: "Wrong Token" })
//       req.id = decoded.id;
//       req.role = decoded.role;
//       next()
//     })
//   } else {
//     return res.json({ Status: false, Error: "Not autheticated" })
//   }
// }
// app.get('/verify', verifyUser, (req, res) => {
//   return res.json({ Status: true, role: req.role, id: req.id })
// })

// const verifyToken = (req, res, next) => {
//   console.log('middlewere called')
//   next();
// }


// module.exports = { verifyUser, verifyToken };
// export default verifyUser;
