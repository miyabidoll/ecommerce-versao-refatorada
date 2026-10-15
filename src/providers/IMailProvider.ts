export interface MailMessage {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
}

export interface MailProvider {
    sendMail(message: MailMessage): Promise<string | null>
}