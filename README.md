# Spotify-Wrapper

CS 2340 Project using Spotify API

## Introduction

Spotify Wrapper is a web application that allows users to gain insights into their Spotify music habits. With features like top songs, genres, and artists, the app replicates the essence of Spotify Wrapped, providing stylish PDF summaries of user data. Users can authenticate with Spotify, manage their accounts, and explore personalized music trends.

## Features

- **Spotify OAuth Integration**: Secure authentication via Spotify.
- **Music Insights**: View top songs, artists, and genres.
- **PDF Summaries**: Generate and download personalized music summaries.
- **User Management**: Register, login, logout, and delete accounts.
- **Custom Themes**: Dynamic theming support for a personalized look.

## Technologies Used

### Backend:

- Django
- Django REST Framework
- Celery (with Redis)
- Spotify Web API
- OpenAI API (optional)
- ReportLab (PDF generation)

### Frontend:

- React (with Vite)
- Context API
- React Router

### Styling:

- Custom CSS

## Installation

### Prerequisites

- Python 3.x
- Node.js (optional, if frontend is implemented)
- Redis (for Celery)

### Backend Setup:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd Spotify-Wrapper/backend
   ```
2. Set up a virtual environment:
   python -m venv env
   source env/bin/activate # On Windows: .\env\Scripts\activate
3. Install dependencies:
   pip install -r requirements.txt
4. Configure environment variables: Create a .env file in the backend directory with the following:
   check discord for .env
5. Run database migrations:
   python manage.py migrate
6. Start Redis (required for Celery):
   redis-server
   Start the Celery worker:
   celery -A backend worker --loglevel=info
7. Start the backend server:
   python manage.py runserver

### Frontend Setup:

1. Navigate to the frontend folder:
   cd Spotify-Wrapper/frontend
2. Install dependencies:
   npm install
3. Start the development server:
   npm run dev
