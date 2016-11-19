var Common = {
	initDimension: function () {
		width = document.body.clientWidth - 20;
		height = self.innerHeight - 100;
		centerX = width / 2;
		centerY = height / 2;
		clientWidth = document.body.clientWidth - 20;
		clientHeight = document.body.innerHeight;
		Common.findDimensions();
	},
	resetDimension: function () {
		width = document.body.clientWidth - 20;
		height = document.body.scrollHeight - 100;
		centerX = width / 2;
		centerY = height / 2;
		clientWidth = document.body.clientWidth - 20;
		clientHeight = document.body.innerHeight;
		Common.findDimensions();
	},
	findDimensions: function () {
		//获取窗口宽度
		if (window.innerWidth) {
			winWidth = window.innerWidth;
		} else if ((document.body) && (document.body.clientWidth)) {
			winWidth = document.body.clientWidth;
		}
		//获取窗口高度
		if (window.innerHeight) {
			winHeight = window.innerHeight;
		} else if ((document.body) && (document.body.clientHeight)) {
			winHeight = document.body.clientHeight;
		}

		//通过深入Document内部对body进行检测，获取窗口大小
		if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
			winHeight = document.documentElement.clientHeight;
			winWidth = document.documentElement.clientWidth;
		}
	}
};