// 共用方法
import axios from 'axios';

export default {
  methods: {
    // 上傳圖片
    $_uploadImage(file) {
      const formData = new FormData();
      formData.append('file-to-upload', file);
      this.$refs.shopFileInput.value = null;
      this.$refs.fileInput.value = null;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      return axios.post(api, formData);
    },
    // 金額加上千分號
    $_toCurrency(num) {
      const parts = num.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    },
    // 日期格式轉換
    $_date(time) {
      const localDate = new Date(time * 1000);
      return localDate.toLocaleDateString();
    },
    // 產生有分頁的陣列
    $_createPages(array, currentPage) {
      const newData = [];
      array.forEach((item, index) => {
        if (index % 10 === 0) {
          newData.push([]);
        }
        const page = parseInt(index / 10, 10);
        newData[page].push(item);
      });
      return newData[currentPage];
    },
  },
};
