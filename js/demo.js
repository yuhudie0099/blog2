window.onload = function() {
	var list = document.getElementById('list');
	var boxs = list.children;
	var timer;
	var idx = 1;

	//formateDate
	function formateDate(date) {
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		m = m > 9 ? m : '0' + m;
		return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
	}

	//Delete Node
	function removeNode(node) {
		if(confirm('confirm to delete?')) {
			alert('deleted successfully');
			node.parentNode.removeChild(node);
			return true;
		}
		return false;

	}

	function reply(box, el) {
		var commentList = box.getElementsByClassName('comment-list')[0];
		var textarea = box.getElementsByClassName('comment')[0];
		var commentBox = document.createElement('div');
		commentBox.className = 'comment-box clearfix';
		commentBox.setAttribute('user', 'self');
		commentBox.innerHTML =
			'<img class="myhead" src="images/my.jpg" alt=""/>' +
			'<div class="comment-content">' + '<span class="user">me：</span>' +
			'<p class="comment-text" id="' + idx + '">' + textarea.value + '</p>' +
			'<p class="comment-time">' +
			formateDate(new Date()) + '<a href="javascript:;" class="comment-edit">Edit</a>' +
			'<a href="javascript:;" class="comment-operate">Delete</a>' +
			'</p>' +
			'</div>'
		commentList.appendChild(commentBox);
		console.log(commentBox);
		idx++;
		textarea.value = '';
		textarea.onblur();
	}
	//Edit
	function edit(el) {
		var commentContent = el.parentNode.parentNode;
		var commentText = commentContent.getElementsByClassName("comment-text")[0];

		var val = commentText.innerHTML;
		console.log(val);
		commentText.innerHTML = "<textarea type='text' id='n'>" + val + "</textarea>";
		console.log(commentText.innerHTML);
		document.getElementById("n").addEventListener("blur", function(e) {
			commentText.innerHTML = document.getElementById("n").value;
		});

	}
	//Publish

	function operate(el) {
		var commentBox = el.parentNode.parentNode.parentNode;
		var box = commentBox.parentNode.parentNode.parentNode;
		var txt = el.innerHTML;
		var user = commentBox.getElementsByClassName('user')[0].innerHTML;
		var textarea = box.getElementsByClassName('comment')[0];
		if(txt == 'publish') {
			textarea.focus();
			textarea.value = 'publish' + user;
			textarea.onkeyup();
		} else {
			removeNode(commentBox);

		}

	}

	//把事件代理到每条分享div容器
	for(var i = 0; i < boxs.length; i++) {

		//clickevent
		boxs[i].onclick = function(e) {
			e = e || window.event;
			var el = e.srcElement;
			switch(el.className) {
				//close the article
				case 'close':
					removeNode(el.parentNode);
					break;

					//publish button on
				case 'btn':
					reply(el.parentNode.parentNode.parentNode, el);
					break

					//publish button off
				case 'btn btn-off':
					clearTimeout(timer);
					break;

					//delete
				case 'comment-operate':
					operate(el);
					break;
					//edit
				case 'comment-edit':
					edit(el);
					console.log(el);
					break;
			}
		}

		//评论
		var textArea = boxs[i].getElementsByClassName('comment')[0];
		console.log(textArea);
		//评论获取焦点
		textArea.onfocus = function() {
			this.parentNode.className = 'text-box text-box-on';
			this.value = this.value == 'text…' ? '' : this.value;
			this.onkeyup();
		}

		//评论失去焦点
		textArea.onblur = function() {
			var me = this;
			var val = me.value;
			if(val == '') {
				timer = setTimeout(function() {
					me.value = 'text…';
					me.parentNode.className = 'text-box';
				}, 200);
			}
		}

		//评论按键事件
		textArea.onkeyup = function() {
			var val = this.value;
			var len = val.length;
			var els = this.parentNode.children;
			var btn = els[1];
			var word = els[2];
			btn.className = 'btn';
		}

	}
}