<template>
  <div>
    <q-page padding>
      <q-input v-model="name" label="نام آزمایش" class="q-mt-xl" dense outlined>
        <template v-slot:before>
          <q-icon name="title" />
        </template>
      </q-input>
      <q-file
        outlined
        dense
        class="q-mt-md text-bg-white text-white"
        accept=".jpg, image/*"
        v-model="image"
        label="لطفا فایل را انتخاب کنید ..."
      >
        <template v-slot:before>
          <q-icon name="folder_open" />
        </template>
      </q-file>
      <q-markup-table v-if="image" class="q-mt-md bg-blue-grey-1" flat>
        <thead>
          <!-- <tr>
            <th colspan="5">
              <div class="row">
                <q-img
                  style="width: 70px"
                  :ratio="1"
                  class="rounded-borders"
                  :src="imageUrl"
                />
              </div>
            </th>
          </tr> -->
          <tr v-if="0">
            <td class="text-left">
              <q-input
                v-model="key_input"
                stack-label
                outlined
                dense
                label="یک رشته را وارد کنید"
              />
            </td>
            <td class="text-right">
              <q-input
                v-model="value_input"
                stack-label
                outlined
                dense
                label="یک مقدار وارد کنید"
              />
            </td>
            <td class="text-right">
              <q-btn
                rounded
                outline
                color="green"
                icon="add"
                dense
                @click="add_field(key_input, value_input)"
              />
            </td>
          </tr>
          <tr class="q-mt-md">
            <th class="text-left">عنوان</th>
            <th class="text-right">مقدار</th>
            <th class="text-right"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(line, index) in form_fields" :key="index">
            <td class="text-left">
              <div class="key">{{ line[0] }}</div>
              <q-popup-edit :value="line[0]">
                <q-input v-model="line[0]" dense autofocus counter />
              </q-popup-edit>
            </td>
            <td class="text-right">
              <div class="value">{{ line[1] }}</div>
              <q-popup-edit :value="line[1]">
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
      <q-btn
        v-if="image"
        label="ثبت نهایی"
        class="q-mt-md"
        color="blue-grey-8"
        @click="createDocument({ name, data: documentData })"
      />
      <q-btn
        outline
        v-if="image"
        label="لغو"
        class="q-mt-md q-ml-sm"
        color="red"
        @click="clear_all"
      />
      <bubble-chart v-if="false" :chartdata="chartSeries" />
    </q-page>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  watch,
  computed,
  reactive
} from "@vue/composition-api";
import { LoadingBar, Notify } from "quasar";
import * as _ from "lodash";
import { mapActions } from "vuex";
import { createWorker } from "tesseract.js";
import BubbleChart from "../components/BubbleChart.vue";
import { options } from "../hooks/Charthelper";
import { useDocument } from "../hooks/useDocument";

export default defineComponent({
  name: "PageIndex",
  components: {
    BubbleChart
  },
  setup(props, context) {
    const name = ref<string>("");
    const key_input = ref<string>("");
    const value_input = ref<string>("");
    const form_fields = ref<string[][]>([[]]);
    const image = ref();
    const imageText = ref<string>("");
    const imageLines = computed((): string[][] =>
      imageText.value
        .split("\n")
        .filter(line => !!line)
        .map(line => line.trim())
        .map(line => line.split(/([0-9]+)/))
        .map(line => line.slice(0, 2))
        .filter(line => line[0] && line[1])
    );

    const chartSeries = computed(
      () => 1
      // options(
      //   Array(imageLines).map(line =>
      //     Object.create({
      //       x: Number(line[0]),
      //       y: 12,
      //       r: 12
      //     })
      //   )
      // )
    );

    watch(chartSeries, val => console.log(val));

    const add_field = function(key: string, value: string) {
      if (!key || !value) {
        return Notify.create({
          message: "لطفا فیلد ها را پر کنید",
          color: "red"
        });
      }
      form_fields.value.push([key, value]);
      key_input.value = "";
      value_input.value = "";
    };

    const remove_field = function(index: number): void {
      form_fields.value = form_fields.value.filter(
        (field, idx) => idx != index
      );
    };

    const navigate_next = function(index: number, line: string[]) {
      form_fields.value.splice(index, 1, [
        line[0],
        String(Number(line[1]) * 10)
      ]);
    };

    const navigate_before = function(index: number, line: string[]) {
      form_fields.value.splice(index, 1, [
        line[0],
        String(Number(line[1]) / 10)
      ]);
    };

    const imageUrl = ref<string>();

    let dialog: any;
    const worker = createWorker({
      logger: m => {
        if (m.status === "initializing api") {
          if (m.progress === 1) {
            LoadingBar.stop();
          }
        }
        if (m.status === "recognizing text") {
          if (m.progress === 1) {
            dialog.hide();
          }
          if (m.progress === 0) {
            dialog = context.root.$q.dialog({
              message: "در حال پردازش",
              progress: {
                color: "amber"
              },
              persistent: true, // we want the user to not be able to close it
              ok: false // we want the user to not be able to close it
            });
          } else {
            dialog.update({
              message: `درحال پردازش ${(m.progress * 100).toFixed()}%`
            });
          }
        }
      }
    });

    async function initialize(worker: any): Promise<void> {
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
    }

    async function recognize(img: any) {
      return worker.recognize(img);
    }

    async function clear_all() {
      image.value = null;
    }

    onMounted(() => initialize(worker));

    watch(image, async val => {
      try {
        if (!val) {
          return;
        }
        imageUrl.value = URL.createObjectURL(val);
        LoadingBar.start();
        const {
          data: { text }
        } = await worker.recognize(val);
        imageText.value = text;
      } catch (err) {
        Notify.create({
          message: "خطایی رخ داد ! ",
          color: "red"
        });
      } finally {
        LoadingBar.stop();
      }
    });

    watch(imageLines, async val => {
      form_fields.value = val;
      Notify.create({
        message: "برای ویرایش هر قسمت روی آن کلیک کنید",
        position: "bottom",
        color: "green"
      });
    });

    const documentData = computed(() => {
      return form_fields.value.reduce((obj, field) => {
        obj[field[0]] = field[1];
        return obj;
      }, {});
    });

    const { createDocument } = useDocument(context);

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
      chartSeries,
      clear_all,
      createDocument,
      documentData
    };
  }
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
