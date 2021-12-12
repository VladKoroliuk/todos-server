import nodemailer from 'nodemailer'
import {mailConf, base} from '../config/index.js'

class Mail{
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "roottestmaillll@gmail.com",
                pass: "p48klb^AhfFVIQYPPV$PTAAU2mj%F{"
            }
        })
    }

    async sendActovationMail(to,link){
        this.transporter.sendMail({
            from: mailConf.auth.user,
            to,
            subject: "Активация аккаунта",
            test: '',
            html: `
                <div>
                    <h1>Активация аккаунта</h1>
                    <a href="${base.API_URL}/activate/${link}">Актировать</a>
                </div>
            `
        })
    }
    async sendActivationCode(to){
        const code = this.generateCode(10000, 99999)
        this.transporter.sendMail({
            from: mailConf.auth.user,
            to,
            subject: "Активация Email",
            test: '',
            html: `
                <div>
                    <h1>Код активации</h1>
                    <strong>${code}</strong>
                </div>
            `
        })
        return code
    }
    generateCode(min, max){
        return Math.floor(Math.random() * (max - min) ) + min;
    }
}
export default new Mail()