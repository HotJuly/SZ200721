import Vue from 'vue';
import AddressModelTemplate from './index.vue';

const AddressModel = Vue.extend(AddressModelTemplate);

const address = {
    el:null,
    addressModel:null,
    constructor:null,
    init(){
        if(!this.addressModel){
            //生成实例对象vm
            this.constructor = new AddressModel();
            // 生成真实dom
            this.addressModel=this.constructor.$mount();
            this.el=this.addressModel.$el;
        }
        
        this.mount();
    },
    mount(){
        document.body.appendChild(this.el);
    },
    unmount(){
        document.body.removeChild(this.el);
    },
    clear(){
        Object.assign(this.addressModel.$data.addressInfo,this.addressModel.$options.data().addressInfo)
    }
}

Object.defineProperty(address,'confirm',{
    configurable:false,
    enumerable:true,
    set(value){
        this.addressModel.$off('confirm',this.addressModel._confirm);
        this.addressModel._confirm=value;
        this.addressModel.$on('confirm',value);
    },
    get(){
        return this.addressModel._confirm;
    }
})

Object.defineProperty(address,'cancel',{
    configurable:false,
    enumerable:true,
    set(value){
        this.addressModel.$off('cancel',this.addressModel._cancel);
        this.addressModel._cancel=value;
        this.addressModel.$on('cancel',value);
    },
    get(){
        return this.addressModel._cancel;
    }
})

Object.defineProperty(address,'formData',{
    configurable:false,
    enumerable:true,
    set(value){
        this.addressModel.$props.formData=value;
    },
    get(){
        return this.addressModel.$props.formData;
    }
})

Vue.prototype.$address = function(){
    address.init();
    return address;
}