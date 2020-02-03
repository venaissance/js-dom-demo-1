/* 手写DOM库测试 */

// 1.增
// 1.1 创建节点
const div = dom.create("<div>NEW NODE</div>");
console.log(div);

// 1.2 节点后增加节点
const div1 = dom.create("<div>INSERT AFTER</div>");
dom.after(test, div1);

// 1.3 节点前增
const div2 = dom.create("<div>INSERT BEFORE</div>");
dom.before(test, div2);

// 1.4 新增子节点
const div3 = dom.create("<div>CREATE CHILD</div>");
dom.append(test, div3);

// 1.5 新增父节点
const div4 = dom.create('<div id="parent">CREATE PARENT</div>');
console.log(div4);
dom.wrap(test, div4);

// 2.删
// 2.1 删节点
dom.remove(div3);
console.log(div3);

// 2.2 清空节点
const nodes = dom.empty(window.empty);
console.log(nodes);

// 3.改 & 查
// 3.1 节点属性
dom.attr(test, "title", "Hi, I am Varian");
const title = dom.attr(test, "title");
console.log(`title: ${title}`);

// 3.2 节点内容
dom.text(test, "你好，这是新内容");
dom.text(test);

// 3.3 HTML
dom.html(test1, "<p>新的HTML</p>");
dom.html(test1);

// 3.4 样式
dom.style(test, { border: "1px solid red", color: "blue" });
console.log(dom.style(test, "border"));
dom.style(test, "border", "1px solid green");

// 3.5 class
dom.class.add(test, "red");
dom.class.add(test, "blue");
dom.class.remove(test, "blue");
console.log(dom.class.has(test, "blue"));

// 3.6 事件监听
const fn = () => {
  console.log("CLICKED");
};
dom.on(test, "click", fn);
dom.off(test, "click", fn);

// 3.7 查询
const testDiv = dom.find("#test")[0];
console.log(testDiv);
const test2 = dom.find("#test2")[0];
console.log(dom.find(".red", test2)[0]);

// 3.8 查亲属
console.log(dom.parent(test));
console.log(dom.children(siblings));

const s2 = dom.find("#s2")[0];
console.log(dom.siblings(s2));

console.log(dom.next(s2));

console.log(dom.previous(s2));

// 3.9 应用于每个节点
const t = dom.find("#travel")[0];
dom.each(dom.children(t), n => dom.style(n, "color", "red"));

// 3.10 查节点索引
console.log(dom.index(t3));
