const crypto = require('crypto');


function getPassword (password){
  var salt = crypto.randomBytes(32).toString('hex');
  var genHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

  console.log('UserPassword = '+password);
  console.log('Passwordhash = '+genHash);
  console.log('nSalt = '+salt);
    return {
      salt: salt,
      hash: genHash
    };

}

function validPassword(password, hash, salt){

}

module.exports.validPassword = validPassword;
module.exports.getPassword  = getPassword;
