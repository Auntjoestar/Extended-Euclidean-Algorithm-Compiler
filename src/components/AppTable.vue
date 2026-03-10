<script setup lang="ts">
import { FwbTable, FwbTableBody, FwbTableCell, FwbTableHead, FwbTableHeadCell, FwbTableRow } from 'flowbite-vue';
import type { Row } from '../types/Row';

interface Props {
    rows: Row[]
}

const { rows } = defineProps<Props>();
</script>

<template>
    <FwbTable>
        <FwbTableHead>
            <FwbTableHeadCell>a</FwbTableHeadCell>
            <FwbTableHeadCell>b</FwbTableHeadCell>
            <FwbTableHeadCell>q</FwbTableHeadCell>
            <FwbTableHeadCell>r</FwbTableHeadCell>
            <FwbTableHeadCell>s</FwbTableHeadCell>
            <FwbTableHeadCell>t</FwbTableHeadCell>
        </FwbTableHead>
        <FwbTableBody>
            <FwbTableRow v-if="rows.length === 0">
                <FwbTableCell colspan="6" style="text-align: center;">
                    Please enter 2 numbers to be calculated...
                </FwbTableCell>
            </FwbTableRow>
            <FwbTableRow v-else v-for="(row, index) in rows.toReversed()" :key="index">
                <FwbTableCell>
                    {{ row.a }}
                </FwbTableCell>
                <FwbTableCell>
                    {{ row.b }}
                </FwbTableCell>
                <FwbTableCell>
                    {{ row.q }}
                </FwbTableCell>
                <FwbTableCell v-if="row.r !== null">
                    {{ row.r }}
                </FwbTableCell>
                <FwbTable v-else>
                </FwbTable>
                <FwbTableCell v-if="row.s !== null">
                    {{ row.s }}
                </FwbTableCell>
                <FwbTableCell v-else>
                </FwbTableCell>
                <FwbTableCell>
                    {{ row.t }}
                </FwbTableCell>
            </FwbTableRow>
        </FwbTableBody>
    </FwbTable>

</template>