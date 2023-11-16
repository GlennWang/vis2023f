// 參考 D3 畫廊中由 shaunkallis 所提供的樣本 Stacked Horizontal Bar Chart of cumulative homework scores
// https://observablehq.com/@shaunkallis/stacked-horizontal-bar-chart-of-cumulative-homework-score
// 參考 109590004 同學的strong
// https://yu-wei-lyu.github.io/vis2023f/hw01/src-strong/index.html
// 然後試著用插值函數變了顏色
// 本來弄了隨機的顏色 但好醜就註解掉了

let parsedCsv;
let studentInfo = [];
let series;
let colorDict;
const labelSpan = [10, 45, 100, 150, 210];
const margin = { top: 5, right: 10, bottom: 0, left: 250 };

// 載入 CSV 檔案
d3.text("../data/csv/data.csv").then(function (data) {
    parsedCsv = d3.csvParse(data, (d, i, columns) => {
      d3.autoType(d); // 自動檢測並轉換數據類型
      d.total = d3.sum(columns.slice(5), c => d[c]); // 計算總分
      studentInfo.push([d.序號, d.班級, d.學號, d.姓名, d['GitHub 帳號']]);
      return d;
    });
  
    series = d3.stack().keys(parsedCsv.columns.slice(5))(parsedCsv).map(d => (d.forEach(v => v.key = d.key), d));
  
    // 使用插值函數來產生顏色
    const colorScale = d3.scaleSequential(d3.interpolateRainbow)
      .domain([0, parsedCsv.columns.slice(5).length]);
  
    createHintSvg(colorScale);
    createScoreSvg(colorScale);


    // 也可以使用 getRandomColor 函數生成隨機顏色
    // const randomColorScale = d3.shuffle(d3.range(series[0].length)).map(i => getRandomColor());
  
    // createHintSvg(randomColorScale);
    // createScoreSvg(randomColorScale);
 
});

//***************************************************
function domainConvert(student) {
  return student.序號;
}

function createHintSvg(colorScale) {
  const rectHeight = 20;
  const rectWidth = 64;
  const scoreHeader = parsedCsv.columns.slice(5);
  const width = 900;
  const height = rectHeight;

  // 創建作業顏色對照表的 SVG
  const hintSvg = d3.create("svg")
    .attr("viewBox", [0, -margin.top, width, height + margin.top]);

  hintSvg.append("g")
    .attr("transform", "translate(0,15)")
    .attr("opacity", 1)
    .append("text")
    .selectAll("tspan")
    .data(parsedCsv.columns.slice(0, 5)).enter()
    .append("tspan")
    .attr("x", (d, i) => labelSpan[i])
    .attr("font-size", "8pt")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text(d => d);

  // 繪製固定長度的多色矩形
  hintSvg.append("g")
    .attr("id", "score-hint")
    .selectAll("rect")
    .data(scoreHeader)
    .join("rect")
    .attr("fill", (d, i) => colorScale(i))  // 使用插值函數產生顏色
    .attr("x", (d, i) => i * rectWidth + margin.left)
    .attr("y", 0)
    .attr("width", rectWidth)
    .attr("height", rectHeight);

    // 隨機顏色
    // hintSvg.append("g")
    // .attr("id", "score-hint")
    // .selectAll("rect")
    // .data(scoreHeader)
    // .join("rect")
    // .attr("fill", (d, i) => colorScale[i])  // 使用打亂後的順序
    // .attr("x", (d, i) => i * rectWidth + margin.left)
    // .attr("y", 0)
    // .attr("width", rectWidth)
    // .attr("height", rectHeight);

  // 於多色矩形之上添加"作業X"文字
  hintSvg.select("#score-hint")
    .selectAll("text")
    .data(scoreHeader)
    .join("text")
    .attr("class", "rect-text")
    .attr("x", (d, i) => (i) * rectWidth + margin.left + 31)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .style("font-size", 10)
    .text(d => d);

  d3.select("#div1")
    .style("font-size", "28pt")
    .style("width", "90%")
    .style("margin", "5px auto")
    .style("text-align", "center")
    .node()
    .appendChild(hintSvg.node());
}

function createScoreSvg(colorScale) {
  const width = 900;
  const height = parsedCsv.length * 25 + margin.top + margin.bottom;
  const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en");

  const y = d3.scaleBand()
    .domain(parsedCsv.map(d => domainConvert(d)))
    .range([margin.top, height - margin.bottom])
    .padding(0.08);

  const x = d3.scaleLinear()
    .domain([0, 100])
    .range([margin.left, width - margin.right]);

  const scoreSvg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height]);

    scoreSvg.append("g")
    .attr("id", "chart")
    .selectAll("g")
    .data(series)
    .join("g")
    .attr("fill", d => colorScale(parsedCsv.columns.slice(5).indexOf(d.key)))  // 使用插值函數產生顏色
    .selectAll("rect")
    .data(d => d)
    .join("rect")
    .attr("x", d => x(d[0]))
    .attr("y", (d, i) => y(domainConvert(d.data)))
    .attr("width", d => x(d[1]) - x(d[0]))
    .attr("height", y.bandwidth())
    .append("title")
    .text(d => `${d.data.姓名} ${d.key} 分數 ${formatValue(d.data[d.key])}`);

    // 隨機顏色
    // scoreSvg.append("g")
    // .attr("id", "chart")
    // .selectAll("g")
    // .data(series)
    // .join("g")
    // .attr("fill", (d, i) => colorScale[i])  // 使用打亂後的順序
    // .selectAll("rect")
    // .data(d => d)
    // .join("rect")
    // .attr("x", d => x(d[0]))
    // .attr("y", (d, i) => y(domainConvert(d.data)))
    // .attr("width", d => x(d[1]) - x(d[0]))
    // .attr("height", y.bandwidth())
    // .append("title")
    // .text(d => `${d.data.姓名} ${d.key} 分數 ${formatValue(d.data[d.key])}`);

  // 添加 text 元素，確保它在 rect 之後
  scoreSvg.select("#chart")
    .selectAll("g")
    .data(series)
    .join("g")
    .selectAll("text")
    .data(d => d)
    .join("text")
    .attr("class", "rect-text")
    .attr("x", d => x(d[0]) + (x(d[1]) - x(d[0])) / 2)
    .attr("y", (d, i) => y(domainConvert(d.data)) + 16)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text(function (d) {
      const score = d[1] - d[0];
      return score !== 0 ? score : "";
    });

  d3.select("#div2")
    .style("width", "90%")
    .style("margin", "5px auto")
    .node()
    .appendChild(scoreSvg.node());

  d3.select("#div2")
    .select("svg")
    .append("g")
    .attr("transform", "translate(0,0)")
    .call(d3.axisRight(y).tickFormat(""))
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll("g").select("line").remove())
    .selectAll("g")
    .data(studentInfo)
    .selectAll("text")
    .data(d => [d])
    .attr("font-size", "8pt")
    .selectAll("tspan")
    .data(d => d)
    .enter()
    .append("tspan")
    .attr("x", (d, i) => labelSpan[i])
    .attr("text-anchor", "middle")
    .html((d, i) => {
      if (i === 4) {
        return '<a xlink:href="https://github.com/' + d + '/vis2023f/" target="_blank" style="fill: blue; text-decoration: underline;">' + d + '</a>';
      } else {
        return d;
      }
    });
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}