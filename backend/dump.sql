PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE questions ( question_text TEXT, answer TEXT, options TEXT );
CREATE TABLE sessions ( created_at TEXT, is_active INTEGER, score INTEGER );
COMMIT;

