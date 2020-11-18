<template>
  <div>
    <CategoryColumn :params="params0"></CategoryColumn>
  </div>
</template>

<script>
import CategoryColumn from "../../components/category-column"
import api from "../../utils/api";
import tools from "../../utils/index";

export default {
  data() {
    return {
      params0: {
        title: '图片库',
        subtitle: '新建分类',
        descTitle: '共有图片',
        url: api.getPictureCategoriesUrl(),
        func: tools.redictAppDetail,
        addFunc:this.add_category
      },
    }
  },
  components: {CategoryColumn},
  methods: {
    add_category() {
      mpvue.navigateTo(
        {
          url: '/pages/picture-categories-new/main?tp=pictures'
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
