import { useQuasar } from 'quasar';
import { UserInterface } from 'src/interfaces/User';

function useUser() {
  const $q = useQuasar();
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const user = $q.cookies.get('user') as UserInterface;
  return {
    user,
  };
}

export { useUser };
