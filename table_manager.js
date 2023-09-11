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
    const database = getDatabase(app);

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
