# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a presentation repository about AI-assisted development with specialized agents, demonstrating how agent-based workflows outperform traditional ChatGPT prompting. The presentation materials are in Danish and are organized into sections.

## Translation Requirements

**IMPORTANT:** Only translate the following files to Danish:
- README.md (main file)
- All files in sections/ folder

All other files must remain in English, including:
- todo-app-prompt.md
- agent-setup-README.md
- Any new documentation or code files

## Repository Structure

- **sections/**: Presentation sections in Danish covering AI agent development concepts
- **todo-app-prompt.md**: Demo MVP requirements for TODO application
- **agent-setup-README.md**: Setup guide for specialized agents and commands
- **.claude/agents/**: Agent configurations (tech-enforcer, azure-deployer, etc.)
- **.claude/commands/**: Custom slash commands (build-mvp)

## Agent-Based Development System

This repository demonstrates an orchestrated MVP development system using 6 specialized agents:

1. **tech-enforcer** - Enforces TypeScript, Express.js backend (port 80), shadcn/ui frontend
2. **project-manager** - Creates Linear project with exactly 5 MVP issues
3. **search-researcher** - Uses Perplexity to research and saves findings to docs/search/
4. **azure-deployer** - Deploys to Azure Web App (uses resource group: LAB_cp_sommerhack_18235)
5. **doc-generator** - Creates single documentation.md file after implementation
6. **mvp-validator** - Ensures MVP scope, prevents feature creep

## Key Commands

### Build MVP Command
- **Command**: `/build-mvp [app-description]`
- **Purpose**: Orchestrates all agents to deliver working MVP
- **Output**: Deployed Azure URL, Linear project, documentation.md

## Important Configuration Details

### Azure Deployment
- **Resource Group**: LAB_cp_sommerhack_18235 (MUST use existing)
- **Plan Type**: Consumption plan (serverless)
- **Port**: 80 (HTTP only, no SSL for demo)
- **Region**: northeurope

### Tech Stack (Enforced)
- Backend: TypeScript + Express.js on port 80
- Frontend: React + TypeScript + shadcn/ui
- Storage: Browser localStorage only
- Deployment: Azure Web App

## MVP Scope Rules

When building MVPs:
- Core functionality only
- No authentication/users
- Simple UI (functional over pretty)
- Browser storage only (no backend DB)
- Basic error handling
- Must run on port 80

## Demo Application

The repository includes a TODO application prompt (todo-app-prompt.md) used to demonstrate the difference between:
- Direct prompting (inconsistent results)
- Agent-based development (consistent, deployed, documented)

## Working with Agents

When using agents in this repository:
1. Agents should be used proactively when their description matches the task
2. The `/build-mvp` command orchestrates all agents in sequence
3. Each agent has specific tools and responsibilities - respect these boundaries
4. MVP validator should run after development to ensure scope compliance

## Notes

- This is demonstration/presentation material for Sommerhack
- The focus is on showing how agent-based development improves consistency and completeness
- All code examples should be simple MVPs suitable for live demos