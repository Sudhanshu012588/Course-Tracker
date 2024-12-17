import Router from'express'
import{ generateAccessAndRefereshTokens,registerUser, loginUser} from "../Controllers/user.controller.js"
import { verifyJWT } from '../Middleware/auth.middleware.js'

const route = Router()
route.route('/register').post(registerUser)
route.route('/login').post(loginUser)

export default route