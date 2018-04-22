<template>
    <a :href="url">{{content}}</a>
</template>
<script>
export default {
    props:['type','content','url'],
}
</script>

