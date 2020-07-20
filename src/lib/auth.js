module.exports = {
    isLogged(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }else{
            res.redirect("/");
        }
    },
    isNotLogged(req, res, next){
        if(req.isAuthenticated()){
            res.redirect("/inicio");
        }else{
            return next();
        }
    }
}