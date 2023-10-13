import * as SQLite from "expo-sqlite"

const dbName = "habits.db"
const db = SQLite.openDatabase(dbName)

// Function to initialize the database and create tables if necessary
const initDatabase = (callback) => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Habits (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, streakCount INTEGER, doneToday BOOLEAN)');
      
      // Check if a callback is provided before calling it
      if (typeof callback === 'function') {
        callback();
      }
    });
  };

// Inserts test data inside the db (only if the db's Habits is empty)
const insertTestData = () => {
  db.transaction((tx) => {
    // Check if the table is empty
    tx.executeSql('SELECT COUNT(*) as count FROM Habits', [], (_, results) => {
      const { count } = results.rows.item(0);

      if (count === 0) {
        // The table is empty, insert test data

        for (let i = 0; i < 12; i++) {
          tx.executeSql(
            "INSERT INTO Habits (description, streakCount, doneToday) VALUES (?,?,?)",
            [`This is habit number: ${i}`, 0, 0]
          );
        }
      }
    });
  });
};

// Get all habit data for all rows inside the Habits table
const getAllHabits = (successCallback, errorCallback) => {
  db.transaction((tx) => {
    tx.executeSql("SELECT COUNT(*) as count FROM Habits")
    tx.executeSql(
      'SELECT * FROM Habits',
      [],
      (_, results) => {
        const habits = results.rows.raw(); // Convert the results to an array of objects
        successCallback(habits);
      },
      (_, error) => {
        errorCallback(error);
      }
    );
  });
};

export default{
  initDatabase,
  insertTestData,
  getAllHabits
}