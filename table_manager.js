// Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
    import { getDatabase } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBDK_0N8joTxl24VD8nyTJVLiMYGNhEX4A",
    authDomain: "ordersystem-9032b.firebaseapp.com",
    databaseURL: "https://ordersystem-9032b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ordersystem-9032b",
    storageBucket: "ordersystem-9032b.appspot.com",
    messagingSenderId: "506054131652",
    appId: "1:506054131652:web:58f99fa3f9099ec671ee91",
    measurementId: "G-CPWPWX6829"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const database = firebase.database(app);

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
