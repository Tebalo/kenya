// kpiMetrics.ts
export const kpiGroups = [
    {
      title: "Profitability Metrics",
      icon: "DollarSign",
      metrics: [
        {
          name: "Gross Profit Margin",
          key: "grossProfitMargin",
          formula: "(Gross Profit / Sales) × 100",
          description: "Measures the percentage of sales exceeding the cost of goods sold",
          category: "profitability"
        },
        {
          name: "Net Profit Margin",
          key: "netProfitMargin",
          formula: "(Net Profit / Sales) × 100",
          description: "Gauges overall profitability after all expenses",
          category: "profitability"
        },
        {
          name: "Operating Profit Margin",
          key: "operatingProfitMargin",
          formula: "(Operating Profit / Sales) × 100",
          description: "Assesses profitability after covering costs",
          category: "profitability"
        },
        {
          name: "EBITDA",
          key: "ebitda",
          formula: "Revenue - COGS - Operating Expenses",
          description: "Earnings before interest, taxes, depreciation, and amortization",
          category: "profitability"
        },
        {
          name: "Contribution Margin",
          key: "contributionMargin",
          formula: "(Sales - Variable Costs) / Sales × 100",
          description: "Evaluates profitability after variable costs",
          category: "profitability"
        }
      ]
    },
    {
      title: "Return Metrics",
      icon: "TrendingUp",
      metrics: [
        {
          name: "Return on Assets (ROA)",
          key: "roa",
          formula: "(Net Profit / Total Assets) × 100",
          description: "Efficiency in using assets to generate profits",
          category: "returns"
        },
        {
          name: "Return on Equity (ROE)",
          key: "roe",
          formula: "(Net Profit / Shareholders' Equity) × 100",
          description: "Profitability relative to shareholders' equity",
          category: "returns"
        },
        {
          name: "Return on Investment (ROI)",
          key: "roi",
          formula: "(Profit / Total Investment) × 100",
          description: "Profitability of specific investments",
          category: "returns"
        },
        {
          name: "Return on Capital Employed",
          key: "roce",
          formula: "EBIT / (Long Term Debt + Equity) × 100",
          description: "Return from all capital sources",
          category: "returns"
        }
      ]
    },
    {
      title: "Cost & Efficiency Metrics",
      icon: "BarChart2",
      metrics: [
        {
          name: "OPEX Ratio",
          key: "opexRatio",
          formula: "Operating Expenses / Net Sales × 100",
          description: "Operational efficiency evaluation",
          category: "efficiency"
        },
        {
          name: "Fixed Cost Ratio",
          key: "fixedCostRatio",
          formula: "Fixed Costs / Sales × 100",
          description: "Fixed costs as percentage of sales",
          category: "efficiency"
        },
        {
          name: "Variable Cost Ratio",
          key: "variableCostRatio",
          formula: "Variable Costs / Sales × 100",
          description: "Variable costs as percentage of sales",
          category: "efficiency"
        },
        {
          name: "Break-even Point",
          key: "breakEvenPoint",
          formula: "Fixed Costs / (Price per Unit - Variable Cost per Unit)",
          description: "Units needed to cover costs",
          category: "efficiency"
        }
      ]
    },
    {
      title: "Operational Metrics",
      icon: "Settings",
      metrics: [
        {
          name: "Asset Turnover",
          key: "assetTurnover",
          formula: "Net Sales / Average Fixed Assets",
          description: "Efficiency of asset usage",
          category: "operational"
        },
        {
          name: "Inventory Turnover",
          key: "inventoryTurnover",
          formula: "Cost of Goods Sold / Average Inventory",
          description: "Inventory management efficiency",
          category: "operational"
        },
        {
          name: "Days in Inventory",
          key: "daysInInventory",
          formula: "365 / Inventory Turnover",
          description: "Average days items stay in inventory",
          category: "operational"
        }
      ]
    },
    {
      title: "Market & Valuation Metrics",
      icon: "TrendingUp",
      metrics: [
        {
          name: "P/E Ratio",
          key: "peRatio",
          formula: "Market Price per Share / Earnings per Share",
          description: "Stock price relative to earnings",
          category: "market"
        },
        {
          name: "Dividend Yield",
          key: "dividendYield",
          formula: "Annual Dividend per Share / Market Price per Share",
          description: "Return from dividends",
          category: "market"
        },
        {
          name: "Economic Value Added",
          key: "eva",
          formula: "NOPAT - (Capital Invested × WACC)",
          description: "Value generated beyond capital cost",
          category: "market"
        }
      ]
    }
  ];
  
  export const timeFilters = [
    { label: 'Last Month', value: 'month' },
    { label: 'Last Quarter', value: 'quarter' },
    { label: 'Last Year', value: 'year' },
    { label: 'YTD', value: 'ytd' },
    { label: 'Custom Range', value: 'custom' }
  ];
  
  export interface MetricDataPoint {
    date: string;
    value: number;
    entityId: string;
  }
  
  export interface EntityKPIs {
    entityId: string;
    metrics: {
      [key: string]: MetricDataPoint[];
    };
  }

  export interface Metric {
    name: string;
    key: string;
    formula: string;
    description: string;
    category: string;
  }
  
  export interface Group {
    title: string;
    icon: string;
    metrics: Metric[];
  }