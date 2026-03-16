# Solar Panel Procurement Research
## For Baseflow Validator Node Infrastructure — Thailand HQ

*Research Date: March 2026 | Location: Thailand*

---

## Executive Summary

Thailand is one of the best solar procurement jurisdictions in the world. ACFTA zero-duty imports from China, geographic proximity (15–22 day sea transit vs 30–45 days to the US), a developed domestic distribution network, and near-zero tariffs mean panels land in Thailand at **$0.12–$0.16/W** — vs **$0.28–$0.35/W** in the US. That is a structural 55–60% cost advantage that no US or European competitor can match.

---

## Node Power Requirements

| Node Type | Power Draw | Daily kWh |
|-----------|-----------|-----------|
| Ethereum node (small PC) | 50–100W | 1.2–2.4 kWh |
| Ethereum node (full server) | 100–200W | 2.4–4.8 kWh |
| Solana validator | 400–600W | 10–14 kWh |
| 5-node rack | 500W–1kW | 12–24 kWh |

**Rule of thumb:** 10kW solar per 1kW constant load + 2–3 days battery autonomy.

---

## ACFTA Tariff Confirmation (Thailand ← China)

Under the **ASEAN-China Free Trade Agreement (ACFTA)**, solar panels (HS Code 8541.40) are on the **zero-duty schedule**.

| Tax / Fee | Rate | Notes |
|-----------|------|-------|
| ACFTA Import Duty (HS 8541.40) | **0%** | Requires Form E Certificate of Origin |
| MFN Import Duty | **0%** | Thailand's MFN rate is also 0% for solar |
| VAT | **7%** | Applied on CIF value; all imports |
| Excise Tax | 0% | Not applicable to solar panels |
| Port / customs handling | ~$150–300/container | Laem Chabang standard fees |

**Form E Certificate of Origin** is required to claim ACFTA preferential rates — standard on any B2B shipment from China.

---

## Price Comparison: China FOB vs Thailand Landed vs US Landed

| Cost Component | China FOB | Thailand Landed | US Landed (2026) |
|----------------|-----------|----------------|-----------------|
| Module FOB price (Tier 1 TOPCon) | $0.089–$0.094/W | — | — |
| Ocean freight | — | +$0.015–$0.025/W | +$0.025–$0.040/W |
| Import duty | — | **0%** (ACFTA) | 36–800%+ (tariffs) |
| VAT | — | +7% on CIF | State dependent |
| Customs/clearance | — | ~$0.002–$0.005/W | ~$0.003–$0.006/W |
| **All-in (direct import)** | — | **$0.12–$0.16/W** | **$0.28–$0.35/W** |
| **All-in (via distributor)** | — | $0.16–$0.22/W | $0.32–$0.45/W |

**Thailand saves 55–60% vs the US on every watt of solar hardware.**

### Shipping Time
| Route | Mode | Transit Time |
|-------|------|-------------|
| Shenzhen/Guangzhou → Laem Chabang (Bangkok) | FCL Ocean | **7–22 days** (avg 15–17) |
| China → USA West Coast | FCL Ocean | 14–21 days |
| China → USA East Coast | FCL Ocean | 28–40 days |

---

## Thailand Panel Pricing (March 2026)

All prices in USD at ~35 THB/USD.

| Tier | Source | USD/W | THB/W |
|------|--------|-------|-------|
| Direct China import | B2B import (ACFTA + 7% VAT) | **$0.12–$0.16/W** | 4.2–5.6 |
| Thai wholesale distributor | Local B2B | $0.16–$0.22/W | 5.6–7.7 |
| Retail / end consumer | Retail market | $0.28–$0.57/W | 10–20 |

### Indicative Installed System Costs (Bangkok, on-grid)

| System Size | THB | USD |
|-------------|-----|-----|
| 10 kW commercial | 250,000–320,000 | $7,140–$9,140 |
| 20 kW commercial | 450,000–600,000 | $12,860–$17,140 |
| 50 kW commercial | 1,000,000–1,300,000 | $28,570–$37,140 |
| 5 kW off-grid + battery | 300,000–400,000 | $8,570–$11,430 |

---

## Panel Comparison Table

