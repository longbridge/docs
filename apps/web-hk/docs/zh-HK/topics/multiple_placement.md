---
title: "什麽是倍數委托？"
topic_id: "20316"
category_slug: "gridtrading"
updated_at: "1784789422"
related: [{"categorySlug":"gridtrading","slug":"desktop_grid_trade_help","title":"什麽是網格交易（桌面端）？"},{"categorySlug":"gridtrading","slug":"44v0zg","title":"什麽是網格交易 - 休眠狀態？"},{"categorySlug":"gridtrading","slug":"grid_trade_baseprice","title":"什麽是基準價格？"},{"categorySlug":"gridtrading","slug":"grid-trade-help","title":"什麼是網格交易"}]
---
<p>以下是倍數委托的詳細解釋和舉例說明。</p><p>如果打開倍數委托，當股價出現跳空高開或低開超過一個網格的情況下，按照覆蓋的網格數量委托對應倍數的每筆委托數量。</p><p>舉例： 如下圖設置網格交易。<br/> </p><figure class="image image_resized" style="width: 80.36%"><img src="https://pub.pbkrs.com/uploads/2026/ed44f0001e9a525085e9e5e05b444eed"/></figure><p>基準價格為 170，模擬行情突然到達 175</p><ul><li>開啓倍數委託<ul><li>委託數量 =（最新價 - 基準價格）/ (觸發價格條件) * 每筆委託數量 =（175-170）/ 1 * 10 =50</li><li>觸發結果：賣出 50 股 AAPL</li></ul></li><li>關閉倍數委託<ul><li>委託數量 = 每筆委託數量 = 10</li><li>觸發結果：賣出 10 股 AAPL</li></ul></li></ul><p> </p><p><strong>關鍵要點</strong>：</p><ul><li>功能作用：倍數委托用於處理股價跳空漲跌（直接跳過多個網格）的情況，根據跳空幅度計算實際應交易數量。</li><li>開啟時：委托數量 = 跳過的網格數 × 每筆委托數量。</li><li>關閉時：無論跳過多少網格，均按固定數量（每筆委托數量）交易。</li></ul><p> </p><p><i>本文僅供參考，不構成任何投資建議。</i></p>
