// 導入事例のフィルタリング機能
document.addEventListener('DOMContentLoaded', function() {
  // フィルターボタンと事例カードの要素を取得
  const filterButtons = document.querySelectorAll('.filter-btn');
  const caseItems = document.querySelectorAll('.case-item');

  // フィルターボタンのクリックイベントを設定
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // アクティブなボタンのスタイルを更新
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // 選択されたフィルターの値を取得
      const filterValue = this.getAttribute('data-filter');
      
      // 各カードの表示/非表示を切り替え
      caseItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}); 