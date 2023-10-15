import * as SQLite from "expo-sqlite"

const dbName = "habits.db"
const db = SQLite.openDatabase(dbName)

// Function to initialize the database and create tables if necessary
const initTables = () => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Habits (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, streakCount INTEGER, doneToday BOOLEAN)');
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
  db.transaction((tx)=>{
    tx.executeSql("SELECT * FROM Habits",null,
    (_, result)=>{
      successCallback(result.rows._array)
    },
    (_, err)=>{
      errorCallback(err)
    })
  })
};


module.exports = {
  initTables,
  insertTestData,
  getAllHabits
}