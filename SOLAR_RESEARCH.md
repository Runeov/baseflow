# Solar Panel Procurement Research
## For Baseflow Validator Node Infrastructure

*Research Date: March 2026*

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

## Panel Comparison Table (US-Stocked)

| # | Model | Watts | Efficiency | Price/Panel | $/Watt | MOQ | Certs | Supplier |
|---|-------|-------|-----------|------------|--------|-----|-------|---------|
| 1 | ZNShine ZXM7-UHLDD108-440 | 440W | 22.53% | $126.50 | **$0.287/W** | 36 panels (1 pallet) | IEC, ISO | US Solar Supplier |
| 2 | Eagle Solar 550W Bifacial PERC | 550W | 21.3% | $201.00 | $0.365/W | 36 panels (1 pallet) | PID-resistant, 30yr warranty | Eagle Solar Supply |
| 3 | Aptos DNA-144-BF10-550W-DG | 550W | 21.3–21.9% | $216.99 | $0.395/W | 31 panels (1 pallet) | IEC 61730, CSA | US Solar Supplier |
| 4 | Peimar DR10H500M 500W | 500W | 21.06% | $192.50 | $0.385/W | 10 panels | UL 1703, CE, IEC | Signature Solar |
| 5 | Hanwha Q CELLS 400W | 400W | 20.9% | $150.00 | $0.375/W | Varies | UL 61730, IEC | US Solar Supplier |
| 6 | Jinko Tiger Neo JKM580N 580W | 580W | 22.45% | $273.99 | $0.472/W | 36 panels (1 pallet) | UL 61730, IEC | US Solar Supplier |
| 7 | Canadian Solar TOPHiKu6 450W | 450W | 22.5–23% | $259.99 | $0.578/W | 31 panels (1 pallet) | UL, IEC — **USA assembled** | US Solar Supplier |
| 8 | Heliene 144HC-580W | 580W | 22.44% | $332.99 | $0.574/W | 31 panels (1 pallet) | UL 61215/61730 — **USA made** | US Solar Supplier |
| 9 | LONGi Hi-MO 7 615–625W | 615–625W | 22.8–23.1% | Quote only | ~$0.26–0.29/W | Pallet/container | IEC, CE, TUV | Nastec Solar |
| 10 | JA Solar JAM72D40-600W | 600W | ~23% | ~$0.20/W (EU) | ~$0.27/W US landed | Container | IEC 61215/61730 | Alibaba / VoltaconSolar |

---

## Complete Solar Kit Options

| Kit | Inverter | Battery | Solar PV | Price | Best For |
|-----|---------|---------|---------|-------|---------|
| **EG4 Shed & Garage Kit** (KIT-E0017) | 6kW split-phase | 15.36kWh LiFePO4 | 14–16 panels (~7kW) | **$8,928** | 1–3 Ethereum nodes |
| **EG4 6000XP x2 Kit** (KIT-E0009) | 12kW parallel | 20.48kWh LiFePO4 | 16–18 panels (~8kW) | **$13,395** | 3–6 Ethereum nodes / mid Solana |
| **EG4 18kPV + 30.72kWh Bundle** | 12kW / 18kW PV in | 30.72kWh LiFePO4 | Panels separate | **$14,004** | Multi-node rack (add panels) |
| **SunGold SGR-5KE** | 5kW / 48V | 10.24kWh LiFePO4 | 6x 415W = 2.49kW | **$4,496** | Single Ethereum node |
| **Dawnice 10kW Kit** | 10kW / 48V | 10kWh LiFePO4 | 16x 550W = 8.8kW | ~$6,000–8,000 | Solana validator / 5–8 ETH nodes |

All EG4 systems: UL 1741, UL 9540, IEEE 1547 certified.

---

## Sizing Guide (24/7 Off-Grid Operation)

| Node Setup | Daily kWh | Solar Needed | Battery Needed | Panel Config |
|-----------|----------|-------------|---------------|-------------|
| 1 Ethereum node (100W) | 2.4 kWh | 1.5–2kW | 10kWh | 4–5x 400W panels |
| 3 Ethereum nodes (300W) | 7.2 kWh | 4–5kW | 20–25kWh | 10–12x 450W panels |
| 1 Solana validator (500W) | 12 kWh | 7–8kW | 35–40kWh | 16x 500W panels |
| 5-node rack (1kW) | 24 kWh | 12–15kW | 60–80kWh | 28–36x 550W panels |

