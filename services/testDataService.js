const { v4: uuidv4 } = require('uuid');

// 测试数据集
const TEST_DATA = {
  // 简单问候
  "你好": [
    {sequence: 1, event: 'message', answer: '<think>'},
    {sequence: 2, event: 'message', answer: '\n用户向我问好，我应该礼貌回应'},
    {sequence: 3, event: 'message', answer: '。可以简单说"你好！有什么我能帮到你的吗？"'},
    {sequence: 4, event: 'message', answer: '也可以加上一些友好表情。\n</think>\n\n你好！有什么我能帮到你的吗？😊'},
    {sequence: 5, event: 'message', answer: '我亲爱的朋友!'},
    {sequence: 6, event: 'end', answer: '<think>\n用户向我问好，我应该礼貌回应。可以简单说"你好！有什么我能帮到你的吗？"也可以加上一些友好表情。\n</think>\n\n你好！有什么我能帮到你的吗？😊我亲爱的朋友!'}, 
  ],

  // 知识问答
  "什么是人工智能？": [
    {sequence: 1, event: 'message', answer: '<think>'},
    {sequence: 2, event: 'message', answer: '\n这是关于人工智能基本概念的问题'},
    {sequence: 3, event: 'message', answer: '。我需要给出清晰简洁的定义，'},
    {sequence: 4, event: 'message', answer: '然后可以补充一些发展历史和应用领域'},
    {sequence: 5, event: 'message', answer: '。\n\n人工智能是指通过程序模拟人类智能，使机器能够执行通常需要人类智能的任务，如视觉感知、语音识别、决策制定和语言翻译等。'},
    {sequence: 6, event: 'message', answer: '\n\nAI的发展可以追溯到20世纪50年代，经历了多次起伏，现在主要通过机器学习和深度学习取得了重大突破。'},
    {sequence: 7, event: 'message', answer: '\n\n应用领域包括医疗诊断、自动驾驶、智能助手、推荐系统等。\n</think>\n\n人工智能是指让计算机模拟人类智能的科学与技术，使机器能够像人类一样思考、学习和解决问题。它包括机器学习、深度学习、自然语言处理等多个分支，现已广泛应用于医疗、交通、金融等领域，正深刻改变我们的生活方式。'},
    {sequence: 8, event: 'message', answer: '。。。你还有哪些问题'},
    {sequence: 9, event: 'end', answer: '<think>\n这是关于人工智能基本概念的问题。我需要给出清晰简洁的定义，然后可以补充一些发展历史和应用领域。\n\n人工智能是指通过程序模拟人类智能，使机器能够执行通常需要人类智能的任务，如视觉感知、语音识别、决策制定和语言翻译等。\n\nAI的发展可以追溯到20世纪50年代，经历了多次起伏，现在主要通过机器学习和深度学习取得了重大突破。\n\n应用领域包括医疗诊断、自动驾驶、智能助手、推荐系统等。\n</think>\n\n人工智能是指让计算机模拟人类智能的科学与技术，使机器能够像人类一样思考、学习和解决问题。它包括机器学习、深度学习、自然语言处理等多个分支，现已广泛应用于医疗、交通、金融等领域，正深刻改变我们的生活方式。。。。你还有哪些问题'}
  ],

  // 代码生成
  "用JavaScript写一个冒泡排序": [
    {sequence: 1, event: 'message', answer: '<think>'},
    {sequence: 2, event: 'message', answer: '\n用户请求用JavaScript实现冒泡排序算法'},
    {sequence: 3, event: 'message', answer: '。冒泡排序的基本思想是比较相邻元素，如果顺序错误则交换。'},
    {sequence: 4, event: 'message', answer: '我需要编写一个函数，包含双重循环，外层循环控制排序轮次，内层循环进行相邻元素比较和交换。'},
    {sequence: 5, event: 'message', answer: '包含双重循环，外层循环控制排序轮次，内层循环进行相邻元素比较和交换。\n\n让我来设计代码：\n1. 定义一个bubbleSort函数，接收一个数组参数\n2. 获取数组长度\n3. 使用两层for循环实现排序逻辑\n4. 加入注释说明算法思路\n5. 提供使用示例'},
    {sequence: 6, event: 'message', answer: '\n</think>\n\n```javascript\nfunction bubbleSort(arr) {\n  const len = arr.length;\n  \n  // 外层循环控制排序轮次\n  for (let i = 0; i < len; i++) {\n    // 内层循环比较相邻元素\n    for (let j = 0; j < len - i - 1; j++) {\n      // 如果当前元素大于下一个元素，则交换它们\n      if (arr[j] > arr[j + 1]) {\n        const temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n  \n  return arr;\n}\n\n// 使用示例\nconst array = [64, 34, 25, 12, 22, 11, 90];\nconsole.log(bubbleSort(array)); // 输出: [11, 12, 22, 25, 34, 64, 90]\n```'},
    {sequence: 7, event: 'message', answer: '，还有问题么?'},
    {sequence: 8, event: 'end', answer: '<think>\n用户请求用JavaScript实现冒泡排序算法。冒泡排序的基本思想是比较相邻元素，如果顺序错误则交换。我需要编写一个函数，包含双重循环，外层循环控制排序轮次，内层循环进行相邻元素比较和交换。\n\n让我来设计代码：\n1. 定义一个bubbleSort函数，接收一个数组参数\n2. 获取数组长度\n3. 使用两层for循环实现排序逻辑\n4. 加入注释说明算法思路\n5. 提供使用示例\n</think>\n\n```javascript\nfunction bubbleSort(arr) {\n  const len = arr.length;\n  \n  // 外层循环控制排序轮次\n  for (let i = 0; i < len; i++) {\n    // 内层循环比较相邻元素\n    for (let j = 0; j < len - i - 1; j++) {\n      // 如果当前元素大于下一个元素，则交换它们\n      if (arr[j] > arr[j + 1]) {\n        const temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n  \n  return arr;\n}\n\n// 使用示例\nconst array = [64, 34, 25, 12, 22, 11, 90];\nconsole.log(bubbleSort(array)); // 输出: [11, 12, 22, 25, 34, 64, 90]\n```，还有问题么?'}
  ]
};

