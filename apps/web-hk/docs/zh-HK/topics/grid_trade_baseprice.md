---
title: "什麽是基準價格？"
topic_id: "20315"
category_slug: "gridtrading"
updated_at: "1784789420"
related: [{"categorySlug":"gridtrading","slug":"desktop_grid_trade_help","title":"什麽是網格交易（桌面端）？"},{"categorySlug":"gridtrading","slug":"44v0zg","title":"什麽是網格交易 - 休眠狀態？"},{"categorySlug":"gridtrading","slug":"multiple_placement","title":"什麽是倍數委托？"},{"categorySlug":"gridtrading","slug":"grid-trade-help","title":"什麼是網格交易"}]
---
<p><strong>基準價格</strong>是網格策略的核心起點，以下是詳細解釋和舉例說明。</p><p>基準價格是網格策略的初始計算價格，系統將以基準價格為起點，結合用戶設定的觸發條件，計算出基準價格上下的網格，並實時監控股票市價是否觸及網格。當市場價格向上或向下觸及設定網格後，該觸及的網格邊界將成為新的基準價格，原網格的上下邊界順勢成為新的網格範圍，並以此持續循環監控。</p><p>舉例： 如下圖設置網格交易，基準價格為 172。</p><figure class="image image_resized" style="width: 80.36%"><img src="https://pub.pbkrs.com/uploads/2026/481318310e43129cd0bf691de6391268"/></figure><ul><li>模擬行情從 172-&gt; 167<ul><li>172-&gt;170 ，觸發買入 2 股 AAPL，基準價格變動 172-&gt;170</li><li>170-&gt;168， 觸發買入 2 股 AAPL，基準價格變動 170-&gt;168</li><li>168-&gt;167，不會觸發買入</li></ul></li><li>模擬行情從 167-&gt; 170<ul><li>167-&gt;170 ，觸發賣出 2 股 AAPL，基準價格變動 168-&gt;170</li></ul></li></ul><p> </p><p><strong>關鍵要點</strong>：</p><ul><li>基準價作用：作為網格計算的初始起點，用於生成上下買賣掛單網格。</li><li>動態調整規則：每次觸發交易後，觸發價會成為新基準價，並以此重新計算後續網格。</li><li>觸發邏輯：僅當市價觸及網格線時才觸發交易，未觸及則不操作。</li></ul><p> </p><p><i>本文僅供參考，不構成任何投資建議。</i></p>
