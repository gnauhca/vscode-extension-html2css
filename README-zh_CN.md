# html2css

中文 ｜ [EN](./README.md)

将选中的 HTML 文本解析成 scss/less 结构，并复制到剪贴板

## 特性

* 基于类名生成的 CSS
* 支持类 HTML 文本如 JSX/Vue template/wxml 等
* 支持转换 HTML 注释
* 选中后支持右键菜单解析

## 用法
选中 HTML 文本后，可以用以下方法生成 CSS 到 剪贴板：
- 运行 html2css 命令 (cmd + shift + p)
- 右键菜单运行 html2css
- 使用快捷键，windows: ctrl + alt + h，mac: cmd + option + h

## 转换示例

```html
<div class="container">
  <!-- header comment -->
  <div class="header"></div>
  <!-- content comment -->
  <div class="content">
    <div class="list">
      <div class="item item-1"></div>
      <div class="item item-2"></div>
      <div class="item item-3"></div>
    </div>
  </div>
  <!-- footer comment -->
  <div class="footer"></div>
</div>
```

转换得到

```less
.container {
  /*  header comment  */
  .header {
  }
  /*  content comment  */
  .content {
    .list {
      .item {
        &.item-1 {
        }
        &.item-2 {
        }
        &.item-3 {
        }
      }
    }
  }
  /*  footer comment  */
  .footer {
  }
}
```
