const jwt = require('jsonwebtoken')
const { getUyeByMail } = require('../Request_Functions/Get_Requests')

function authenticationToken(req, res, next) {
    const token = req.cookies.token;
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, 'rdj', async (error, email) => {
        if (error) {
            throw error;
        }
        req.email = email;
        try {
            const uye = await new Promise((resolve, reject) => {
                getUyeByMail(req.email.email, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
            if (uye) {
                req.id = uye.uye_id;
            } else {
                throw new Error("User not found"); // You can customize this error message as needed
            }
            next();
        } catch (err) {
            console.error(err);
            res.sendStatus(500); // Sending 500 error in case of any error
        }
    });
}

module.exports = {authenticationToken}