# directive-lazy

> 轻量级图片懒加载指令
## 特点

> 零配置开箱即用


## 使用方式

***

0. 下载

```bash
npm install directive-lazy
```

或者

```bash
yarn add directive-lazy
```

1. 引入

```javascript
import DirectiveLazy from 'directive-lazy'
```

2. 注册

```javascript
Vue.use(DirectiveLazy)
```

3. 使用

```html
<div>
<!-- 在img标签中添加 v-lazy 即可-->
  <img src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg" v-lazy alt="">
  <img src="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"  v-lazy alt="">
</div>
```

***

#### 全局配置参数

| key | desc | type | default | required |
| :--: | :--: | ---: | :-----: | :------: |
| aspectRatio | 图片宽高比 | Number | 1 | false |

```javascript
import DirectiveLazy from 'directive-lazy'

Vue.use(DirectiveLazy, {aspectRatio: 1})
```

#### 指令参数

```html
<!-- 设置aspectRatio 为2 -->
  <img src="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"  v-lazy="2" alt="">
```
#### Tips

> 建议传递aspectRatio参数

#### CDN

```html
<!-- 引入文件 -->
<script src="https://unpkg.com/directive-lazy/dist/directive-lazy.umd.min.js"></script>
```

#### TODO

- [  ] 加载时自定义动画。
