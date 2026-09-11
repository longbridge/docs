---
title: Options Order Types and Buying Power
zendesk_article_id: 17545998948111
zendesk_section_id: 15003353810063
zendesk_updated_at: '2026-09-09T03:30:03Z'
zendesk_edited_at: '2026-09-09T03:30:03Z'
source_url: 'https://longbridgeus.zendesk.com/hc/en-us/articles/17545998948111-Options-Order-Types-and-Buying-Power'
promoted: false
position: 0
---
## Market vs. Limit Orders for Options

### Limit Orders

A **limit order** executes only if option contracts are available at _your specified limit price or better._

-   **For buys:** executes at your limit price or _lower._

-   **For sells:** executes at your limit price or _higher._

-   By default, most limit orders are **Day orders**, which expire at the **end of the trading day** if not filled.

-   If you select **Good ‘Til Canceled (GTC)**, the order will remain active for up to **90 days** (or until the option contract expires or you manually cancel it).

**Key points:**

-   Provides price protection but does not guarantee execution.

-   Useful when you want control over the price you pay or receive.

-   In low-volume options, it’s possible your order may **never fill** if the market doesn’t reach your limit.

### Market Orders

A market order seeks immediate execution at the best available price.

**Key points:**

-   Prioritizes execution, but does not guarantee execution or price.

-   The final fill price can differ from the last quoted price, especially in **volatile** or **illiquid** options.

### Stop and Stop-Limit Orders

-   **Stop Orders:** Become market orders once a trigger price is reached.

-   **Stop-Limit Orders:** Become limit orders at a specified price once the trigger price is hit.

-   These order types may be used to manage risk on existing option positions.

### Multi-Leg Orders

A multi-leg order combines two or more option legs into a single strategy (e.g., straddles or strangles).

-   Can be placed as a **net debit** (you pay) or **net credit** (you receive).

-   Market and limit are both supported by multi-leg orders.

### Buying Power for Options

Buying power represents how much you can use to open new positions. For options:

-   **Long options (buying calls or puts):** require you to pay the full premium upfront.

-   **Short options (selling to open):** collateral requirements depend on the strategy and applicable account requirements.

-   If you sell a **covered call**, your underlying stock is reserved as collateral, reducing your available buying power for that position.

-   If you sell a **cash-secured put (CSP)**, cash equal to the strike price × 100 per contract is reserved as collateral and unavailable for other trades until the position is closed or expires.
