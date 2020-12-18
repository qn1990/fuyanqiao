// 侧边栏整体收缩展开

// 侧边栏标题收缩展开
$('.panel-heading').click(function(){
    $(this).siblings().slideToggle('slow');

});
// 侧边栏点击/悬浮变色{
$("#myNav p").mouseover=function () {
    $(this).css("font-size","20px");
}
$("#myNav p").mouseout=function () {
    $(this).css("font-size","18px");
}
// 定义ip
// var ip='http://192.168.0.149:5555';
var ip='http://192.168.10.35:5555';
// var ip='http://10.0.0.104:5555';
// 修改散标应还款时间
function product() {
    $.ajax({
        url: ip+"/test/product?productnid=" + $("#productNid").val() + "&repaytime=" + $("#repayTime").val(),
        type: 'get',
        dataType: 'jsonp',
        dataType: "JSON",
        success: function (datas) {
            alert('修改成功');
        }
    })
}
// 修改优先出借应还款时间
function priority() {
    $.ajax({
        url:ip+"/test/priority?prioritynid="+$('#priorityNid').val()+'&repaytime='+$('#priorityRepayTime').val(),
        type:'get',
        dataType:'jsonp',
        dataType:'JSON',
        success:function(datas){
            alert("修改成功");
        }
    })
}
// 删除核心用户
function hexinUserDrop() {
    $.ajax({
        url:ip+'/test/drop?userphone='+$('#hexinUserPhone').val(),
        type:'get',
        dataType:'jsonp',
        dataType:'JSON',
        success:function(datas){
        }
    })
}
// 生成报单
$('#getBill').click(function getBill() {
    var da={
        authorization:$('#authorization').val(), billCustomerMobile:$("#billCustomerMobile").val(),
        idCard:$("#idCard").val(), billCustomerName:$('#billCustomerName').val(),
        funding:$("#funding option:selected").val(), borrowAmount:$('#borrowAmount').val()
    };
    $.ajax({
        url:ip+'/test/billAdd',
        type:'post',
        data:JSON.stringify(da),
        dataType:'JSON',
        success:function(data){
            var billId=data.billId;
            var show='';
            show+='本次生成报单id:'+billId;
            $('#yunkong1').append(show);
        }
    })
});
// 修改消金还款时间
$("#eProductRepayTime").click(function eProductRepayTime(){
    $('#eProductResult').html('');
    var p=$("#period").val()
    p=parseInt(p);
    var date=new Date($("#eRepayTime").val());
    var month=date.getMonth()+1;
    var day=date.getDate();
    var hour=date.getHours();
    var minutes=date.getMinutes();
    if(month<10){
        if(day<10){if(hour<10){if(minutes<10){minutes='0'+minutes;}hour='0'+hour;}day='0'+day;}month='0'+month;
    }
    console.log(month,day,hour,minutes);
    date=date.getFullYear()+'-'+month+'-'+day+"+"+ hour+':'+minutes+':57';
    console.log(date);
    $.ajax({
        url:ip+"/test/ecmrepay?eproductnid="+$("#eProductNid").val()+"&erepaytime="+date
            +"&period="+p,
        type:'get',
        dataType: 'jsonp',
        dataType: "JSON",
        success:function(datas){
            console.log(datas);
            var status=datas.status;
            if(status==0){
                var data=datas.data||[];
                var str='<thead><tr><th>标的号</th><th>期数</th><th>应还时间</th></tr></thead><tbody>';
                var product=$("#eProductNid").val();
                $.each(data,function(number,content) {
                    str+='<tr><td>'+product+'</td><td>'+content.period+'</td><td>'+content.repaytime+'</td></tr>';
                }  )
                str+='</tbody>';
            }else if(status==1){
                var str='修改失败';
            }else{
                var str='未知原因';
            }
            $('#eProductResult').append(str);
        }
    })
});
// 获取证件号
$("#getIdCards").click(function getIdCards() {
    $('#showIdCards').html('');
    $.ajax({
        url:ip+'/test/idcards?num='+$('#idCardsNum').val(),
        type:'get',
        dataType:'jsonp',
        dataType:'JSON',
        success:function (datas) {
            var cards=datas.cards||{};
            var str='';
            str+='<table><thead><tr><th>序号</th><th>证件号</th></tr></thead><tbody>';
            $.each(cards,function(key,value){
                str +='<tr><td>'+key+'</td><td>'+value +'</td></tr>';
            })
            str +='</tbody></table>';
            $('#showIdCards').append(str);
        }
    })
})
// 获取银行卡号
$('#getBankCards').click(function getBankCards() {
    $('#showBankCards').html('');
    $.ajax({
        url:ip+'/test/bankcards?num='+$("#bankCardsNum").val() +'&bankcode='
            +$("#selectBankCards option:selected").val(),
        type:'get',
        dataType:'jsonp',
        dataType:'JSON',
        success:function (data) {
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
// 日期计算
$("#count1").click(function countDays(){
        $("#result1").html('');
        var str=$("#startDate").val();
        if(str==''){
            var start=new Date()
        }else{
            var start=new Date($("#startDate").val());
        }
        var end=new Date($("#endDate").val());
        var days=end.getTime()-start.getTime();
        var day=parseInt(days/(1000*60*60*24))+1;
        $("#result1").append(day-1+'天');
        });
$("#count2").click(function countEndDate(){
        $("#result2").html("");
        var str=$("#startDate2").val();
        if(str==''){
            var start=new Date()
        }else{
            var start=new Date($("#startDate2").val());
        }
        var days=$("#addTime").val();
        var end=Math.abs(start)+days*(24*60*60*1000);
        var endDate=new Date(end);
        var year=endDate.getFullYear();
        var month=endDate.getMonth()+1;
        var day=endDate.getDate();
        var newDate=year+"-"+month+"-"+day;
        $("#result2").append(newDate);
});
//查看说明
$("#instruction").click(function () {
        var id=$("#myContent div[class~=in]").attr('id');
        if(id=="wangcai1"){
            alert('修改应还款日期');
        }else if(id=="wangcai2"){
            alert('修改优先出借应还款日期');
        }else if(id=="wangcai3"){

        }else if(id=="wangcai4"){

        }else if(id=="yunkong1"){

        }else if(id=="tongyong1"){

        }
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
    var x = e.pageX, y = e.pageY;
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
// page.smartNavigation="true"