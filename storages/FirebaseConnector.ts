import { AbstractConnector } from './AbstractConnector'
import { Email } from '../models/data/Email';
import { Firestore } from '@google-cloud/firestore';

export class FirebaseConnector extends AbstractConnector {
    private db: Firestore = {} as Firestore
    private collectionName = ''

    constructor(db: Firestore, collectionName: string) {
        super()
        this.db = db
        this.collectionName = collectionName
    }

    public async getEmailInfo(email: string): Promise<Email | null> {
        let emailFromDB: Email | null = {} as Email
        const snap =  await this.db.collection(this.collectionName).where('email', '==', email).get()
        snap.forEach(doc => {
            if (doc.exists) {
                emailFromDB = doc.data() as Email
            } else {
                emailFromDB = null
            }
        })
        return emailFromDB
    }

    public async addEmailInfo(email: Email): Promise<Email> {
        // Check exists
        const snap = await this.db.collection(this.collectionName).where('email', '==', email.email).get()

        snap.forEach(async (doc) => {
            if (!doc.exists) {
                await this.db.collection(this.collectionName).add(email)
            }
        })
        return email
    }
}
