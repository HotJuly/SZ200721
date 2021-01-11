import {ref , onMounted, onBeforeUnmount} from 'vue';

export default function () {
    const pageX= ref(0);
    const pageY= ref(0);

    // onMounted(()=>{
    //   console.log('我是onMounted')
    // })
    function handle(event: MouseEvent){
        // console.log('event',event)
        const {clientX,clientY} =event;
        pageX.value=clientX;
        pageY.value=clientY;
      }

    onMounted(()=>{
      document.addEventListener('click',handle);
    })

    onBeforeUnmount(()=>{
      document.removeEventListener('click',handle);
    })

    return {
        pageX,
        pageY
    }
}