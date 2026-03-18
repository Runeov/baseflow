# Baseflow MCP Servers

Python [Model Context Protocol](https://modelcontextprotocol.io) servers that bridge OpenClaw AI agents to solar plant hardware and external services.

## Servers

| Server | Module | Tools | Hardware |
|--------|--------|-------|---------|
| **solar-scada** | `mcp.solar_scada` | `read_inverter`, `read_all_inverters`, `read_string_combiner`, `read_energy_meter`, `read_battery`, `get_active_faults`, `send_inverter_command` | Modbus TCP / SunSpec (inverters, meters, BMS) |
| **weather** | `mcp.weather` | `get_weather_forecast`, `get_solar_forecast`, `get_current_conditions`, `compare_actual_vs_forecast` | Open-Meteo API + Forecast.Solar API (free) |
| **alerts** | `mcp.alerts` | `send_alert`, `send_report`, `send_fault_notice`, `get_alert_history` | Telegram Bot API |

## Setup

### 1. Install dependencies

```bash
cd baseflow-poc
pip install -r mcp/requirements.txt
```

### 2. Configure environment

```bash
cp mcp/.env.example mcp/.env
# Edit mcp/.env with your site values
```

### 3. Test a server locally

```bash
# From baseflow-poc/ directory:
python -m mcp.solar_scada.server   # runs in simulation mode without hardware
python -m mcp.weather.server
python -m mcp.alerts.server
```

### 4. Connect to OpenClaw

Copy the contents of [openclaw.mcp.json](./openclaw.mcp.json) into your `~/.openclaw/openclaw.json` under the `mcpServers` key. Update `cwd` and credentials.

```jsonc
// ~/.openclaw/openclaw.json
{
  "providers": {
    "ollama": { "baseUrl": "http://127.0.0.1:11434" }
  },
  "mcpServers": {
    // paste from openclaw.mcp.json here
  }
}
```

### 5. Pull a model in Ollama

```bash
# Best edge model (Jetson Orin, native tool calling, 1M ctx)
ollama pull nemotron-3-nano

# Fallback
ollama pull llama3.1:8b
```

## Architecture

```
OpenClaw Agent (Node.js)
│
├─ MCP: baseflow-solar-scada  ──►  Modbus TCP ──► Inverters / Meters / Battery
├─ MCP: baseflow-weather      ──►  Open-Meteo API + Forecast.Solar API
└─ MCP: baseflow-alerts       ──►  Telegram Bot API ──► Operator phones
```

## Simulation Mode

When `pymodbus` is not installed or the Modbus host is unreachable, `solar_scada` automatically falls back to **simulated register data** — plausible values for a 10 kWp Thai rooftop system. This lets you develop and test agent logic without hardware.

## Hardware Notes

- **Protocol:** All major inverter brands (SMA, Fronius, Huawei, Sungrow, Growatt) support SunSpec over Modbus TCP. Check your inverter's RS485/Ethernet port and unit ID settings.
- **pySunSpec2:** For production use, replace the raw register reads in `solar_scada/server.py` with `pysunspec2` device objects — they handle scale factors, model discovery, and type safety automatically.
- **MQTT:** Live telemetry subscription (for push-based alerts) can be added via `paho-mqtt`. The `MQTT_*` env vars are pre-wired in config.

## Next Steps

- [ ] Wire `pysunspec2` device object into `modbus_client.py` for production
- [ ] Add MQTT subscriber for push-based fault detection (vs. poll-based)
- [ ] Add `pvlib` integration for physics-based expected generation baseline
- [ ] Add `influxdb-client` tool for querying historical SCADA time-series
- [ ] Add LINE Messaging API as alternative to Telegram for Thai operators
