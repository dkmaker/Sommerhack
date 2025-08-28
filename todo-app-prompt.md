# TODO Application MVP - Demo Request

## Project Overview
Build a simple MVP TODO application for demonstration purposes. This is a minimal viable product to showcase basic task management functionality.

## Core Requirements

### Basic Task Operations
- Create a new task with a title
- Update/edit existing task titles  
- Set a deadline date for tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Display all tasks in a simple list

### Task Properties (Keep it Simple)
Each task should include:
- Unique identifier
- Title (required)
- Deadline date (optional)
- Completion status (complete/incomplete)
- Creation timestamp

### User Interface
- Simple, clean web interface
- Visual distinction between completed and pending tasks
- Show tasks with upcoming deadlines prominently
- Basic responsive design for desktop/mobile

### Data Storage
- Browser local storage is sufficient (localStorage or sessionStorage)
- No backend database required for this MVP
- Tasks should persist during the browser session

### Deployment Requirements
- **Must run as a web application on port 80**
- **No SSL/HTTPS required** (HTTP is fine for demo)
- Should be accessible via web browser at http://[server-address]
- Include simple web server setup to serve the application

## MVP Scope Limitations
This is a demo/MVP version, so:
- No user authentication needed
- No advanced features (categories, tags, priorities)
- No complex filtering or sorting
- Basic styling is acceptable
- Focus on core functionality over aesthetics

## Deliverables
1. Working TODO application accessible via web browser
2. Web server configuration running on port 80
3. Simple instructions to start the application
4. Basic code structure that works

## Success Criteria
The demo is complete when:
- Users can create, update, and complete tasks
- Tasks have deadlines that can be set and viewed
- Application runs on port 80 via HTTP
- Tasks persist in browser storage
- Basic functionality works without errors

## Notes
- This is an MVP for demonstration purposes only
- Choose any appropriate tech stack that can deliver quickly
- Keep it simple and functional
- Focus on getting it deployed and working
- Production-level quality is not required for this demo