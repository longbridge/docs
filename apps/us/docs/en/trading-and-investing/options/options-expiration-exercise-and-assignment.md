---
title: 'Options Expiration, Exercise, and Assignment'
zendesk_article_id: 17548425965839
zendesk_section_id: 15003353810063
zendesk_updated_at: '2026-09-09T06:07:13Z'
zendesk_edited_at: '2026-09-09T06:07:13Z'
source_url: 'https://longbridgeus.zendesk.com/hc/en-us/articles/17548425965839-Options-Expiration-Exercise-and-Assignment'
promoted: false
position: 0
---
## Overview

Unlike stocks, options have defined **expiration, exercise, and assignment** terms. Understanding how these processes work is essential for managing your positions and avoiding unexpected outcomes.

## Expiration

Each option contract has a **set expiration date**—the last day it can be traded or exercised. Once the contract expires, it becomes inactive and will either:

-   Be **exercised automatically** if it finishes in-the-money, or

-   **Expire worthless** if it finishes out-of-the-money.

### Key things to know as expiration approaches:

-   Longbridge will **automatically exercise** any option that is **$0.01 or more in-the-money (ITM)** at expiration, as long as your account has sufficient buying power or margin to support the resulting position (for calls, to purchase shares; for puts, to sell shares or maintain any resulting short stock position if you do not already hold the underlying).

-   If you **do not** have sufficient buying power or underlying shares, Longbridge may **attempt to close** the position in the market before expiration to prevent unwanted exercise or assignment.

-   You can submit a **Do Not Exercise (DNE)** request if you prefer not to exercise an ITM option. DNE requests must be received **by 4:00 p.m. ET** on expiration day.

-   After-hours price movements can affect whether an option finishes in or out of the money, so it is important to monitor your positions closely near market close. When an option strike is very close to the underlying price near expiration, this is known as **pin risk** — you may be uncertain whether the option will be auto-exercised or expire worthless, and a post-close price move can flip it ITM or OTM after you believed your position was settled, leaving you with an unexpected stock position when markets reopen. This is a key reason why submitting a DNE request before the 4:00 p.m. ET cutoff and monitoring positions through close are both important.

## Moneyness of an Option

“Moneyness” describes how the current market price of the underlying security compares to the option’s strike price:

-   **In-the-Money (ITM):** Has intrinsic value (profitable if exercised).

-   **At-the-Money (ATM):** Underlying price is close to the strike price.

-   **Out-of-the-Money (OTM):** Has no intrinsic value and will likely expire worthless.

## Exercise

### What is exercising an option?

**Exercising** an option means using your contractual right to buy or sell the underlying stock at the strike price.

-   **Call Options:** Exercise gives you the right to **buy** the underlying shares.

-   **Put Options:** Exercise gives you the right to **sell** the underlying shares.

### Timing

-   **Early Exercise:** You may exercise American-style stock or ETF options **anytime before expiration** during regular trading hours (9:30 a.m.–4:00 p.m. ET).

-   **Automatic Exercise:** At expiration, ITM options are exercised automatically unless you submit a **DNE request**.

-   **European-Style Options (Indexes):** Cannot be exercised early; they are automatically exercised if ITM based on the official settlement value at expiration. Unlike equity or ETF options, index options are **cash-settled** — no shares are delivered or received. Note that many broad index options (such as SPX) use **AM settlement**, meaning the settlement value is based on opening prices on expiration day rather than closing prices, which introduces additional uncertainty.

### Confirming an Exercise

After exercising an option, you’ll receive a confirmation in-app or by email once the transaction is processed and reflected in your account holdings.

## Assignment

### What is assignment?

If you **sell (write)** an option, you take on an obligation:

-   A **short call** may require you to **sell** shares at the strike price.

-   A **short put** may require you to **buy** shares at the strike price.

Assignments can occur **at any time before expiration** for American-style options, even if the option still has time value.

### Key considerations

-   **Early Assignment Risk:** You can be assigned before expiration, particularly before a dividend ex-date or during volatile market conditions.

-   **Account Impact:** Assignment may create new long or short stock positions, potentially affecting your margin balance or buying power.

-   **Insufficient Funds:** If you lack the equity or buying power to cover assignment, Longbridge may take risk-reducing actions, including liquidating positions or initiating a margin call.

## Dividend Risk

If you hold a **short call** on a dividend-paying stock, you may be assigned early before the ex-dividend date. If this occurs, you will be responsible for paying the dividend on the shares delivered. To avoid this, consider closing any short call positions before the ex-dividend date.

## Managing Expiring Positions

To avoid unwanted exercises or assignments:

-   Monitor all expiring options closely, especially ITM or near-the-money contracts.

-   Confirm that your account has enough buying power or underlying shares to support exercise or assignment.

-   Submit a **Do Not Exercise (DNE)** request before 4:00 p.m. ET cutoff if you do not wish to exercise.

-   Contact Longbridge Support promptly if you have questions about pending exercises or assignments.

_Options trading involves significant risk and may not be suitable for all investors. Always review the_ [_**Characteristics and Risks of Standardized Options (ODD)**_](https://www.theocc.com/getmedia/a151a9ae-d784-4a15-bdeb-23a029f50b70/riskstoc.pdf) _before trading._
