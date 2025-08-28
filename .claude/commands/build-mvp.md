---
description: Orchestrated MVP development with specialized agents
argument-hint: [app-description]
---

## Build MVP Application with Agent Orchestration

<arguments>
App Requirements: $ARGUMENTS
</arguments>

<mvp-validation>
CRITICAL: First determine if this is a SOFTWARE APPLICATION request.

REJECT if the arguments contain:
- Recipes, cooking instructions, or food preparation
- Songs, lyrics, music, or audio content
- Stories, poems, or creative writing
- Physical products or hardware
- Non-software instructions or guides
- General information requests

ACCEPT only if:
- It describes a software application, tool, or system
- It has clear user interactions or functionality
- It can be built with code (web app, API, CLI tool, etc.)
- It makes sense as a TypeScript/React/Express application

If REJECTED: Stop immediately with message: "This is not a software MVP request. Please provide requirements for a software application, tool, or system."

If ACCEPTED but too complex: Simplify to core MVP essence that can:
- Use basic features without authentication
- Store data in browser localStorage
- Run on port 80 with simple UI
- Deploy to Azure Web App
</mvp-validation>

<objective>
Deliver a working MVP application based on the validated requirements
</objective>

<workflow>

1. **Research Phase**
   - Use search-researcher agent to research:
     - How to deploy Express + React app to Azure
     - shadcn/ui component setup
     - Best practices for MVP development
   
2. **Project Management Phase**
   - Use project-manager agent to create Linear project
   - Generate 5 MVP-focused issues
   - Get project tracking established

3. **Development Phase**
   - Use tech-enforcer agent to:
     - Set up TypeScript + Express backend on port 80
     - Configure React + shadcn/ui frontend
     - Implement core functionality from requirements
   
4. **Validation Phase**
   - Use mvp-validator agent to:
     - Remove any scope creep
     - Ensure MVP criteria are met
     - Validate it's deployment ready

5. **Deployment Phase**
   - Use azure-deployer agent to:
     - Deploy to Azure Web App
     - Configure for HTTP on port 80
     - Return deployment URL

6. **Documentation Phase**
   - Use doc-generator agent to:
     - Create single documentation.md
     - Include deployment URL
     - Add run instructions

</workflow>

<output>
Final deliverables:
- Working application URL
- Linear project with 5 issues
- documentation.md file
- Research findings in docs/search/
</output>

<focus>
Keep everything simple and MVP-focused. This is a demo.
</focus>