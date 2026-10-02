---
title: Options FAQ
zendesk_article_id: 15956993709583
zendesk_section_id: 15003353810063
zendesk_updated_at: '2026-10-02T19:15:01Z'
zendesk_edited_at: '2026-04-29T06:22:51Z'
source_url: 'https://longbridgeus.zendesk.com/hc/en-us/articles/15956993709583-Options-FAQ'
promoted: false
position: 3
---
## **Can I settle a short call option with underlying shares?**

Yes. Settlement using underlying shares is the default method. If you hold the necessary shares when a short call is exercised, the position will be settled by delivering those shares automatically—no separate action is required.

## **Why don’t some U.S. stocks have options available?**

Longbridge currently supports options trading on most U.S.-listed stocks and ETFs with sufficient market liquidity.

Some securities may not have listed options or may be excluded due to low trading volume or high volatility risk.

We continuously review and expand the list of eligible products based on market conditions and regulatory requirements.

## **Will my underlying shares be locked after selling a covered call?**

Selling a covered call does not immediately restrict your underlying shares. However, as the option approaches expiration, if the contract becomes near in-the-money (within approximately 2%), the underlying shares may be temporarily locked to ensure proper settlement if exercised. These shares will unlock automatically after expiration or once the option is closed.

## **What factors affect option margin requirements?**

Your margin requirement is influenced by several factors, including:

-   The price and volatility of the option and underlying stock
-   The expiration date (shorter-dated contracts often require less margin)
-   Your **account equity** and open positions

The system automatically calculates and updates margin requirements in real time.

## **What happens if I don’t close my option position before expiration?**

If you hold an option through expiration, the outcome depends on whether the contract finishes **in-the-money (ITM)** or **out-of-the-money (OTM):**

-   **ITM Options:** Generally exercised automatically if they are at least **$0.01 in the money**, provided your account has sufficient buying power (for calls) or shares (for puts).
-   **OTM Options:** Expire worthless with no further action required.

If your account lacks sufficient funds or margin, Longbridge may **close or liquidate** your position before expiration to avoid failed settlement.

## **Will an exercise fail if my account doesn’t have enough funds?**

Longbridge increases margin requirements in advance to help prevent exercise failures. However, if funds remain insufficient at expiration, we may take protective action such as **closing** or **liquidating** the option. Exercise fees will only apply to successful exercises.

## **Does Longbridge offer margin relief for covered calls and covered puts?**

Yes. When you sell:

-   A **covered call** (backed by long stock holdings), or
-   A **covered put** (backed by sufficient cash or margin),
-   your margin requirement will be **reduced or offset** accordingly.

## **How can I tell if my margin is insufficient? Do I need to calculate it myself?**

No — you don’t need to calculate margin manually. Longbridge’s trading platform automatically determines the required margin for each trade.

If your available margin is insufficient, you’ll receive a **real-time prompt** before submitting your order.

## **Will in-the-money options be exercised automatically?**

Yes. In-the-money (ITM) options are typically exercised automatically if they are **$0.01 or more in the money** at expiration.

However, options can still be exercised **early** by the buyer, even if they are slightly out-of-the-money, particularly around **dividend dates** or **trading halts**.

## **Do all options trades require margin?**

-   **Long calls and long puts:** Only require the **premium paid**.
-   **Short calls and short puts:** Require **margin collateral**, which varies based on the underlying stock, strike price, and volatility.

## **Can I exercise an option before it expires?**

Yes, **American-style stock and ETF options** can be exercised at any time before expiration.

However, **index options** are European-style and can only be exercised at expiration.

Keep in mind that selling options can expose you to **early assignment** risk at any time before expiration.

## **Can premiums or margins between options positions be offset?**

Yes. Margin offsets are supported in these scenarios:

-   Selling a **short call** backed by owned shares (covered call)
-   Selling a **short put** backed by cash or an equivalent margin balance (cash-secured put)

## **Why does my margin remain locked after selling a covered call?**

When you sell a covered call, the value of your **underlying shares** is reserved (or “frozen”) as collateral for the position.

This ensures the shares are available for delivery if the call is exercised, and the locked portion of your portfolio cannot be used for other trades or withdrawals until the position is closed or expires.

## **How does adjusting my stock position affect a covered options strategy?**

-   **Increasing** your stock position may allow you to sell additional covered calls or puts.
-   **Reducing** your stock position could cause your covered options to become **uncovered (naked)**, increasing your margin requirement.

Your margin requirements and risk exposure are automatically recalculated when you adjust the underlying position.

## **Why wasn’t my option order filled, even at a better price?**

This can happen for a few reasons:

-   **Market liquidity:** Some options have low trading volume, meaning your order may not find a match immediately.
-   **Exchange routing:** Orders are routed through multiple exchanges, and visible quotes may differ slightly across venues.

These are normal occurrences in the U.S. options market and reflect how exchanges prioritize and route orders.

_Options involve substantial risk and are not suitable for all investors. Please read the [Characteristics and Risks of Standardized Options (ODD)](https://www.theocc.com/getmedia/a151a9ae-d784-4a15-bdeb-23a029f50b70/riskstoc.pdf) before trading._
