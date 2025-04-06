const fetch = require('node-fetch');

/**
 * SSE客户端类，用于连接服务器并处理事件流
 */
class SSEClient {
  /**
   * 构造函数
   * @param {Object} defaultOptions - 默认配置选项
   */
  constructor(defaultOptions = {}) {
    this.defaultOptions = {
      sessionId: null,
      userId: 'client-user',
      temperature: 0.6,
      top_p: 0.95,
      top_k: 40,
      system: '',
      history: [],
      ...defaultOptions
    };
    
    // 添加debug选项
    this.debug = defaultOptions.debug || false;
  }

  /**
   * 连接到SSE服务并处理事件流
   * @param {string} question - 要发送的问题
   * @param {Object} options - 附加选项
   * @returns {Promise<string>} - 完整的响应
   */
  async connectToSSEServer(question, options = {}) {
    const mergedOptions = { ...this.defaultOptions, ...options };
    
    // 保存完整回答
    let completeAnswer = '';
    // 保存思考过程
    let thinkingProcess = '';
    
    try {
      console.log('正在发送问题:', question);
      
      if (this.debug) {
        console.log('请求参数:', JSON.stringify({
          question,
          sessionId: mergedOptions.sessionId,
          userId: mergedOptions.userId,
          temperature: mergedOptions.temperature,
          top_p: mergedOptions.top_p,
          top_k: mergedOptions.top_k,
          system: mergedOptions.system,
          history: mergedOptions.history
        }, null, 2));
      }
      
      const response = await fetch('http://localhost:3000/v1/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify({
          question,
          sessionId: mergedOptions.sessionId,
          userId: mergedOptions.userId,
          temperature: mergedOptions.temperature,
          top_p: mergedOptions.top_p,
          top_k: mergedOptions.top_k,
          system: mergedOptions.system,
          history: mergedOptions.history
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP错误: ${response.status}`);
      }
      
      console.log('连接成功，等待数据流...');

      // 使用Node.js兼容的方式处理流
      return new Promise((resolve, reject) => {
        let buffer = '';
        
        // 处理接收到的数据块
        response.body.on('data', (chunk) => {
          if (this.debug) {
            console.log(`[接收数据块] 长度: ${chunk.length}字节`);
          }
          
          // 将数据块转换为字符串并添加到缓冲区
          const textChunk = chunk.toString('utf8');
          buffer += textChunk;
          
          // 按SSE格式分割数据
          const messages = buffer.split('\n\n');
          // 保留最后一个可能不完整的消息
          buffer = messages.pop() || '';
          
          // 处理每个完整的消息
          for (const message of messages) {
            if (message.trim() === '') continue;
            
            // 提取SSE数据部分
            const dataMatch = message.match(/^data: (.+)$/m);
            if (dataMatch) {
              try {
                const jsonData = dataMatch[1];
                const data = JSON.parse(jsonData);
                
                if (this.debug) {
                  console.log(`\n[收到事件] 类型: ${data.event}, 序列号: ${data.sequence}`);
                }
                
                // 提取答案
                const answer = data.data.answer;
                
                // 处理思考和最终答案
                if (answer.includes('<think>')) {
                  // 收集思考过程
                  thinkingProcess += answer.replace('<think>', '').replace('</think>', '');
                  console.log('\n[思考过程]:', answer);
                } else if (data.event === 'end') {
                  // 最终完整回答
                  console.log('\n[完整回答]:', answer);
                } else {
                  // 累积回答
                  completeAnswer += answer;
                  // 打印流式响应
                  process.stdout.write(answer);
                }
                
                // 如果是最后一条消息，打印详细信息
                if (data.event === 'end' && data.detail && data.detail.length > 0) {
                  console.log('\n\n[响应详情]:', JSON.stringify(data.detail, null, 2));
                  resolve(completeAnswer); // 完成，返回结果
                }
              } catch (e) {
                console.error('解析事件数据时出错:', e, '\n原始数据:', message);
              }
            }
          }
        });
        
        // 处理流结束
        response.body.on('end', () => {
          console.log('[数据流结束]');
          resolve(completeAnswer);
        });
        
        // 处理错误
        response.body.on('error', (err) => {
          console.error('[数据流错误]:', err);
          reject(err);
        });
      });
    } catch (error) {
      console.error('发生错误:', error);
      throw error;
    }
  }

  /**
   * 运行预设测试用例
   */
  async runTestCases() {
    try {
      // 测试预设问题
      await this.connectToSSEServer('你好');
      console.log('\n----------------------------\n');
      
      await this.connectToSSEServer('什么是人工智能？');
      console.log('\n----------------------------\n');
      
      await this.connectToSSEServer('用JavaScript写一个冒泡排序');
      console.log('\n----------------------------\n');
      
      // 测试自定义问题
      await this.connectToSSEServer('今天天气怎么样？');
    } catch (error) {
      console.error('运行出错:', error);
    }
  }
}

// 创建客户端实例，开启调试模式
const client = new SSEClient({ debug: true });

// 执行测试
client.runTestCases(); 