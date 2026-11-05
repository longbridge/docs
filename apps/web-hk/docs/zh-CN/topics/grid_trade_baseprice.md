---
title: "什么是基准价格？"
topic_id: "20315"
category_slug: "gridtrading"
updated_at: "1784789420"
related: [{"categorySlug":"gridtrading","slug":"desktop_grid_trade_help","title":"什么是网格交易（桌面端）？"},{"categorySlug":"gridtrading","slug":"44v0zg","title":"什么是网格交易 - 休眠状态？"},{"categorySlug":"gridtrading","slug":"multiple_placement","title":"什么是倍数委托？"},{"categorySlug":"gridtrading","slug":"grid-trade-help","title":"什么是网格交易"}]
---
<p><strong>基准价格</strong>是网格策略的核心起点，以下是详细解释和举例说明。</p><p><strong>基准价格</strong>是网格策略的初始计算价格，系统将以基准价格为起点，结合用户设定的触发条件，计算出基准价格上下的网格，并实时监控股票市价是否触及网格。当市场价格向上或向下触及设定网格后，该触及的网格边界将成为新的基准价格，原网格的上下边界顺势成为新的网格范围，并以此持续循环监控。</p><p>举例： 如下图设置网格交易，基准价格为 172。</p><figure class="image image_resized" style="width: 80.36%"><img src="https://pub-canary.lbkrs.com/social/2024/0/32CmTvMmcve3BBR7dcyrrTs8wEPa9vnr.jpg"/></figure><ul><li>模拟行情从 172-&gt; 167<ul><li>172-&gt;170 ，触发买入 2 股 AAPL，基准价格变动 172-&gt;170</li><li>170-&gt;168，触发买入 2 股 AAPL，基准价格变动 170-&gt;168</li><li>168-&gt;167，不会触发买入</li></ul></li><li>模拟行情从 167-&gt; 170<ul><li>167-&gt;170 ，触发卖出 2 股 AAPL，基准价格变动 168-&gt;170</li></ul></li></ul><p> </p><p><strong>关键要点</strong>：</p><ul><li>基准价作用：作为网格计算的初始起点，用于生成上下买卖挂单网格</li><li>动态调整规则：每次触发交易后，触发价会成为新基准价，并以此重新计算后续网格</li><li>触发逻辑：仅当市价触及网格线时才触发交易，未触及则不操作</li></ul><p> </p><p><i>本文仅供参考，不构成任何投资建议。</i></p>
