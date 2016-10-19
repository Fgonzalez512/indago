const bcrypt = require('bcrypt-nodejs');

const password_hash = bcrypt.hashSync('password');

const data ={
  users:[
    {user_id:1,first_name:'diego',last_name:'diego',username:'diego',email:'diego',password:password_hash},
    {user_id:2,first_name:'margo',last_name:'margo',username:'margo',email:'margo',password:password_hash},
  ],
  plans:[
    {user_id:1,name:'Go Diego Go!',city:'Austin',state:'TX'},
    {user_id:1,name:'Galvanize',city:'Austin',state:'TX'},
    {user_id:2,name:'Lake Pflugerville',city:'Pflugerville',state:'TX'}
  ],
  places:[
    {plan_id:1,name:'Go Diego Go!',city:'Austin',state:'TX'},
    {plan_id:1,name:'Galvanize',city:'Austin',state:'TX'},
    {plan_id:1,name:'Lake Pflugerville',city:'Pflugerville',state:'TX'}
  ]
};

module.exports = data;
