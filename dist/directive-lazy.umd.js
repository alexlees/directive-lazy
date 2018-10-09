
/**
 * directive-lazy
 * author alexlees
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.DirectiveLazy = {})));
}(this, (function (exports) { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".lazy::after{\n  content: '加载中...';\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  align-content: center;\n  background-color: #eeeeee;\n  color: #999999;\n}\n.lazy{\n  position: relative;\n  display: block;\n}\n.animation{\n  animation: fade 1s ease both;\n}\n@keyframes fade{\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n";
  styleInject(css);

  var DATA_SRC = 'data-src';
  var lazyCSS = 'lazy';
  var animationCSS = 'animation';
  var Lazy = /** @class */ (function () {
      function Lazy() {
          this.options = { threshold: [1] };
          this.observer = new IntersectionObserver(this.IntersectionObserverCallback, this.options);
      }
      Lazy.prototype.install = function (Vue, GlobalOptions) {
          var _this = this;
          if (GlobalOptions === void 0) { GlobalOptions = { aspectRatio: 1 }; }
          Vue.directive('lazy', {
              bind: function (el, binding) {
                  _this.checkEl(el);
                  if (el instanceof HTMLImageElement) {
                      _this.initLazy(el, binding.value, GlobalOptions);
                  }
              },
              inserted: function (el) {
                  if (el instanceof HTMLImageElement) {
                      _this.observer.observe(el);
                  }
              },
              update: function (el) {
                  if (el instanceof HTMLImageElement) {
                      _this.observer.observe(el);
                  }
              },
              unbind: function (el) {
                  if (el instanceof HTMLImageElement) {
                      _this.observer.unobserve(el);
                  }
              }
          });
      };
      Lazy.prototype.checkEl = function (el) {
          if (el instanceof HTMLImageElement) ;
          else {
              console.error('v-lazy directive can only use on HTMLImageElement.');
          }
      };
      Lazy.prototype.IntersectionObserverCallback = function (entries, observer) {
          entries.forEach(function (e) {
              if (e.isIntersecting) {
                  var target_1 = e.target;
                  if (target_1 instanceof HTMLImageElement) {
                      setTimeout(function () {
                          target_1.src = target_1.getAttribute(DATA_SRC);
                      }, 500);
                      observer.unobserve(target_1);
                  }
              }
          });
      };
      Lazy.prototype.initLazy = function (el, aspectRatio, GlobalOptions) {
          var _this = this;
          el.setAttribute(DATA_SRC, el.src);
          el.src = '';
          el.classList.add(lazyCSS);
          this.observer.observe(el);
          if (typeof aspectRatio === 'number') ;
          else {
              aspectRatio = GlobalOptions.aspectRatio;
          }
          el.style.minHeight = window.screen.width / aspectRatio + "px";
          el.addEventListener('load', function (e) {
              var target = e.target;
              if (target instanceof HTMLImageElement) {
                  _this.observer.unobserve(target);
                  target.classList.remove(lazyCSS);
                  target.classList.add(animationCSS);
                  target.style.minHeight = "auto";
              }
          });
      };
      return Lazy;
  }());
  var plugin = new Lazy();
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
      GlobalVue = window.Vue;
  }
  else if (typeof global !== 'undefined') {
      GlobalVue = global.Vue;
  }
  if (GlobalVue) {
      GlobalVue.use(plugin);
  }

  exports.default = plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
