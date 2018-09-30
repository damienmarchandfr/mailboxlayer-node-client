import { IConfig } from './models/IConfig';
import { Email } from './models/data/Email';
export declare class MailBoxLayer {
    private config;
    constructor(config: IConfig);
    getInformations(email: string): Promise<Email>;
    private generateApiUrl;
}
