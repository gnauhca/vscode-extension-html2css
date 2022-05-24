class Node {
  classes: string[] = [];
  parent: Node | null = null;
  children: Node[] = [];
  ended = false;
  comment = '';
  addChild(child: Node) {
    if (child.parent !== this) {
      child.parent = this;
      this.children.push(child);
    }
  }
}

function getLess(htmlStr: string) {
  const root = new Node();
  let current = root;
  let less = '';

  htmlStr.replace(/(<!--(.+)-->|<([\w-]+)[^>]*?(\/?)>|<\/[\w-]+>)/gim, (str) => {
    if (/^<([\w-]+)/.test(str)) {
      let child = new Node();
      // start tag
      const matched = str.match(/class=.*?([\w-\s]+)/);
      const tagInfoMatched = str.match(/<([\w-]+)[^>]*?(\/?)>/)!;
      const tag = tagInfoMatched[1];
      const selfEnd = tagInfoMatched[2];
      const ended = !!(tag === 'image' || selfEnd);

      if (matched) {
        const classes = matched[1].split(/\s+/);
        child.classes = classes;
        const existChild = current.children.find(item => item.classes.length && item.classes[0] === child.classes[0]);
        if (existChild) {
          existChild.classes = [...existChild.classes, ...child.classes];
          current = existChild;
          existChild.ended = ended;
          child = existChild;
          current = child.parent!;
        }
      }
      current.addChild(child);
      if (ended) {
        child.ended = true;
      } else {
        current = child;
      }
    } else if (/<\/[\w-]+>/.test(str)) {
      current.ended = true;
      current = current.parent!;
    } else {
      const child = new Node();
      child.comment = str.replace(/<!--(.+)-->/, '$1');
      current.addChild(child);
    }
    return '';
  });
  function getStr(node: Node, deep = 0) {
    const space = new Array(Math.max(deep, 0)).fill('  ')
      .join('');
    const nextDeep = node.classes.length ? deep + 1 : deep;
    const nextSpace = new Array(Math.max(nextDeep, 0)).fill('  ')
      .join('');
    let start = '';
    let end = '';
    let modifiersStr = '';
    let childrenStr = '';
    if (node.comment) {
      return `${space}/* ${node.comment} */\n`;
    }
    if (node.classes.length) {
      const classes = Array.from(new Set(node.classes));
      const [cls, ...restCls] = classes;
      start = `${space}.${cls} {\n`;
      end = `${space}}\n`;
      modifiersStr = restCls.map(item => `${nextSpace}&.${item} {\n${nextSpace}}\n`).join('');
    }
    node.children.forEach((child) => {
      childrenStr += getStr(child, nextDeep);
    });
    return start + modifiersStr + childrenStr + end;
  }
  less = getStr(root, 0);
  less = less.trim();
  return less;
}

export default getLess;
