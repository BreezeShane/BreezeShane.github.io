(function() {
	// 定义Fade对象,外部访问接口对象
	var Fade = {
		fadeIn: function(elemt, speed) { //【 上拉接口 】
			TimerManager.creatObject(fadeIn, elemt, speed);
			return this;
		},
		fadeOut: function(elemt, speed) { //【 下拉接口 】
			TimerManager.creatObject(fadeOut, elemt, speed);
			return this;
		},
		fadeToggle: function(elemt, speed) { //【 滑动切换接口 】
			TimerManager.creatObject(fadeToggle, elemt, speed);
			return this;
		}
	};

	// II.构造对象记录计时器和动画状态
	// 1） 定时器管理器构造函数
	function TimerManager(args) {
		this.func = args[0];
		this.elemt = args[1];
		this.speed = args[2] != 0 && args[2] != undefined && args[2] != null ? args[2] : 500;
		this.isStart = false;
	}
	// 2）定时器管理器的静态方法：为element添加一个TimerManager实例
	TimerManager.creatObject = function(funcName, elemt, speed) {
		// 如果elemt对象没有TimerManager属性,或者该属性值不是TimerManager,则就为其添加或更换一个
		if(!elemt.TimerManager || elemt.TimerManager.constructor != TimerManager) {
			elemt.TimerManager = new TimerManager(arguments);
		}
		// 判断该elemt对象的计时器是否启动,如果没有启动，则启动，并执行动画，执行完毕之后修改计时器状态
		if(!elemt.TimerManager.isStart) {
			if(elemt.TimerManager.func.constructor != funcName) {
				elemt.TimerManager.func = funcName;
			}
			elemt.TimerManager.isStart = true;
			elemt.TimerManager.func(elemt, speed)
		}
	}

	// III.执行函数
	// 1）淡入函数
	function fadeIn(elemt, speed) { //淡入 0 ~ 1
		if(getStyle(elemt, "display") == "none"){
			elemt.style.cssText = "display:block;opacity:0;";
			var speed = speed || 500; //执行总时间
			var timeSpeed = speed / 100; //速度
			
			var num = 0,opacNum;
			var timer = setInterval(function() {
				// 修改透明度
				opacNum = Number(elemt.style.opacity);
				elemt.style.opacity = opacNum + 0.01; 
				
				num += timeSpeed;
				if(num >= speed) {
					clearInterval(timer);
					elemt.TimerManager.isStart = false;
				}
			}, timeSpeed);
		} else {
			elemt.TimerManager.isStart = false;
		}
	}
	// 2）淡出函数
	function fadeOut(elemt, speed) { //淡出 1 ~ 0
		if(getStyle(elemt, "display") == "block"){
			var speed = speed || 500; //执行总时间
			var timeSpeed = speed / 100; //速度
			var num = 0,opacNum;
			var timer = setInterval(function() {
				// 修改透明度
				opacNum = Number(elemt.style.opacity) || Number(getStyle(elemt, "opacity"));
				elemt.style.opacity = opacNum - 0.01; 
				num += timeSpeed;
				if(num >= speed) {
					clearInterval(timer);
					elemt.TimerManager.isStart = false;
					elemt.style.cssText = "display:none";
				}
			}, timeSpeed);
		} else {
			elemt.TimerManager.isStart = false;
		}
	}
	// 3）切换函数
	function fadeToggle(elemt, speed) { //切换
		var speed = speed || 16.6; //默认速度为16.6ms
		if(getStyle(elemt, "display") == "none"){
			fadeIn(elemt, speed);
		}else if(getStyle(elemt, "display") == "block"){
			fadeOut(elemt, speed);
		}
	}
	return Fade;
})();
