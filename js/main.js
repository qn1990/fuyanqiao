function calc(){
    var start=getValueById('txtStart');

    var end=getValueById('txtEnd');
    alert((new Date(end).getTime()-new Date(start).getTime())/24/60/60/1000);
}

function calcDate(){
    var start=getValueById('txtDateStart');

    var end=getValueById('txtInterval');
    alert(new Date(new Date(start).getTime() + end * 24 * 60 * 60 * 1000).toISOString().substr(0, 10));
}
function getValueById(id){
    return document.getElementById(id).value
}
// 侧边栏收缩

// 侧边栏收起展开
$('.panel-heading').click(function(){
    $(this).siblings().slideToggle('slow');

});
// 修改散标应还款时间
function product() {
    $.ajax({
        url: "http://192.168.10.35:5555/test/product?productnid=" + $("#productNid").val() + "&repaytime=" + $("#repayTime").val(),
        type: 'get',
        dataType: 'jsonp',
        dataType: "JSON",
        success: function (datas) {
            alert(datas);
        }
    })
}
// 修改优先出借应还款时间
function priority() {
    $.ajax({
        url:"http://192.168.10.35:5555/test/priority?prioritynid="+$('#priorityNid').val()+'&repaytime='+$('#priorityRepayTime').val(),
        type:'get',
        dataType:'jsonp',
        dataType:'JSON',
        success:function(datas){
            console.log(datas);
    }
    })
}
// 删除核心用户
function hexinUserDrop() {
    $.ajax({
        url:'http://192.168.10.35:5555/test/drop?userphone='+$('#hexinUserPhone').val(),
        type:'get',
        success:function(datas){
            console.log(datas);
        }
    })
}
// 获取证件号
$("#getIdCards").click(function getIdCards() {
    $('#showIdCards').html('');
    $.ajax({
        url:'http://192.168.10.35:5555/test/idcards?num='+$('#idCardsNum').val(),
        type:'get',
        dataType:'jsonp',
        dataType:'JSON',
        success:function (datas) {
            var cards=datas.cards||{};
            console.log(datas);
            console.log(cards);
            var str='';
            str+='<table><thead><tr><th>序号</th><th>证件号</th></tr></thead><tbody>';
            // str+='<table>';
            $.each(cards,function(key,value){
                str +='<tr><td>'+key+'</td><td>'+value +'</td>';
            })
            str +='</tbody></table>';
            $('#showIdCards').append(str);
        }
    })
})
// 获取银行卡号
$('#getBnakCards').click(function getBankCards() {
    $('#showBankCards').html('');
    $.ajax({
        url:'http://192.168.10.35:5555/test/bankcards?num='+$("#bankCardsNum").val() +'&bankcode='
            +$("#selectBankCards option:selected").val(),
        type:'get',
        dataType:'jsonp',
        dataType:'JSON',
        success:function (data) {
            console.log(data);
            var cards=data.cards||{};
            var str='';
            str+='<table><thead><tr><th>序号</th><th>银行卡</th></tr></thead><tbody>';
            $.each(cards,function(key,value){
                str+='<tr><td>'+key+'</td><td>'+value+'</td></tr>';
            })
            str+='</tbody></table>';
            $('#showBankCards').append(str);
        }
    })
});
// 页面点击小心心特效
var a_idx = 0;
jQuery(document).ready(function($) {
    $("body").click(function(e) {
    var a = new Array("❤"
        // ,"起来", "不愿做奴隶的人们",
        // "把我们的血肉" ,"筑城我们", "新的长城",
        // "中华民族","到了","最危险的时候",
        // "每个人","被迫着","发出","最后的吼声",
        // "起来","起来","起来","我们万众一心","冒着敌人的炮火","前进","冒着敌人的炮火","前进","前进","前进进"
    );
    var $i = $("<span/>").text(a[a_idx]);
    a_idx = (a_idx + 1) % a.length;
    var x = e.pageX,
    y = e.pageY;
    $i.css({
         // "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
         "top": y - 20,
        "left": x,
        "position": "absolute",
        "font-weight": "bold",
        "color": "#ff6651"
     });
    $("body").append($i);
    $i.animate({
        "top": y - 180,
        "opacity": 0
    },1500,function() {
        $i.remove();
    });
 });
})
