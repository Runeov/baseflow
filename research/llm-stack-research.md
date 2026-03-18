# LLM Stack Research: Llama 4, OpenClaw & NVIDIA Nemotron
## For Baseflow Solar Plant AI Agents — Thailand

**Research Date:** 2026-03-18

---

## Executive Summary

Three complementary technologies form a production-ready open-weight AI agent stack for solar plant operations:

| Layer | Tool | Role |
|-------|------|------|
| Agent runtime / orchestration | **OpenClaw** | Autonomous agent host, skill execution, messaging integration |
| Local LLM inference server | **Ollama** (integrated into OpenClaw) | On-device/edge model serving, OpenAI-compatible API |
| LLM brains | **Meta Llama 4** + **NVIDIA Nemotron** | Reasoning, planning, tool calling, forecasting |

These are not competitors — they stack together. A Baseflow node can run OpenClaw + Ollama at the edge (Jetson hardware) with Nemotron 3 Nano or Llama 3.2 3B as the local model, escalating complex reasoning to a Nemotron 3 Super or Llama 4 Maverick cloud endpoint when needed.

**The key insight for Baseflow:** A Jetson AGX Orin running Ollama + OpenClaw + Nemotron Nano 4B consumes ~15–30W — powered for free by the solar array. Zero marginal inference cost. Cloud competitors cannot match this for remote Thai solar sites.

---

## Section 1: Meta Llama 4

### What It Is

Released April 5, 2025. Mixture-of-Experts (MoE) architecture with native multimodality baked in from pretraining. Only a subset of parameters activate per token — much more efficient than raw parameter count suggests.

### Model Lineup

**Llama 3.x Series (still widely deployed):**

| Model | Params | Context | Tool Calling | Best Use |
|-------|--------|---------|--------------|---------|
| Llama 3.2 1B | 1B | 128K | Prompt-only ⚠️ | Ultra-edge, IoT sensors |
| Llama 3.2 3B | 3B | 128K | Prompt-only ⚠️ | Edge, Raspberry Pi class |
| Llama 3.1 8B | 8B | 128K | **Native ✅** | Edge GPU, Jetson Orin |
| Llama 3.3 70B | 70B | 128K | **Native ✅** | Server/cloud reasoning |
| Llama 3.1 405B | 405B | 128K | **Native ✅** | Cloud, highest accuracy |

> Note: 1B/3B models use prompt-only function definitions — less reliable for agentic workflows. Use 8B+ for tool calling.

**Llama 4 Series (April 2025+):**

| Model | Total Params | Active Params | Context | Multimodal |
|-------|-------------|---------------|---------|-----------|
| **Llama 4 Scout** | 109B | 17B | **10M tokens** | Yes (vision) |
| **Llama 4 Maverick** | 400B | 17B | 1M tokens | Yes (vision) |
| Llama 4 Behemoth | ~2T | 288B | TBA | Yes |

Scout's 10M token context is transformative — a full year of 5-minute SCADA data from a 10MW plant fits in a single context window.

### Hardware Requirements

| Model | Q4 VRAM | Edge Platform |
|-------|---------|--------------|
| Llama 3.2 3B | ~2–3 GB | Jetson Orin Nano 8GB |
| Llama 3.1 8B | ~5–6 GB | Jetson AGX Orin |
| Llama 4 Scout | ~55 GB (Q4) | Server/cloud only |
| Llama 4 Maverick | H100 DGX | Cloud only |

### License

Llama Community License — royalty-free commercial use allowed. Restriction: >700M MAU requires special Meta license. Safe for Baseflow.

### Deploy via Ollama

```bash
ollama pull llama3.1:8b     # edge
ollama pull llama3.3:70b    # server
ollama pull llama4:scout    # cloud
```

### Benchmarks

| Benchmark | Llama 4 Scout | Llama 3.3 70B |
|-----------|--------------|--------------|
| MMLU | 79.6 | ~79.5 |
| Math (MATH-500) | 50.3 | 41.6 |
| Coding (HumanEval) | 67.8 | 66.4 |
| Context window | **10M tokens** | 128K tokens |

---

## Section 2: OpenClaw

### What It Is

OpenClaw is a **local-first autonomous AI agent** runtime. Formerly "Clawdbot" then "Moltbot," officially launched January 27, 2026. Created by Peter Steinberger (PSPDFKit founder). Grew from 9,000 to 60,000+ GitHub stars in days — one of the fastest-growing OSS projects in history.

