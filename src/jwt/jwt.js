// Authorization: Bearer <token>
function verifyToken(req, res, next) {
    const {authorization} = req.headers

    if(typeof authorization !== "undefined") {
        const token = authorization.split(" ")[1]
        req.token = token
        next()
    }else {
        res.sendStatus(403)
    }
}

export default verifyToken