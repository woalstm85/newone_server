// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler'); // 경로 수정

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://newone-kappa-wheat.vercel.app/',
  credentials: true
}));

app.use(express.json());
app.use('/', require('./routes/LoginRoute'));
app.use('/', require('./routes/topMenuRoute'));
app.use('/', require('./routes/menuRoute'));
app.use('/', require('./routes/CommonRoute'));
app.use('/', require('./routes/cust0020Route'));


// 에러 핸들링 미들웨어는 모든 라우트 뒤에 위치
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});