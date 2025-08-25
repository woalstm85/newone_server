// utils/database.js
const sql = require('mssql');
const config = require('../config/db');

let pool = null;

const getPool = async () => {
  try {
    if (pool) {
      return pool;
    }
    pool = await sql.connect(config);
    
    // 연결 에러 처리
    pool.on('error', err => {
      console.error('Database pool error:', err);
      pool = null;
    });
    
    return pool;
  } catch (err) {
    console.error('Database connection error:', err);
    pool = null;
    throw err;
  }
};

module.exports = {
  getPool,
  sql // sql 객체도 export하여 타입 정의 재사용
};