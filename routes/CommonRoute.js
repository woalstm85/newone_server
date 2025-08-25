// routes/CommonRoute.js
const express = require('express');
const router = express.Router();
const { createQueryExecutor, sql } = require('../utils/routeHandler');

const commonCodeHandler = createQueryExecutor(async (request, { P_CDDIV }) => {
  const result = await request
    .input('P_CDDIV', sql.VarChar(20), P_CDDIV)
    .query('SELECT ComCd, ComNm, CdRule1 FROM DBO.CommonCode(@P_CDDIV)');
    
  return result; // 전체 결과 객체 반환
});

// CdRule1이 있는 공통 코드 조회
const commonCodeWithRuleHandler = createQueryExecutor(async (request, { cdDiv, cdRule1 }) => {
  const result = await request
    .input('cdDiv', sql.VarChar(10), cdDiv)
    .input('cdRule1', sql.VarChar(10), cdRule1)
    .query(`
      SELECT ComCd, ComNm, seq
      FROM CodeSub
      WHERE cddiv = @cdDiv 
      AND CdRule1 = @cdRule1
      ORDER BY seq
    `);
 
  return result;
});

router.post('/api/common', commonCodeHandler);
router.post('/api/common/withRule', commonCodeWithRuleHandler);

module.exports = router;