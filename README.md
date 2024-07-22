# AudioNovelApp

## Overview

AudioNovelApp is a web application that allows users to browse audiobooks, view details, and submit reviews and ratings. It consists of a frontend built with React and a backend built with Node.js and Express.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Project Structure](#project-structure)
  - [Backend](#backend-1)
  - [Frontend](#frontend-1)
- [Usage](#usage)

## Architecture

### Backend

The backend is a RESTful API built with Node.js, Express, and MongoDB. It handles the following functionalities:
- Fetching all audiobooks
- Fetching a single audiobook by ID
- Adding a review to an audiobook

### Frontend

The frontend is a single-page application built with React. It provides the following features:
- Displaying a list of audiobooks
- Viewing details of a selected audiobook
- Adding reviews to an audiobook

## Setup Instructions

### Backend

#### Prerequisites

- Node.js (>= 14.x)
- MongoDB

#### Installation

1. Clone the repository:
   ```bash
   [git clone https://github.com/GyanendraBehura/AudioNovelApp.git
   cd AudioNovelApp/audiobook-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Frontend

#### Prerequisites

- Node.js (>= 14.x)

#### Installation

1. Navigate to the `frontend` directory:
   ```bash
   cd ../audiobook-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

## Project Structure

### Backend

- `index.js`: Entry point of the backend server.
- `models/Audiobook.js`: Mongoose model for audiobooks.

### Frontend

- `src/App.tsx`: Main application component with route definitions.
- `src/components/AudiobookList.tsx`: Component to display a list of audiobooks.
- `src/components/AudiobookDetails.tsx`: Component to display details of a selected audiobook.
- `src/context/AudiobookContext.tsx`: Context provider for managing selected audiobook state.

## Usage

1. Ensure both backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:3000` to use the application.
3. Browse audiobooks, view details, and add reviews.
4. Backend Host on `http://localhost:5000`

