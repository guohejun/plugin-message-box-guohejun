;(function (undefined) {
	"use strict";
	var _global;
	
	// 对象合并
	function extend(o,n,override) {
		for(var key in n){
			if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
				o[key]=n[key];
			}
		}
		return o;
	}
	
	function MessageBox(opt) {
		this._init(opt);
	}
	MessageBox.prototype = {
		constructor: this,
		_init: function (opt) {
			var options = {
				type: "messageBox", //message/messageBox
				className: "",
				title: "提示",
				titleAlign: "center",
				content: "这是内容",
				contentAlign: "center",
				showConfirm: true,
				confirmText: "确定",
				showCancel: false,
				cancelText: "取消",
				showMask: true
			};
			
			this.options = extend(options, opt, true);
			this.hasDom = false;
			this.tpl = "";
			if (this.options.type !== "message") {
				this.options.className += " plugin-message-box-show-mask";
				this.tpl = `<div class="plugin-message-box-mask"></div>`;
			}
			this.tpl += `<div class="plugin-message-box ${this.options.className}"> `;
      if (this.options.type !== "message") {
	      this.tpl += `
          <div class="pmb-header ${this.options.titleAlign}">
				    <span class="pmb-header__text">${this.options.title}</span>
				    <span class="close">×</span>
					</div>`;
      }
	    this.tpl += `<div class="pmb-body"><div class="pmb-content ${this.options.contentAlign}">${this.options.content}</div></div>`;
      this.tpl += `<div class="pmb-footer"><span class="pmb-btn pmb-btn__cancel">${this.options.cancelText}</span>`;
			this.tpl += `<span class="pmb-btn pmb-btn__confirm">${this.options.confirmText}</span></div></div>`;
			this.tpl += `</div>`;
			this.tplStyle = `
				.plugin-message-box-mask {
			    position: fixed;
			    top: 0;
			    left: 0;
			    right: 0;
			    bottom: 0;
			    z-index: 900;
			    background-color: rgba(0,0,0,.5);
				}
				.plugin-message-box {
			    position: fixed;
			    top: 30%;
			    left: 50%;
			    transform: translate(-50%, 0);
			    min-width: 300px;
			    z-index: 991;
			    color: #333;
			    border-radius: 3px;
			    overflow: hidden;
	        box-shadow: 0 0 20px 5px rgba(0,0,0,.1);
				}
				.plugin-message-box.plugin-message-box-show-mask {
			    background-color: #fff;
			    box-shadow: none;
				}
				.pmb-header {
				  position: relative;
				  height: 44px;
				  line-height: 44px;
				  user-select: none;
				}
				.pmb-header.center {
					text-align: center;
				}
				.pmb-header.right {
					text-align: right;
				}
				.pmb-header .close {
		      position: absolute;
		      top: 0;
		      right: 0;
		      width: 44px;
		      height: 44px;
		      line-height: 44px;
		      text-align: center;
		      font-size: 20px;
		      font-weight: 600;
		      cursor: pointer;
		    }
				.pmb-body {
				  color: #666;
				  padding: 0 20px 10px;
				}
				.pmb-footer {
				  height: 44px;
				  line-height: 44px;
				  text-align: center;
				  font-size: 14px;
				  user-select: none;
				}
				.pmb-btn {
				  margin: 0 30px;
				  background-color: #efefef;
				  padding: 5px 12px;
				  border-radius: 2px;
				  cursor: pointer;
				}
				.pmb-btn.pmb-btn__confirm {
					background-color: #d23000;
					color: #fff;
				}
			`;
		},
		_parseToDom: function (str) {
			var div = document.createElement("div");
			if (typeof str === "string") {
				div.innerHTML = str;
			}
			return div;
		},
		_appendStyle: function (str) {
			str = typeof str === "string" ? str : "";
			var style = document.createElement("style");
			var head = document.getElementsByTagName("head")[0];
			style.type = "text/css";
			if (style.styleSheet) {
				style.styleSheet.cssText = str;
			} else {
				style.appendChild(document.createTextNode(str));
			}
			head.appendChild(style);
		},
		show: function (callback) {
			var _this = this;
			if (this.hasDom) return;
			var dom = this._parseToDom(this.tpl);
			console.log(dom)
			document.body.appendChild(dom);
			this._appendStyle(this.tplStyle);
			this.hasDom = true;
			return this;
		}
	};
	
	//暴露给当前函数所在的作用域或顶级对象this（浏览器中为window）
	//准确获取this
	_global = (function() { return this || (0, eval)('this')}());
	if (typeof module !== "undefined" && module.exports) {
		module.exports = MessageBox;
	} else if (typeof define === "function" && define.amd) {
		define(function() {return MessageBox})
	} else {
		!('MessageBox' in _global) && (_global.MessageBox = MessageBox);
	}
}());