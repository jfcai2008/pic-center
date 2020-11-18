<template>
  <div style="display:flex;flex-direction: column">
    <div class="common-subtitle">
      <span class="common-subtitle-left">{{category_name}}</span>
      <span class="common-subtitle-right" @click="uploadpic">上传图片</span>
    </div>
    <van-grid column-num="4" gutter="2" border center>
      <van-grid-item use-slot v-for="item of datas" :key="id" style="background-color: #90BED5" >
        <image :src="item.thumb" style="width: 100%" mode="widthFix" @click="PreviewImage(item)"></image>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import api from '../../utils/api'

export default {
  data() {
    return {
      id: -1,
      category_name:'',
      datas: [],
      current: 1,
      pages:-1
    }
  },
  onLoad(options) {
    console.log('picture-list onload')
    this.datas=[]
    this.id = options.id
    this.getServerDatas()
  },
  methods: {
    getServerDatas() {
      let url = api.getPictureListByCategoryWithpageIndex(this.id,this.current,40)
      console.log(url)
      mpvue.request({
        url: url,
        success: (res) => {
          //console.log(res.data.items)
          res.data.items.map(m=>{
            m.picture=`${api.HOST_URI}${m.src}`
            m.thumb=`${api.HOST_URI}${m.thumb}`
          })
          this.datas.push.apply(this.datas, res.data.items)
          if(this.pages==-1){
            this.category_name = res.data.category_name
            this.pages = res.data.pages // Math.floor(res.data.count/10)
          }
          console.log(this.pages)
        }
      })
    },
    PreviewImage(event) {
      const current = event.picture
      mpvue.previewImage({
        urls: this.datas.map((item) => item.picture),
        current,
        fail() {
          mpvue.showToast({ title: '预览图片失败', icon: 'none' });
        },
      },true);
    },
    uploadpic(){
      let url = `/pages/upload/main?id=${this.id}&column=pictures&category=${this.category_name}`
      mpvue.navigateTo({url:url})
    }
  },

  //下拉刷新
  onPullDownRefresh() {
    console.log('onPullDownRefresh')
    setTimeout(() => {
      mpvue.stopPullDownRefresh()
    }, 2000)
  },

  //滚动加载
  onReachBottom() {
    console.log('onReachBottom')
    this.current++
    if(this.current>this.pages){
      mpvue.showToast({ title: '已经没有数据了', icon: 'none' });
      return
    }
    this.getServerDatas()
  }
}
</script>

<style scoped lang="scss">
ul {
  li {
    overflow: hidden;
    padding: 10px;

    image {
      width: 100px;
      float: left;
    }

    div .title {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
<style scoped>
  .bco{
    flex: 1;
    font-size: 12px;
    color: #999696;
  }
  /*模块标题样式 */
  .common-subtitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    padding: 0 6rpx;
    background: #8b9ad4;
  }

  .common-subtitle-left {
    font-size: 34rpx;
    color: #333;
    font-weight: 500;
  }

  .common-subtitle-right {
    font-size: 26rpx;
    font-weight: 400;
    color: #1a1818;
    margin-right: 6rpx;
  }
</style>
