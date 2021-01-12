function Observer(data) {
    // new Observer(vm._data);
    // 保存原data数据到this上
    // this =>ob实例对象
    // 变量data,vm._data,vm.$options.data   ob.data
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    constructor: Observer,
    walk: function(data) {
    // this.walk(vm._data);
        var me = this;
        // 遍历data数据
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
            // me->ob实例对象 key=>"msg" vm._data[msg] => "hello MVVM"
        });
    },
    convert: function(key, val) {
        // this->ob实例对象 key=>"msg" val => "hello MVVM"
        this.defineReactive(this.data, key, val);
    },

    // 将属性定义成响应式数据的方法
    defineReactive: function(data, key, val) {
        // this.defineReactive(vm._data, "msg", "hello MVVM");
        // 每一个响应式属性（data中的数据）
        // 都通过闭包的方式保存了一个dep
        // data中每有一个属性名就会创建一个Dep对象
        var dep = new Dep();
        // 递归遍历
        // 如果当前val是一个对象数据，也要变成响应式
        // 先将里面属性变成响应式，在将外面属性变成响应式
        var childObj = observe(val);

        // 将data的数据重新定义，定义成响应式
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {
                    // 建立dep和watcher的关系
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                // 更新data数据
                val = newVal;
                // 新的值是object的话，进行监听
                // 新的数据劫持
                childObj = observe(newVal);
                // 通知订阅者
                // 通知数据的dep对应所有的watcher，调用cb来更新用户界面
                dep.notify();
            }
        });
        // Object.defineProperty(vm._data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define
        //      // value和get/set方法不能共存 => value:"hello MVVM"
        //      //  msg原先的value被抛弃了,换成了get和set,但是旧值还在,用val这个闭包缓存下来了
        //     get: function() {
        //         if (Dep.target) {
        //             // 建立dep和watcher的关系
        //              //dep实例对象被闭包保留下来了
        //             dep.depend();
        //         }
        //  
        //         return val;
        //     },
        //     set: function(newVal) {
            //      newVal=123;
        //         if (newVal === val) {
        //             return;
        //         }
        //         // 更新data数据
        //         val = newVal;
        //         // 新的值是object的话，进行监听
        //         // 新的数据劫持
        //         childObj = observe(newVal);
        //         // 通知订阅者
        //         // 通知数据的dep对应所有的watcher，调用cb来更新用户界面
        //         dep.notify();
        //     }
        // });
    }
};

function observe(value, vm) {
    // 第一轮 observe(vm._data, vm);
    // 第二轮 "hello MVVM"
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


var uid = 0;

function Dep() {
    // 唯一id
    this.id = uid++;
    // 保存watcher的容器
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        // this.subs.push(watcher);
        this.subs.push(sub);
    },

    depend: function() {
        // Dep.target 是 watcher
        // watcher.addDep(dep)
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        // 遍历watcher
        this.subs.forEach(function(sub) {
            // 调用watcher.update
            sub.update();
        });
    }
};

Dep.target = null;