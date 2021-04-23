
module.exports= app =>{
    require('./users/public.user')(app)
    require('./stores/public.stores')(app)
}