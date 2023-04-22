module.exports = function (req, res, next) {
    const reqHeader = req.headers['authorization']
    if(typeof reqHeader !== 'undefined'){
        const bearer = reqHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