**Not Ollama.** Ollama is the LLM inference engine. OpenClaw is the agent that runs on top of Ollama. They are deeply complementary and officially integrated (March 2026).

### Architecture

- Maintains long-term memory as local Markdown files
- Connects to **Telegram, LINE, Slack, Discord, WhatsApp** as operator UI
- Executes tasks via **Skills** (13,700+ community skills in ClawHub)
- **MCP (Model Context Protocol)** support — Python MCP servers expose tools to agents
- Model-agnostic: OpenAI/Anthropic/Ollama/any provider

### Ollama Integration

Configure in `~/.openclaw/openclaw.json`:

```json
{
  "providers": {
    "ollama": {
      "baseUrl": "http://127.0.0.1:11434"
    }
  }
}
```

Uses Ollama's native `/api/chat` endpoint (not OpenAI-compatible `/v1/`) — supports streaming + tool calling simultaneously.

**Requirement:** Minimum 64K context window. Rules out 1B/3B models.

### Jetson Deployment (Proven)

Seeed Studio documented running OpenClaw on reComputer Robotics J5011 (Jetson Orin, JetPack 6.2, 16GB RAM) with Ollama local model. Works with Llama 3.1 8B and Nemotron Nano 4B.

Access WebUI at `http://127.0.0.1:18789/`

### Solar Plant Use Cases

| Use Case | OpenClaw Mechanism |
|---------|-------------------|
| Daily generation report | Skill: query SCADA → LLM summary → Telegram |
| Inverter fault alert | MCP monitors MQTT → OpenClaw LINE notification |
| Weather-adjusted forecast | Skill: call Open-Meteo API → LLM analysis |
| Maintenance ticket | Skill: detect anomaly → create Jira ticket |
| Soiling detection | Skill: analyze drone photo via Llama 4 vision |
| Demand-response dispatch | Skill: monitor grid price → battery command |

### Limitations for Industrial Use

- No native Modbus, OPC-UA, or IEC 61850 skills — **requires custom Python MCP server**
- Node.js runtime; Python MCP servers bridge to industrial protocols
- Designed for personal use — industrial hardening/sandboxing needed
- Not for millisecond-latency control loops (advisory signals only)

---

## Section 3: NVIDIA Nemotron

### Model Family Overview

**Line 1: Llama-Based Nemotron (fine-tuned from Meta Llama):**

| Model | Params | Context | Specialty |
|-------|--------|---------|-----------|
| Llama-3.1-Nemotron-Nano-4B-v1.1 | 4B | 128K | Edge, reasoning mode, tool calling |
| Llama-3.1-Nemotron-Nano-8B | 8B | 128K | Edge reasoning |
| Llama-3.1-Nemotron-70B-Instruct | 70B | 128K | Helpfulness, #1 AlpacaEval Oct 2024 |
| Llama-3.1-Nemotron-Ultra-253B | 253B | 128K | Frontier reasoning + tool calling |

**Line 2: Nemotron-H (Hybrid Mamba-Transformer — April 2025):**

| Model | Params | Architecture | Speed vs. Equivalent |
|-------|--------|-------------|---------------------|
| Nemotron-H-8B | 8B | 24 Mamba-2 + 4 Attention | **3x faster** vs Llama 3.1 8B |
| Nemotron-H-47B | 47B | Hybrid distilled | **2.9x faster** vs Qwen-2.5-72B |
| Nemotron-H-56B | 56B | 54 Mamba-2 + 10 Attention | 2.9x faster |

Mamba layers use constant memory regardless of sequence length — ideal for long SCADA time-series.

**Line 3: Nemotron 3 MoE (Dec 2025–Mar 2026) — Recommended:**

| Model | Total Params | Active Params | Context | Status |
|-------|-------------|---------------|---------|--------|
| **Nemotron 3 Nano 4B** | 31.6B total | 3.2B active | **1M tokens** | Dec 2025 |
| **Nemotron 3 Super 120B** | 120B total | 12B active | **1M tokens** | Mar 2026 |
| Nemotron 3 Ultra | ~500B total | ~50B active | TBA | H1 2026 |

### Nemotron Nano 4B — Edge Star

- Runs on Jetson Orin Nano 8GB at **18 tokens/second** (Q4_K_M)
- **1.5x higher throughput** vs popular 8B models
- **Native tool calling** with reasoning mode toggle (`thinking on/off`)
- Available: `ollama pull nemotron-mini`

