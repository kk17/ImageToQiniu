var getImageInfo = function (image) {
  var url = 'background.html#' + image.srcUrl;
  chrome.windows.create({ url: url, left: 0, top : 0, width: 450, height: 600 ,type : 'popup'});
} 
chrome.contextMenus.create({
  "title" : "上传到七牛",
  "type" : "normal",
  "contexts" : ["image"],
  "onclick" : getImageInfo
});
