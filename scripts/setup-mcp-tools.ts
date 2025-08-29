import axios from 'axios';

interface MCPTool {
  name: string;
  description: string;
  schema: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
  handler: string;
}

const mcpTools: MCPTool[] = [
  {
    name: "task_manager",
    description: "Manage tasks, todos, and project items for startup operations",
    schema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["create", "list", "update", "delete", "complete"] },
        taskId: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        priority: { type: "string", enum: ["low", "medium", "high", "urgent"] },
        dueDate: { type: "string" },
        tags: { type: "array", items: { type: "string" } }
      },
      required: ["action"]
    },
    handler: "task_management"
  },
  {
    name: "meeting_scheduler",
    description: "Schedule and manage meetings, appointments, and calendar events",
    schema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["schedule", "list", "update", "cancel", "check_availability"] },
        meetingId: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        startTime: { type: "string" },
        endTime: { type: "string" },
        attendees: { type: "array", items: { type: "string" } },
        location: { type: "string" },
        meetingType: { type: "string", enum: ["internal", "client", "investor", "team"] }
      },
      required: ["action"]
    },
    handler: "meeting_scheduling"
  },
  {
    name: "project_tracker",
    description: "Track project progress, milestones, and deliverables",
    schema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["create", "update", "get_status", "add_milestone", "complete_milestone"] },
        projectId: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        status: { type: "string", enum: ["planning", "active", "on_hold", "completed", "cancelled"] },
        progress: { type: "number", minimum: 0, maximum: 100 },
        deadline: { type: "string" },
        team: { type: "array", items: { type: "string" } }
      },
      required: ["action"]
    },
    handler: "project_management"
  },
  {
    name: "document_analyzer",
    description: "Analyze documents, extract insights, and generate summaries",
    schema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["analyze", "summarize", "extract_key_points", "sentiment_analysis"] },
        documentType: { type: "string", enum: ["contract", "proposal", "report", "email", "presentation"] },
        content: { type: "string" },
        filePath: { type: "string" },
        analysisType: { type: "string", enum: ["comprehensive", "quick", "detailed"] }
      },
      required: ["action", "content"]
    },
    handler: "document_processing"
  },
  {
    name: "email_processor",
    description: "Process emails, categorize, prioritize, and generate responses",
    schema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["categorize", "prioritize", "draft_response", "extract_action_items", "schedule_followup"] },
        emailContent: { type: "string" },
        sender: { type: "string" },
        subject: { type: "string" },
        category: { type: "string", enum: ["client", "team", "investor", "vendor", "personal", "spam"] },
        priority: { type: "string", enum: ["low", "medium", "high", "urgent"] }
      },
      required: ["action", "emailContent"]
    },
    handler: "email_processing"
  },
  {
    name: "market_research",
    description: "Conduct market research, competitor analysis, and trend monitoring",
    schema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["competitor_analysis", "trend_analysis", "market_size", "customer_insights", "pricing_research"] },
        industry: { type: "string" },
        company: { type: "string" },
        keywords: { type: "array", items: { type: "string" } },
        timeframe: { type: "string", enum: ["week", "month", "quarter", "year"] },
        depth: { type: "string", enum: ["overview", "detailed", "comprehensive"] }
      },
      required: ["action"]
    },
    handler: "market_intelligence"
  },
  {
    name: "financial_tracker",
    description: "Track expenses, revenue, budgets, and financial metrics",
    schema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["record_expense", "track_revenue", "budget_analysis", "forecast", "generate_report"] },
        category: { type: "string", enum: ["salary", "marketing", "development", "operations", "sales", "other"] },
        amount: { type: "number" },
        description: { type: "string" },
        date: { type: "string" },
        vendor: { type: "string" },
        paymentMethod: { type: "string", enum: ["cash", "card", "bank_transfer", "check"] }
      },
      required: ["action"]
    },
    handler: "financial_management"
  }
];

async function setupMCPTools(): Promise<void> {
  console.log('🚀 Setting up MCP Tools for Startup Assistant...\n');

  const baseURL = process.env.AI_SERVER_URL || 'http://localhost:3002';

  for (const tool of mcpTools) {
    try {
      const response = await axios.post(`${baseURL}/api/mcp/tools`, tool, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(`✅ Added: ${tool.name}`);
      console.log(`   Description: ${tool.description}`);
      console.log(`   Handler: ${tool.handler}\n`);

    } catch (error: any) {
      console.log(`❌ Failed to add ${tool.name}:`, error.response?.data || error.message);
    }
  }

  console.log('🎉 MCP Tools setup complete!');
  console.log('📋 Available tools:');
  mcpTools.forEach(tool => {
    console.log(`   - ${tool.name}: ${tool.description}`);
  });
}

// Run if called directly
if (require.main === module) {
  setupMCPTools().catch(console.error);
}

export { setupMCPTools, mcpTools, MCPTool };
