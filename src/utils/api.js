import config  from "./config"
var domain = config.getDomain;

var HOST_URI = 'http://' + domain+'/';

function getFullVisitUrl(addr){
  return `${HOST_URI}/${addr}`
}

function getNewPictureCategoriesUrl(){
  let url = `${HOST_URI}sales/pictures-categories/new`
  console.log(`api url=${url}`)
  return url
}

//获得图片分类数据地址
function getPictureCategoriesUrl(){
  let url = `${HOST_URI}sales/pictures-categories`
  console.log(`api url=${url}`)
  return url
}

//获得某分类下的图片数据地址
function getCategoriesPicturesUrl(id){
  let url = `${HOST_URI}sales/pictures-list/${id}`
  return url
}

function getPictureListByCategoryWithpageIndex(id,pi,ps=20){
  let url = `${HOST_URI}sales/pictureslist?id=${id}&ps=${ps}&pi=${pi}`
  return url
}
//获得某图片详情
function getPictureDetailUrl(id){
  let url = `${HOST_URI}sales/pictures-list/${id}`
  return url
}

function getFileName(file_path){
  let pos = file_path.lastIndexOf('/');
  return file_path.substr(pos+1);
}

export default {
  HOST_URI,
  getNewPictureCategoriesUrl,
  getPictureCategoriesUrl,
  getPictureListByCategoryWithpageIndex,
  getFileName
}
