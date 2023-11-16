// https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript

function createArray(length) {
  var arr = new Array(length || 0),
    i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }

  return arr;
}

let academicYear = ["111", "112"];
let departmentAndCode = [
  ["資工系", "590"],
  ["資工所", "598"],
  ["電資AI", "C52"],
  ["電資資安", "C53"],
  ["創新AI", "C71"],
];

let numberOfStudent = 120;
let fictitiousGradeList = createArray(numberOfStudent + 1, 13);

fictitiousGradeList[0] = [
  "序號",
  "班級",
  "學號",
  "姓名",
  "GitHub 帳號",
  "作業一",
  "作業二",
  "作業三",
  "作業四",
  "作業五",
  "作業六",
  "作業七",
  "作業八",
  "作業九",
  "作業十",
];

for (var studentNumber = 1; studentNumber < fictitiousGradeList.length; ++studentNumber) {
  // 生成一個介於 0 和陣列長度之間的隨機索引
  let randomIndexOfdepartment = Math.floor(Math.random() * departmentAndCode.length);
  // 使用隨機索引選擇一組department 跟 code
  let selectedDepartment = departmentAndCode[randomIndexOfdepartment][0];
  let selectedCode = departmentAndCode[randomIndexOfdepartment][1];
  // 生成學生序號
  let sequence_number = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  // 生成入學年
  let randomIndexOfAcademicYear = Math.floor(Math.random() * academicYear.length);
  //   let randomIndexOfdepartment = Math.floor(Math.random() * departmentAndCode.length);
  fictitiousGradeList[studentNumber][0] = studentNumber;
  fictitiousGradeList[studentNumber][1] = selectedDepartment;
  fictitiousGradeList[studentNumber][2] = academicYear[randomIndexOfAcademicYear] + selectedCode + sequence_number;
  fictitiousGradeList[studentNumber][3] =
    String.fromCharCode(Math.floor(Math.random() * 0x51ff + 0x4e00)) +
    String.fromCharCode(Math.floor(Math.random() * 0x51ff + 0x4e00)) +
    String.fromCharCode(Math.floor(Math.random() * 0x51ff + 0x4e00));
  fictitiousGradeList[studentNumber][4] = generateRandomString(10);

  // 生成作業一到作業十的成績
  for (var assignmentIndex = 5; assignmentIndex < fictitiousGradeList[0].length; assignmentIndex++) {
    fictitiousGradeList[studentNumber][assignmentIndex] = Math.floor(Math.random() * 11); // 0到10的整數
  }
}
//alert(fictitiousGradeList);

// https://medium.com/wdstack/quick-blurb-generating-a-table-from-an-array-in-javascript-41386fd449a9
//setup our table array
var tableArr = [
  ["row 1, cell 1", "row 1, cell 2"],
  ["row 2, cell 1", "row 2, cell 2"],
];
//create a Table Object
let table = document.createElement("table");
//iterate over every array(row) within tableArr
for (let row of fictitiousGradeList) {
  //Insert a new row element into the table element
  table.insertRow();
  //Iterate over every index(cell) in each array(row)
  for (let cell of row) {
    //While iterating over the index(cell)
    //insert a cell into the table element
    let newCell = table.rows[table.rows.length - 1].insertCell();
    //add text to the created cell element
    newCell.textContent = cell;
  }
}
//append the compiled table to the DOM
document.body.appendChild(table);

function tableToCSV() {
  // Variable to store the final csv data
  var csv_data = [];

  // Get each row data
  var rows = document.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    // Get each column data
    var cols = rows[i].querySelectorAll("td,th");

    // Stores each csv row data
    var csvrow = [];
    for (var j = 0; j < cols.length; j++) {
      // Get the text data of each cell
      // of a row and push it to csvrow
      csvrow.push(cols[j].innerHTML);
    }

    // Combine each column value with comma
    csv_data.push(csvrow.join(","));
  }

  // Combine each row data with new line character
  csv_data = csv_data.join("\n");

  // Call this function to download csv file
  downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {
  // Create CSV file object and feed
  // our csv_data into it
  CSVFile = new Blob([csv_data], {
    type: "text/csv",
  });

  // Create to temporary link to initiate
  // download process
  var temp_link = document.createElement("a");

  // Download csv file
  temp_link.download = "data.csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  // This link should not be displayed
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  // Automatically click the link to
  // trigger download
  temp_link.click();
  document.body.removeChild(temp_link);
}

// 生出隨機英數(a-z、A-Z、0~9)
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  
  return randomString;
}
