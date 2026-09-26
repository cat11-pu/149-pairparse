// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let text = spec.text || "";
  parts.log.textContent = "文本长度 " + text.length + "，点解析看键值对。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { text: text }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.keys.forEach(function (name, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = name;
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = view.values[spot];
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "键 " + view.count + " 个，最长值 " + view.longest;
    parts.log.textContent = "重复键 " + JSON.stringify(view.duplicates);
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "解析文本";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一对";
  addButton.addEventListener("click", function () {
    text = text + ";z=9";
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一对";
  dropButton.addEventListener("click", function () {
    const spot = text.lastIndexOf(";");
    text = spot === -1 ? "" : text.slice(0, spot);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一段文本";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "a=1;b=2";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { text: box.value }));
      parts.out.textContent = box.value + " 解析出 " + view.count + " 对";
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看重复键";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { text: text }));
    parts.out.textContent = "重复键 " + JSON.stringify(view.duplicates);
  });
  parts.controls.appendChild(readButton);

  draw();
}
