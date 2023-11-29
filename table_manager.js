// Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
    import { getFirestore, doc, setDoc, getDocs, Timestamp, collection, query, orderBy } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyByp1El_URDkLSgjvkp203M12nU7AYjiS4",
      authDomain: "fypcomp1682.firebaseapp.com",
      projectId: "fypcomp1682",
      storageBucket: "fypcomp1682.appspot.com",
      messagingSenderId: "795503629021",
      appId: "1:795503629021:web:7ca00e90d91251d2118134",
      measurementId: "G-TY598ERJD1"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    function displayTables() {
      var tableList = document.getElementById('table-list');
      tableList.innerHTML = '';

      database.ref('tables').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var table = childSnapshot.val();

          var row = document.createElement('tr');

          var tableNumberCell = document.createElement('td');
          tableNumberCell.textContent = table.tableNumber;
          row.appendChild(tableNumberCell);

          var seatsCell = document.createElement('td');
          seatsCell.textContent = table.seats;
          row.appendChild(seatsCell);

          var statusCell = document.createElement('td');
          statusCell.textContent = table.status;
          row.appendChild(statusCell);

          tableList.appendChild(row);
        });
      });
    }


// 将数据写入 Firestore
const tableIds = Array.from({ length: 12 }, (_, index) => `table_${String(index + 1).padStart(2, "0")}`);

tableIds.forEach(async (tableId, index) => {
  const docRef = doc(db, "tables", tableId);

  try {
    await setDoc(docRef, {
      tableNumber: index + 1,
      seats: 4, // 每张桌子的默认人数为4
      status: "available" // 每张桌子的默认状态为'空闲'
    });
    console.log(`桌子 ${tableId} 数据写入成功！`);
  } catch (error) {
    console.log(`桌子 ${tableId} 数据写入失败：${error}`);
  }
});


// 获取数据并生成表格
async function generateTable() {
  const tableRef = collection(db, "tables");
  const querySnapshot = await getDocs(tableRef);

  // 创建表格的 HTML 字符串
  let tableHTML = `<table class="custom-table">
                      <tr>
                        <th>桌号</th>
                        <th>座位（人数/总数）</th>
                        <th>状态</th>
                        <th>操作</th>
                      </tr>`;

  querySnapshot.forEach((doc) => {
    const tableData = doc.data();
    const tableNumber = tableData.tableNumber;
    const seats = tableData.seats; // 将 seats 转换为字符串

    const formattedSeats = tableData.seats + "/ 4";
    const status = tableData.status;

    tableHTML += `<tr>
                    <td>${tableNumber}</td>
                    <td>${formattedSeats}</td>
                    <td>${status}</td>
                    <td>
                        <button onclick="generateQRCode('${qrCodeId}', '${tableId}')">开桌</button>
                        <div id="${qrCodeId}"></div>
                      </td>
                  </tr>`;
  });

  tableHTML += "</table>";

  // 将表格添加到页面中的一个元素中
  const tableContainer = document.getElementById("table-list");
  tableContainer.innerHTML = tableHTML;
}


// 在文档加载完成后调用生成表格的函数
document.addEventListener("DOMContentLoaded", generateTable);
    document.addEventListener("DOMContentLoaded", generateTable);
