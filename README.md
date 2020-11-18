使用mpvue写的一个图片中心小程序。  

为学习mpvue,小程序，和使用git的使用。  
本项目仅仅是为本人学习而编写。虽是完整项目，但为学习用，有错误难免。  
项目中的图片是存储在服务器上，非本地图片。因此需要有个后台服务程序。

一、从项目中学习到:  
使用vant-weapp等第三方组件。  
使用mpvue.request发送get和post请求。  
使用van-uploader上传图片。  
使用git.  
回故并熟悉vue的开发。  

二、新建mpvue项目  
需要安装vue脚手架，如已安装请忽略。
# 全局安装 vue-cli
$ npm install --global vue-cli

三、初始化一个mpvue 项目
创建一个基于 mpvue-quickstart 模板的新项目，新手一路回车选择默认就可以了
$ vue init mpvue/mpvue-quickstart pic-center

安装依赖，
$ cd pic-center
$ npm install
$ npm run dev

若需要sass支持
npm i node-sass
npm i sass-loader@6.x --save-dev
随着运行成功的回显之后，可以看到本地多了个 dist 目录，这个目录里就是生成的小程序相关代码
在项目中使用vant的微信插件时，在微信开发中工具中选中es6转es5.

四、搭建小程序的开发环境
微信小程序自己有一个专门的开发者工具 ，最新版本下载地址，去下载并安装它。

打开小程序开发工具
选择小程序项目.点击+,选择导入项目
    选择项目目录：就是刚刚创建的项目目录（非dist目录,如上面的pic-center）


五、git的使用
一.先有git项目，克隆下来即可（是这样吗，在未来学习过程中验证）。
二.先有本地项目
1.在资源管理器项目目录上点右键，选择git bash here
2.输入 git init. 设置git管理此项目
3.输入 git add .
4.git commit -m 'message',开始提交到本地仓库。
下面的步骤是独立
(
1.在github上建立远程仓库。
2.记住仓库链接地址。
)
5.git remote add origin 远程仓库地址。（此步骤仅第一次需要做）。
6.git push -u origin master.将本地仓库推送到远程仓库。

六、修改提交(基于五的工作目录）
若修改了文件。在当前工作目录下
1.git status	可查看状态。
2.git commit -a -m 'messages'，可将改动提交到本地仓库。
3.git push	可将改动推送到远程仓库。