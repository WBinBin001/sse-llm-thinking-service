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