import jwt from 'jsonwebtoken'
import { jwtConf } from '../config/index.js'
import tokenModel from '../models/token.js'


class Token {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, jwtConf.access.secret, { expiresIn: jwtConf.access.expiresIn })
        const refreshToken = jwt.sign(payload, jwtConf.refresh.secret, { expiresIn: jwtConf.refresh.expiresIn })
        return { accessToken, refreshToken }
    }
    async save(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({ user: userId, refreshToken })
        return token
    }
    async remove(refreshToken) {
        const token = tokenModel.findOneAndDelete({ refreshToken })
        return token
    }
    async find(refreshToken){
        const tokenData = await tokenModel.findOne({refreshToken})
        return tokenData
    }
    validateAccess(token){
        try{
            const userData = jwt.verify(token, jwtConf.access.secret)
            return userData
        }catch(e){
            return null
        }
    }
    validateRefresh(token){
        try{
            const userData = jwt.verify(token, jwtConf.refresh.secret)
            return userData
        }catch(e){
            return null
        }
    }
}
export default new Token()