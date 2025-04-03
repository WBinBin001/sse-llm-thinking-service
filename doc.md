我将查看技术设计文档并提出优化建议。

Read file: doc.md
# NodeJS SSE 大模型思考服务技术设计

## 1. 项目概述
构建一个基于Express框架的NodeJS服务器，通过服务器发送事件(SSE)技术，提供流式大模型响应服务，包含思考过程和最终回答。

## 2. 技术栈
- **后端框架**：Express.js
- **通信方式**：Server-Sent Events (SSE)
- **数据格式**：JSON

## 3. API设计

### 3.1 主要接口
**路径**：`/v1/complete`
**方法**：POST
**功能**：接收用户问题，返回流式大模型响应

### 3.2 请求参数
```json
{
  "question": "用户问题",
  "sessionId": "会话ID（可选）",
  "userId": "用户ID（可选）",
  "temperature": 0.6,
  "top_p": 0.95,
  "top_k": 40,
  "system": "系统提示词（可选）",
  "history": "历史记录（可选）"
}
```

### 3.3 响应格式
流式返回JSON对象序列，每个对象包含：
- `code`: 状态码
- `created`: 时间戳
- `data`: 响应数据
  - `answer`: 大模型响应（含思考过程）
  - `answerDict`: 额外数据对象
  - `question`: 原始问题
  - `requestId`: 请求ID
  - `sessionId`: 会话ID
- `detail`: 处理详情数组
- `event`: 事件类型（"message"或"end"）
- `msg`: 消息状态
- `sequence`: 序列号

## 4. 特殊响应格式说明
- `<think>...</think>`: 包含大模型思考过程
- 思考标签后为最终答案内容

## 5. 实现细节
1. 使用Express的SSE机制发送流式响应
2. 响应过程分阶段：
   - 初始连接确认
   - 思考过程开始标记
   - 思考内容流式传输
   - 思考结束标记
   - 最终答案传输
   - 会话结束

## 6. 示例代码框架
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/v1/complete', (req, res) => {
  // 设置SSE响应头
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // 处理请求并流式返回响应
  // ...实现逻辑
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务已启动，监听端口 ${PORT}`);
});
```

## 7. 测试方案
创建测试脚本模拟大模型响应，包括思考过程和最终答案，使用示例格式进行流式传输测试。

## 8. 错误处理
在响应中设计错误处理机制，通过适当的状态码和消息通知客户端错误情况。
