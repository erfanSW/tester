import Api from './Api';
import {
  UserInterface,
  OtpType,
  UserUpdateInterface,
  UserOtpDto,
} from 'src/interfaces/User';

export default class User {
  static register(user: UserInterface) {
    return Api().post('auth/register', user);
  }

  static signUp(user: UserInterface) {
    return Api().post('auth/signup', user);
  }

  static validateOtp(user: UserOtpDto, type: OtpType) {
    return Api().post('auth/validate_otp', user, {
      headers: {
        type,
      },
    });
  }

  static getDoctors() {
    return Api().get('users/doctors/all');
  }

  static getActivity() {
    return Api().get('activity');
  }

  static getNotification() {
    return Api().get('notification');
  }

  static seenNotification(id: number) {
    return Api().get(`notification/seen/${id}`);
  }

  static getMessage() {
    return Api().get('notification/message');
  }

  static getUser(id: number) {
    return Api().get(`users/${id}`);
  }

  static updateUser(user: UserUpdateInterface) {
    return Api().put('users', user);
  }
}
