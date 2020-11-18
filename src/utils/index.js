function getFileName(file_path){
  let pos = file_path.lastIndexOf('/');
  return file_path.substr(pos+1);
}

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

const get_columns_page =(column)=>{
  let pi=''
  switch (column){
    case 'video':
      pi = 'videolist';
      break;
    case "music":
      pi='audiolist';
      break;
    case "picture":
      pi="picture-categories"
      break
    case "books":
      pi="book-categories"
      break;
    case "products":
      pi="product-categories";
      break
  }
  return pi
}
const get_lists_page =(category)=>{
  let pi=''
  switch (category){
    case 'book':
      pi = 'book-list';
      break;
    case "product":
      pi='product-list';
      break;
    case "pictures":
      pi="picture-list"
      break
  }
  return pi
}
const get_detail_page =(category)=>{
  let pi=''
  switch (category){
    case 'book':
      pi = 'book-detail';
      break;
    case "product":
      pi='product-detail';
      break;
    default:
      pi='detail'
      break;
  }
  return pi
}

function redictAppDetail (e) {
  var id = e.id;
  var redirecttype = e.redirecttype == null ? 'listpage' : e.redirecttype;
  var url = e.url == null ? '' : e.url;
  var category = e.category == null ? 'book' : e.category

  console.log(`redirecttype=${redirecttype},id=${id}`)
  if (redirecttype == 'columns') //跳转到列表页
  {
    let pg = get_columns_page(e.appid)
    url =   `/pages/${pg}/main`
    console.log(url)
    mpvue.navigateTo({
      url: url
    })
  }
  else if (redirecttype == 'listpage') //跳转到列表页
  {
    let pg = get_lists_page(category)
    url =   `/pages/${pg}/main?id=${id}`
    console.log(url)
    mpvue.navigateTo({
      url: url
    })
  }
}

export default {
  getFileName,
  formatNumber,
  formatTime,
  redictAppDetail:redictAppDetail
}
