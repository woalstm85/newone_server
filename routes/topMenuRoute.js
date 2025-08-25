const express = require('express');
const router = express.Router();
const { createProcedureExecutor, sql } = require('../utils/routeHandler');

const topMenuHandler = createProcedureExecutor(
  'P_custTopMenu_V',
  (request, _) => {
    // 고정 파라미터 '*'
    request.input('upMenuCd', sql.VarChar(10), '*');
  }
);

router.get('/api/topmenu', topMenuHandler);

module.exports = router;