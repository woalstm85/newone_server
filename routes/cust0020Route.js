const express = require('express');
const router = express.Router();
const { createProcedureExecutor, sql } = require('../utils/routeHandler');

const cust0020Handler = createProcedureExecutor(
  'P_CUST0020_V',
  (request, body) => {
    const { p_itemNm } = body;
    request
      .input('p_itemNm', sql.VarChar(20), p_itemNm || '');
  }
);

// 대문자와 소문자 둘 다 지원
router.post('/api/CUST0020', cust0020Handler);
router.post('/api/cust0020', cust0020Handler);

module.exports = router;