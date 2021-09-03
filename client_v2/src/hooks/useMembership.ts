import { ref } from 'vue';
import User from '../services/UserService';
import {
  UserInterface,
  OtpType,
  OtpResponse,
  UserUpdateInterface,
  UserOtpDto,
} from '../interfaces/User';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { AxiosError } from 'axios';
import { useUser } from './useUser';

function useMembership() {
  const $q = useQuasar();
  const $router = useRouter();
  const doctors = ref<UserInterface[]>([]);
  const myProfile = ref<UserInterface>();
  const userProfile = ref<UserInterface>();
  const updateProfileLoading = ref<boolean>(false);

  async function register(user: UserInterface) {
    try {
      const result = await User.register(user);
      $q.notify({
        message: result.data as string,
        position: 'top',
        color: 'positive',
        timeout: 10000,
      });
      $q.cookies.set('phone', user.phone, {
        secure: true,
      });
      await $router.push({
        path: '/validate_otp',
        query: {
          type: OtpType.LOGIN,
        },
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status == 404) {
        await $router.push({
          path: '/signup',
          query: {
            phone: user.phone,
          },
        });
      }
    }
  }

  async function signup(user: UserInterface) {
    try {
      await User.signUp(user);
      if (user.phone) {
        $q.cookies.set('phone', user.phone, {
          expires: '5m',
        });
      }
      await $router.push({
        path: 'validate_otp',
        query: {
          type: OtpType.SIGNUP,
        },
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status == 409) {
        await $router.push({ path: 'login' });
        $q.notify({
          message: 'شما با این شماره قبلا ثبت نام کردید',
          position: 'top',
          color: 'warning',
        });
      }
    }
  }

  async function validateOtp(type: string, otp: string) {
    try {
      const user: UserOtpDto = {
        phone: $q.cookies.get('phone'),
        password: otp,
      };
      const result = await User.validateOtp(
        user,
        type == OtpType.SIGNUP ? OtpType.SIGNUP : OtpType.LOGIN
      );
      const data = result.data as OtpResponse;
      if (data.access_token) {
        $q.cookies.set('access_token', data.access_token, {
          expires: 1,
          secure: true,
        });
      }
      if (data.user) {
        $q.cookies.set('user', data.user as string, {
          expires: 1,
          secure: true,
        });
      }
      await $router.push({
        path: '/',
      });
    } catch (error) {
      const err = error as AxiosError;
      const errorData = err.response?.data as OtpResponse;
      if (err.response?.status === 404) {
        await $router.push({
          path: '/signup',
        });
      } else if (err.response?.status == 401) {
        $q.notify({
          message: 'کد وارد شده صحیح نمی باشد.',
          color: 'red',
          position: 'top',
        });
      } else {
        if (err.response?.data)
          $q.notify({
            message: errorData.access_token,
            color: 'red',
            position: 'top',
          });
      }
    }
  }

  async function logout() {
    $q.cookies.remove('user');
    $q.cookies.remove('access_token');
    await $router.push({
      path: '/login',
    });
  }

  function isLoggedIn(): boolean {
    if ($q.cookies.get('access_token')) {
      return true;
    } else {
      return false;
    }
  }

  async function getDoctors() {
    try {
      const result = await User.getDoctors();
      doctors.value = result.data as UserInterface[];
    } catch (error) {}
  }

  async function getUserProfile(id: number) {
    try {
      const result = await User.getUser(id);
      userProfile.value = result.data as UserInterface;
    } catch (error) {}
  }

  async function getMyProfile() {
    try {
      const { user } = useUser();
      const result = await User.getUser(user.id);
      myProfile.value = result.data as UserInterface;
    } catch (error) {}
  }

  async function updateProfile(user: UserUpdateInterface) {
    try {
      updateProfileLoading.value = true;
      await User.updateUser(user);
    } catch (error) {
    } finally {
      updateProfileLoading.value = false;
    }
  }

  return {
    register,
    signup,
    validateOtp,
    getDoctors,
    doctors,
    getUserProfile,
    getMyProfile,
    myProfile,
    userProfile,
    updateProfile,
    updateProfileLoading,
    logout,
    isLoggedIn,
  };
}

export { useMembership };