// 默认测试数据模板
const DEFAULT_RESPONSE = [
  {sequence: 1, event: 'message', answer: '<think>'},
  {sequence: 2, event: 'message', answer: '\n正在思考如何回答这个问题...'},
  {sequence: 3, event: 'message', answer: '\n这是一个我需要详细分析的问题。\n</think>\n\n我理解您的问题，这需要详细分析。由于这是一个测试模式，我无法提供完整的实时回答，但在实际系统中，这里会返回对应问题的详细解答。'},
  {sequence: 5, event: 'message', answer: ', 有屁就放!'},
  {sequence: 6, event: 'end', answer: '<think>\n正在思考如何回答这个问题...\n这是一个我需要详细分析的问题。\n</think>\n\n我理解您的问题，这需要详细分析。由于这是一个测试模式，我无法提供完整的实时回答，但在实际系统中，这里会返回对应问题的详细解答。, 有屁就放!'}
];

// 生成唯一ID
function generateUniqueId() {
  return uuidv4();
}

// 生成会话ID
function generateSessionId() {
  return uuidv4();
}

// 生成详细信息
function generateDetailInfo(question, answer) {
  return [
    {
      "category": "metadata",
      "type": "time",
      "value": {
        "total": Math.floor(Math.random() * 2000) + 1000,
        "thinking": Math.floor(Math.random() * 1000) + 500,
        "answer": Math.floor(Math.random() * 1000) + 500
      }
    }
  ];
}

/**
 * 根据问题创建测试响应
 * @param {string} question 用户问题
 * @returns {Array} 测试数据响应流
 */
function createTestResponse(question) {
  // 查找匹配的预设测试数据，或使用默认模板
  const testData = TEST_DATA[question] || DEFAULT_RESPONSE;
  
  const sessionId = `SessionId:${generateSessionId()}:test-user:${Date.now()}`;
  const requestId = generateUniqueId();
  
  // 处理每条消息，直接返回数据
  return testData.map((item) => {
    return {
      code: 200,
      created: Date.now(),
      data: {
        answer: item.answer,
        answerDict: {},
        question: question,
        requestId: requestId,
        sessionId: sessionId
      },
      detail: item.event === 'end' ? generateDetailInfo(question, item.answer) : [],
      event: item.event,
      msg: 'OK',
      sequence: item.sequence
    };
  });
}

/**
 * 处理SSE请求
 * @param {Object} req Express请求对象
 * @param {Object} res Express响应对象
 */
async function handleSSERequest(req, res) {
  try {
    // 设置SSE响应头
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    console.log('[SSE-处理] 设置了SSE头部');

    // 从请求中获取参数
    const method = req.method;
    let question, sessionId, userId, temperature, top_p, top_k, system, history;

    if (method === 'GET') {
      // 处理GET请求
      question = req.query.question;
      sessionId = req.query.sessionId || `session_${generateUniqueId()}`;
      userId = req.query.userId || 'anonymous';
      temperature = parseFloat(req.query.temperature) || 0.6;
      top_p = parseFloat(req.query.top_p) || 0.95;
      top_k = parseInt(req.query.top_k) || 40;
      system = req.query.system || '';
      history = req.query.history ? JSON.parse(req.query.history) : [];
      
      console.log('[SSE-GET处理] 解析参数成功:', { question, sessionId, userId });
    } else {
      // 处理POST请求
      const body = req.body;
      question = body.question;
      sessionId = body.sessionId || `session_${generateUniqueId()}`;
      userId = body.userId || 'anonymous';
      temperature = body.temperature || 0.6;
      top_p = body.top_p || 0.95;
      top_k = body.top_k || 40;
      system = body.system || '';
      history = body.history || [];
      
      console.log('[SSE-POST处理] 解析参数成功:', { question, sessionId, userId });
    }

    if (!question) {
      console.error('[SSE-处理] 错误: 缺少问题参数');
      return res.status(400).json({
        code: 400,
        msg: '缺少问题参数',
        created: Date.now()
      });
    }

    // 获取测试数据响应
    console.log('[SSE-处理] 开始创建响应数据流');
    const responseStream = createTestResponse(question);
    console.log('[SSE-处理] 响应数据流创建完成, 消息数量:', responseStream.length);

    // 发送响应流
    let messageCount = 0;
    for (const response of responseStream) {
      const eventData = `data: ${JSON.stringify(response)}\n\n`;
      console.log(`[SSE-发送] 发送第${++messageCount}条消息, 事件类型:${response.event}, 长度:${eventData.length}字节`);
      
      const success = res.write(eventData);
      if (!success) {
        console.error('[SSE-发送] 写入失败，客户端可能已断开连接');
        break;
      }
      
      // 为模拟流式返回，添加延迟
      if (response.event !== 'end') {
        const delay = 300;
        console.log(`[SSE-发送] 延迟${delay}ms后发送下一条消息`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // 结束响应
    console.log('[SSE-处理] 所有消息发送完毕，结束响应');
    res.end();
  } catch (error) {
    console.error('[SSE-处理] 处理请求时出错:', error);
    res.status(500).json({
      code: 500,
      msg: '服务器内部错误',
      created: Date.now()
    });
  }
}

module.exports = {
  createTestResponse,
  handleSSERequest
}; 