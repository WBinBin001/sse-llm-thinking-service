# NodeJS SSE 大模型思考服务

这是一个基于Express框架的NodeJS服务，通过服务器发送事件(SSE)技术，提供流式大模型响应服务，包含思考过程和最终回答。

## 功能特点

- 使用Server-Sent Events (SSE)实现流式响应
- 展示大模型思考过程和最终答案
- 支持多种测试场景：简单问候、知识问答、代码生成
- 内置模拟数据，无需真实大模型接口

## 安装与运行

### 前提条件

- Node.js >= 14.0.0
- npm 包管理器

### 安装依赖

```bash
npm install
```

### 运行服务

```bash
npm start
```

或者开发模式（使用nodemon自动重启）:

```bash
npm run dev
```

服务默认在3000端口启动，可通过环境变量PORT修改。

## API接口

### 主要接口

**路径**：`/v1/complete`  
**方法**：POST 或 GET  
**功能**：接收用户问题，返回流式大模型响应

### 请求参数

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

### 响应格式

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

## 使用示例

访问服务的根路径（如 http://localhost:3000/）即可打开测试页面，输入问题或选择预设问题进行测试。

curl http;//localhost:3000/health

## 添加更多测试数据

可以在 `services/testDataService.js` 文件中的 `TEST_DATA` 对象中添加更多测试数据。


## curl 接口验证
```shell
curl -N -X POST -H "Content-Type: application/json" -H "Accept: text/event-stream" -d '{
  "question": "什么是人工智能？", 
  "sessionId": "test-session", 
  "userId": "test-user", 
  "temperature": 0.7, 
  "top_p": 0.9, 
  "top_k": 30
}' http://localhost:3000/v1/complete
```
## 许可证

ISC 

# SSE 客户端

这是一个使用 `@microsoft/fetch-event-source` 实现的服务器发送事件(SSE)客户端，用于连接到思考服务API。

## 功能特点

- 连接到本地服务器 http://localhost:3000/v1/complete
- 发送问题并接收流式响应
- 处理思考过程和最终答案
- 支持自定义参数配置

## 安装步骤

1. 克隆或下载本仓库
2. 安装依赖：

```bash
npm install
```

## 使用方法

1. 确保服务端已经启动并监听在3000端口
2. 运行客户端：

```bash
npm start
```

这将执行预设的示例问题。

## 自定义使用

你可以修改 `client.js` 中的 `main()` 函数来测试不同的问题：

```javascript
async function main() {
  try {
    // 自定义问题
    await connectToSSEServer('你的问题');
    
    // 使用自定义参数
    await connectToSSEServer('你的问题', {
      userId: 'custom-user',
      temperature: 0.8
    });
  } catch (error) {
    console.error('运行出错:', error);
  }
}
```

## API 参数说明

`connectToSSEServer(question, options)` 函数接受以下参数：

- `question`: 字符串，要发送的问题
- `options`: 对象，可选参数
  - `sessionId`: 会话ID
  - `userId`: 用户ID
  - `temperature`: 温度参数
  - `top_p`: top-p采样参数
  - `top_k`: top-k采样参数
  - `system`: 系统提示词
  - `history`: 对话历史记录数组 