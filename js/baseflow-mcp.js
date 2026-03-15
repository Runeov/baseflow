/**
 * Baseflow MCP Data Binding Engine
 * 
 * Loads ROI data from data/baseflow-roi.json and binds values
 * to any HTML element with a `data-mcp` attribute.
 * 
 * Usage:
 *   <span data-mcp="investment.total_mid" data-mcp-format="currency">$20,000</span>
 *   <span data-mcp="roi.moderate.roi_pct" data-mcp-format="percent">25.6%</span>
 *   <span data-mcp="revenue.total_mid" data-mcp-format="currency">$6,900</span>
 * 
 * Supported formats:
 *   - currency:    $20,000
 *   - currency-k:  $20K
 *   - currency-m:  $2M
 *   - percent:     25.6%
 *   - number:      20,000
 *   - number-k:    20K
 *   - number-m:    2M
 *   - years:       3.9 years
 *   - raw:         raw value (no formatting)
 *   - range:       $8,000–$10,000 (requires data-mcp-min and data-mcp-max)
 * 
 * Attributes:
 *   data-mcp          - dot-path to value in ROI JSON (e.g., "investment.total_mid")
 *   data-mcp-format   - format type (default: "raw")
 *   data-mcp-prefix   - custom prefix (overrides format default)
 *   data-mcp-suffix   - custom suffix (overrides format default)
 *   data-mcp-min      - dot-path for range minimum
 *   data-mcp-max      - dot-path for range maximum
 *   data-mcp-animate  - "true" to animate number counting up
 */

