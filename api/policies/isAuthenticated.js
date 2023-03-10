const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
   


    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        // { id: userId }
        //Y Check token

        const userData = await User.findOne(decoded.id);
        console.log(userData.token);
        if (token !== userData.token) {
          console.log('Token is not found');
          return res.status(401).json({ message: "Auth failed" });
        }
        else{
            console.log(decoded);
        req.userData = decoded;
        next();

        }
        
   
    
      } catch (err) {
        console.log(err);
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
       




  };
  