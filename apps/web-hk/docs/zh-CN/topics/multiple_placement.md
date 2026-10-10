---
title: "什么是倍数委托？"
topic_id: "20316"
category_slug: "gridtrading"
updated_at: "1784789422"
related: [{"categorySlug":"gridtrading","slug":"desktop_grid_trade_help","title":"什么是网格交易（桌面端）？"},{"categorySlug":"gridtrading","slug":"44v0zg","title":"什么是网格交易 - 休眠状态？"},{"categorySlug":"gridtrading","slug":"grid_trade_baseprice","title":"什么是基准价格？"},{"categorySlug":"gridtrading","slug":"grid-trade-help","title":"什么是网格交易"}]
---
<p>以下是倍数委托的详细解释和举例说明。</p><p>如果打开倍数委托，当股价出现跳空高开或低开超过一个网格的情况下，按照覆盖的网格数量委托对应倍数的每笔委托数量。</p><p>举例： 如下图设置网格交易。</p><figure class="image"><img src="https://pub-canary.lbkrs.com/uploads/2024/25e327255c2c618343e439c8e1f95579"/></figure><p>基准价格为 170，模拟行情突然到达 175</p><ul><li>开启倍数委托<ul><li>委托数量 =（最新价 - 基准价格）/ (触发价格条件) * 每笔委托数量 =（175-170）/ 1 * 10 =50</li><li>触发结果：卖出 50 股 AAPL</li></ul></li><li>关闭倍数委托<ul><li>委托数量 = 每笔委托数量 = 10</li><li>触发结果：卖出 10 股 AAPL</li></ul></li></ul><p> </p><p><strong>关键要点</strong>：</p><ul><li>功能作用：倍数委托用于处理股价跳空涨跌（直接跳过多个网格）的情况，根据跳空幅度计算实际应交易数量。</li><li>开启时：委托数量 = 跳过的网格数 × 每笔委托数量。</li><li>关闭时：无论跳过多少网格，均按固定数量（每笔委托数量）交易。</li></ul><p> </p><p><i>本文仅供参考，不构成任何投资建议。</i></p>
