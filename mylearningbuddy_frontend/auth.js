// npm i bcrypt and bcryptjs
// const bcrypt = require("bcryptjs");
   // encrypting/hashing the password
//    const salt = await bcrypt.genSalt(10);
//    const secPass = await bcrypt.hash(req.body.password, salt);


// npm i jsonwebtoken

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');


// Validate user credentials and generate a JWT token
// async function validateUser(data) {
//         let isUser = await User.findOne({ $or: [{ username: data.userauth }, { email: data.userauth }] });
      
//         if (isUser === null) {
//           return 0; // User not found
//         }
      
//         const passwordMatch = await bcrypt.compare(data.password, isUser.password);
//         if (!passwordMatch) {
//           return -1; // Incorrect password
//         }
      
//         // Generate JWT token
//         const jwtSecret = process.env.REACT_APP_JWT_SECRET; // Store the secret in an environment variable
//         const token = jwt.sign({ user: { id: isUser.id } }, jwtSecret);
//         return token;
//       }
      


