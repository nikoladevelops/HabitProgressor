import * as SQLite from "expo-sqlite"

const dbName = "habits.db"
const db = SQLite.openDatabase(dbName)

/**
 * Create the 'Habits' table if it doesn't exist.
 * @returns {Promise<void>} A Promise that resolves when the tables are successfully initialized or rejected with an error message.
 */
export const initTables = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Habits (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, streakCount INTEGER, lastCompletedDate TEXT)',
        [],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });
};

/**
 * Check if the 'Habits' table is empty.
 * @returns {Promise<number>} A Promise that resolves to the count of Habits in the database.
 */
export const checkHabitsCountAsync = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT COUNT(*) as count FROM Habits',
       [],
      (_, result) => {
        const { count } = result.rows.item(0);
        resolve(count);
      },
      (_,err)=>reject(err));
    });
  });
};

/**
 * Create many habits based on habitData array. Please ensure that the data you are passing contains all necessary properties.
 * @param {Array<Object>} habitData An array of habit data objects.
 * @returns {Promise<Array<number>>} A Promise that resolves to an array of habit IDs on successful creation.
 */
export const createManyHabitsAsync = (habitData) => {
  const promises = habitData.map((habit)=> 
    createHabitAsync(habit.description, habit.streakCount, habit.lastCompletedDate)
  )

  return Promise.all(promises)
};

/**
 * Get all habit data from the Habits table.
 * @returns {Promise<Array<Object>>} 
 */ 
export const getAllHabitsAsync = () => {
  return new Promise((resolve, reject)=>{
    db.transaction((tx)=>{
      tx.executeSql("SELECT * FROM Habits",null,
      (_, result)=>{
        resolve(result.rows._array)
      },
      (_, err)=>{
        reject(err)
      })
    })
  })
};

/**
 * Create a brand new habit.
 * @param {string} description Habit description.
 * @param {number} streakCount The amount of consecutive days the habits has been done.
 * @param {Date} lastCompletedDate Indicates the last date when the habit was completed.
 * @returns {Promise<number>} A Promise that resolves on successful creation of a new Habit.
 */
export const createHabitAsync = (description, streakCount, lastCompletedDate) => {
  return new Promise((resolve, reject)=>{
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Habits (description, streakCount, lastCompletedDate) VALUES (?,?,?)",
        [description, streakCount, lastCompletedDate],
        (_, result) => {
          resolve(result.insertId) // Pass the newly inserted habit's ID outside
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  })
};


/**
 * Mark a habit as completed today.
 * @param {number} habitId The ID of the habit to mark as complete.
 * @param {number} currentStreakCount The current streak count of the habit.
 * @returns {Promise<void>} A Promise that resolves on successful change of the lastCompletedDate value.
 */
export const markHabitAsCompletedTodayAsync = (habitId, currentStreakCount)=>{
  return new Promise((resolve,reject)=>{
    db.transaction((tx)=>{
      tx.executeSql("UPDATE Habits SET lastCompletedDate=?, streakCount=? WHERE id = ?",
        [new Date().toISOString(), currentStreakCount+1, habitId],
        ()=>resolve(),
        (err)=>reject(err)
      )
    })
  })
}

/**
 * Delete a habit by its ID.
 * @param {number} habitId The ID of the habit to delete.
 * @returns {Promise<void>} A Promise that resolves on successful deletion or rejects with an error message.
 */
export const deleteHabitByIdAsync = (habitId) => {
  return new Promise((resolve, reject)=>{
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Habits WHERE id = ?",
        [habitId],
        (_, result) => {
          if (result.rowsAffected === 1) {
            // Deletion successful
            resolve()
          } else {
            // Habit with the specified ID not found
            reject("Habit not found");
          }
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  })
};

/**
 * Drop the Habits table.
 * @returns {Promise<void>} A Promise that resolves on successful drop of the Habits table.
 */
export const dropHabitsAsync = () => {
  return new Promise((resolve, reject)=>{
    db.transaction((tx) => {
      // Drop each table if it exists
      tx.executeSql('DROP TABLE IF EXISTS Habits',
      [],
      (_, result) => resolve(),
      (_,err)=>reject(err)
      )
    });
  })
};