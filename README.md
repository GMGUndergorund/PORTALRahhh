# FreeGames Hub - Game Distribution Platform

## Overview
A modern Flask-based game distribution platform with password protection, enhanced upload features, and a sleek gaming-themed interface.

## Features
- **Password Protection**: Website-wide password gate (`FreeGames2025`)
- **Enhanced Game Upload**: Comprehensive game information including:
  - Developer/Publisher details
  - Multiple download links
  - Screenshots gallery
  - System requirements
  - Game features and platforms
  - Release information
- **Modern Gaming UI**: Dark theme with neon accents and smooth animations
- **Search Engine Protection**: robots.txt prevents indexing
- **Advanced Search**: Filter by genre, tags, and sort options

## Installation

### Quick Setup
1. Install Python 3.11+
2. Install dependencies: `pip install -r deploy_requirements.txt`
3. Set environment variables:
   - `SESSION_SECRET`: Random secret key for sessions
   - `DATABASE_URL`: PostgreSQL connection string (optional)
4. Run: `python main.py`

### Production Deployment
- **Replit**: Use provided configuration files
- **Render/Heroku**: Deploy using `gunicorn main:app`
- **Docker**: Compatible with standard Python Docker images

## Configuration

### Admin Access
- **Admin Login**: `/admin/login`
- **Username**: `Zipdaddy`
- **Password**: `Kareem.1707`

### Website Access
- **Entry Password**: `FreeGames2025`
- Users must enter this password to access any content

### File Structure
```
├── app.py                 # Flask application setup
├── main.py               # Entry point
├── routes.py             # URL routing and handlers
├── game_manager.py       # Game data management
├── templates/            # HTML templates
├── static/               # CSS, JS, and assets
├── uploads/              # Game logos and screenshots
├── data/                 # JSON game database
└── deploy_requirements.txt # Python dependencies
```

## Security Features
- Password-protected website access
- Secure file upload handling
- Session management
- Admin authentication
- Search engine blocking via robots.txt

## Game Upload Features
- Drag & drop logo upload
- Multiple screenshot support (up to 5)
- Comprehensive game details
- System requirements
- Multiple download links
- Feature checkboxes (multiplayer, VR, etc.)
- Platform support indicators
- Installation notes

## API Endpoints
- `GET /` - Main game listing
- `GET /enter-password` - Password entry
- `GET /admin/dashboard` - Admin panel
- `POST /admin/upload` - Game upload
- `GET /robots.txt` - Search engine blocking

## License
Private use only. Not for redistribution.