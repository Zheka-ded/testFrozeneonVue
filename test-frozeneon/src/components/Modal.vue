<template>
    <div class="modal modal-active">
        <div class="container">
            <slot></slot>
            <div class="modal-footer">
                <button type="button" class="btn btn-dark" @click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        name: "Modal",

        data() {
            return{}
        },

        methods: {
            closeModal() {
                this.$emit('closeModal')
            },
        },
        
    }
</script>

<style>
    .modal-active{
        display: block !important;
        background: #fff;
    }
</style>