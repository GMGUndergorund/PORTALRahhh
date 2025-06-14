# Game Hub - Flask Web Application

## Overview

Game Hub is a Flask-based web application for distributing and managing games. It provides a platform where administrators can upload games and users can browse, search, and download them. The application features a modern dark-themed UI with responsive design and comprehensive game management capabilities.

## System Architecture

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **File Storage**: JSON-based data persistence via GameManager class
- **Session Management**: Flask sessions with secure secret key configuration
- **File Handling**: Werkzeug secure filename handling for uploads
- **Deployment**: Gunicorn WSGI server with proxy middleware

### Frontend Architecture
- **UI Framework**: Bootstrap 5.x with dark theme
- **Icons**: Font Awesome 6.4.0
- **JavaScript**: Vanilla JS with Bootstrap components
- **Responsive Design**: Mobile-first approach with Bootstrap grid system

### Data Storage Solution
- **Primary Storage**: JSON files in `/data` directory
- **File Storage**: Local filesystem for game logos and assets in `/uploads` directory
- **Data Structure**: Flat JSON structure with UUID-based game identification

## Key Components

### Core Application Files
- **`app.py`**: Flask application factory and configuration
- **`main.py`**: Application entry point for deployment
- **`routes.py`**: URL routing and request handling logic
- **`game_manager.py`**: Data layer for game CRUD operations

### Authentication System
- Simple admin authentication with hardcoded credentials
- Session-based login state management
- Admin username: "Zipdaddy", Password: "Kareem.1707"

### Game Management System
- UUID-based game identification
- JSON persistence with error handling
- File upload handling with security measures
- Game metadata management (title, description, genre, tags, download links)

### Template System
- **Base Template**: `base.html` with common layout and navigation
- **Admin Templates**: Dashboard, login, upload, and edit forms
- **User Templates**: Game browsing and search interface
- **Progressive Enhancement**: JavaScript-enhanced interactions

## Data Flow

1. **Game Upload Flow**:
   - Admin authenticates via login form
   - Game details submitted through upload form
   - Files processed and stored securely
   - Game metadata saved to JSON database
   - Unique UUID assigned to each game

2. **Game Browsing Flow**:
   - Users access public game listing
   - Search and filter parameters processed
   - Games retrieved from JSON storage
   - Results paginated and displayed
   - Download links provided to users

3. **Admin Management Flow**:
   - Admin accesses dashboard with statistics
   - Games can be edited or deleted
   - File management for logos and assets
   - Real-time updates to game database

## External Dependencies

### Python Packages
- **Flask**: Core web framework (^3.1.1)
- **Gunicorn**: Production WSGI server (^23.0.0)
- **Werkzeug**: WSGI utilities and security (^3.1.3)
- **Flask-SQLAlchemy**: Database ORM capabilities (^3.1.1)
- **psycopg2-binary**: PostgreSQL adapter (^2.9.10)
- **Flask-Login**: User session management (^0.6.3)
- **email-validator**: Email validation utilities (^2.2.0)
- **Flask-Dance**: OAuth integration (^7.1.0)

### Frontend Dependencies
- **Bootstrap 5.x**: CSS framework via CDN
- **Font Awesome 6.4.0**: Icon library via CDN
- **Bootstrap Dark Theme**: Custom agent dark theme

### Development Tools
- **uv**: Modern Python package manager and resolver
- **pyproject.toml**: Modern Python project configuration

## Deployment Strategy

### Local Development
- Direct Flask development server with debug mode
- File-based storage for rapid prototyping
- Environment variables for configuration

### Production Deployment
- **Primary**: Replit hosting with Gunicorn
- **Alternative**: Render.com with persistent disk storage
- **Container**: Nix-based environment with Python 3.11
- **Process Management**: Gunicorn with single worker process
- **File Persistence**: Mounted disk storage for data directory

### Deployment Configuration
- **Replit**: `.replit` configuration with workflow automation
- **Render**: `render.yaml` with free tier settings and persistent disk
- **Heroku**: `Procfile` for alternative deployment
- **Runtime**: Python 3.11.0 specified in `runtime.txt`

### Environment Setup
- PostgreSQL package available for future database migration
- OpenSSL for secure connections
- Automatic directory creation for uploads and data
- Configurable upload limits (16MB maximum)

## Changelog

- June 14, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.