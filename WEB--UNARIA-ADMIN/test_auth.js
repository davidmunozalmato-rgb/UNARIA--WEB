const bcrypt = require('bcryptjs');
const hash = '$2a$12$iIXJTCEnxum/.4HPgvxtleThAxSmydn82Z.Aulytn4XORwcDX/rJG';
const pass = 'su0626oj';

bcrypt.compare(pass, hash).then(res => {
  console.log('Match:', res);
});
