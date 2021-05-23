<template>
    <div :key="bypass.id" v-for="bypass in bypasses">
        <Bypass 
            @delete-bypass="$emit('delete-bypass', bypass.id)"
            :bypass="bypass"/>
    </div>
</template>

<script>
import Bypass from './Bypass';

export default {
    name: 'Bypasses',
    props: {
        bypasses: Array,
    },
    components: {
        Bypass,
    },
    emits: ['delete-bypass', 'toggle-reminder']
}
</script>