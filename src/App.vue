<script setup lang="ts">
import { FwbButton, FwbInput, FwbP, } from 'flowbite-vue';
import AppTable from './components/AppTable.vue';
import { reactive, ref, toRaw, type Ref } from 'vue';
import type { Row } from './types/Row';
import { STgcfr } from './utils/math/euclidean_algorithms';

const number1: Ref<number | undefined> = ref(undefined);
const number2: Ref<number | undefined> = ref(undefined);

const rows = ref<Row[]>([])

const over = ref<boolean>(false)

const congruentPositiveNumber = ref<number | null>(null)
const congruentPositiveNumber2 = ref<number | null>(null)

const calculateSTgcfr = () => {
    if (!number1.value || !number2.value) {
        return
    }

    if (typeof number1.value !== "number" || typeof number2.value !== "number") {
        return
    }

    const gen = STgcfr(number1.value, number2.value)

    const result = [...gen]

    rows.value = result

    if (gen.next().done) {
        over.value = true

        const lastItem = rows.value[rows.value.length - 1]
        if (lastItem && lastItem?.s < 0) {
            congruentPositiveNumber.value = lastItem.s + number2.value
        }
    }
}

</script>

<template>
    <div class="w-full h-screen py-10 px-4 md:px-30 dark:text-white dark:bg-gray-800 overflow-scroll"
        @keyup.enter="calculateSTgcfr">
        <h1 class="font-extrabold text-2xl text-center">Extended Euclidean Algorithm Tabular Compiler</h1>
        <div class="flex flex-col justify-center mt-2 md:px-60">
            <div>
                <FwbInput v-model="number1" type="number" placeholder="128" label="First number: "
                    class="grow basis-lg" />

            </div>
            <div class="mt-4">
                <FwbInput v-model="number2" type="number" placeholder="1428" label="Second number: "
                    class="grow basis-lg" />

            </div>
            <FwbButton @click="calculateSTgcfr" class="p-2.5 md:p-3 mt-4 w-20 self-end">
                Calculate
            </FwbButton>
        </div>
        <div class="mt-4">
            <AppTable :rows />
        </div>
        <div v-if="over" class="mt-4">
            <h2 class="font-bold text-lg">Results</h2>
            <p><span class="font-bold italic">s:</span> {{ rows[rows.length - 1]?.s }}</p>
            <p><span class="font-bold italic" v-if="congruentPositiveNumber !== null">congruent positive number:</span>
                {{ congruentPositiveNumber }}</p>
            <p><span class="font-bold italic">t:</span> {{ rows[rows.length - 1]?.t }}</p>
        </div>
    </div>
</template>

<style scoped>
@reference "./style.css";

:deep(.custom-error) {
    @apply text-red-400 mt-2 mr-2
}

:deep(.calculate-button) {
    @apply text-center h-10 p-2.5 self-center mt-12 sm:mt-6
}
</style>
