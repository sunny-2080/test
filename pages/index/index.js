Page({
    data: {
      charList: [
        { name: '永', desc: '经典永字八法', image: 'https://via.placeholder.com/200x200/4fbbd6/ffffff?text=永' },
        { name: '人', desc: '基础笔画练习', image: 'https://via.placeholder.com/200x200/4fbbd6/ffffff?text=人' },
        { name: '心', desc: '复杂结构练习', image: 'https://via.placeholder.com/200x200/4fbbd6/ffffff?text=心' },
        { name: '龍', desc: '繁体字挑战', image: 'https://via.placeholder.com/200x200/4fbbd6/ffffff?text=龍' }
      ],
      charIndex: 0,
      selectedChar: {},
      tempImagePath: ''
    },
  
    onLoad() {
      this.setData({ selectedChar: this.data.charList[0] });
    },
  
    bindCharChange(e) {
      const index = e.detail.value;
      this.setData({ 
        charIndex: index,
        selectedChar: this.data.charList[index]
      });
    },
  
    chooseImage() {
      const that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          that.setData({
            tempImagePath: res.tempFilePaths[0]
          });
        }
      });
    },
  
    analyze() {
      if (!this.data.tempImagePath) {
        wx.showToast({ title: '请先上传图片', icon: 'none' });
        return;
      }
  
      // 显示加载中
      wx.showLoading({ title: 'AI分析中...', mask: true });
  
      // 模拟网络请求
      setTimeout(() => {
        wx.hideLoading();
        
        // 准备模拟数据
        const mockResult = this.mockCallAPI();
        
        // 跳转到报告页，并传递数据
        wx.navigateTo({
          url: `/pages/report/report?data=${encodeURIComponent(JSON.stringify(mockResult))}`
        });
      }, 2000);
    },
  
    mockCallAPI() {
      const { name } = this.data.selectedChar;
      const baseScore = Math.floor(Math.random() * 30) + 60;
      
      const dimensions = [
        { name: '字形结构', color: '#4fbbd6', score: Math.min(100, baseScore + Math.floor(Math.random() * 10) - 5) },
        { name: '笔画规范', color: '#48bb78', score: Math.min(100, baseScore + Math.floor(Math.random() * 15) - 10) },
        { name: '整体整洁', color: '#ed8936', score: Math.min(100, baseScore + Math.floor(Math.random() * 12) - 7) },
        { name: '神韵美感', color: '#9f7aea', score: Math.min(100, baseScore + Math.floor(Math.random() * 8) - 4) }
      ];
      
      const avgScore = Math.round(dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length);
      
      const feedbacks = [
        { title: '结构可以更匀称', content: `注意"${name}"字的间架结构，各部分比例需更协调。` },
        { title: '关键笔画可加强', content: '捺画和转折处的笔力控制可以更稳定。' },
        { title: '大小与布局', content: '整体重心可以更居中，使字体更加平稳。' }
      ];
  
      return {
        score: avgScore,
        char: name,
        dimensions,
        feedbacks
      };
    }
  });