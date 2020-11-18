<template>
  <div class="selected-nav" v-if="iconNav.length != 0">
    <div class='common-subtitle'>
      <div class='common-subtitle-left'>{{params.title}}</div>
      <div class='common-subtitle-right' @click="click_right">{{params.subtitle}}</div>
    </div>
    <ul>
      <li v-for="item in iconNav" :key="id" >
        <van-card :key = "id"
                  :desc="item.message"
                  :title="item.name"
                  :thumb="item.picture"
                  thumb-mode="scaleToFill"
                  @click="redictAppDetail(item)"
        >
          <div slot="price">
            {{params.descTitle}}:{{item.amount}}
          </div>
        </van-card>
      </li>
    </ul>
  </div>
</template>

<script>

import api from "../../utils/api"
import tools from "../../utils/index"

export default {
  data() {
    return {
      iconNav: []
    }
  },
  props:{
    params:{
      type:Object
    }
  },
  mounted() {
  },
  onShow(){
  },
  onReady(res){
    this.getNavData()
  },
  methods: {
    getNavData: function () {
      //let url = api.getBookCategoriesUrl()
      console.log(this.params.url)
      mpvue.request({
        url: this.params.url,
        success: (res) => {
          res.data.items.map(m => {
            m.picture = `${api.HOST_URI}static/${m.picture}`
          })
          this.iconNav = res.data.items
        }
      })
    },
    click_right(){
      if(this.params.addFunc!=null){
        console.log('defined add func')
        this.params.addFunc()
      }
      else{
        console.log('undefined add func')
      }
    },
    redictAppDetail(e) {
      this.params.func(e)
    }
  }
}
</script>

<style scoped>
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
  color: #1c1a1a;
  margin-right: 6rpx;
}

/* 精选栏目菜单导航 */
.selected-nav {
  margin-top: 5px;
  border-bottom: 16rpx solid #f5f7f7;
}

/*.nav-box {*/
/*  margin-left: 5px;*/
/*  display: flex;*/
/*  padding: 24rpx 5rpx;*/
/*  background: #fff;*/
/*}*/

/*.nav-item {*/
/*  text-align: center;*/
/*}*/

/*.nav-item image {*/
/*  width: 88rpx;*/
/*  height: 120rpx;*/
/*  margin: 5px;*/
/*}*/

/*.nav-item text {*/
/*  line-height: 20rpx;*/
/*  font-size: 16rpx;*/
/*  color: #4c4c4c;*/
/*  font-weight: 500;*/
/*}*/
/*.scroll-view-item {*/
/*  height: 150rpx;*/
/*}*/

.scroll-view_H {
  white-space: nowrap;
}

.scroll-view-item_H {
  display: inline-block;
  height: 150rpx;
  margin: 5px;
}

.scroll-view-item_H image {
  height: 140rpx;
}
</style>
