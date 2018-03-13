<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div>
        build
    </div>
</template>

<script>
export default {
    name: 'programbuild',
    data () {
        return {
            
        };
    },
    methods: {
        handleSubmit () {
            this.$refs['step'].validate((valid) => {
                if (valid) {
                    if (this.step.pass === '通过') {
                        this.currentStep += 1;
                    } else {
                        this.status = 'error';
                    }
                    this.hasSubmit = true;
                }
            });
        }
    },
    mounted () {
        
    }
};
</script>
