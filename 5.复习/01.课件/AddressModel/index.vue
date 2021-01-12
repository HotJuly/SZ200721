<template>
    <div id="addressModel" @click="$emit('cancel')">
        <div class="modal-content" @click.stop>
            <div class="modal-body">
                <form action="" class="sui-form form-horizontal">
                    <div class="control-group">
                        <label class="control-label">收货人：</label>
                        <div class="controls">
                            <input type="text" v-model="addressInfo.consignee" class="input-medium">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">联系电话：</label>
                        <div class="controls">
                            <input type="text" v-model="addressInfo.phoneNum" maxlength="11" class="input-medium">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">所在地区：</label>
                        <div class="controls">
                            <div data-toggle="distpicker">
                                <select class="form-control" v-model="addressInfo.regionId" style="width: 100px;">
                                    <option :value="region.id" v-for="region in regions" :key="region.id">{{region.regionName}}</option>
                                </select>
                                <select class="form-control" v-model="addressInfo.provinceId" style="width: 100px;">
                                    <option :value="province.id" v-for="province in provinces" :key="province.id">{{province.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">详细地址：</label>
                        <div class="controls">
                            <input type="text" v-model="addressInfo.userAddress" class="input-large">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">是否默认地址：</label>
                        <div class="controls">
                            <input class="defaultAddress" :checked="addressInfo.isDefault*1" @change="getDefaultStatus" type="checkbox">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer" style="margin-left: 98px;">
                <button type="button" class="sui-btn btn-primary btn-large" @click="$emit('confirm',addressInfo)">确定</button>
                <button type="button" class="sui-btn btn-default btn-large" @click="$emit('cancel')">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"AddressModel",
    data(){
        return{
                addressInfo:{
                    consignee: "",
                    isDefault: "",
                    regionId:"",
                    provinceId:"",
                    phoneNum: "",
                    userAddress: ""
                },
                regions:[],
                provinces:[]
            };
    },
    props:{
        formData:Object
    },
    async mounted(){
        const regionData = await this.$API.reqAddressBaseRegion();
        this.regions=regionData.data;
    },
    watch:{
        async "addressInfo.regionId"(){
            if(!this.addressInfo.regionId)return;
            const provinceData = await this.$API.reqAddressBaseProvinceByRegionId(this.addressInfo.regionId);
            this.provinces=provinceData.data;
        },
        formData:{
            handler(){
                const formData=this.formData;
                if(formData!==undefined){
                    this.addressInfo={...formData};
                }
            },
            immediate:true
        }
    },
    methods:{
        getDefaultStatus(e){
            this.addressInfo.isDefault=e.target.checked?"1":"0";
        }
    }
}
</script>

<style lang="less" scoped>
#addressModel{
    position: fixed;
    top:0;
    left: 0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.3);
    .modal-content{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width:500px;
        height:238px;
        padding:50px 0;
        margin:auto;
        background-color: white;
        .modal-body{
            .sui-form{
                display:block;
                margin: 0 0 18px;
                font-size: 12px;
                line-height: 18px;
                .control-group{
                    margin-bottom: 18px;
                    display: table;
                    .control-label{
                        width: 96px;
                        text-align: right;
                        display: table-cell;
                        vertical-align: middle;
                        line-height:24px;
                    }
                    .controls{
                        display: table-cell;
                        padding-left: 3px;
                        .input-medium{
                            display: inline-block;
                            width: 200px;
                            height: 18px;
                            padding: 2px 4px;
                            font-size: 12px;
                            line-height: 18px;
                            color: #555; 
                            margin-bottom: 0;
                            vertical-align: middle;
                            border-radius: 2px;
                            background-color: #fff;
                            border: 1px solid #ccc;
                            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                            transition: border linear 0.2s, box-shadow linear 0.2s;
                            &:focus{
                                border-color: #28a3ef;
                                outline: 0;
                            }
                        }
                        .form-control{
                            transition: border linear 0.2s, box-shadow linear 0.2s;
                            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                            border-radius: 2px;
                            padding: 2px 4px;
                            font-size: 12px;
                            color: #555;
                            height: 24px;
                            line-height: 24px;
                            border: 1px solid #ccc;
                            background-color: #fff;
                            margin-bottom: 0;
                            vertical-align: middle;
                            display: inline-block;
                            width: 100px;
                            cursor: pointer;
                            &:focus{
                                border-color: #28a3ef;
                                outline: 0;
                            }
                        }
                        .input-large{
                            width: 250px;
                            display: inline-block;
                            margin-bottom: 0;
                            vertical-align: middle;
                            height: 18px;
                            padding: 2px 4px;
                            font-size: 12px;
                            line-height: 18px;
                            color: #555;
                            border-radius: 2px;
                            background-color: #fff;
                            border: 1px solid #ccc;
                            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                            transition: border linear 0.2s, box-shadow linear 0.2s;
                            padding-top: 2px;
                            padding-bottom: 2px;
                            &:focus{
                                border-color: #28a3ef;
                                outline: 0;
                            }
                        }
                        .defaultAddress{
                            display: inline-block;
                            margin-bottom: 0;
                            vertical-align: middle;
                            width: 13px;
                            height: 13px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .modal-footer{
            margin-left: 98px;
            .btn-primary{
                color: #fff;
                background-color: #28a3ef;
                border: 1px solid #1299ec;
                padding: 2px 14px;
                line-height: 22px;
                font-size: 14px;
                display: inline-block;
                box-sizing: border-box;
                margin-bottom: 0; 
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
                border-radius: 2px;
                user-select: none;  
            }
            .btn-default{
                color: #333;
                background-color: #eee;
                border: 1px solid #e1e1e1;
                padding: 2px 14px;
                line-height: 22px;
                font-size: 14px;
                display: inline-block;
                box-sizing: border-box;
                margin-bottom: 0; 
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
                border-radius: 2px;
                user-select: none; 
                margin-left:20px; 
            }
        }
    }
}
</style>