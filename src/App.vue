<script setup lang="ts">
import { FwbButton, FwbInput, } from 'flowbite-vue';
import AppTable from './components/AppTable.vue';
import { reactive, ref, toRaw, type Ref } from 'vue';
import type { Row } from './types/Row';
import { STgcfr } from './utils/math/euclidean_algorithms';

const number1: Ref<number> = ref(0);
const number2: Ref<number> = ref(0);

const rows = ref<Row[]>([])

const over = ref<boolean>(false)

const congruentPositiveNumber = ref<number | null>(null)
const congruentPositiveNumber2 = ref<number | null>(null)

const calculateSTgcfr = () => {
    const gen = STgcfr(number1.value, number2.value)

    const result = [...gen]

    rows.value = result

    if (gen.next().done) {
        over.value = !over.value

        const lastItem = rows.value[rows.value.length - 1]
        if (lastItem && lastItem?.s < 0) {
            congruentPositiveNumber.value = lastItem.s + number2.value
        }
    }
}

</script>

<template>
    <div class="w-full h-screen py-10 px-4 md:px-30 dark:text-white dark:bg-gray-800 overflow-scroll">
        <h1 class="font-extrabold text-2xl text-center">Extended Euclidean Algorithm Tabular Compiler</h1>
        <div class="flex-col justify-center mt-2">
            <div class="flex gap-8 justify-center w-full items-center px-2 md:px-0 wrap">
                <FwbInput v-model="number1" placeholder="128" label="Enter first number: " class="grow basis-lg" />
                <FwbInput v-model="number2" placeholder="1428" label="Enter second number: " class="grow basis-lg" />


                <FwbButton @click="calculateSTgcfr" class="h-10 mt-6">
                    Calculate
                </FwbButton>
            </div>
        </div>
        <div class="mt-8">
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
</style>
