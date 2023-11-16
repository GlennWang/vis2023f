d3.select("#div1")
  .append("table")
  .append("tr")
  .selectAll("td")
  .data([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
  .enter()
  .append("td")
  .text(function (d, i) {
    if (i <= 10 || isNaN(d)) {
      return d;
    }
  })
  // img
  .attr("class", function (d, i) {
    if (d == 10) return "excellent-kid";
    else if (d >= 7) return "good-kid";
    else if (d >= 2) return "fair-kid";
    else return "poor-kid";
  })
  .append("img")
  .attr("src", function (d, i) {
    if (d == 10) return "../data/svg/52.svg";
    else if (d == 9) return "../data/svg/51.svg";
    else if (d == 8) return "../data/svg/42.svg";
    else if (d == 7) return "../data/svg/41.svg";
    else if (d == 6) return "../data/svg/32.svg";
    else if (d == 5) return "../data/svg/31.svg";
    else if (d == 4) return "../data/svg/22.svg";
    else if (d == 3) return "../data/svg/21.svg";
    else if (d == 2) return "../data/svg/12.svg";
    else if (d == 1) return "../data/svg/11.svg";
    else if (d == 0) return "../data/svg/01.svg";
    else return "../data/svg/00.svg";
  })
  .attr("x", "0")
  .attr("y", "0")
  .attr("width", function (d, i) {
    return (i + 1) * 60;
  })
  .attr("height", function (d, i) {
    return (i + 1) * 60;
  });

d3.text("../data/csv/data.csv").then(function (data) {
  //var parsedCSV = d3.csv.parseRows(data);
  parsedCSV = d3.csvParseRows(data);
  //console.log(parsedCSV);

  var container = d3
    .select("#div2")
    .append("table")
    .selectAll("tr")
    .data(parsedCSV)
    .enter()
    .append("tr")
    .selectAll("td")
    .data(function (d) {
      return d;
    })
    .enter()
    .append("td")
    .html(function (d, i) {
      if (i == 4 && d != "GitHub 帳號") {
        return (
          '<a href="https://' +
          d +
          '.github.io/vis2023f/" target="_blank"><img src="https://' +
          d +
          '.github.io/vis2023f/hw00/me.jpg"></a>' +
          '<hr><a href="https://github.com/' +
          d +
          '/vis2023f/" target="_blank">' +
          d +
          "</a>"
        );
      } else if (i == 0 || i == 2 || isNaN(d)) {
        return d;
      }
    })
    .filter(function (d, i) {
      return i > 2 && !isNaN(d) && d != "";
    })
    .attr("class", function (d, i) {
      if (d == 10) return "excellent-kid";
      else if (d >= 7) return "good-kid";
      else if (d >= 2) return "fair-kid";
      else return "poor-kid";
    })
    .append("img")
    .attr("src", function (d, i) {
      if (d == 10) return "../data/svg/52.svg";
      else if (d == 9) return "../data/svg/51.svg";
      else if (d == 8) return "../data/svg/42.svg";
      else if (d == 7) return "../data/svg/41.svg";
      else if (d == 6) return "../data/svg/32.svg";
      else if (d == 5) return "../data/svg/31.svg";
      else if (d == 4) return "../data/svg/22.svg";
      else if (d == 3) return "../data/svg/21.svg";
      else if (d == 2) return "../data/svg/12.svg";
      else if (d == 1) return "../data/svg/11.svg";
      else if (d == 0) return "../data/svg/01.svg";
      else return "../data/svg/00.svg";
    })
    .attr("width", 50)
    .attr("height", 50);
});
