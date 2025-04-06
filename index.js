const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const testDataService = require('./services/testDataService');

// 加载环境变量
dotenv.config();

const app = express();

// 日志中间件 - 记录所有请求
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - 开始处理`);
  
  // 记录请求体
  if (req.method === 'POST') {
    console.log('请求体:', JSON.stringify(req.body, null, 2));
  } else if (req.method === 'GET') {
    console.log('查询参数:', JSON.stringify(req.query, null, 2));
  }
  
  // 在响应结束时记录
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - 完成处理 状态码:${res.statusCode} 耗时:${duration}ms`);
  });
  
  // 监听错误
  res.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.url} - 处理出错:`, error);
  });
  
  next();
});

// 中间件设置
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// 支持GET请求的SSE接口，用于前端测试页面
app.get('/v1/complete', (req, res) => {
  console.log('[SSE-GET] 收到SSE请求，参数:', req.query);
  testDataService.handleSSERequest(req, res);
});

// 主SSE接口 - POST方法
app.post('/v1/complete', (req, res) => {
  console.log('[SSE-POST] 收到SSE请求，内容:', JSON.stringify(req.body, null, 2));
  testDataService.handleSSERequest(req, res);
});

// 首页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 健康检查接口
app.get('/health', (req, res) => {
  console.log('[健康检查] 收到健康检查请求');
  res.status(200).json({
    status: 'ok',
    timestamp: Date.now()
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务已启动，监听端口 ${PORT}`);
  console.log(`SSE服务可通过 http://localhost:${PORT}/v1/complete 访问`);
  console.log(`健康检查可通过 http://localhost:${PORT}/health 访问`);
});

// 添加未捕获异常处理
process.on('uncaughtException', (error) => {
  console.error('[严重错误] 未捕获的异常:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[严重错误] 未处理的Promise拒绝:', reason);
}); 