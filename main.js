//1，点击生成按钮会根据输入的值来生成几行几列的表格
window.onload = function(){
	var cols = document.getElementById("hang");
	var cums = document.getElementById("lie");
	var create = document.getElementById("creat");
	var del = document.getElementById("dele");
	var foots = document.getElementById("canvas");
	var begins = document.getElementById("begin");
	var ends = document.getElementById("end");
	var boxs = document.getElementsByClassName('dragbox');
	var nows = document.getElementById("nows");
	var deles = document.getElementById("dele");
	var footWidth = foots.clientWidth;
	var footHeight = foots.clientHeight;
	var footsContent = foots.innerHTML;
	//点击按钮生成表格
	create.onclick = function(){
		if(foots.innerHTML = ''){
			chuangjian();
		}else{
			foots.innerHTML = '';
			chuangjian();
		}
		for(var s=0;s<boxs.length;s++){
             begins.value = boxs[0].id;
             ends.value = boxs[s].id;
		}
	}
	
	//创建表格函数
	function chuangjian(){
		var colsNum = cols.value;
		    cumsNum = cums.value;
		    if(colsNum=='' || cumsNum=='' || isNaN(Number(colsNum)) == true || isNaN(Number(cumsNum)) == true){
		    	alert('行或列不能为空并且是数字！');
		    }else{
		    		for(var j=1;j<=cumsNum;j++){
		    				for(var i=1;i<=colsNum;i++){
		    			var box = document.createElement('div');
		    			box.style.border = '1px solid #C0C0C0';
		    			box.style.width = footWidth / colsNum + 'px';
		    			box.style.height = footHeight / cumsNum + 'px';
		    			box.style.float = 'left';
		    			box.classList = 'dragbox';
		    			box.setAttribute('id',j+','+i);
		    			box.setAttribute('unselectable','on');
		    			foots.appendChild(box);
		    		}
		    	}
		    }
	}
	//清除功能
	deles.onclick = function(){
		for(let i=0;i<boxs.length;i++){
			boxs[i].className = 'dragbox';
             nows.value = null;
		}
	}
	//鼠标按下,抬起，移动选择区域功能
	foots.onmousedown = function(event){
		event.preventDefault();
		var startx = event.clientX - foots.offsetLeft;
		var starty = event.clientY - foots.offsetTop;
		var box = document.createElement('div');
		box.style.left = startx+'px';
		box.style.top = starty+'px';
		box.style.position = 'absolute';
		box.style.border = '0px dashed darkgray';
		foots.appendChild(box);
		var arr = [];
		var lists = document.getElementsByClassName('dragbox');
		for(var i=0;i<lists.length;i++){
			arr.push(lists[i]);
		}
		var s = box.offsetLeft; t = box.offsetTop;
		var w = box.offsetWidth; h = box.offsetHeight;
		for(var i=0;i<arr.length;i++){
			var s_ = arr[i].offsetLeft + arr[i].offsetWidth;
			var h_ = arr[i].offsetTop + arr[i].offsetHeight;
			if(s_>s&&h_>t&&arr[i].offsetLeft<s+w&&arr[i].offsetTop<t+h){
				arr[i].className = arr[i].className + ' yanse';
				console.log(arr[i].id);
			}else{
				arr[i].className = 'dragbox';
			}
		}
		
		foots.onmousemove = function(event){
			event.preventDefault();
            box.style.width = Math.abs((event.clientX-foots.offsetLeft)-startx)+'px';
            box.style.height = Math.abs((event.clientY-foots.offsetTop)-starty)+'px';
            box.style.left = Math.min((event.clientX-foots.offsetLeft),startx)+'px';
            box.style.top = Math.min((event.clientY-foots.offsetTop),starty)+'px';
            	var arr = [];
		var lists = document.getElementsByClassName('dragbox');
		for(var i=0;i<lists.length;i++){
			arr.push(lists[i]);
		}
		var s = box.offsetLeft; t = box.offsetTop;
		var w = box.offsetWidth; h = box.offsetHeight;
		for(var i=0;i<arr.length;i++){
			var s_ = arr[i].offsetLeft + arr[i].offsetWidth;
			var h_ = arr[i].offsetTop + arr[i].offsetHeight;
			if(s_>s&&h_>t&&arr[i].offsetLeft<s+w&&arr[i].offsetTop<t+h){
				arr[i].className += ' yanse';
                nows.value = arr[i].id;
			}else{
				arr[i].className = 'dragbox';
			}
		}
			foots.onmouseup = function(event){
				event.preventDefault();
				foots.onmousemove = '';
				box.style.display = 'none';
			}
		}
	}
	//移动端事件
   var canvas=document.getElementById("canvas");
       var spirit,startX,startY;
    // touch start listener
        function touchStart(event) {
                 event.preventDefault();
                 if (spirit ||! event.touches.length) return;
                 var touch = event.touches[0];
                 startX = touch.pageX;
                 startY = touch.pageY;
                 spirit = document.createElement("div");
                 spirit.className = "spirit";
                 spirit.style.left = startX - canvas.offsetLeft+"px";
                 spirit.style.top = startY - canvas.offsetTop+"px";
                 canvas.appendChild(spirit);
                 var arr = [];
                 var odiv = document.getElementsByClassName('dragbox');
                 for(var i=0;i<odiv.length;i++){
                 	arr.push(odiv[i]);
                 }
                var s = spirit.offsetLeft; t = spirit.offsetTop;
                var w = spirit.offsetWidth;h = spirit.offsetHeight;
                for(var i=0;i<arr.length;i++){
                	var s_ = arr[i].offsetLeft + arr[i].offsetWidth;
                	var h_ = arr[i].offsetTop + arr[i].offsetHeight;
                	if(s_>s&&h_>t&&arr[i].offsetLeft<s+w&&arr[i].offsetTop<t+h){
					   arr[i].className = arr[i].className + ' yanse';
					   console.log(arr[i].id);
				}else{
					arr[i].className = 'dragbox';
				}
                }
        }
        
        // add touch start listener
        canvas.addEventListener("touchstart",touchStart,false);
         function touchMove(event) {
                event.preventDefault();
                if (!spirit || !event.touches.length) return;
                var touch = event.touches[0];
                spirit.style.width = Math.abs(startX - touch.pageX)+'px';
                spirit.style.height = Math.abs(startY - touch.pageY)+'px';
                spirit.style.left = Math.min(touch.pageX,startX);
                spirit.style.top = Math.min(touch.pageY,startY);
                var arr = [];
                 var odiv = document.getElementsByClassName('dragbox');
                 for(var i=0;i<odiv.length;i++){
                 	arr.push(odiv[i]);
                 }
                var s = spirit.offsetLeft; t = spirit.offsetTop;
                var w = spirit.offsetWidth;h = spirit.offsetHeight;
                for(var i=0;i<arr.length;i++){
                	var s_ = arr[i].offsetLeft + arr[i].offsetWidth;
                	var h_ = arr[i].offsetTop + arr[i].offsetHeight;
                	if(s_>s&&h_>t&&arr[i].offsetLeft<s+w&&arr[i].offsetTop<t+h){
					   arr[i].className += ' yanse';
					    nows.value = arr[i].id;
				}else{
					arr[i].className = 'dragbox';
				}
                }
        }
        canvas.addEventListener("touchmove", touchMove, false);
        function touchEnd(event){
            if(!spirit)return;
            canvas.removeChild(spirit);
            spirit=null;  
        }
        canvas.addEventListener("touchend",touchEnd,false);
    
}
