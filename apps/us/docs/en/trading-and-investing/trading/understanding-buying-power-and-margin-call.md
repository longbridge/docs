---
title: Understanding Buying Power and Margin Call
zendesk_article_id: 15164525272079
zendesk_section_id: 15933265134991
zendesk_updated_at: '2026-10-06T17:51:44Z'
zendesk_edited_at: '2026-10-03T04:20:25Z'
source_url: 'https://longbridgeus.zendesk.com/hc/en-us/articles/15164525272079-Understanding-Buying-Power-and-Margin-Call'
promoted: false
position: 6
---
## Buying power

Buying power refers to the total funds available to you for purchasing stocks & ETFs, options, or crypto.

**Overnight Buying Power**

Overnight buying power = the lesser of (2× margin excess) and the greater of (2× SMA, 2× Reg-T excess)

Overnight buying power is the amount you can use to purchase securities that you intend to hold overnight. When you liquidate an overnight position, your overnight buying power is replenished by the sale proceeds, adjusted to reflect the maintenance requirement of the position sold.

**Intraday Buying Power**

Intraday buying power = 4× your margin excess

Opening and closing positions throughout the day will in turn decrease and increase your available intraday buying power. However, the extra buying power is not intended to be used overnight. Holding a position purchased with Intraday buying power overnight may result in a Reg T margin call.

**Option Buying Power**

Option buying power = your margin excess

Option buying power becomes available only after you have enabled option trading.

**Crypto Buying Power**

Crypto buying power is calculated based on your available cash, pending settlements, and the margin or collateral currently reserved for other positions.

Crypto buying power becomes available only after you have enabled crypto trading.

<table class="wysiwyg-table-resized" style="border-collapse: collapse; border-style: none;" data-ace-table-col-widths="805"><colgroup><col style="width: 100%;"></colgroup><tbody><tr style="height: 39px;"><td style="border-color: rgb(222, 224, 227); padding: 8px; vertical-align: top;" colspan="1" rowspan="1"><div><strong>Important</strong></div><div>If you have Instant Buying Power from a pending ACH deposit, it's included in your overnight buying power and Intraday buying power. Instant Buying Power is added dollar for dollar and isn't multiplied by margin.</div></td></tr></tbody></table>

## Margin Call

**Required Maintenance Call**

You may receive a required maintenance call when margin equity falls below the maintenance requirement. Please deposit funds or reduce positions to restore margin excess.

**Reg-T Call**

Initial purchases have a higher requirement than maintenance requirements. Typically 50%. If you make an overnight purchase without the required funds available, you will be issued a Reg-T Call for the remainder. Note that liquidating positions to meet a Reg-T call may result in a violation. To avoid a violation, please add funds to your account by the stated deadline.

Repeated violations within a 12-month period will result in the following:

-   3rd violation: Overnight buying power restricted
-   4th violation: Account restricted to closing positions only for 90 days

**Intraday Margin Call**

An IM call results from using more Intraday Buying Power than you have at any given time during the day. To resolve an IM call, you may either deposit funds or liquidate positions by the stated deadline.

Please note that resolving an IM call by liquidating positions counts as one of your 3 allowed resolutions via liquidation within a 12-month rolling period. Each resolution — regardless of how many trades are made — counts as a single use. Depositing funds to resolve an IM call does not count against this limit.

Once you have used all 3 liquidation resolutions within a 12-month period, any subsequent IM calls must be resolved by depositing funds only.

Failure to resolve an IM call by the stated deadline will result in the account being restricted to closing positions only for 90 days. If the IM call is resolved during this 90-day restriction period, the restriction will be lifted.

**Concentration Margin Call**

You may receive a Concentration Margin (CM) call when your account meets all of the following conditions: your account is a margin account, your cash debit balance exceeds $100,000, and your CM excess falls below zero (i.e., your Total Concentration Requirement exceeds your Margin Equity).

The CM excess is calculated as:

**CM Excess = Margin Equity − Total Concentration Requirement**

where the Total Concentration Requirement is determined by each eligible stock's market value multiplied by its applicable Concentration Requirement%, based on its concentration ratio (CM Ratio) within your portfolio:

<table class="wysiwyg-table-resized" style="border-collapse: collapse;"><colgroup><col style="width: 31%;"> <col style="width: 69%;"></colgroup><tbody><tr><td>CM Ratio</td><td>Concentration Requirement%</td></tr><tr><td>&lt; 25%</td><td>Maintenance Margin%</td></tr><tr><td>≥ 25% and &lt; 35%</td><td>MAX(35%, Maintenance Margin%)</td></tr><tr><td>≥ 35% and ≤ 50%</td><td>MAX(40%, Maintenance Margin%)</td></tr><tr><td>&gt; 50%</td><td>MAX(50%, Maintenance Margin%)</td></tr></tbody></table>

Note: ETFs are excluded from the CM Ratio calculation.

To resolve a CM call, you may deposit funds or liquidate positions by the stated deadline. A Failure to resolve a CM call by the deadline may result in the firm liquidating positions to resolve the call on your behalf.
