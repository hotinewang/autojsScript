vnum=50  //最大播放视频数量
timeduring=10000  //每个视频播放时长+-2s
delay=7000 //脚本启动延迟

toastLog("将在"+delay/1000+"秒后运行视频(无脑)刷刷刷脚本,请打开视频APP并切换到视频播放页面。观看"+vnum+"个视频后,会自动关闭当前APP。")
sleep(2000)
delay-=2000
while(delay>0)
{
    toastLog(delay/1000+"秒后即将开始")
    delay-=2000
    sleep(2000)
}
c=0
toastLog("开始自动刷视频")
while(c<vnum)
{
    t=timeduring+random(-2000,2000)  //视频播放时长
    toastLog(t/1000+"秒后切换下一个视频")
    sleep(t)
    gesture(500+random(-10,50),
        [device.width/2+random(0,30),device.height/4*3+random(0,60)],
        [device.width/2+random(30,60),device.height/7+random(0,60)])
    toastLog("已看完第"+(c+1)+"/"+vnum+"个视频");
    c++
}
home()