### Nemotron 3 Super — Agentic Powerhouse (March 2026)

- 120B total, **12B active** (MoE efficiency)
- **1M token context** — entire site history in context
- **PinchBench score: 85.6%** — best open model for OpenClaw agentic tasks
- **5x throughput** vs previous Nemotron Super
- Multi-Token Prediction: up to **3x faster** structured output (tool calls)
- Available: `ollama pull nemotron-3-super`

### Why Nemotron Over Llama?

| Criterion | Choose Nemotron | Choose Llama |
|-----------|----------------|--------------|
| Inference speed | **3x faster** (Nemotron-H) | If speed secondary |
| Edge tool calling | Nano 4B (better than Llama 8B) | Llama 3.1 8B (larger) |
| Agentic multi-step | Nemotron 3 Super | Llama 4 Maverick |
| Longest context (10M) | — | Llama 4 Scout |
| NVIDIA hardware optimization | Native (NVFP4/FP8) | Also supported |
| Fine-tuning tooling | NeMo (NVIDIA-native) | Both |

### NVIDIA NIM (Production Deployment)

Containerized Nemotron/Llama models with OpenAI-compatible REST API, TensorRT-LLM backend, deployable in <5 minutes. **2.6x higher throughput** vs standard H100 deployment.

### NeMo Fine-tuning Pipeline for Thai Solar Data

```
SCADA logs (CSV) + Fault records (PDF) + Maintenance notes
→ NeMo Curator (clean + format to instruction pairs)
→ LoRA fine-tune Llama 3.1 8B or Nemotron-H-8B
   (single H100, ~48 hours, 10,000x fewer trainable params)
→ Quantize to GGUF
→ ollama create baseflow-solar-8b -f Modelfile
→ Deploy on all Jetson nodes
```

---

## Section 4: Edge Model Comparison

### For Jetson Orin Nano 8GB

| Model | RAM Required | Tok/s (Jetson) | Tool Calling | Context |
|-------|-------------|----------------|--------------|---------|
| Llama 3.2 3B (Q4) | ~2–3 GB | 20–30 | Prompt-only ⚠️ | 128K |
| Llama 3.1 8B (Q4) | ~5–6 GB | 12–18 | **Native ✅** | 128K |
| **Nemotron Nano 4B v1.1 (Q4)** | ~3–4 GB | **18** | **Native ✅** | 128K |
| **Nemotron 3 Nano 4B (Q4)** | ~3–4 GB | ~20–22 | **Native ✅** | **1M** |

**Winner:** Nemotron 3 Nano 4B — outperforms Llama 3.1 8B at half the size.

### For Cloud / Multi-site Orchestration

| Model | Active Params | Context | Agentic Score | Speed |
|-------|-------------|---------|---------------|-------|
| Llama 4 Scout | 17B | **10M** | High | Fast |
| Llama 4 Maverick | 17B | 1M | High (parallel) | Fast |
| **Nemotron 3 Super** | 12B | **1M** | **85.6% PinchBench** | **5x** |

**Winner:** Nemotron 3 Super for agentic workflows; Llama 4 Scout for full-history analysis.

---

## Section 5: Recommended Baseflow Stack

### Architecture Per Node

```
BASEFLOW SOLAR NODE (Jetson AGX Orin, solar-powered)
┌──────────────────────────────────────┐
│  OpenClaw (Node.js agent runtime)    │
│  - Memory: local Markdown files      │
│  - UI: Telegram / LINE bot           │
│  - Skills: TypeScript (existing)     │
│  - MCP: Python servers (new)         │
│    ├─ solar_scada_mcp.py             │
│    │   Modbus TCP + SunSpec          │
│    ├─ weather_mcp.py                 │
│    │   Open-Meteo + Forecast.Solar   │
│    └─ alert_mcp.py                   │
│        Telegram dispatcher           │
│                │                     │
│                │ Native Ollama API   │
│  ┌─────────────▼──────────────────┐  │
│  │  Ollama                        │  │
│  │  Model: Nemotron 3 Nano 4B     │  │
│  │  Fallback: llama3.1:8b         │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
         │ HTTPS (when available)
         ▼
BASEFLOW CLOUD
┌──────────────────────────────────────┐
│  NVIDIA NIM                          │
│  Model: Nemotron 3 Super (120B MoE)  │
│  - Multi-site analysis               │
│  - 1M token fleet history            │
│  - Fine-tuned on Thai solar data     │
└──────────────────────────────────────┘
```

