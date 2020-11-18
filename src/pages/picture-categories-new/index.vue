<template>
  <div>
    <van-cell-group>
      <van-field
        :value="category.value"
        focus
        label="分类名称"
        placeholder="请输入新分类名称"
        border="false"
        @blur='ctBlur($event,"id_card")'
      >
        <van-button slot="button" size="small" type="primary" @click="addit()"
        >确定</van-button
        >
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import api from "../../utils/api"
export default {
  data() {
    return {
      category: {
        value:'',
        type:''
      }
    }
  },
  onLoad(params) {
    console.log(params)
    this.category.type=params.tp
  },
  methods:{
    addit(){
      console.log(this.category)
      if(this.category.value==''){
        mpvue.showToast({title:'分类名称不能为空',icon:'warn'})
        return
      }
      let url = api.getNewPictureCategoriesUrl()
      console.log(url)
      mpvue.request({
        url:url,
        method:'POST',
        data:this.category,
        success:(res)=>{
          //console.log(res)
          if(res.data.status == true){
            mpvue.showToast({title:'新增分类成功'})
          }
        },
        fail:(res)=>{
          console.log('error')
          console.log(res)
        },
        complete:(res)=>{
          //console.log('complete')
          //console.log(res)
        }
      })
    },
    //解决van-filed非双向绑定的问题
    ctBlur(e,name){
      if(e.target.value!=null) {
        this.category.value = e.target.value
      }
    }
  }
}
</script>

<style scoped>

</style>
