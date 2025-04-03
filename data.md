## 测试数据设计

### 1. 测试数据说明
为了模拟大模型流式响应，需创建多组测试数据，每组包含不同问题和相应的思考过程与答案。测试数据应覆盖简单问候、知识问答、多轮对话等场景。

### 2. 测试数据结构
每组测试数据包含：
- 初始消息（开始思考）
- 中间思考片段（多条）
- 完整答案（含思考过程和最终回答）

### 3. 示例测试数据集

#### 测试场景一：简单问候
```javascript
// 问题："你好"
[
  {sequence: 1, event: 'message', answer: '<think>'},
  {sequence: 2, event: 'message', answer: '<think>\n用户向我问好，我应该礼貌回应'},
  {sequence: 3, event: 'message', answer: '<think>\n用户向我问好，我应该礼貌回应。可以简单说"你好！有什么我能帮到你的吗？"'},
  {sequence: 4, event: 'message', answer: '<think>\n用户向我问好，我应该礼貌回应。可以简单说"你好！有什么我能帮到你的吗？"也可以加上一些友好表情。\n</think>\n\n你好！有什么我能帮到你的吗？😊'},
  {sequence: 5, event: 'end', answer: '<think>\n用户向我问好，我应该礼貌回应。可以简单说"你好！有什么我能帮到你的吗？"也可以加上一些友好表情。\n</think>\n\n你好！有什么我能帮到你的吗？😊'}
]
```

#### 测试场景二：知识问答
```javascript
// 问题："什么是人工智能？"
[
  {sequence: 1, event: 'message', answer: '<think>'},
  {sequence: 2, event: 'message', answer: '<think>\n这是关于人工智能基本概念的问题'},
  {sequence: 3, event: 'message', answer: '<think>\n这是关于人工智能基本概念的问题。我需要给出清晰简洁的定义，'},
  {sequence: 4, event: 'message', answer: '<think>\n这是关于人工智能基本概念的问题。我需要给出清晰简洁的定义，然后可以补充一些发展历史和应用领域'},
  // ...更多思考内容
  {sequence: 10, event: 'message', answer: '<think>\n这是关于人工智能基本概念的问题。我需要给出清晰简洁的定义，然后可以补充一些发展历史和应用领域。\n\n人工智能是指通过程序模拟人类智能，使机器能够执行通常需要人类智能的任务，如视觉感知、语音识别、决策制定和语言翻译等。\n\nAI的发展可以追溯到20世纪50年代，经历了多次起伏，现在主要通过机器学习和深度学习取得了重大突破。\n\n应用领域包括医疗诊断、自动驾驶、智能助手、推荐系统等。\n</think>\n\n人工智能是指让计算机模拟人类智能的科学与技术，使机器能够像人类一样思考、学习和解决问题。它包括机器学习、深度学习、自然语言处理等多个分支，现已广泛应用于医疗、交通、金融等领域，正深刻改变我们的生活方式。'},
  {sequence: 11, event: 'end', answer: '<think>\n这是关于人工智能基本概念的问题。我需要给出清晰简洁的定义，然后可以补充一些发展历史和应用领域。\n\n人工智能是指通过程序模拟人类智能，使机器能够执行通常需要人类智能的任务，如视觉感知、语音识别、决策制定和语言翻译等。\n\nAI的发展可以追溯到20世纪50年代，经历了多次起伏，现在主要通过机器学习和深度学习取得了重大突破。\n\n应用领域包括医疗诊断、自动驾驶、智能助手、推荐系统等。\n</think>\n\n人工智能是指让计算机模拟人类智能的科学与技术，使机器能够像人类一样思考、学习和解决问题。它包括机器学习、深度学习、自然语言处理等多个分支，现已广泛应用于医疗、交通、金融等领域，正深刻改变我们的生活方式。'}
]
```

#### 测试场景三：代码生成
```javascript
// 问题："用JavaScript写一个冒泡排序"
[
  {sequence: 1, event: 'message', answer: '<think>'},
  {sequence: 2, event: 'message', answer: '<think>\n用户请求用JavaScript实现冒泡排序算法'},
  // ...思考过程
  {sequence: 15, event: 'message', answer: '<think>\n用户请求用JavaScript实现冒泡排序算法。冒泡排序的基本思想是比较相邻元素，如果顺序错误则交换。我需要编写一个函数，包含双重循环，外层循环控制排序轮次，内层循环进行相邻元素比较和交换。\n\n让我来设计代码：\n1. 定义一个bubbleSort函数，接收一个数组参数\n2. 获取数组长度\n3. 使用两层for循环实现排序逻辑\n4. 加入注释说明算法思路\n5. 提供使用示例\n</think>\n\n```javascript\nfunction bubbleSort(arr) {\n  const len = arr.length;\n  \n  // 外层循环控制排序轮次\n  for (let i = 0; i < len; i++) {\n    // 内层循环比较相邻元素\n    for (let j = 0; j < len - i - 1; j++) {\n      // 如果当前元素大于下一个元素，则交换它们\n      if (arr[j] > arr[j + 1]) {\n        const temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n  \n  return arr;\n}\n\n// 使用示例\nconst array = [64, 34, 25, 12, 22, 11, 90];\nconsole.log(bubbleSort(array)); // 输出: [11, 12, 22, 25, 34, 64, 90]\n```'},
  {sequence: 16, event: 'end', answer: '<think>\n用户请求用JavaScript实现冒泡排序算法。冒泡排序的基本思想是比较相邻元素，如果顺序错误则交换。我需要编写一个函数，包含双重循环，外层循环控制排序轮次，内层循环进行相邻元素比较和交换。\n\n让我来设计代码：\n1. 定义一个bubbleSort函数，接收一个数组参数\n2. 获取数组长度\n3. 使用两层for循环实现排序逻辑\n4. 加入注释说明算法思路\n5. 提供使用示例\n</think>\n\n```javascript\nfunction bubbleSort(arr) {\n  const len = arr.length;\n  \n  // 外层循环控制排序轮次\n  for (let i = 0; i < len; i++) {\n    // 内层循环比较相邻元素\n    for (let j = 0; j < len - i - 1; j++) {\n      // 如果当前元素大于下一个元素，则交换它们\n      if (arr[j] > arr[j + 1]) {\n        const temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n  \n  return arr;\n}\n\n// 使用示例\nconst array = [64, 34, 25, 12, 22, 11, 90];\nconsole.log(bubbleSort(array)); // 输出: [11, 12, 22, 25, 34, 64, 90]\n```'}
]
```

### 4. 测试数据生成方法
在后端实现中，可通过以下方式生成完整响应：

```javascript
function createTestResponse(question) {
  // 根据问题选择预设测试数据
  const testData = getTestDataForQuestion(question);
  
  // 构建标准响应格式
  return testData.map(item => ({
    code: 200,
    created: Date.now(),
    data: {
      answer: item.answer,
      answerDict: {},
      question: question,
      requestId: generateUniqueId(),
      sessionId: `SessionId:${generateSessionId()}:test-user:${Date.now()}`
    },
    detail: item.event === 'end' ? generateDetailInfo(question, item.answer) : [],
    event: item.event,
    msg: 'OK',
    sequence: item.sequence
  }));
}
```

### 5. 测试数据覆盖场景
- 简单问候类：你好、早上好、介绍自己
- 知识问答类：什么是区块链、太阳系有几个行星
- 创作类：写一首诗、讲个故事
- 代码相关：各种编程语言的算法实现
- 多轮对话：基于上下文的问答交互
- 边界测试：特别短或特别长的问题
