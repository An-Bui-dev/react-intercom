import IntercomAPI from './intercomAPI';
interface IntercomSettings {
    app_id: string;
    [x: string]: string;
}
declare global {
    interface Window {
        Intercom: (...args: Array<any>) => any;
        intercomSettings: IntercomSettings;
        attachEvent?: any;
    }
}
interface ReactIntercomAvatar {
    type: string;
    image_url: string;
}
interface ReactIntercomCompany {
    company_id: string;
    created_at?: string;
    name?: string;
    monthy_spend?: Number;
    plan?: string;
    size?: Number;
    website?: string;
    industry?: string;
}
interface ReactIntercomDataAttributes {
    email?: string;
    user_id?: string;
    created_at?: string;
    name?: string;
    phone?: string;
    last_request_at?: void;
    unsubscribed_from_emails?: boolean;
    language_override?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_medium?: string;
    utm_source?: string;
    utm_term?: string;
    avatar?: ReactIntercomAvatar;
    user_hash?: string;
    company?: ReactIntercomCompany;
    companies?: ReactIntercomCompany[];
    [custom_property: string]: any;
}
interface ReactIntercomProps extends ReactIntercomDataAttributes {
    app_id: string;
    alignment?: string;
    horizontal_padding?: Number;
    vertical_padding?: Number;
    custom_launcher_selector?: string;
    hide_default_launcher?: string;
    session_duration?: string;
    action_color?: string;
    background_color?: string;
}
declare function ReactIntercom<T extends ReactIntercomProps>(props: T): null;
export { ReactIntercom, IntercomAPI };
