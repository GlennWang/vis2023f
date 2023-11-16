function _1(md){return(
md`# HW2 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _constellationName(){return(
["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"]
)}

function _constellations(data){return(
data.map(item => item.Constellation)
)}

function _cCounts(createcCount){return(
createcCount()
)}

function _histogramTipsOrder(createHistogramOrder){return(
createHistogramOrder()
)}

function _createcCount(constellationName,data){return(
function createcCount() {
  var cCounts = [];
  for (var cindex = 0; cindex <= 11; cindex++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    cCounts.push({Constellation:constellationName[cindex], gender:"male", count:0}); 
    //Object包含：1. 星座，2.男性，3.人數(設為0)
    cCounts.push({Constellation:constellationName[cindex], gender:"female", count:0}); 
    //Object包含：1. 星座，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var cindex = x.Constellation*2 + (x.Gender== "男" ? 0 : 1); 
    cCounts[cindex].count++;
    //讀取data array，加總每個星座的人
  })
  return cCounts
}
)}

function _createHistogramOrder(cCounts,constellationName){return(
function createHistogramOrder() {
  var orderObject = {constellation:[], gender:[]};
  var i = 1;
  while(i !== cCounts.length) {
    var barChartItem = cCounts[i];
    if (barChartItem.count !== 0) {
      var convertedIndex = Math.floor(i/2);
      orderObject.constellation.push(constellationName[convertedIndex]);
      orderObject.gender.push(`${barChartItem.gender == "female" ? "女" : "男"} (${barChartItem.count})`);
    }
    i += 2;
    if (i > cCounts.length) {
      i = 0;
    }
  }
  return orderObject;
}
)}

function _9(Plot,cCounts,constellationName){return(
Plot.plot({
  width: 800,
  x: {grid: true},
  y: {grid: true,label:"count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(cCounts, {x: "Constellation", y: "count", sort: {x: {constellationName}}, fill:"gender", tip: true}),
  ]
})
)}

function _10(Plot,constellationName,data,histogramTipsOrder){return(
Plot.plot({
  width:800,
  x: {grid: true}, 
	y: {grid: true,label:"count"},  
	marks: [
    Plot.axisX({tickFormat: cindex => constellationName[cindex]}),
		Plot.rectY(data, Plot.binX({y:"count"}, { 
      x:"Constellation", 
      interval:1, 
      fill:"Gender",
      channels: {
          constellation: {
            value: histogramTipsOrder.constellation,
            label: "Constellation"
          },
          gender: {
            value: histogramTipsOrder.gender,
            label: "gender"
          }
        },
      tip: {
          format: {
            y: false,
            x: false,
            fill: false
          }
        }
      })),    
		Plot.gridY([0])
	 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("constellationName")).define("constellationName", _constellationName);
  main.variable(observer("constellations")).define("constellations", ["data"], _constellations);
  main.variable(observer("cCounts")).define("cCounts", ["createcCount"], _cCounts);
  main.variable(observer("histogramTipsOrder")).define("histogramTipsOrder", ["createHistogramOrder"], _histogramTipsOrder);
  main.variable(observer("createcCount")).define("createcCount", ["constellationName","data"], _createcCount);
  main.variable(observer("createHistogramOrder")).define("createHistogramOrder", ["cCounts","constellationName"], _createHistogramOrder);
  main.variable(observer()).define(["Plot","cCounts","constellationName"], _9);
  main.variable(observer()).define(["Plot","constellationName","data","histogramTipsOrder"], _10);
  return main;
}
