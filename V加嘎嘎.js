//---------------------------------hotineLib----------------------------------

/**
 * 点击一个bounds对象所在的区域，点击在bounds区域中心60%的随机位置
 * @param {*} boundsObj bounds对象
 * @returns 无返回
 */
function clickbounds(boundsObj)
{
    click(boundsObj.centerX()+random(-boundsObj.width()/2*0.6,boundsObj.width()/2*0.6),boundsObj.centerY()+random(-boundsObj.height()/2*0.6,boundsObj.height()/2*0.6));
    return null;
}


/**
 * 进阶sleep()函数，在指定的最短和最长毫秒数之间，随机随眠
 * @param {*} minTime 最短毫秒数
 * @param {*} maxTime 最长毫秒数
 * @returns 
 */
function sleep2(minTime,maxTime)
{
    var t=random(minTime,maxTime);
    sleep(t);
    return null
}

//---------------------------------------------------------------------------


/**
 * 进入V+会员领取的页面
 * @returns 
 */
function openVplusPage()
{
    if(currentPackage()!="cn.com.cmbc.newmbank")
    {
      	toastLog("启动手机银行");
        launch("cn.com.cmbc.newmbank");
        sleep(1000);
    }

    //切换到“我的”
    if(!text("本月福利").findOnce())
    {
        click(device.width-80, device.height-100);
        sleep(500);
    }
    
    //to v+ page
    if(text("V+会员").findOnce()&&text("银行卡").findOnce())
    {
        text("V+会员").findOnce().parent().click();
    }
    
    if(text("本月福利").findOne(5000))
    {
        toastLog("找到V+会员入口！")
        //getVplusReward("美团外卖券");
        return true;
    }
    else
    {
        toastLog("没找到V+会员入口或尚未登录手机银行，程序退出。");
        return false;
    }
    
}

/**
 * 尝试循坏点击某权益并领取
 * @param {*} type 权益全名（手机银行中显示的名称）
 * @returns 
 */
function getVplusReward(type)
{
    toastLog("开始割割："+type+"!")
    if(type=="微信立减金" || type=="美团外卖券"|| type=="代发新客礼")
    {
        //如果找不到微信立减金或者美团券，就退出抢券
        if(text(type).findOnce()==null)
        {
            toastLog("没有找到“"+type+"”");
            return false;
        }
        
        got=false;
        while(got==false)
        {
            
            //如果弹出了“该权益已抢光”，关掉
            if(text("该权益已抢光").findOnce())
            {
                text("关闭").findOnce().click();
                //toastLog("关");
                sleep(400);
            }
            //如果弹出了“当前访问用户过多”，关掉
            else if(textStartsWith("当前访问用户过多").findOnce())
            {
                text("确定").findOnce().click();
                //toastLog("关");
                sleep(400);
            }
            //如果进入了权益领取界面，点击"确定领取"
            else if(text("确定领取").findOnce())
            {
                //text("确定领取").findOnce().click();
                clickbounds(text("确定领取").findOnce().bounds())
                sleep(300);
                //发现重复领取，直接退出函数
                if(textStartsWith("该权益半周期内您已领取").findOnce())
                {
                    toastLog("已领过权益：“"+type+"”");
                    text("确定").findOnce().click();
                    back();
                    return false;
                }
                if(textStartsWith("抱歉您不符合该权益领取条件").findOnce())
                {
                    toastLog("不符合该权益领取条件：“"+type+"”");
                    text("确定").findOnce().click();
                    back();
                    return false;
                }
              	if(textStartsWith("本周期内您可领权益次数已用尽").findOnce())
                {
                    toastLog("可领权益次数已用尽：“"+type+"”");
                    text("确定").findOnce().click();
                    back();
                    return false;
                }
                if(text("提示").findOnce())
                {
                    toastLog("预料外的提示内容：“"+type+"”");
                    text("确定").findOnce().click();
                    back();
                    sleep(400);
                    back();
                    return false;
                }
            }
          	//如果在V+会员权益选择界面，则点击目标权益
            else if(text(type).findOnce())
            {
                text(type).findOnce().click();
                //toastLog("点");
                sleep(400);
            }
            
        }
    }
    else if(type=="其他权益")
    {
        //
    }
    return false;
}

//等待无障碍服务启用
auto.waitFor();


if(openVplusPage())
{
    //getVplusReward("微信立减金");
}
if(openVplusPage())
{
    getVplusReward("美团外卖券");
}