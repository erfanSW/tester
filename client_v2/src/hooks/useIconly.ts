import { useQuasar } from 'quasar';

function useIconly() {
  const $q = useQuasar();
  $q.iconMapFn = (iconName) => {
    if (iconName.startsWith('iconly:') === true) {
      const name = iconName.substring(7);
      return {
        cls: 'iconly-' + name,
      };
    }
  };
}

export { useIconly };
