auto.waitFor(); 

adMaxTime=60000;//单个广告最长播放时间(毫秒)（超过时间会返回处理）
adWaitTime=4000 //检测广告是否播放完毕的时间间隔(毫秒)
maxRunTime=30*60*1000//本脚本最长运行时间(毫秒=分钟*60*1000)
//_score1=0;//初始分值
//_score2=0;//当前分值

//打开微信
launch("com.tencent.mm")
sleep(1000)
//切换到微信主页面
click(110,device.height-100)
sleep(500)
//上划进入小程序
gesture(500,[device.width/2+random(30,60),device.height/7+random(0,60)],[device.width/2+random(0,30),device.height/4*3+random(0,60)])
sleep(1000)
//打开pushplus小程序
if(text("pushplus").findOnce()==null)
{
  	alert("没有在微信小程序列表中找到pushplus推送加，请先手动打开一次或加入到“我的小程序”中。\n脚本终止。");
	  toast("没有在微信小程序列表中找到pushplus推送加，请先手动打开一次或加入到“我的小程序”中。\n脚本终止。");
  	home();
  	exit();
}
click(text("pushplus").findOnce().bounds().centerX(),text("pushplus").findOnce().bounds().centerY())
sleep(2000)
//进入刷广告赚积分页面
click(420,600)
startTimeMillis = new Date().getTime();//脚本运行的初始时间


sleep(1000)
finished=false
//循环打开看广告
while(finished==false)
{
  	nowTimeMillis=new Date().getTime()
  	//toast(nowTimeMillis-startTimeMillis)
  	if(nowTimeMillis-startTimeMillis>maxRunTime)
    {
      	toast("已达到设置的最大运行时间，脚本退出。")
      	finished=true;
      	home();
      	exit();
    }
    sleep(1000)
    btn=text("看广告赚积分").findOnce()
    if(btn)
    {
        toast("找到广告入口并进入广告")
      	click(text("看广告赚积分").findOne().bounds().centerX(),text("看广告赚积分").findOne().bounds().centerY())
      	className("android.widget.TextView").text("看广告赚积分").depth(22).findOne().click();
        //click(500,900)
        i=0
      	//循环检测广告是否播放完毕
        while(i<=adMaxTime)
        {
          	i+=adWaitTime
            sleep(adWaitTime)
          
        	  //检测不分广告中的弹出广告，直接关闭
            btn=text("领取并查看").findOnce() 
            if(btn)
            {
                //click(540,1730)
              	click(text("领取并查看").findOne().bounds().centerX(),text("领取并查看").findOne().bounds().centerY()+340)
            }
          	
          	//检测广告是否播放完毕
            btn=text("已获得奖励").findOnce()
          	btn2=text("更多直播").findOnce()
          	//普通广告
            if(btn&&(btn2==null))
            {
                toast("普通广告播放完毕！")
                click(text("关闭").findOne().bounds().centerX(),text("关闭").findOne().bounds().centerY())
              	//_score2=getScore()
                break;
            }
         	 	//直播类广告
          	else if(btn&&btn2)
            {
                toast("直播广告播放完毕！")
                id("ew0").findOne().children().forEach(child => {var target = child.findOne(id("igx"));target.click();});
                //className("android.widget.TextView").text("关闭").findOne().parent().click()
              	//_score2=getScore()
                break;
            }
            else
            {
                toast("广告播放中")
            }
        }
      	if(i>adMaxTime)
        {
          //超过规定的广告查看最大时间，会直接返回上一页
          toast("观看广告超时，直接返回！")
          back();
          sleep(1000);
          //click(text("看广告赚积分").findOne().bounds().centerX(),text("看广告赚积分").findOne().bounds().centerY());
          click(420,600)
        }
    }
    else 
    {
        toast("没找到广告入口，运行脚本前请确保已进入小程序pushplus推送加主页面！\n脚本终止。")
      	alert("没找到广告入口，运行脚本前请确保已进入小程序pushplus推送加主页面！\n脚本终止。")
        exit();
    }
}
