(function(){
    var src = document.location.hash.replace('#','');
    var originName = getImageName(src);
    var imageType = getImageType(src);
    var pathPrefix = localStorage.getItem('pathPrefix');
    $('#fileName').attr('value', originName);
    $('.pre-name').text(pathPrefix + originName + imageType);
    $('.image-info').attr('src', src);

    if (localStorage.getItem('accessKey')) {
        $('.collapseTwo').click();
        $('#accessKey_value').text(localStorage.getItem('accessKey'));
        $('#secretKey_value').text(localStorage.getItem('secretKey'));
        $('#spaceName_value').text(localStorage.getItem('spaceName'));
        $('#domainName_value').text(localStorage.getItem('domainName'));
        $('#pathPrefix_value').text(localStorage.getItem('pathPrefix'));
        $('#serverUrl_value').text(localStorage.getItem('serverUrl'));
    } else {
        $('.collapseOne').click();
        var text = '第一次使用请设置';
        $('#accessKey_value').text(text);
        $('#secretKey_value').text(text);
        $('#spaceName_value').text(text);
        $('#domainName_value').text(text);
        $('#pathPrefix_value').text("img/");
        url = 'http://lvming6816077.sinaapp.com/qiniu-server/test.php';
        $('#serverUrl_value').text(url);
    }


    $('.token-value').click(function(){
        $(this).hide();
        $(this).next('input').val($(this).text()).show().focus();
    });
    $('.token-input').blur(function(){
        $(this).hide();
        $(this).prev('p').text($(this).val()).show();
    });
    $('#fileName').keyup(function(){
        var str = $(this).val();
        $('.pre-name').text(pathPrefix + str + imageType);
    });
    $('#save_token').click(function(){
        var accessKey = $('#accessKey_value').text();
        var secretKey = $('#secretKey_value').text();
        var spaceName = $('#spaceName_value').text();
        var domainName = $('#domainName_value').text();
        var pathPrefix = $('#pathPrefix_value').text();
        var serverUrl = $('#serverUrl_value').text();
        localStorage.setItem('accessKey',accessKey);
        localStorage.setItem('secretKey',secretKey);
        localStorage.setItem('spaceName',spaceName);
        localStorage.setItem('domainName',domainName);
        localStorage.setItem('serverUrl',serverUrl);
        localStorage.setItem('pathPrefix',pathPrefix);
        alert('设置成功');
        $('.collapseTwo').click();
    });
    $('#submit').click(function(){
        var accessKey = localStorage.getItem('accessKey');
        var secretKey = localStorage.getItem('secretKey');
        var spaceName = localStorage.getItem('spaceName');
        var serverUrl = localStorage.getItem('serverUrl');
        var fileName = $('#fileName').val();
        if (accessKey && secretKey && spaceName && fileName) {
            var type = getImageType(src);
            if (type) {
                fileName = pathPrefix + fileName + type;
            } else {
                alert('图片URL有误');
            }
            $('.loading').removeClass('hidden');
           $.ajax({
                'type' : 'POST',
                'url' : serverUrl, 
                'data' : {'accessKey' : accessKey, 'secretKey' : secretKey, 'bucket' : spaceName, 'url' : src, 'fileName' : fileName},
                'dataType' : 'json',
                'success' : function(data){
                    if (data.status == 'success') {
                        $('.loading').addClass('hidden');
                        showResult(data.data);
                    }
                }
           });
           

        } else {
            alert('input error!');
        }
        
    });
    function showResult(data){
        $('.collapseThree').click();
        var urlPrefix = 'http://' + localStorage.getItem('domainName') + '/';
        $('.result-url').attr('href', urlPrefix + data.key);
        $('.result-url').text(urlPrefix + data.key);
        $('.result-hash').text(data.hash);
    }
    function getImageName(url){
        var reg = /([^\/]+)(\.jpg|\.jpeg|\.png|\.gif)/i;
        var match = url.match(reg);
        if (match && match.length != 0) {
            return match[1];
        } else {
            return "";
        }
    }
    function getImageType(url){
        var reg = /\.jpg|\.jpeg|\.png|\.gif/i;
        var match = url.match(reg);
        if (match && match.length != 0) {
            return match[0];
        } else {
            return "";
        }
    }
})();
