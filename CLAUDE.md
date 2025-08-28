# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a presentation repository for "Sommerhack - AI - Agenterne kommer!!" demonstrating AI-assisted development using Claude Code and agent-based workflows. The repository contains Danish-language documentation about AI agent development patterns and includes a TODO application MVP specification for demonstration.

## Repository Structure

```
/
├── README.md                 # Main presentation file (Danish)
├── sections/                 # Talk sections (Danish)
│   ├── 01-live-demo-expectations.md
│   ├── 02-chatgpt-vs-agents.md
│   ├── 03-ai-workflows.md
│   ├── 04-claude-code-framework.md
│   ├── 05-mcp-revolution.md
│   ├── 06-context-strategy.md
│   └── 99-conclusion.md
└── todo-app-prompt.md       # TODO app MVP specification (English)
```

## Key Information

### Documentation Language Policy
- **Danish files**: README.md and all files in sections/ folder
- **English files**: todo-app-prompt.md and any code/technical documentation

### TODO Application MVP Requirements
When implementing the TODO app from todo-app-prompt.md:
- **Port**: Must run on port 80 (HTTP)
- **Storage**: Use browser localStorage (no backend needed)
- **Features**: Basic CRUD operations for tasks with deadlines
- **Deployment**: Simple web server setup for browser access

## Development Notes

This is primarily a documentation/presentation repository. Any code implementations should follow the MVP specifications in todo-app-prompt.md with focus on simplicity and demonstration value rather than production features.