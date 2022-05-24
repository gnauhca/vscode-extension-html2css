# html2css

EN ｜ [中文](./README-zh_CN.md)

Parse selected HTML text into scss/less structure and copy to clipboard

## Feature

* Based on class name
* Support HTML/JSX/Vue template/wxml... content
* Support for converting HTML comments
* After selecting, support right-click menu parsing

## Usage
With HTML text selected, CSS can be generated to the clipboard with:
- Run the html2css command (cmd + shift + p)
- Right-click menu to run html2css
- Use shortcut keys, windows: ctrl + alt + h，mac: cmd + option + h


## Parse example

From

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

To

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
