# Ahmed Aboelcode Portfolio

A full-stack portfolio website built with Node.js, Express, and Vanilla JavaScript, using local JSON files for data storage.

## Features

- Responsive design that works on all devices
- Dynamic content loaded from JSON files
- Contact form with server-side validation
- Projects showcase with filtering
- Skills section with categories and proficiency levels
- About section with personal information
- Light and performant

## Technologies Used

### Frontend
- HTML5
- CSS3 (with CSS variables for theming)
- Vanilla JavaScript (no frameworks)
- Responsive design

### Backend
- Node.js
- Express
- Local JSON files for data storage (no database required)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/aboelcode/portfolio.git
cd portfolio
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Data Storage

This project uses local JSON files stored in the `/data` directory:

- `/data/profile.json` - Personal information
- `/data/projects.json` - Projects information 
- `/data/skills.json` - Skills data
- `/data/messages.json` - Contact form submissions

No external database is required. All data is stored locally in JSON format.

## Deployment

This project uses local JSON files for data storage, which means you can easily deploy it to any hosting provider without needing an external database service.

For Windows users, you can run the included `setup.bat` file to automatically:
1. Install dependencies
2. Start the server

## Project Structure

```
├── data/                 # JSON data files directory
│   ├── profile.json      # Profile information
│   ├── projects.json     # Projects data
│   ├── skills.json       # Skills data 
│   └── messages.json     # Contact form submissions
├── public/               # Static files
│   ├── css/              # CSS stylesheets
│   ├── images/           # Image assets
│   ├── js/               # JavaScript files
│   └── index.html        # Main HTML file
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
├── README.md             # Project documentation
├── setup.bat             # Setup script for Windows
└── server.js             # Express server entry point
```

## Contact

- Website: [aboelcode.com](https://aboelcode.com)
- Email: [aboelcode@gmail.com](mailto:aboelcode@gmail.com)
- Facebook: [@aboelcode](https://facebook.com/aboelcode)

## Donations

- Instapay: @instapay
- Vodafone Cash: 01069155774#   a b o e l c o d e - a p p  
 #   a b o e l c o d e - a p p  
 