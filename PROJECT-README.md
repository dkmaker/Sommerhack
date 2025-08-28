# TODO List MVP Application

A complete TODO application MVP built with TypeScript, Express.js backend, and React frontend with shadcn/ui components, designed for Azure Web App deployment.

## Features

### Core Functionality
- ✅ Add new tasks with optional deadlines
- ✅ Mark tasks as complete/incomplete  
- ✅ Edit task titles and deadlines
- ✅ Delete tasks
- ✅ Persistent storage using localStorage
- ✅ Deadline tracking with overdue indicators
- ✅ Clean, responsive UI using shadcn/ui components

### Technical Features
- TypeScript with strict mode enforcement
- Express.js backend with RESTful API
- React frontend with modern hooks
- localStorage persistence with error handling
- Port 80 compatibility for Azure Web App
- Comprehensive build and deployment scripts

## Architecture

```
/
├── client/           # React TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   └── public/
├── server/           # Express TypeScript backend  
│   ├── src/
│   │   ├── index.ts
│   │   └── types.ts
│   └── dist/         # Compiled JavaScript
├── package.json      # Root coordination
├── deploy.cmd        # Azure deployment script
└── web.config        # IIS configuration
```

## API Endpoints

- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update existing todo
- `DELETE /api/todos/:id` - Delete todo

## Quick Start

### Development

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Start backend (in terminal 1):**
   ```bash
   npm run dev:server
   ```

3. **Start frontend (in terminal 2):**
   ```bash
   npm run dev:client
   ```

4. **Visit http://localhost:3000**

### Production Build

```bash
npm run build
npm start
```

## Azure Deployment

This application is configured for Azure Web App deployment:

### Requirements
- **Resource Group**: LAB_cp_sommerhack_18235
- **Region**: northeurope  
- **Runtime**: Node.js 20.x LTS
- **Port**: 80 (uses process.env.PORT)

### Deployment Process
The included `deploy.cmd` script handles:
1. Installing client dependencies
2. Building React frontend  
3. Installing server dependencies
4. Compiling TypeScript backend
5. Copying files to deployment target
6. Configuring IIS with web.config

### Manual Deployment
1. Build the application locally
2. Deploy the `server/dist` folder to Azure
3. Ensure the client build is in `server/dist/client/build`

## Technology Stack

### Backend
- **Express.js** - Web framework
- **TypeScript** - Language with strict typing
- **CORS** - Cross-origin resource sharing
- **Port 80** - Azure Web App compatible

### Frontend  
- **React 18** - Frontend framework
- **TypeScript** - Strict typing
- **shadcn/ui** - Modern component library
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

### Deployment
- **Azure Web App** - Hosting platform
- **IIS** - Web server configuration
- **Node.js 20.x** - Runtime environment

## Component Library

Uses shadcn/ui components:
- `Button` - Actions and interactions
- `Input` - Form inputs with validation
- `Card` - Content containers
- `Switch` - Toggle controls

## Data Persistence

### localStorage Implementation
- Safe error handling for storage quota/disabled storage  
- Data validation on load
- Atomic updates to prevent corruption
- Fallback to in-memory storage

### Data Structure
```typescript
interface TodoItem {
  id: string;
  title: string; 
  completed: boolean;
  createdAt: number;
  deadline?: string;
}
```

## Error Handling

### Client-Side
- Input validation with user feedback
- Storage error graceful degradation  
- Network request error handling
- TypeScript strict mode enforcement

### Server-Side
- Request validation and sanitization
- Proper HTTP status codes
- Error logging for debugging
- Graceful failure responses

## MVP Scope

### Included ✅
- Core CRUD operations
- Basic deadline functionality
- Local data persistence  
- Clean, functional UI
- Azure deployment ready

### Explicitly Excluded ❌
- User authentication/accounts
- Backend database
- Task categories/tags
- File attachments
- Rich text editing
- Push notifications
- Offline functionality

## Performance

### Optimizations
- Component memoization for large lists
- Efficient state updates
- Minimal re-renders  
- Fast localStorage operations

### Metrics
- App loads in under 2 seconds
- Tasks persist reliably
- Works in all major browsers
- No JavaScript errors in normal usage

## Security

### Measures
- Input sanitization and validation
- XSS protection through React
- CORS configuration
- No sensitive data exposure

## Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details.