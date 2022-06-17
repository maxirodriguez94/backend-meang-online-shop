import { EXPIRETIME, MESSAGES, SECRET_KEY } from "../config/constants";
import jwt from "jsonwebtoken";
import { IJwt } from "../interface/jwt.interface";
class JWT {
    private secretKey = SECRET_KEY as string;

    sign(data: IJwt, expiresIn: number = EXPIRETIME.H24) {
        return jwt.sign(
            { user: data.user },
            this.secretKey,
            { expiresIn } //24 horas cadicidad
        );
    }

    verify(token: string) {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (e) {
            return MESSAGES.TOKEN_VERICATION_FAILED;
        }
    }
}

export default JWT;
