import { User } from 'src/modules/Profile/models/profile';

export interface AuthUser extends User {
    isPendingVerification: boolean;
    isPendingReset: boolean;
    showCreditCardWarning: boolean;
    resetToken?: string;
    rememberMeEmail?: string;
    rememberMePassword?: string;
}
