const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api=process.env.API_URL
  return jwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path:[
      {url:`${api}/products`,methods:['GET','OPTIONS']},
      {url:`${api}/products/get/featured`,methods:['GET','OPTIONS']},
      {url:`${api}/orders`,methods:['GET','OPTIONS']},
      {url:`${api}/categories`,methods:['GET','OPTIONS']},
      // {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
      "/api/v1/users/login",
      "/api/v1/users/register",
    ]
  })

  
}


module.exports=authJwt