---

## Recommendations

### Best Value (US Stock, No Tariff Risk)
**ZNShine ZXM7-UHLDD108-440 — $0.287/W**
- 1 pallet = 36 panels = 15.84kW = $4,554
- 22.53% N-type TOPCon bifacial, 30-year performance warranty
- Best $/W for a multi-node Ethereum setup or modest Solana validator
- [US Solar Supplier](https://ussolarsupplier.com/products/znshine-440w-pallet-of-36-bifacial-black-solar-panel-zxm7-uhldd108-440)

### Best for ITC / IRA Domestic Content Bonus (+10%)
**Heliene 580W (USA Made) — $0.574/W**
- Qualifies for the 10% domestic content bonus on top of 30% ITC = **40% total tax credit**
- Made in Minnesota/Florida — zero tariff risk
- Best for commercial node operators claiming investment tax credits
- [US Solar Supplier](https://ussolarsupplier.com/products/heliene-580w-144hc-m10-ntyp-sl-bifacial-solar-panel-domestic-content)

### Best Complete Kit (Small Operator)
**EG4 Shed & Garage Kit — $8,928**
- Fully integrated, UL-listed, expandable to 16 parallel inverters
- Powers 1–3 Ethereum validators or a modest Solana node
- [Signature Solar](https://signaturesolar.com/eg4-shed-garage-kit/)

### Best Complete Kit (Serious Multi-Node Operator)
**EG4 18kPV + 30.72kWh Bundle — $14,004** + ZNShine 440W pallet
- 12kW continuous AC, 30+ kWh LiFePO4, 18kW PV input
- Powers 5–8 node rack 24/7 with 2-day autonomy
- [Signature Solar](https://signaturesolar.com/eg4-18kpv-hybrid-inverter-system-bundle-30-72kwh-eg4-lithium-powerwall/)

### Best for Large-Scale / International Orders
**JA Solar JAM72D40-600W or LONGi Hi-MO 7 615W via Alibaba**
- FOB China: ~$0.087–0.095/W
- US landed after tariffs: ~$0.25–0.33/W
- Viable for 100+ panel container orders with managed logistics
- [Alibaba](https://www.alibaba.com/showroom/wholesale-solar-panels.html)

---

## US Supplier Directory

| Supplier | Location | Specialty |
|---------|---------|---------|
| [Signature Solar](https://signaturesolar.com) | Sulphur Springs, TX | EG4 complete systems, panels, batteries |
| [US Solar Supplier](https://ussolarsupplier.com) | US warehouses | Jinko, Canadian Solar, Heliene, ZNShine, Aptos |
| [Eagle Solar Supply](https://eaglesolarsupply.com) | Dover, DE | Bifacial pallet deals (MOQ 1 pallet) |
| [A1 SolarStore](https://a1solarstore.com) | Coral Springs, FL | 15+ brands, B2B wholesale accounts |
| [Greentech Renewables](https://greentechrenewables.com) | Multiple US | Commercial/contractor, Canadian Solar, Qcells |
| [SunGold Power](https://sungoldpower.com) | Online (US) | Off-grid kits and batteries |
| [Heliene (Direct)](https://heliene.com) | MN, FL | USA-made domestic content panels |

---

## Tariff Warning (2025)

| Source | FOB $/W | US Landed $/W | Notes |
|--------|---------|--------------|-------|
| China (direct) | $0.087–0.10 | $0.25–0.35 | 50% Section 301 + AD/CVD + 34% reciprocal tariffs |
| SE Asia (Vietnam, Cambodia, etc.) | $0.09–0.11 | Up to $0.40+ | AD/CVD up to 3,521% for some manufacturers |
| US-made (Heliene, Canadian Solar) | N/A | $0.57–0.58 | No tariff risk; IRA domestic content bonus eligible |
| EU/UK market | N/A | ~€0.095–0.110/W | Lower tariff burden in Europe |

**Bottom line:** Buy US-stocked inventory to avoid tariff surprises and import delays unless ordering container-scale with experienced logistics.

---

*Sources: US Solar Supplier, Signature Solar, Eagle Solar Supply, Alibaba, A1 SolarStore, EG4 Electronics, Solar.com, SunHub, EthStaker docs*
