import { AbstractConnector } from './AbstractConnector'
import { Email } from '../models/data/Email'
import * as fs from 'fs-extra'

export class FileConnector extends AbstractConnector {
    private path: string

    constructor(path: string) {
        super()
        this.path = path
    }

    public async addEmailInfo(email: Email): Promise<Email> {
        await this.creaeFolder()

        // Check if file exists
        try {
            await fs.access(this.path + '/' + email.email)
        } catch (error) {
            // create file
            await fs.writeFile(this.path + '/' + email.email, JSON.stringify(email))
        }

        return email
    }

    public async getEmailInfo(email: string): Promise<Email | null> {
        try {
            await fs.access(this.path + '/' + email)
        } catch (error) {
            return null
        }

        // Read file
        const content = await fs.readFile(this.path + '/' + email)
        const mail  = JSON.parse(content.toString()) as Email
        mail.alreadyInDatabase = true
        return mail
    }

    private async creaeFolder() {
        try {
            await fs.access(this.path)
        } catch (error) {
            await fs.mkdir(this.path)
        }
    }
}
