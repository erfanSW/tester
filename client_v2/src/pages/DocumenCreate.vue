<template>
  <div>
    <q-page padding>
      <div class="row">
        <div class="col-xs-12 col-md-6 q-pa-sm">
          <label class="text-indigo-6">
            <q-icon class="q-mr-sm" name="iconly:boldInfo-Square" size="xs" />
            نام آزمایش
          </label>
          <q-input v-model="name" class="q-mt-md" dense outlined> </q-input>
        </div>
        <div class="col-xs-12 col-md-6 q-pa-sm">
          <label class="text-indigo-6">
            <q-icon class="q-mr-sm" name="iconly:boldFolder" size="xs" />
            انتخاب فایل
          </label>
          <q-file
            v-model="image"
            class="q-mt-md"
            accept=".jpg, image/*"
            outlined
            dense
          >
          </q-file>
        </div>
        <div class="col-12 q-pa-sm">
          <label>حوزه آزمایش</label>
          <q-select
            v-model="tag"
            :options="tagList"
            class="q-mt-sm"
            option-label="name"
            option-value="id"
            map-options
            emit-value
            dense
            outlined
          />
        </div>
      </div>
      <q-markup-table class="q-mt-xl q-mx-sm" flat bordered>
        <thead>
          <tr class="q-mt-md bg-indigo text-white">
            <th class="text-left">عنوان</th>
            <th class="text-right">مقدار</th>
            <th class="text-right"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(line, index) in form_fields" :key="index">
            <td class="text-left">
              <div class="key">{{ line[0] }}</div>
              <q-popup-edit :model-value="line[0]">
                <q-input v-model="line[0]" dense autofocus counter />
              </q-popup-edit>
            </td>
            <td class="text-right">
              <div class="value">{{ line[1] }}</div>
              <q-popup-edit :model-value="line[1]">
                <q-input v-model="line[1]" dense autofocus counter />
              </q-popup-edit>
            </td>
            <td class="text-right">
              <q-btn
                icon="navigate_next"
                color="indigo"
                size="10px"
                flat
                dense
                @click="navigate_next(index, line)"
              />
              <q-btn
                icon="navigate_before"
                color="indigo"
                size="10px"
                flat
                dense
                @click="navigate_before(index, line)"
              />
              <q-btn
                icon="close"
                color="red"
                size="10px"
                flat
                dense
                @click="remove_field(index)"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <div class="row q-mt-md q-mb-lg">
        <q-input
          v-model="key_input"
          class="col-12 col-md-6 q-pa-sm"
          outlined
          dense
          label="یک رشته را وارد کنید"
        />
        <q-input
          v-model="value_input"
          class="col-12 col-md-5 q-pa-sm"
          outlined
          dense
          label="یک مقدار وارد کنید"
        />
        <div class="col-12 col-md-1 q-pa-sm" dir="ltr">
          <q-btn
            @click="add_field(key_input, value_input)"
            class="bg-indigo-1 text-indigo full-width q-pa-sm"
            label="افزودن"
            dense
            flat
          />
        </div>
      </div>
      <div dir="ltr">
        <q-btn
          label="ثبت نهایی"
          class="bg-indigo-6 text-white q-ma-sm q-mt-lg"
          @click="createDocument({ name, data: documentData, tag })"
          flat
        />
        <q-btn
          outline
          v-if="image"
          label="لغو"
          class="q-mt-md q-ml-sm"
          color="red"
          @click="clear_all"
        />
      </div>
    </q-page>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
import { LoadingBar, Notify } from 'quasar';
import { useDocument } from '../hooks/useDocument';
import { useTesseract } from '../hooks/useTesseract';
import { useTag } from '../hooks/useTag';
import { DocumentData } from '../interfaces/User';

export default defineComponent({
  name: 'PageIndex',
  components: {},
  setup() {
    const name = ref<string>('');
    const tag = ref<number>();
    const key_input = ref<string>('');
    const value_input = ref<string>('');
    const form_fields = ref<string[][]>([]);
    const image = ref();
    const imageText = ref<string>('');
    const imageLines = computed((): string[][] =>
      imageText.value
        .split('\n')
        .filter((line) => !!line)
        .map((line) => line.trim())
        .map((line) => {
          const lineParts: string[] = line
            .split(/[\s\t]/)
            .filter((val) => !!val);
          const firstNumber: number = lineParts.findIndex((part) =>
            /[^a-zA-Z]/.test(part)
          );
          const keyName: string = lineParts.slice(0, firstNumber).join(' ');
          const value: string = lineParts[firstNumber];
          const JunklessValue = value
            ? value
                .split('')
                .filter((val) => /[0-9\.]/.test(val))
                .join('')
            : '';
          return [keyName, JunklessValue];
        })
        .filter((part) => part[0] !== '' && /^[0-9]/.test(part[1]))
    );

    const add_field = function (key: string, value: string) {
      if (!key || !value) {
        return Notify.create({
          message: 'لطفا فیلد ها را پر کنید',
          color: 'red',
        });
      }
      form_fields.value.push([key, value]);
      key_input.value = '';
      value_input.value = '';
    };

    const remove_field = function (index: number): void {
      form_fields.value = form_fields.value.filter(
        (field, idx) => idx != index
      );
    };

    const navigate_next = function (index: number, line: string[]) {
      form_fields.value.splice(index, 1, [
        line[0],
        String(Number(line[1]) * 10),
      ]);
    };

    const navigate_before = function (index: number, line: string[]) {
      form_fields.value.splice(index, 1, [
        line[0],
        String(Number(line[1]) / 10),
      ]);
    };

    const imageUrl = ref<string>();

    function clear_all() {
      image.value = null;
    }

    const { initialize, recognize } = useTesseract();
    onMounted(() => initialize());

    watch(image, async (val) => {
      try {
        if (!val) {
          return;
        }
        imageUrl.value = URL.createObjectURL(val);
        LoadingBar.start();
        const {
          data: { text },
        } = await recognize(val);
        imageText.value = text;
      } catch (err) {
        Notify.create({
          message: 'خطایی رخ داد ! ',
          color: 'red',
        });
      } finally {
        LoadingBar.stop();
      }
    });

    watch(imageLines, (val) => {
      form_fields.value = [...form_fields.value, ...val];
      Notify.create({
        message: 'برای ویرایش هر قسمت روی آن کلیک کنید',
        position: 'bottom',
        color: 'green',
      });
    });

    const documentData = computed(() => {
      return form_fields.value.reduce((obj: DocumentData, field) => {
        obj[field[0]] = field[1];
        return obj;
      }, {});
    });

    const { createDocument } = useDocument();

    const { tagList, getTags } = useTag();
    onMounted(() => getTags());

    return {
      name,
      image,
      imageText,
      imageLines,
      imageUrl,
      key_input,
      value_input,
      form_fields,
      add_field,
      remove_field,
      navigate_before,
      navigate_next,
      clear_all,
      createDocument,
      documentData,
      tagList,
      tag
    };
  },
});
</script>

<style lang="scss" scoped>
.badge {
  border-radius: 6px;
}

.key {
  @extend .badge;
}

.value {
  @extend .badge;
}
</style>
