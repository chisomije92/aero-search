# Aero Search - Flight Booking Application

A modern, elegant flight search and booking platform built with Next.js, React, and Material-UI. Aero Search helps travelers find the best flight deals across multiple airlines with an intuitive interface and powerful filtering capabilities.

## 🌟 Features

### Core Functionality

- **Advanced Flight Search**: Search flights by origin, destination, dates, and passenger count
- **Multiple Trip Types**: Support for round-trip, one-way, and multi-city flights
- **Passenger Management**: Flexible passenger selection (adults, children, infants on lap/seat)
- **Travel Class Selection**: Choose between economy, business, and first-class cabins
- **Smart Location Swap**: Quickly swap origin and destination with one click

### Search & Filtering

- **Real-time Filters**: Filter flights by:
  - Airline selection
  - Price range
  - Number of stops
  - Departure and arrival times
  - Flight duration
- **Price Alerts**: Set up notifications for price drops on your favorite routes
- **Persistent Search**: All search parameters are saved to URL for easy sharing and bookmarking

### User Experience

- **Responsive Design**: Fully responsive interface for desktop, tablet, and mobile devices
- **Interactive FAQ**: Expandable FAQ section with smooth animations
- **Premium Features Showcase**: Highlight exclusive membership benefits
- **Popular Destinations**: Browse trending flight destinations
- **Newsletter Subscription**: Stay updated on flight deals

## 🛠️ Tech Stack

### Frontend

- **Next.js 14+** - React framework with App Router
- **React 18+** - UI library
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Day.js** - Date manipulation library

### State Management & Routing

- **React Hooks** - useState, useCallback, useMemo for state management
- **Custom Hooks** - useHeader, useFilters, useQueryParams for feature-specific logic
- **Next.js Navigation** - useRouter, useSearchParams for URL-based state

### API Integration

- **Amadeus API** - Real-time flight data and pricing
- **Axios** - HTTP client for API requests

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager
- Amadeus API credentials (for flight data)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/chisomije92/aero-search.git
cd j-flight
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_AMADEUS_CLIENT_ID=your_amadeus_client_id
NEXT_PUBLIC_AMADEUS_CLIENT_SECRET=your_amadeus_client_secret
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### Searching for Flights

1. **Select Trip Type**: Choose between Round Trip, One Way, or Multi-City
2. **Choose Passengers**: Click the passenger button to select:
   - Number of adults (minimum 1)
   - Number of children
   - Infants on lap or seat
3. **Select Travel Class**: Pick your preferred cabin class
4. **Enter Locations**:
   - Type or select departure airport (From)
   - Type or select arrival airport (To)
   - Use the swap button to quickly reverse locations
5. **Pick Dates**:
   - Select departure date
   - For round trips, select return date
6. **Click Explore**: Submit your search to view available flights

### Filtering Results

Once you have search results:

- **Filter by Airline**: Select/deselect specific airlines
- **Adjust Price Range**: Set your budget constraints
- **Limit Stops**: Choose maximum number of stops
- **Set Time Preferences**: Filter by departure and arrival times
- **Duration Limit**: Set maximum flight duration
- **Reset Filters**: Clear all filters to see all results

### Setting Price Alerts

- Click the "Price Alerts" button in the header
- Set your origin and destination
- Receive notifications when prices drop

### Persistent Search

All search parameters are automatically saved to the URL, allowing you to:

- **Share searches** with friends via URL
- **Bookmark favorite routes** for quick access
- **Refresh the page** and maintain your search state

## 🔌 Amadeus API Integration

Aero Search integrates with the **Amadeus Flight Search API** to provide:

### Real-time Flight Data

- Current flight availability
- Live pricing information
- Airline details and flight schedules
- Aircraft information

### API Endpoints Used

- **Flight Search**: Get available flights based on search criteria
- **Flight Inspiration**: Discover popular destinations
- **Airline Lookup**: Get airline names and codes
- **Airport Search**: Find airport codes and information

### Authentication

The application uses OAuth 2.0 authentication with Amadeus API:

- Client credentials flow for server-side authentication
- Secure token management
- Automatic token refresh

## 📁 Project Structure

```
j-flight/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── common/                 # Shared components
│   │   ├── extras/             # Header, Footer, Filters
│   │   ├── drawers/            # Drawer components
│   │   └── modals/             # Modal components
│   ├── components/             # Feature components
│   │   ├── features/           # Feature-specific components
│   │   ├── layout/             # Layout components
│   │   └── ui/                 # Reusable UI components
│   ├── hooks/                  # Custom React hooks
│   │   ├── useHeader.tsx       # Header state management
│   │   ├── useFilters.tsx      # Filter state management
│   │   ├── useQueryParams.tsx  # URL query parameter management
│   │   └── ...
│   ├── lib/                    # Utility functions
│   │   ├── amadeus/            # Amadeus API integration
│   │   └── utils.ts            # Helper functions
│   ├── providers/              # Context providers
│   └── constants/              # App constants
├── public/                     # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Key Components

### Header Component

- Search form with all flight parameters
- Trip type selection
- Passenger management popover
- Travel class selection
- Location swap functionality
- Date pickers for departure/return

### Overview2 Component

- Premium features showcase
- Popular destinations grid
- Customer testimonials
- FAQ section with collapsible items
- Newsletter subscription
- Statistics display

### Filters Component

- Airline selection
- Price range slider
- Stops filter
- Departure/arrival time ranges
- Flight duration limit
- Reset filters button

## 🔐 Security Features

- **Secure API Communication**: HTTPS for all API requests
- **Environment Variables**: Sensitive data stored in .env.local
- **Input Validation**: All user inputs are validated
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Next.js built-in CSRF protection

## 📱 Responsive Design

The application is fully responsive with breakpoints for:

- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component for optimized images
- **Code Splitting**: Automatic code splitting with Next.js
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.useMemo for expensive computations
- **Callback Optimization**: useCallback for stable function references

## 📝 Environment Variables

```env
# Amadeus API Credentials
NEXT_PUBLIC_AMADEUS_CLIENT_ID=your_client_id
NEXT_PUBLIC_AMADEUS_CLIENT_SECRET=your_client_secret

# Optional: API Base URL
NEXT_PUBLIC_AMADEUS_API_URL=https://api.amadeus.com
```

## 🧪 Testing

Run tests with:

```bash
npm run test
```

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For support, email support@aerosearch.com or open an issue on GitHub.

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com)
- [Amadeus API Documentation](https://developers.amadeus.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)

---

**Aero Search** - Find Your Perfect Flight ✈️
