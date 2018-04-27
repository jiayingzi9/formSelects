;(function () {
    var defaults={
        url:null,
        title:'请选择',
        selected:null,
        width:'100%',
        height:'300px',
        onItem:null,
        Sradio:false,
    }
    var parent={
        init:function () {
            parent.title.call(this);
            parent.switch.call(this);
            parent.inputTitle.call(this);
            parent.defStyle.call(this);
            parent.defStyleUl.call(this);
            parent.Sradio.call(this);
            //控制下拉宽和input框相等
            $('.jf-formSelect1-list').width($('.jf-formSelect1').width()-3);
        },
        title:function () {
            var that = $(settings);//重新保存指向
            var html = '';
            // 读取select 标签的值
            html += '<ul class="jf-formSelect1-list">';
            //获取url请求的值
            $.ajax({
                cache:false,
                type: opt.ajaxType,
                url: opt.url,
                dataType: 'json',
                crossDomain: true == !(document.all),
                contentType: "application/json; charset=utf-8",
                cache: false,
                success: function(msg){
                    var str = '';
                    $.each(msg,function (index, item){
                        //设置selected
                        var selected = $(item).attr('selected');
                        //设置disabled
                        var disabled = $(item).attr('disabled');
                        // 如果有selected 就添加样式,否则为空
                        var isSelected = selected ? 'jf-formSelect1-selectedColor' : '';
                        //如果有disabled 就添加,否则为空
                        var isDisabled = disabled ? 'jf-formSelect1-disabled' : '';
                        if(selected){
                            str += '<li value="'+item.value+'" class=" '+isSelected+' " ><input type="radio" name="sr" class="jf-formSelect1-Sradio"><a class="jf-formSelect1-itemA">'+item.label+'</a></li>';
                            $(that).find('.jf-formSelect1-inputTitle').val(str);
                        }else if(disabled){
                            str += '<li value="'+item.value+'" class=" '+isDisabled+' "><input type="radio" name="sr" class="jf-formSelect1-Sradio"><a class="jf-formSelect1-itemA">'+item.label+'</a></li>';
                        }else {
                            str += '<li value="'+item.value+'"><input type="radio" value=" '+item.value+' " name="sr" class="jf-formSelect1-Sradio"> <a class="jf-formSelect1-itemA">'+item.label+'</a></li>';
                        }
                    });
                    $(settings).find('>ul').append(str);
                }
            });
            html += '</ul>';
            $(settings).append(html);//添加ul
             //如果有url路径,从url里面获取数据,如果没有url请求,从data里面获取数据
             if(opt.data.length>0 && opt.url==null){
                if(opt.data.length>0 && opt.url==null){
                    var str = '';
                    $.each(opt.data,function (index, item) {
                        str += '<li value="'+item.value+'"><input type="radio" name="sr" class="jf-formSelect1-Sradio"><a class="jf-formSelect1-itemA">'+item.label+'</a></li>';
                    });
                    $(settings).find('>ul').append(str);
                }
            }
        },
        Sradio:function () {
            if(opt.Sradio==true){
                if($(settings).find('.jf-formSelect1-Sradio')!='none'){
                    $(settings).find('.jf-formSelect1-list').click(function (e) {
                        var parentDom =$(this).parents('div.jf-formSelect1');
                        var sr=$(settings).find('.jf-formSelect1-selectedColor');
                        var $this=$(e.target|| e.srcElement).parent('li');
                        parentDom.find('input.jf-formSelect1-inputTitle').val($this.text())
                            .attr('name',$this.attr('value'));
                    });
                    $(settings).find('.jf-formSelect1-itemA').css('pointer-events','none');
                }
            }
            var $sr=$(settings).find('.jf-formSelect1-Sradio');
            //是否显示radio
            return opt.Sradio ? $sr.show() : $sr.hide();
        },
        switch:function () {
            var that = $(settings);//重新保存指向
            $(settings).find('.jf-formSelect1-inputBlock').click(function (e) {
                var parentDom =$(this).parents('div.jf-formSelect1');
                parentDom.find('.jf-formSelect1-list').slideToggle(100);
                parentDom.find('.jf-formSelect1-list').toggleClass('jf-formSelect1-open');
                parentDom.find('.jf-formSelect1-arrow').toggleClass('jf-formSelect1-show');
            })
        },
        inputTitle:function () {
            var that = $(settings);//重新保存指向
            var _opt= opt;
            //添加方法
            $(settings).click(function (e) {
                _opt.onItem&&_opt.onItem.call(this, e);
            })
            $(settings).find('.jf-formSelect1-list').not('.jf-formSelect1-disabled').click(function (e) {
                $(settings).onItem&&$(settings).onItem.call(this, e);
              // console.log(e,e.target,e.currentTarget);
                //获取值放到input
                var parentDom =$(this).parents('div.jf-formSelect1');
                parentDom
                    .find('input.jf-formSelect1-inputTitle')
                    .val($(e.target|| e.srcElement).text())
                    .attr('name',$(e.target|| e.srcElement).attr('value'));
                    //filter-show控制箭头
                    $(that).find('.jf-formSelect1-arrow').toggleClass('jf-formSelect1-show');
                   //隐藏UL
                   var $ul=parentDom.find('.jf-formSelect1-list');
                   $ul.fadeOut(200);
            });
            $(settings).find('.jf-formSelect1-list').not('.jf-formSelect1-disabled').click(function (e) {
                var $li=$(e.target|| e.srcElement).parent('li');
                //  控制颜色
                $li.addClass('jf-formSelect1-selectedColor').siblings().removeClass('jf-formSelect1-selectedColor');
            })
        },
        //控制样式样式
        defStyle:function () {
            return settings.css({
                'width':opt.width,
            });
        },
        defStyleUl:function () {
            var $ul=settings.find('.jf-formSelect1-list');
            return $ul.css({
                'height':opt.height
            })
        },
    }
    var formSelect1=function ($ele,$opt) {
        //用户自定义的值覆盖默认值
        settings=$.extend({},defaults,$ele);
        opt=$.extend({},defaults,$opt);
        parent.init.call(this);
    }
    formSelect1.prototype={

    }
    window.JF ? window.JF['formSelect1']=formSelect1 : window.formSelect1 =formSelect1;
})();