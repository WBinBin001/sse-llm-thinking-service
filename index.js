const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const testDataService = require('./services/testDataService');

// 加载环境变量
dotenv.config();

const app = express();

// 中间件设置
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// 支持GET请求的SSE接口，用于前端测试页面
app.get('/v1/complete', testDataService.handleSSERequest);

// 主SSE接口 - POST方法
app.post('/v1/complete', testDataService.handleSSERequest);

// 首页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 健康检查接口
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: Date.now()
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务已启动，监听端口 ${PORT}`);
}); 