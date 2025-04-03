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
app.get('/v1/complete', handleSSERequest);

// 主SSE接口 - POST方法
app.post('/v1/complete', handleSSERequest);

// 处理SSE请求的函数，支持GET和POST
async function handleSSERequest(req, res) {
  try {
    // 设置SSE响应头
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // 从请求中获取参数
    const method = req.method;
    let question, sessionId, userId, temperature, top_p, top_k, system, history;

    if (method === 'GET') {
      // 处理GET请求
      question = req.query.question;
      sessionId = req.query.sessionId || `session_${uuidv4()}`;
      userId = req.query.userId || 'anonymous';
      temperature = parseFloat(req.query.temperature) || 0.6;
      top_p = parseFloat(req.query.top_p) || 0.95;
      top_k = parseInt(req.query.top_k) || 40;
      system = req.query.system || '';
      history = req.query.history ? JSON.parse(req.query.history) : [];
    } else {
      // 处理POST请求
      const body = req.body;
      question = body.question;
      sessionId = body.sessionId || `session_${uuidv4()}`;
      userId = body.userId || 'anonymous';
      temperature = body.temperature || 0.6;
      top_p = body.top_p || 0.95;
      top_k = body.top_k || 40;
      system = body.system || '';
      history = body.history || [];
    }

    if (!question) {
      return res.status(400).json({
        code: 400,
        msg: '缺少问题参数',
        created: Date.now()
      });
    }

    // 生成请求ID
    const requestId = uuidv4();
    
    // 获取测试数据响应
    const responseStream = testDataService.createTestResponse(question);

    // 发送响应流
    for (const response of responseStream) {
      res.write(`data: ${JSON.stringify(response)}\n\n`);
      
      // 为模拟流式返回，添加延迟
      if (response.event !== 'end') {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    // 结束响应
    res.end();
  } catch (error) {
    console.error('处理请求时出错:', error);
    res.status(500).json({
      code: 500,
      msg: '服务器内部错误',
      created: Date.now()
    });
  }
}

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