// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
  import { getFirestore, doc, setDoc, getDocs, Timestamp, collection, query, orderBy } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

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

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

//----------------------------------------------------------

    
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

//----------------------------------------------


// 假设你使用的是 Firebase 实时数据库作为数据存储
import { getDatabase, ref, onValue } from "firebase/database";

// 获取数据并生成表格
function generateTable() {
  const db = getDatabase();
  const tablesRef = ref(db, "tables");

  // 创建表格的 HTML 字符串
  let tableHTML = `<table class="tableContainer">
                      <tr>
                        <th>桌号</th>
                        <th>座位（人数/总数）</th>
                        <th>状态</th>
                        <th>操作</th>
                      </tr>`;

  onValue(tablesRef, (snapshot) => {
    const tablesData = snapshot.val();

    Object.keys(tablesData).forEach((tableId) => {
      const table = tablesData[tableId];
      const seats = table.seats;
      const denominator = seats >= 0 ? seats : 0;

      const formattedSeats = `(${denominator}/${denominator})`;
      const status = "状态"; // 使用你的状态数据

      tableHTML += `<tr>
                      <td>${tableId}</td>
                      <td>${formattedSeats}</td>
                      <td>${status}</td>
                    </tr>`;
    });

    tableHTML += "</table>";

    // 将表格添加到页面中的一个元素中
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = tableHTML;
  });
}

// 在文档加载完成后调用生成表格的函数
document.addEventListener("DOMContentLoaded", generateTable);