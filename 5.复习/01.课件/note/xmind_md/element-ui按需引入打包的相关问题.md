### element-ui按需引入打包的相关问题

### 问题1

- MessageBox使用时会提示错误: _MessageBox is not define

- https://github.com/ElementUI/babel-plugin-component/issues/31

- 解决

  ```javascript
  const msgbox = MessageBox // 将MessageBox保存给另一个变量
  const { alert, confirm, prompt } = msgbox
  ```
  
- 原因:  具体原因不详, 应该还是element-ui按需打包时出了问题

- 面试话术: 我在eleement-ui的issues和百度找到了此解决办法, 但没有找到具体的原因, 不知道咱们公司有没有遇到这样的问题

### 问题2

- 对Scrollbar进行引入: 不能通过element-ui引入, 只能明确指定单独引入
- 错误写法: import {Scrollbar} from 'element-ui' // 不能这样引入
- 正确写法: import Scrollbar from 'element-ui/lib/scrollbar' // 必须单独引入
- 原因: scrollbar是隐藏的组件, 没有像其它组件那样暴露出来

### 问题3

- PopConfirm的背景颜色从白色变为了透明色
- 原因: 组件内部用到了另一个组件PopOver, 白色背景的样式是定义在PopOver的对应的css文件中,由于我们没有直接使用PopOver, 所以没有显示的import引入, 那它对应的css就不会自动被打包

- 解决: import引入PopOver