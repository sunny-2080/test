Page({
  data: {
    finalScore: 0,
    analyzedChar: '',
    dimensions: [],
    feedbacks: [],
    scoreComment: ''
  },

  onLoad(options) {
    // 解析传入的数据
    if (options.data) {
      const reportData = JSON.parse(decodeURIComponent(options.data));
      this.processReportData(reportData);
    }
  },

  processReportData(data) {
    const { score, char, dimensions, feedbacks } = data;
    
    // 生成评语
    const comments = [
      { min: 90, text: '优秀！字形神韵兼备，已达到很高水准。' },
      { min: 80, text: '良好。结构笔画都不错，细节处可再精进。' },
      { min: 70, text: '中等。基础扎实，但还有明显提升空间。' },
      { min: 60, text: '合格。掌握了基本写法，需加强练习。' },
      { min: 0, text: '初学阶段。建议从基本笔画开始系统练习。' }
    ];
    const comment = comments.find(c => score >= c.min).text;

    this.setData({
      finalScore: score,
      analyzedChar: char,
      dimensions: dimensions,
      feedbacks: feedbacks,
      scoreComment: comment
    });
  },

  newAnalysis() {
    wx.navigateBack();
  }
});