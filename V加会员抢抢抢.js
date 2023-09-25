var i = dialogs.multiChoice("选择要抢的券\n选择已抢过券可能会耽误最佳抢券时机哦\n请提前登录手机银行，并停留在手机银行主页面。", ["抢微信立减金", "抢美团外卖券"]);
toast("启用民生V+会员自动抢功能。")
app.launchApp("民生银行")
sleep(1000)
//toast("当前屏幕分辨率"+device.width+"*"+device.height)
setScreenMetrics(1080, 2400);

sleep(1000)
toast("切换到-我的")
click(device.width-80, device.height-100);

sleep(5000)

vplusbtn=text("V+会员").findOnce()
if(vplusbtn)
{
    toast("进入v+会员")
    vplusbtn.parent().click()
}
else{
    toast("没找到V+会员按钮,程序结束。")
    exit();
}
//click(150, 800);

sleep(3000)

//检测微信立减金和美团会员
toast("检测微信立减金")
ct=0
while(ct<10000)
{
    tbtn=text("微信立减金").findOnce()
    if(tbtn)
    {
        toast("找到了微信立减金")
        tbtn.click()
        sleep(500)
        if(text("该权益已抢光").findOnce())
        {
            text("关闭").findOnce().click();
            ct++
            continue;
        }
        else if(text("稍后再试").findOnce())
        {
            text("确定").findOnce().click()
            ct++
            continue;
        }
        else if(text("确定领取").findOnce())
        {
            //这里需要测试能否点击到确认领取，并处理已经领取和没有领取的情况
            //点击确认领取，与测试能否成功点击按钮
            text("确定领取").findOnce().click()
            
            if(text("本周期内您已领取").findOnce())
            {
                text("确定").findOnce().click()
                ct=99999999
            }
            else
            {
                toast("领取成功！")
                
                ct=99999999
            }
            //这里需要返回到权益选择页！！！
        }
        else if(text("确定").findOnce())
        {
            text("确定").findOnce().click()
        }
    }
    else{
        toast("没有找到微信立减金，翻页")
        sleep(500)
    }
    ct++
}