import * as SQLite from "expo-sqlite"

const dbName = "habits.db"
const db = SQLite.openDatabase(dbName)

// Function to initialize the database and create tables if necessary
const initDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Habits (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, streakCount INTEGER)');
    });
  };

