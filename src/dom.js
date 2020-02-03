/* 手写DOM库 */
window.dom = {
  /* 增 */
  // 创建节点
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  // 节点后新增
  after(node, newNode) {
    node.parentNode.insertBefore(newNode, node.nextSibling);
  },
  // 节点前新增
  before(node, newNode) {
    node.parentNode.insertBefore(newNode, node);
  },
  // 新增子节点
  append(parent, node) {
    parent.appendChild(node);
  },
  // 新增父节点，注意顺序
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  /* 删 */
  // 删节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  // 清空所有子节点
  empty(node) {
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(x));
      x = node.firstChild;
    }
    return array;
  },
  /* 改 & 查 */
  // 改&查节点属性
  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  // 节点内容
  text(node, string) {
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string; // 适配IE
      } else {
        node.textContent = string; // 适配Chrome、Firefox
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  // HTML
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  // 样式
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div, 'color', 'red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        // dom.style(div, 'color')
        return node.style[name];
      } else if (name instanceof Object) {
        // dom.style(div, {color: 'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  // class
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    }
  },
  // 增加监听事件
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  // 移除监听事件
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  // 选择器查询
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  // 查父节点
  parent(node) {
    return node.parentNode;
  },
  // 查子节点
  children(node) {
    return node.children;
  },
  // 查兄弟节点
  siblings(node) {
    return Array.from(node.parentNode.children).filter(n => n !== node);
  },
  // 查下一个节点
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  // 查上一个节点
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  // 应用于每个节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  // 查节点索引
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  }
};