### Agent Role Assignments

| Agent | Model | Location | Task |
|-------|-------|----------|------|
| Sensor Monitor | Nemotron Nano 4B | Edge | Every 5 min: read inverters, flag anomalies |
| Forecast | Nano + weather MCP | Edge | Daily: expected vs actual yield |
| Alert Dispatcher | Nano | Edge | Real-time: Telegram/LINE via OpenClaw |
| Fleet Optimizer | Nemotron 3 Super | Cloud | Cross-site optimization, curtailment |
| Investor Reports | Llama 4 Scout | Cloud | Monthly reports, full history in context |
| Soiling Detection | Llama 4 Scout | Cloud | Drone image analysis (multimodal) |

---

## Section 6: Implementation Phases

### Phase 1 — Foundation (3 pilot sites)
- Jetson Orin Nano + Ollama + `llama3.1:8b`
- OpenClaw with existing TypeScript skills
- Custom Python MCP for Modbus/MQTT (this skeleton)
- Cloud: None initially

### Phase 2 — Testnet
- Swap edge model to `nemotron-3-nano` (tool calling + reasoning mode)
- Add weather MCP (Open-Meteo + Forecast.Solar)
- Deploy cloud Nemotron 3 Super NIM for cross-site analysis
- Begin collecting SCADA data for fine-tuning

### Phase 3 — Mainnet/TGE
- Fine-tune 8B model on accumulated Thai solar SCADA via NeMo
- Deploy fine-tuned model via Ollama on all nodes
- Llama 4 Scout for investor-facing reporting (10M ctx, multimodal)

### Phase 4 — Expansion
- Nemotron 3 Ultra (H1 2026) for highest-stakes planning
- Multi-language: Thai, Vietnamese, Indonesian (Llama 4 Maverick multilingual)

---

## Critical Limitations

| Issue | Impact |
|-------|--------|
| No Modbus/OPC-UA skills in ClawHub | Must build custom Python MCP |
| Llama 3.2 1B/3B no native tool calling | Use 8B+ for agentic workflows |
| Llama 4 needs server-class GPU | Not edge-deployable |
| LLM can't guarantee real-time control timing | Battery dispatch stays in PLC; AI = advisory only |
| GraphCast weights = CC BY-NC-SA | Non-commercial; use Open-Meteo instead |
| EMQX v5.9+ needs commercial license for clustering | Use VerneMQ or HiveMQ CE |

---

## Ollama Quick Reference

```bash
# Edge models
ollama pull nemotron-3-nano          # Best edge (1M ctx, tool calling)
ollama pull nemotron-mini            # Nemotron Nano 4B v1.1 (alt)
ollama pull llama3.1:8b              # Fallback

# Cloud/server models
ollama pull nemotron-3-super         # Best agentic (120B MoE)
ollama pull llama4:scout             # Best long-context (10M tokens)
ollama pull llama3.3:70b             # General server model
```

---

## References

- [Meta Llama 4 Official](https://www.llama.com/models/llama-4/)
- [OpenClaw Official](https://openclaw.ai/)
- [OpenClaw Ollama Provider](https://docs.openclaw.ai/providers/ollama)
- [Seeed Studio: OpenClaw on Jetson](https://wiki.seeedstudio.com/local_openclaw_on_recomputer_jetson/)
- [NVIDIA Nemotron-H Research](https://research.nvidia.com/labs/adlr/nemotronh/)
- [Nemotron 3 Super Launch](https://developer.nvidia.com/blog/introducing-nemotron-3-super-an-open-hybrid-mamba-transformer-moe-for-agentic-reasoning/)
- [Nemotron Nano 4B Edge Blog](https://huggingface.co/blog/nvidia/supercharge-edge-ai-with-llama-nemotron-nano)
- [NVIDIA NeMo Fine-tuning](https://developer.nvidia.com/blog/fine-tune-and-align-llms-easily-with-nvidia-nemo-customizer/)
- [Berkeley BFCL Leaderboard](https://gorilla.cs.berkeley.edu/leaderboard.html)
- [Ollama Library: Nemotron](https://ollama.com/library/nemotron)
- [vLLM: Nemotron 3 Nano](https://blog.vllm.ai/2025/12/15/run-nvidia-nemotron-3-nano.html)
