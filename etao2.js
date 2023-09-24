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


/**
 * 上划
 * @returns 
 */
function gestureup()
{
    gesture(random(500,1500),
            [device.width/2+random(-100,100),device.height/4*3+random(0,100)],
            [device.width/2+random(100,200),device.height/7+random(0,100)])
    return null;
}


//---------------------------------------------------------------------------


/**
 * 浏览4-5个商品
 */
function view3item()
{
    if(textContains("约").find())
    {
        arr=textContains("约").find();
        var countN=4;
        if(random()>=0.5)
        {
            countN=5
        }
        var ct=Math.min(countN,arr.length)
        for (var i = 0; i < ct; i++) {
            clickbounds(arr[i].bounds());
            sleep2(2000,3000);
            if(random()>0.5)
            {
                gestureup();
            }
            sleep2(1000,2000);
            back()
            sleep2(1000,2000);
        }
    }
}


/**
 * 进入签到/任务页面
 * @returns 
 */
function toCheckInPage()
{
    if(currentPackage()!="com.taobao.etao")
    {
        launch("com.taobao.etao");
        toastLog("启动APP：com.taobao.etao");
        sleep2(2000,3000);
    }

    if(text("搜索").findOnce()&&text("签到领钱").findOnce())
    {
        clickbounds(text("签到领钱").findOnce().bounds());
        toastLog("从主页进入到“签到领钱页”");
        sleep2(2000,3000);
    }

    return null;
}


/**
 * 获取做任务的任务列表
 * @returns 
 */
function getTaskList()
{
    tlist=textContains("点击会场内3个商品").find();
    return null;
}
 

auto.waitFor(); 
toCheckInPage();
