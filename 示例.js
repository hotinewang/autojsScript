"ui";

var color = "#009688";

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="自动化脚本" />
                <tabs id="tabs" />
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <vertical>

                        <linear padding="5 0 0 0">
                            <Switch id="autoService" textColor="red" text="无障碍服务（注意！必须开启才能正常运行脚本）" checked="{{auto.service != null}}" />
                        </linear>

                        <linear padding="5 0 0 0">
                            <text textSize="16sp" textSize="15sp" textColor="black" text="养号开关" />
                            <Switch id="yhkg" textColor="red" checked="true" />
                        </linear>
                        <linear padding="5 0 0 0">
                            <text textColor="black" text="刷" />
                            <input id="gk" w="auto" inputType="number" text="5" />
                            <text textColor="black" text="-" />
                            <input id="gk1" w="auto" inputType="number" text="10" />
                            <text textColor="black" text="个视频,每个停留," />
                            <input id="tl" w="auto" inputType="number" text="5" />
                            <text textColor="black" text="-" />
                            <input id="tl1" w="auto" inputType="number" text="10" />
                            <text textColor="black" text="秒" />
                        </linear>
                        <linear padding="5 0 0 0">
                            <button id="ok" w="*" h="auto" layout_gravity="bottom" style="Widget.AppCompat.Button.Colored" text="启动" />
                        </linear>
                    </vertical>
                </frame>
                <frame>
                    <text text="第二页内容" textColor="red" textSize="16sp" />
                </frame>
                <frame>
                    <text text="作者联系方式VX:YH841280" textColor="Black" textSize="16sp" />
                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg" />
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}" />
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center" />
                </horizontal>
            </list>
        </vertical>
    </drawer>
);


//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("设置");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "设置":
            toast("还没有设置");
            break;
        case "关于":
            alert("关于", "Auto.js界面模板 v1.0.0");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["首页", "账号管理", "关于"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([
    {
        title: "选项一",
        icon: "@drawable/ic_android_black_48dp"
    },
    {
        title: "选项二",
        icon: "@drawable/ic_settings_black_48dp"
    },
    {
        title: "选项三",
        icon: "@drawable/ic_favorite_black_48dp"
    },
    {
        title: "退出",
        icon: "@drawable/ic_exit_to_app_black_48dp"
    }
]);

ui.menu.on("item_click", item => {
    switch (item.title) {
        case "退出":
            ui.finish();
            break;
    }
})


//创建储存对象
var map = storages.create("短视频数据");
if(map.get('gk')){
    ui.gk.setText(map.get('gk'));
    ui.gk1.setText(map.get('gk1'));
    ui.tl.setText(map.get('tl'));
    ui.tl1.setText(map.get('tl1'));
}

//指定确定按钮点击时要执行的动作
ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

//启动
ui.ok.click(function () {
    threads.start(function () {
        toastLog("脚本开始运行")
        if (app.launch("com.ss.android.ugc.aweme")) {
            sleep(2000)
            //判断养号功能开关是否打开
            if (ui.yhkg.checked) {
                养号功能()
            }
        } else {
            alert("请安装抖音,脚本停止")
            exit()
        }
    })

})


//开始养号功能 
function 养号功能() {
    保存数据();
    //获取 需要刷的视频数
    var 视频数 = random(Number(ui.gk.text()), Number(ui.gk1.text()));
    toastLog("正在进行养号功能");
    sleep(2000);
    //等待关注的出现
    desc("关注").waitFor();
    sleep(1000);
    for (let i = 0; i < 视频数; i++) {
        倒计时(ui.tl.text(), ui.tl1.text())
        toastLog("养号进度:" + (i + 1) + "/" + 视频数)
        sleep(random(1500, 1800))
        // log(device.width / 2, (device.height / 2) + (device.height / 2) / 2);
        // log(random(50,device.width-50), device.height / 10);
        gesture(500,
            [device.width / 2, (device.height / 2) + (device.height / 2) / 2],
            [random(50, device.width - 50), device.height / 10])
    }
}

//保存数据
function 保存数据() {
    map.put("gk", ui.gk.text());
    map.put("gk1", ui.gk1.text());
    map.put("tl", ui.tl.text());
    map.put("tl1", ui.tl1.text());
};

function 倒计时(mix1, max2) {
    var 倒数 = random(Number(mix1), Number(max2))
    log("随机延迟：" + 倒数)
    while (true) {
        if (倒数 <= 0) {
            toastLog("倒计时完毕")
            sleep(1000)
            break
        }
        toastLog("倒计时：" + 倒数)
        sleep(2000)
        倒数 -= 2
    }
}
