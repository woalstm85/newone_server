const express = require('express');
const router = express.Router();
const { createProcedureExecutor, sql } = require('../utils/routeHandler');

const loginHandler = createProcedureExecutor(
  'SP_CUS_LOGIN',
  (request, { id, password }) => {
    request
      .input('userId', sql.VarChar, id)
      .input('PASSWORD', sql.VarChar, password);
  },
  // 결과 처리를 위한 커스텀 핸들러
  (result, res) => {
    if (result.recordset && result.recordset.length > 0) {
      const userData = result.recordset[0];
      res.json({
        USER_ID: userData.USER_ID,
        CUST_NM: userData.CUST_NM,
        CUST_S_NM: userData.CUST_S_NM,
        COMPID: userData.COMPID
      });
    } else {
      res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }
  }
);

router.post('/api/login', loginHandler);

module.exports = router;