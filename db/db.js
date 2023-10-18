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

/**
 * Creates a brand new habit.
 * @param {string} description - habit description.
 * @param {number} streakCount - the amount of consecutive days the habits has been done.
 * @param {boolean} doneToday - indicates whether the habit has been done today or not.
 * @param {function} successCallback - function that accepts the newly inserted habit's ID.
 * @param {function} errorCallback - function that accepts the error message.
 * @returns {number} The sum of the two numbers.
 */
const createHabit = (description, streakCount, doneToday, successCallback, errorCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Habits (description, streakCount, doneToday) VALUES (?,?,?)",
      [description, streakCount, doneToday],
      (_, result) => {
        successCallback(result.insertId); // Pass the newly inserted habit's ID to the callback
      },
      (_, err) => {
        errorCallback(err);
      }
    );
  });
};

module.exports = {
  initTables,
  insertTestData,
  getAllHabits,
  createHabit
}