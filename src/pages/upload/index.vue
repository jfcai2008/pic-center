<template>
  <div>
    <button type="primary" @click="startUpload">点击上传</button>
<!--    <progress percent="20" show-info stroke-width="3"/>-->
<!--    <progress :percent="percent" active stroke-width="3"/>-->
    <van-uploader
      :file-list="fileList"
      use-before-read
      show-upload
      multiple
      upload-text="请选择文件"
      @beforeread="beforeRead"
      @delete="deleteFile"
    >
    </van-uploader>
  </div>
</template>

<script>
import api from "../../utils/api"
import tools from "../../utils/index"
export default {
  data() {
    return {
      id: 1,
      column: 'pictures',
      category: 'test',
      percent:0,
      fileList: [
      ],
    }
  },
  onLoad(params){
    console.log('upload onload')
    console.log(params)
    this.id = params.id
    this.column = params.column
    this.category = params.category
  },
  methods: {
    //根据选中的文件构建upload file
    build_up_loadFile(file) {
      let url = file.url
      let f = {
        url: url,
        name: tools.getFileName(url),
        status: 'default',
        isImage: file.type === 'image',
        isVedio: file.type === 'video',
        thumb: file.thumb
      }
      return f
    },
    beforeRead: function (e) {
      if (Array.isArray(e.target.file)) {
        e.target.file.map(f => {
          this.fileList.push(this.build_up_loadFile(f))
        })
      } else {
        this.fileList.push(this.build_up_loadFile(e.target.file))
      }
    },
    deleteFile(e) {
      console.log(e)
      this.fileList.splice(e.target.index, 1)
    },
    //当点击开始上传后
    startUpload() {
      for (let i = 0; i < this.fileList.length; i++) {
        let tmp = this.fileList[i]
        if (tmp.status == 'default') {
          this.uploadfile(tmp)
        }
      }
    },
    //逐文件上传
    uploadfile(file) {
      this.percent=0
      const uploadTask = mpvue.uploadFile({
        url: `${api.HOST_URI}api/uploadfile-normal?rename=false&save2db=false&column=${this.column}&category=${this.category}`,
        filePath: file.url,
        name: 'file',
        formData: {user: 'test'},
        success: (res) => {
          let fileList = this.fileList
          let stt = JSON.parse(res.data)
          let fname = api.getFileName(stt.url)
          let files = fileList.filter(nm => nm.name === fname)
          if (files && files.length == 1) {
            let f = files[0]
            f.url = `${api.HOST_URI}${stt.url}`
            f.status = 'done'
          }
        },
        complete: (res) => {
          console.log(res)
          if (res.errMsg == 'uploadFile:ok') {
            mpvue.showToast({title: '上传成功'})
          }
        }
      });

      uploadTask.onProgressUpdate(res => {
        this.percent = res.progress
        console.log(this.percent)
      });
    }
  }
}
</script>

<style scoped>

</style>
