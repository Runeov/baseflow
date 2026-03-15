# SAI Token Sale Page — Improvement Plan

## Current State Summary
The page is a single-file HTML presale page for SAI tokens on Polygon. It includes:
- Hero section with buy widget (MetaMask + USDT/MATIC)
- Raise progress bar, token metrics
- How-to-buy steps, tokenomics allocation grid
- Recent purchases table (Supabase-backed)
- Footer with links

**Visually:** Clean dark theme, amber/cyan accent palette, Unbounded + Epilogue fonts. Looks professional but has several issues.

---

## 🔴 Critical Bugs

### 1. JavaScript `supabase` Variable Conflict
**Console error:** `SyntaxError: Identifier 'supabase' has already been declared`  
The Supabase UMD script creates a global `supabase` object, and then line 573 declares `let supabase = null;` — this collides. Need to rename the local variable (e.g., `supabaseClient`).

### 2. Placeholder Config Values Still Active
`RECEIVING_WALLET`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY` are all still set to placeholder strings. The page will never actually work until these are replaced. Should add a visible dev-mode banner when placeholders are detected, rather than silently failing.

### 3. ethers.js CDN May Be Unreliable
`cdn.ethers.io` returned `ERR_NAME_NOT_RESOLVED` in testing. Should switch to a more reliable CDN like `cdnjs.cloudflare.com` or `unpkg.com`.

---

## 🟡 Functional Improvements

### 4. Add WalletConnect / Multiple Wallet Support
Currently MetaMask-only. Many users use Trust Wallet, Coinbase Wallet, or WalletConnect. Consider integrating Web3Modal or RainbowKit for broader wallet support.

### 5. Add Countdown Timer / Phase End Date
No urgency mechanism. Adding a countdown timer for Phase 1 end date would drive conversions.

### 6. Add Referral Tracking
No referral system. Adding `?ref=WALLET` URL parameter tracking would enable community-driven growth.

### 7. Add Email/Telegram Notification Opt-in
After purchase, offer users a way to get notified about TGE. Currently no way to re-engage buyers.

### 8. Input Validation & Error UX
- No max purchase limit shown
- No clear error when amount is below minimum ($10)
- The `min="10"` on the input refers to 10 USDT, but if paying in MATIC the minimum should be dynamic based on MATIC price

### 9. MATIC Price Fallback
`maticPrice` defaults to `1.0` which is wildly inaccurate if CoinGecko API fails. Should show a warning or disable MATIC payments if price fetch fails.

### 10. Purchase Confirmation Modal
After successful purchase, just showing an inline status message is underwhelming. A celebratory modal with confetti, share buttons, and SAI allocation summary would improve UX.

---

## 🟢 Design & UX Improvements

### 11. Add Social Proof / Trust Signals
- No team section or links to team profiles
- No audit badge or smart contract verification link
- No partner logos
- Add "Backed by real solar infrastructure" visual proof

### 12. Add FAQ / Accordion Section
Common questions like "When do I receive tokens?", "Is this a security?", "What network?", "Can I buy with credit card?" should be answered on-page.

### 13. Improve Mobile Experience
- The responsive breakpoints exist but could be tighter
- Buy widget should be more prominent on mobile (currently below the fold)
- Consider a sticky "Buy Now" CTA bar on mobile

### 14. Add Animated Token Allocation Chart
The allocation grid is text-only. A donut/pie chart with animation would be more visually compelling and easier to scan.

### 15. Add Progress Milestones on Raise Bar
Show milestone markers on the progress bar (e.g., 25%, 50%, 75%) with labels like "Pilot Nodes Funded", "Training Program Funded", etc.

### 16. Improve Footer
- Add social media links (Twitter/X, Telegram, Discord)
- Add contract address display with copy button
- Whitepaper and Terms links go to `#` — need real destinations

### 17. Add SEO Meta Tags & Open Graph
No `<meta>` description, no OG tags for social sharing. When someone shares this link on Twitter/Telegram, it will look bare.

### 18. Add Loading States & Skeleton UI
The "Loading purchases..." text is plain. Skeleton loading animations would feel more polished.

---

## 🔵 Security & Compliance

### 19. Add CSP Headers Guidance
The page loads scripts from external CDNs. Should document recommended Content-Security-Policy headers for deployment.

### 20. Sanitize Supabase Data in Table Rendering
Line 888 uses template literals to inject Supabase data directly into HTML (`row.wallet_address`, `row.tx_hash`). This is an XSS vector. Should sanitize or use `textContent` instead of `innerHTML`.

### 21. Rate Limiting on Supabase Inserts
Currently any connected wallet can spam the purchases table. Should add Supabase RLS policies and rate limiting.

### 22. Compliance Language Review
Per AGENTS.md tokenization guardrails:
- The phrase "27% annual ROI" in the hero description could be interpreted as promising financial returns — this should be reworded
- "DeFi yield" language should be softened
- Add clearer "not a security" disclaimer near the buy button

---

## 📋 Priority Implementation Order

| Priority | Item | Category |
|----------|------|----------|
| P0 | Fix `supabase` variable collision (#1) | Bug |
| P0 | Fix ethers.js CDN (#3) | Bug |
| P0 | Fix XSS in purchase table (#20) | Security |
| P1 | Add dev-mode banner for placeholders (#2) | DX |
| P1 | Compliance language fixes (#22) | Legal |
| P1 | Add OG/SEO meta tags (#17) | Marketing |
| P1 | MATIC price fallback warning (#9) | UX |
| P2 | Countdown timer (#5) | Conversion |
| P2 | Purchase celebration modal (#10) | UX |
| P2 | FAQ section (#12) | Trust |
| P2 | Mobile sticky CTA (#13) | Mobile |
| P2 | Social proof / trust signals (#11) | Trust |
| P3 | Animated allocation chart (#14) | Visual |
| P3 | Progress milestones (#15) | Visual |
| P3 | Referral tracking (#6) | Growth |
| P3 | Multi-wallet support (#4) | Reach |
| P3 | Email/Telegram opt-in (#7) | Retention |
| P3 | Better loading states (#18) | Polish |
