import nodeMailer, { Transporter } from "nodemailer";
import logger from "../lib/logger";
import { MailMessage, MailProvider } from "./IMailProvider";

export class EtherealMailProvider implements MailProvider {
    private transporter: Transporter | null = null;

    private async getTransporter() {
        if (this.transporter) return this.transporter;

        // Cria uma conta de teste no Ethereal automaticamente
        const testAccount = await nodeMailer.createTestAccount();

        this.transporter = nodeMailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
            user: testAccount.user,
            pass: testAccount.pass,
            },
        });

        logger.info(`Ethereal Mail configurado: ${testAccount.user}`);

        return this.transporter;
    }

    async sendMail(message: MailMessage): Promise<string | null> {
        const transporter = await this.getTransporter()
        const info = await transporter.sendMail(message);
        const url = nodeMailer.getTestMessageUrl(info);

        logger.info(`Email enviado: ${url}`)

        return url || null;
    }
}