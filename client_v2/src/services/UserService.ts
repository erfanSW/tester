import Api from './Api';
import { UserInterface, OtpType } from 'src/interfaces/User';

export default class User {
  static register(user: UserInterface) {
    return Api().post('auth/register', user);
  }

  static signUp(user: UserInterface) {
    return Api().post('auth/signup', user);
  }

  static validateOtp(user: UserInterface, type: OtpType) {
    return Api().post('auth/validate_otp', user, {
      headers: {
        type,
      },
    });
  }
}
