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
 * @param {string} description - Habit description.
 * @param {number} streakCount - The amount of consecutive days the habits has been done.
 * @param {boolean} doneToday - Indicates whether the habit has been done today or not.
 * @param {function} successCallback - Function that accepts the newly inserted habit's ID.
 * @param {function} errorCallback - Function that accepts the error message.
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

/**
 * Deletes a habit by its ID.
 * @param {number} habitId - The ID of the habit to delete.
 * @param {function} successCallback - Function to call on successful deletion.
 * @param {function} errorCallback - Function to call on deletion error.
 */
const deleteHabitById = (habitId, successCallback, errorCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM Habits WHERE id = ?",
      [habitId],
      (_, result) => {
        if (result.rowsAffected === 1) {
          // Deletion successful
          successCallback();
        } else {
          // Habit with the specified ID not found
          errorCallback("Habit not found");
        }
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
  createHabit,
  deleteHabitById
}