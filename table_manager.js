// Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
    import { getDatabase } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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
    const db = getDatabase(app);

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

// 导入 Firestore 相关的函数
import { collection, addDoc } from "firebase/firestore";

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


          // 调用 writeData() 来将数据写入 Firebase 数据库
    writeData();

    // 调用 displayTables() 来初始化表格
    displayTables();
