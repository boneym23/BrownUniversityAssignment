let myArray = [];

$.ajax({
  method: "GET",
  url:
    "https://randomuser.me/api/?results=20&inc=name,dob,gender,nat&nat=ca,us",
  success: function(response) {
    console.log(response);
    myArray = response.results;

    console.log(myArray);
    buildTable(myArray);
  }
});
function buildTable(results) {
  let table = document.getElementById("myTable");
  for (let i = 0; i < results.length; i++) {
    let cDate = new Date(results[i].dob.date)
      .toDateString()
      .split(" ")
      .slice(1)
      .join(" ");

    let row = `<tr>
              <td>${results[i].gender}</td>
							<td>${results[i].name.first}</td>
							<td>${results[i].name.last}</td>
              <td>${results[i].nat}</td>
              <td>${cDate}</td>
              <td>${birthday(results[i].dob.date)}</td>
					  </tr>`;
    table.innerHTML += row;
  }
}
function birthday(birthdate) {
  let date1 = new Date();
  date1.setFullYear(0);
  date1.setHours(0, 0, 0, 0); // (YYYY-MM-DD)
  var date2 = new Date(birthdate);
  date2.setFullYear(0);
  date2.setHours(0, 0, 0, 0);
  console.log(date1);
  console.log(date2);
  if (date1 < date2) {
    return "Has yet to occur";
  } else if (date1 > date2) {
    return "Already happened";
  } else {
    return "Happy Birthday!!";
  }
}
function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("userTable");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