(function() {
  'use strict';

  const DATA_URL = 'data/baseflow-roi.json';
  let mcpData = null;
  let isLoaded = false;

  // Inline fallback data — keeps site functional without a server.
  // Updated via MCP server: `mcp baseflow-roi get_live_numbers`
  var FALLBACK_DATA = {"investment":{"solar_panels_min":8000,"solar_panels_max":10000,"battery_min":4000,"battery_max":6500,"hardware_min":2000,"hardware_max":5000,"setup":1000,"total_min":15000,"total_max":25000,"total_mid":20000},"revenue":{"ai_compute_min":3600,"ai_compute_max":7200,"ai_compute_monthly_min":300,"ai_compute_monthly_max":600,"crypto_min":1200,"crypto_max":3600,"crypto_monthly_min":100,"crypto_monthly_max":300,"energy_min":600,"energy_max":1200,"energy_monthly_min":50,"energy_monthly_max":100,"total_min":5400,"total_max":12000,"total_mid":6900,"monthly_benchmark":575},"costs":{"energy":0,"maintenance_min":200,"maintenance_max":500,"other":100,"total_min":300,"total_max":600,"total_mid":400,"grid_savings_min":1200,"grid_savings_max":1800},"roi":{"moderate":{"scenario":"moderate","investment":20000,"annual_revenue":5520,"annual_costs":400,"net_profit":5120,"roi_pct":25.6,"payback_years":3.9,"post_payback_roi_pct":1280,"lifetime_profit_20yr":82400},"conservative":{"scenario":"conservative","investment":25000,"annual_revenue":4320,"annual_costs":600,"net_profit":3720,"roi_pct":14.9,"payback_years":6.7,"post_payback_roi_pct":620,"lifetime_profit_20yr":49400},"optimistic":{"scenario":"optimistic","investment":15000,"annual_revenue":9600,"annual_costs":300,"net_profit":9300,"roi_pct":62,"payback_years":1.6,"post_payback_roi_pct":3100,"lifetime_profit_20yr":171000},"target_pct":27},"token":{"price_phase1":0.10,"price_phase2":0.15,"price_tge":0.25,"total_supply":1000000000,"for_sale":100000000,"raise_target":600000},"network":{"year1_100_nodes":{"node_count":100,"total_infrastructure_value":2000000,"annual_network_revenue":690000,"annual_network_costs":40000,"annual_network_profit":650000,"network_roi_pct":32.5,"solar_capacity_kw":1000,"daily_solar_output_kwh":7000,"co2_offset_tons_year":1022},"year3_1000_nodes":{"node_count":1000,"total_infrastructure_value":20000000,"annual_network_revenue":6900000,"annual_network_costs":400000,"annual_network_profit":6500000,"network_roi_pct":32.5,"solar_capacity_kw":10000,"daily_solar_output_kwh":70000,"co2_offset_tons_year":10220},"year6_5000_nodes":{"node_count":5000,"total_infrastructure_value":100000000,"annual_network_revenue":34500000,"annual_network_costs":2000000,"annual_network_profit":32500000,"network_roi_pct":32.5,"solar_capacity_kw":50000,"daily_solar_output_kwh":350000,"co2_offset_tons_year":51100}},"specs":{"solar_lifespan_years":20,"battery_lifespan_years":10,"solar_daily_hours":7,"node_power_draw_kw":3},"_meta":{"version":"1.0.0","source":"baseflow-roi MCP server","disclaimer":"Hypothetical projections based on benchmarks. Not financial advice."}};

  // ── Resolve dot-path in nested object ──
  function resolve(obj, path) {
    if (!obj || !path) return undefined;
    return path.split('.').reduce(function(acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
  }

  // ── Format a number based on type ──
  function formatValue(value, format, prefix, suffix) {
    if (value === undefined || value === null) return '—';

    var num = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(num)) return String(value);

    var result = '';

    switch (format) {
      case 'currency':
        result = '$' + num.toLocaleString('en-US', { maximumFractionDigits: 0 });
        break;
      case 'currency-k':
        result = '$' + (num >= 1000 ? (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K' : num.toLocaleString('en-US'));
        break;
      case 'currency-m':
        if (num >= 1000000000) {
          result = '$' + (num / 1000000000).toFixed(num % 1000000000 === 0 ? 0 : 1) + 'B';
        } else if (num >= 1000000) {
          result = '$' + (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + 'M';
        } else {
          result = '$' + num.toLocaleString('en-US');
        }
        break;
      case 'percent':
        result = num.toFixed(num % 1 === 0 ? 0 : 1) + '%';
        break;
      case 'number':
        result = num.toLocaleString('en-US', { maximumFractionDigits: 0 });
        break;
      case 'number-k':
        result = num >= 1000 ? (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K' : num.toLocaleString('en-US');
        break;
      case 'number-m':
        if (num >= 1000000000) {
          result = (num / 1000000000).toFixed(num % 1000000000 === 0 ? 0 : 1) + 'B';
        } else if (num >= 1000000) {
          result = (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + 'M';
        } else {
          result = num.toLocaleString('en-US');
        }
        break;
      case 'years':
        result = num.toFixed(1) + ' years';
        break;
      case 'price':
        result = '$' + num.toFixed(2);
        break;
      case 'raw':
      default:
        result = String(value);
        break;
    }

    // Apply custom prefix/suffix overrides
    if (prefix !== undefined && prefix !== null) {
      // Strip default prefix if custom one provided
      if (result.startsWith('$')) result = result.substring(1);
      result = prefix + result;
    }
    if (suffix !== undefined && suffix !== null) {
      // Strip default suffix if custom one provided
      if (result.endsWith('%') || result.endsWith(' years')) {
        result = result.replace(/%$/, '').replace(/ years$/, '');
      }
      result = result + suffix;
    }

    return result;
  }

  // ── Format a range ──
  function formatRange(minVal, maxVal, format) {
    var fMin = formatValue(minVal, format);
    var fMax = formatValue(maxVal, format);
    return fMin + '–' + fMax;
  }

  // ── Animate counting up ──
  function animateValue(el, targetValue, format, prefix, suffix, duration) {
    duration = duration || 1200;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = start + (targetValue - start) * eased;
      el.textContent = formatValue(current, format, prefix, suffix);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatValue(targetValue, format, prefix, suffix);
      }
    }

    requestAnimationFrame(step);
  }

  // ── Bind all data-mcp elements ──
  function bindAll() {
    if (!mcpData) return;

    var elements = document.querySelectorAll('[data-mcp]');
    
    elements.forEach(function(el) {
      var path = el.getAttribute('data-mcp');
      var format = el.getAttribute('data-mcp-format') || 'raw';
      var prefix = el.getAttribute('data-mcp-prefix');
      var suffix = el.getAttribute('data-mcp-suffix');
      var animate = el.getAttribute('data-mcp-animate') === 'true';
      var minPath = el.getAttribute('data-mcp-min');
      var maxPath = el.getAttribute('data-mcp-max');

      // Range format
      if (format === 'range' && minPath && maxPath) {
        var minVal = resolve(mcpData, minPath);
        var maxVal = resolve(mcpData, maxPath);
        var rangeFormat = el.getAttribute('data-mcp-range-format') || 'currency';
        el.textContent = formatRange(minVal, maxVal, rangeFormat);
        el.setAttribute('data-mcp-bound', 'true');
        return;
      }

      var value = resolve(mcpData, path);
      
      if (value === undefined) {
        console.warn('[MCP] No value found for path:', path);
        return;
      }

      if (animate && typeof value === 'number') {
        animateValue(el, value, format, prefix, suffix);
      } else {
        el.textContent = formatValue(value, format, prefix, suffix);
      }

      el.setAttribute('data-mcp-bound', 'true');
    });

    // Dispatch event for other scripts to hook into
    document.dispatchEvent(new CustomEvent('mcp:bound', { detail: { count: elements.length } }));
  }

  // ── Load data and bind ──
  function init() {
    // Try to load from JSON file
    fetch(DATA_URL)
      .then(function(res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function(data) {
        mcpData = data;
        isLoaded = true;
        bindAll();
        console.log('[MCP] Baseflow ROI data loaded and bound (' + document.querySelectorAll('[data-mcp]').length + ' elements)');
      })
      .catch(function(err) {
        console.warn('[MCP] Could not load ' + DATA_URL + ':', err.message);
        console.log('[MCP] Using inline fallback data');
        mcpData = FALLBACK_DATA;
        isLoaded = true;
        bindAll();
      });
  }

  // ── Public API ──
  window.BaseflowMCP = {
    // Manually set data (e.g., from MCP server response)
    setData: function(data) {
      mcpData = data;
      isLoaded = true;
      bindAll();
    },
    // Get current data
    getData: function() {
      return mcpData;
    },
    // Resolve a path
    resolve: function(path) {
      return resolve(mcpData, path);
    },
    // Re-bind all elements (call after dynamic content added)
    rebind: function() {
      bindAll();
    },
    // Check if loaded
    isLoaded: function() {
      return isLoaded;
    },
    // Format a value
    format: formatValue,
  };

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
