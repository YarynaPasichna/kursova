import nodemailer, { Transporter } from 'nodemailer';
import configs from '../config/config';
import * as path from 'path';
import hbs from 'nodemailer-express-handlebars';

class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: configs.SMPT_EMAIL,
                pass: configs.SMPT_PASSWORD,
            },
        });

        this.transporter.use(
            'compile',
            hbs({
                viewEngine: {
                    extname: '.hbs',
                    partialsDir: path.join(process.cwd(), 'src', 'templates', 'partials'),
                    layoutsDir: path.join(process.cwd(), 'src', 'templates', 'layouts'),
                    defaultLayout: '',
                },
                viewPath: path.join(process.cwd(), 'src', 'templates', 'views'),
                extName: '.hbs',
            })
        );
    }

    public async sendMail(to: string): Promise<void> {
        await this.transporter.sendMail({
            from: configs.SMPT_EMAIL,
            to: 'pas06chna@gmail.com',
            subject: 'Новий користувач зареєстрований',
            text: 'Новий користувач зареєстрований з email: ' + to,
        });
    }
}

export const emailService = new EmailService();
