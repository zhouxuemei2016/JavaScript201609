~function (pro) {
    //->queryURLParameter:把URL地址问号后面的参数值以对象键值对的方式保存下来
    function queryURLParameter() {
        var reg = /([^?&=#]+)=([^?&=#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype);
/*var str = 'http://localhost:1234/detail.html?id=4&age=25';
 str.queryURLParameter();*/


var detailRender = (function () {
    var submit = document.getElementById('submit'),
        userName = document.getElementById('userName'),
        userAge = document.getElementById('userAge'),
        userPhone = document.getElementById('userPhone'),
        userAddress = document.getElementById('userAddress');

    //->bindEvent:绑定提交的点击事件
    function bindEvent() {
        submit.onclick = function () {
            var data = '{"name":"' + userName.value + '","age":' + userAge.value + ',"phone":"' + userPhone.value + '","address":"' + userAddress.value + '"}';
            ajax({
                url: "/addInfo",
                type: "POST",
                dataType: "JSON",
                data: data,
                success: function (result) {
                    if (result && result.code == 0) {
                        window.location.href = "index.html";
                    }
                }
            });
        }
    }

    return {
        init: function () {
            //->进入页面首先应该获取URL地址栏中的参数信息,如果有ID就是修改而不是增加,并且还需要知道修改的是哪一个客户(获取浏览器地址栏的URL:window.location.href)
            //'http://localhost:1234/detail.html?id=4&age=25' ->{id:4,age:25} 类似于NODE中的URL.PARSE第二个参数写TRUE后得到的QUERY的值
            var obj = window.location.href.queryURLParameter();
            console.log(obj);

            //->绑定提交的点击事件
            bindEvent();
        }
    }
})();
detailRender.init();