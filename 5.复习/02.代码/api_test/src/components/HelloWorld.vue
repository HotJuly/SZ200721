<template>
  <div class="hello">
    <input type="text"  @input="handleInput">
    {{ccc}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      ccc:345
    }
  },
  props: {
    msg: String,
    abc:String
  },
  model:{
    prop:"abc",
    event:"input123"
  },
  methods:{
    handleInput(event){
      console.log(event.target.value)
      this.$emit('input123',event.target.value)
    }
  },
  inject:["aaa"],
  mounted(){
    // console.log(this.$parent)
    this.$parent.msg="666"
    // console.log(this.$el)
    // console.log(c)
    console.log('$attrs',this.$attrs)
    console.log('$listeners',this.$listeners)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
