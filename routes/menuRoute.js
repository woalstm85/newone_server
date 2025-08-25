const express = require('express');
const router = express.Router();
const { createProcedureExecutor, sql } = require('../utils/routeHandler');

// 새로운 레프트메뉴 핸들러
const leftMenuHandler = createProcedureExecutor(
  'P_custLeftMenu_V',
  (request, { userId, upMenuCd }) => {
    request
      .input('userId', sql.VarChar(50), userId)
      .input('upMenuCd', sql.VarChar(50), upMenuCd);
  }
);

router.post('/api/leftmenu', leftMenuHandler);

module.exports = router;