| # | Model | Watts | Efficiency | Est. Thailand Price | Certs | Notes |
|---|-------|-------|-----------|-------------------|-------|-------|
| 1 | JA Solar JAM72D40-600W | 600W | ~23% | ~$0.14/W landed | IEC 61215/61730 | Top tier; direct import |
| 2 | LONGi Hi-MO 7 615–625W | 615–625W | 22.8–23.1% | ~$0.14–0.16/W | IEC, CE, TUV | Highest watt/panel; LONGi TH distributor available |
| 3 | Trina Vertex N 600W | 600W | ~22.5% | ~$0.14/W | IEC, TUV | Made in Thailand (Trina TH factory) |
| 4 | Canadian Solar TOPHiKu6 580W | 580W | 22.5–23% | ~$0.13–0.15/W | UL, IEC | **Made in Thailand** (Si Racha, Chonburi) |
| 5 | Jinko Tiger Neo 580W | 580W | 22.45% | ~$0.13–0.15/W | IEC, UL | Direct import or via Thai dealers |
| 6 | Solartron (Thai brand) | 380–450W | 19–21% | ~$0.18–0.25/W | UL, TIS, JIS, MCS | **Thai domestic manufacturer**; 35+ years |
| 7 | GreenSolar Thailand | 400–500W | 20–22% | ~$0.18–0.22/W | CE, TIS | Thai OEM/ODM; custom branding available |

---

## Complete Kit Options (Available in Thailand)

| Kit | Inverter | Battery | Solar | Est. Thailand Price | Best For |
|-----|---------|---------|-------|---------------------|---------|
| Growatt + LFP 10kW off-grid kit (China import) | 10kW hybrid | 20kWh LiFePO4 | 10kW panels | **~$5,500–$8,250** | 1 Solana node / 5–8 ETH nodes |
| Deye + LFP 20kW system (China import) | 20kW hybrid | 40kWh LiFePO4 | 20kW panels | **~$9,900–$15,400** | Multi-node rack |
| Solaris Green Energy off-grid kit (Thai stock) | Growatt/Deye | LiFePO4 | Multi-brand | Contact Solaris | Off-grid specialist; local warranty |
| SCG turnkey 10kW (Thai installer) | SMA/Huawei | Optional | Canadian Solar/Trina | ~$8,000–$10,000 | Full install, no hassle |

---

## Thai Solar Distributors & Suppliers

### Tier 1 — National Wholesale Distributors

| Company | Brands | Location | Contact |
|---------|--------|---------|---------|
| **QES Energy** (qesenergy.co.th) | Trina Solar (official) | Bangkok | Official Trina direct importer; wholesale pricing |
| **Energy Dynamics Thailand** (energydynamicsth.com) | Canadian Solar, SMA Inverters | Bangkok (Chatuchak) | Official Canadian Solar distributor |
| **Solaris Green Energy** (solaris.co.th) | LONGi, multi-brand | Krabi (national) | Off-grid specialist; +66 84 852 4608 |
| **New Energy Plus Solutions Co.** | LONGi (official 2024 partner) | Bangkok | Official LONGi Thailand partner |

### Tier 2 — Commercial Installers with Procurement

| Company | Specialty |
|---------|---------|
| **CleanMax Thailand** | C&I specialist; 1,000+ MW track record |
| **Bangkok Solar Power Co.** | Subsidiary of Bangkok Cable Group; EPC |
| **SCG (Siam Cement Group)** | Mass-market; major brand |
| **Blue Solar** | Since 2006; energy storage |
| **MonoSun Technology** | Phuket / commercial |

### Thai Domestic Manufacturers

| Company | Location | Capacity / Notes |
|---------|---------|-----------------|
| **Solartron Public Co.** (solartron.co.th) | Samut Prakan | 35+ years; UL/MCS/JIS/TIS; German technology |
| **GreenSolar Thailand** (greensolarthailand.com) | Thailand | OEM/ODM available; mono + poly + black panels |
| **Canadian Solar Manufacturing TH** | Si Racha, Chonburi (EEC) | 5 GW N-type wafer + TOPCon; buying local eliminates import |
| **Trina Solar Thailand** | Multiple | 6.5 GW combined TH + Vietnam capacity |
| **Sungrow Thailand** | Thailand | Inverters + BESS local manufacturing |

---

## Sizing Guide (24/7 Off-Grid Node Operation)

