import { createI18n } from 'vue-i18n';
import messages from 'src/i18n';

const i18n = createI18n({
  locale: 'en-US',
  messages,
});


export { i18n }; // if you need this instance elsewhere
