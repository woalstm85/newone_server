// utils/routeHandler.js
const { getPool, sql } = require('./database');

const createQueryExecutor = (queryBuilder) => {
  return async (req, res, next) => {
    try {
      const pool = await getPool();
      const request = pool.request();
      
      // queryBuilder를 Promise로 처리하고 결과값 확인
      const queryResult = await queryBuilder(request, req.body);
      if (!queryResult) {
        throw new Error('Query result is undefined');
      }

      // 결과가 recordset 프로퍼티를 가지고 있는지 확인
      const data = queryResult.recordset || [];
      res.json(data);

    } catch (error) {
      next(error);
    }
  };
};

const createProcedureExecutor = (procedureName, inputMapper, resultHandler) => {
  return async (req, res, next) => {
    try {
      const pool = await getPool();
      const request = pool.request();
      
      if (inputMapper) {
        await inputMapper(request, req.body, req.params);
      }

      const result = await request.execute(procedureName);
      
      // 프로시저 실행 결과 처리
      if (resultHandler) {
        await resultHandler(result, res);
      } else {
        // 기본 결과 처리
        const data = result.recordset || [];
        res.json(data);
      }
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { 
  createProcedureExecutor, 
  createQueryExecutor,
  sql 
};