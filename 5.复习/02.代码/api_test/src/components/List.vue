<template>
    <div>
        <ul>
            <li v-for="(item,index) in arr" :key="index">
                {{item}}
                <input type="text">
            </li>
        </ul>
        <button @click="push">添加</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            arr:[
                "1",
                "2",
                "3",
                "4",
                "5"
            ]
        }
    },
    methods:{
        push(){
            this.arr.splice(1,0,"6")
        }
    }
}
</script>

<style lang="stylus">

</style>