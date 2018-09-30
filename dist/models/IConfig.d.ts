import { AbstractConnector } from '../storages/AbstractConnector';
export interface IConfig {
    accessKey: string;
    smtp: boolean;
    catchAll: boolean;
    secure: boolean;
    cache?: boolean;
    connector?: AbstractConnector;
}
