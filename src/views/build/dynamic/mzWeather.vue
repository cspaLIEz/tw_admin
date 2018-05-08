<template>
    <div>
        <iframe allowtransparency="true" frameborder="0" width="385" height="96" scrolling="no" 
        :src="fromUrl">
        </iframe>
    </div>
</template>
<script>
export default {
    props:['fromUrl']
}
</script>

