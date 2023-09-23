auto.waitFor(); // 文档地址：https://docs.hamibot.com/reference/widgetsBasedAutomation
launch("com.taobao.etao")

sleep(1000)

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
 
 
 //---------------------------------------------------------------------------


function qianDaoLingQian()
{
  toastLog("开始签到领钱任务！")
  sleep(3000)
  if(text("签到领钱").findOnce()==null)
  {
    toastLog("没有找到签到领钱。结束本任务。")
    exit();
    return null;
  }
  clickbounds(text("签到领钱").findOnce().bounds());
  //click(text("签到领钱").findOnce().bounds().centerX(),text("签到领钱").findOnce().bounds().centerY())
  
  //等待页面加载(此处需要优化)
  for(aa=0;aa<10;aa++)
  {
    if(textContains("做任务攒能量").findOnce())
    {
      aa=99;
      break;
    }
    else
    {
      sleep(1000);
    }
  }
  if(aa!=99)
  {
    toastLog("没找到签到领钱入口，脚本退出！");
    exit();
  }
  
  //点击签到气泡
  sleep(1000)
  if(text("签到").findOnce())
  {
    clickbounds(text("签到").findOnce().bounds());
    //click(text("签到").findOnce().bounds().centerX(),text("签到").findOnce().bounds().centerY()-20)
    toastLog("已签到！")
  }
  
  //逛首页推荐好货
  if(textStartsWith("逛首页推荐好货").findOnce())
  {
      item=textStartsWith("逛首页推荐好货").findOnce().parent().parent().findOne(textContains("去逛逛"))
      if(item)
      {
          toastLog("开始任务：逛首页推荐好货")
          clickbounds(item.bounds());
          sleep2(5000,6000);
          gestureup();
          sleep2(5000,6000);
          gestureup();
          sleep2(5000,6000);
          click(text("签到领钱").findOnce().bounds().centerX(),text("签到领钱").findOnce().bounds().centerY())
          toastLog("完成任务：逛首页推荐好货")
          sleep(1000)
      } 
  }

  if(textStartsWith("浏览天猫超市频道").findOnce())
  {
      item=textStartsWith("点击会场内3个商品").findOnce().parent().parent().findOne(textContains("去逛逛"))
      if(item)
      {
          toastLog("开始任务：浏览天猫超市频道")
          clickbounds(item.bounds());
          sleep2(2000,4000)
          //点击三个商品
          view3item()
          back();
          sleep2(2000,3000)
      }
  }



  if(textStartsWith("浏览天猫国际频道").findOnce())
  {
      item=textStartsWith("浏览天猫国际频道").findOnce().parent().parent().findOne(textContains("去逛逛"))
      if(item)
      {
          toastLog("开始任务：浏览天猫国际频道")
          clickbounds(item.bounds());
          sleep2(2000,4000)
          //点击三个商品
          view3item()
          back();
          sleep2(2000,3000)
      }
  }



  if(textStartsWith("逛“超级U选”更优惠").findOnce())
  {
      item=textStartsWith("逛“超级U选”更优惠").findOnce().parent().parent().findOne(textContains("去逛逛"))
      if(item)
      {
          toastLog("开始任务：逛“超级U选”更优惠")
          clickbounds(item.bounds());
          sleep2(2000,4000)
          //点击三个商品
          view3item()
          back();
          sleep2(2000,3000)
      }
  }

  for(loop=0;loop<3;loop++)
  {
      if(textStartsWith("逛“品牌特卖”大牌店铺").findOnce())
      {
          item=textStartsWith("逛“品牌特卖”大牌店铺").findOnce().parent().parent().findOne(textContains("去浏览"))
          if(item)
          {
              toastLog("开始任务：逛“品牌特卖”大牌店铺")
              clickbounds(item.bounds());
              sleep2(2000,4000)
              //点击三个商品
              view3item()
              back();
              sleep2(2000,3000)
          }
      }
  }


  for(loop=0;loop<3;loop++)
  {
      if(textStartsWith("在一淘搜索").findOnce())
      {
          item=textStartsWith("在一淘搜索").findOnce().parent().parent().findOne(textContains("去搜索"))
          if(item)
          {
              toastLog("开始任务：在一淘搜索...")
              clickbounds(item.bounds());
              sleep2(2000,4000)
              //点击三个商品
              view3item()
              back();
              sleep2(2000,3000)
          }
      }
  }


  if(textStartsWith("逛今日直播好货").findOnce())
  {
      item=textStartsWith("逛今日直播好货").findOnce().parent().parent().findOne(textContains("去逛逛"))
      if(item)
      {
          toastLog("开始任务：逛今日直播好货")
          clickbounds(item.bounds());
          sleep2(2000,4000)
          //点击三个商品
          view3item()
          back();
          sleep2(2000,3000)
      }
  }


  if(textStartsWith("逛百亿补贴频道").findOnce())
  {
      item=textStartsWith("逛百亿补贴频道").findOnce().parent().parent().findOne(textContains("去逛逛"))
      if(item)
      {
          toastLog("开始任务：逛百亿补贴频道")
          clickbounds(item.bounds());
          sleep2(2000,4000)
          //点击三个商品
          view3item()
          back();
          sleep2(2000,3000)
      }
  }


  if(textStartsWith("逛中秋团圆季品类日活动").findOnce())
  {
      item=textStartsWith("逛中秋团圆季品类日活动").findOnce().parent().parent().findOne(textContains("去逛逛"))
      if(item)
      {
          toastLog("开始任务：逛中秋团圆季品类日活动")
          clickbounds(item.bounds());
          sleep2(2000,4000)
          //点击三个商品
          view3item()
          back();
          sleep2(2000,3000)
      }
  }



  if(textStartsWith("逛科技抗老品类日").findOnce())
  {
      item=textStartsWith("逛科技抗老品类日").findOnce().parent().parent().findOne(textContains("去逛逛"))
      if(item)
      {
          toastLog("开始任务：逛科技抗老品类日")
          clickbounds(item.bounds());
          sleep2(2000,4000)
          //点击三个商品
          view3item()
          back();
          sleep2(2000,3000)
      }
  }

  if(textStartsWith("逛迪卡侬大牌日活动").findOnce())
  {
      item=textStartsWith("逛迪卡侬大牌日活动").findOnce().parent().parent().findOne(textContains("去逛逛"))
      if(item)
      {
          toastLog("开始任务：逛迪卡侬大牌日活动")
          clickbounds(item.bounds());
          sleep2(2000,4000)
          //点击三个商品
          view3item()
          back();
          sleep2(2000,3000)
      }
  }


  if(textStartsWith("去菜鸟每天抽手机").findOnce())
  {
      item=textStartsWith("去菜鸟每天抽手机").findOnce().parent().parent().findOne(textContains("去逛逛"))
      if(item)
      {
          toastLog("开始任务：去菜鸟每天抽手机")
          clickbounds(item.bounds());
          sleep2(2000,4000)
          //view3item()
          back();
          sleep2(2000,3000)
      }
  }

  if(textContains("大牌日活动").findOnce())
  {
      item=textContains("大牌日活动").findOnce().parent().parent().findOne(textContains("去逛逛"))
      if(item)
      {
          toastLog("开始任务：大牌日活动")
          clickbounds(item.bounds());
          sleep2(2000,4000)
          view3item()
          back();
          sleep2(2000,3000)
      }
  }


  if(textContains("逛运动品类日").findOnce())
  {
      item=textContains("逛运动品类日").findOnce().parent().parent().findOne(textContains("去逛逛"))
      if(item)
      {
          toastLog("开始任务：逛运动品类日")
          click(item.bounds().centerX(),item.bounds().centerY())
          sleep2(2000,4000)
          view3item()
          back();
          sleep2(2000,3000)
      }
  }

  toastLog("全部任务完成，拜拜！")
 
  return null;
}


qianDaoLingQian()
