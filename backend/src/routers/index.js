
module.exports= app =>{
    require('./users/public.user')(app)
    require('./users/private.user')(app)
}