| Node Setup | Daily kWh | Solar Needed | Battery Needed | Panel Config |
|-----------|----------|-------------|---------------|-------------|
| 1 ETH node (100W) | 2.4 kWh | 1.5–2kW | 10kWh | 4–5x 400W |
| 3 ETH nodes (300W) | 7.2 kWh | 4–5kW | 20–25kWh | 10–12x 450W |
| 1 Solana validator (500W) | 12 kWh | 7–8kW | 35–40kWh | 16x 500W |
| 5-node rack (1kW) | 24 kWh | 12–15kW | 60–80kWh | 28–36x 550W |

---

## Recommended Procurement Strategy by Scale

### Option A — Small Scale (< 50 kW)
**Buy from Thai wholesale distributors**
- Source from QES Energy (Trina) or Solaris Green Energy (LONGi)
- No import paperwork; immediate stock; local warranty
- Cost: **$0.16–$0.22/W panels** | complete off-grid system ~$0.55–$0.85/W all-in

### Option B — Medium Scale (50–500 kW)
**Direct import from China via Alibaba / Made-in-China**
- Source Tier-1 panels (JA Solar, LONGi, Trina, Canadian Solar) direct from Chinese factories
- Obtain **Form E Certificate of Origin** for ACFTA 0% duty
- Ship FCL via Laem Chabang (20ft container = ~100–130 kW of 550W panels)
- Use Thai customs broker (~$200–400/container)
- Cost: **$0.12–$0.16/W all-in** | Transit: 15–17 days

### Option C — Large Scale (500 kW+)
**BOI application + direct Thai factory procurement**
- Apply for BOI promotion under "Data Center" or "Smart Electronics" (Category A2)
- Receive **0% import duty on all machinery** — eliminates even the 7% VAT on equipment
- Buy direct from **Canadian Solar Thailand** (Si Racha) or **Trina Solar Thailand** — zero import friction
- Explore PPA with Thai solar developer (CleanMax, Bangkok Solar) for zero-capex deployment
- Cost: **$0.10–$0.15/W** with BOI machinery exemption

---

## Vendor Shortlist for Immediate Action

| Priority | Vendor | Why |
|----------|--------|-----|
| 1 | **QES Energy** (qesenergy.co.th) | Official Trina direct importer; call for wholesale price |
| 2 | **Solaris Green Energy** (+66 84 852 4608) | LONGi + off-grid kits; wholesale since 2013 |
| 3 | **Energy Dynamics Thailand** (energydynamicsth.com) | Official Canadian Solar + SMA; Bangkok |
| 4 | **Canadian Solar Manufacturing Thailand** (Si Racha) | Buy direct from Thai factory at scale |
| 5 | **Alibaba — JA Solar / LONGi / Trina** (direct factory) | Lowest cost; use for 50kW+ orders |

---

## BOI Solar Incentives Summary

| Incentive | Detail |
|-----------|--------|
| Corporate Income Tax exemption | **8 years, no cap** |
| Import duty on machinery | **0%** — full exemption |
| Import duty on raw materials | 0% for R&D / export manufacturing |
| Land ownership | Permitted for BOI-promoted foreign companies |
| Foreign skilled workers | No ratio restriction |
| 100% foreign ownership | Permitted in manufacturing |

**Key tip:** Apply under "Data Center" or "Smart Electronics" BOI category to get 0% machinery import duty on all solar equipment — eliminates the 7% VAT on top of the already zero tariff.

---

## Thai Government Solar Programs

| Program | Detail |
|---------|--------|
| VSPP (Very Small Power Producer) | Sell surplus solar to grid; capacity ≤10 MW |
| FiT buyback rate | **THB 2.20/kWh** (~$0.063/kWh) |
| Community Solar quota | 400 MW/year approved starting 2025 |
| BOI renewable energy project | 5–8 year CIT exemption |
| June 2025 Cabinet solar deduction | THB 200,000 per rooftop installation (≤10 kWp) |

---

*Sources: QES Energy Thailand, Solaris Green Energy, Energy Dynamics Thailand, Canadian Solar investor relations, ACFTA Wikipedia / Dimerco FTA guide, Thailand National Trade Repository, BOI Lex Nova guide, pv-magazine 2026 pricing, DocShipper China-Thailand freight rates, SolarQuarter Thailand, Energy Tracker Asia*
