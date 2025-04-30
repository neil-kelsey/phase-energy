# Phase Energy Mobile App

A React Native mobile application for Phase Energy, providing features for solar panel installation services, project documentation access, FAQs, and quote requests.

## Tech Stack

- **Frontend**

- React Native with Expo (SDK 49)
- NativeWind (v2.0.11) for styling (Tailwind CSS for React Native)
- React Navigation for routing and navigation
  - Bottom Tab Navigator
  - Native Stack Navigator
- TypeScript for type safety

**Authentication**

- Supabase Auth

- **Backend Admin Panel**

  - Supabase Studio
    - Easily create users and upload files
    - Restrict access via roles (important for future scalability)

- **Hosting**

  - Supabase hosting (start with free tier, then $25/month)

- **Testing**

  - TestFlight and Google Play internal testing before full release

- **Backup**
  - Supabase has built-in support on paid plans

## Project Structure

```
Phase/
├── App.js                  # Main application entry point
├── DocumentationScreen.js  # Documentation page component
├── babel.config.js        # Babel configuration
├── tailwind.config.js     # Tailwind/NativeWind configuration
├── package.json           # Project dependencies
└── assets/               # Static assets
```

## Setup Instructions

1. **Prerequisites**

   - Node.js (LTS version recommended)
   - npm or yarn
   - Expo Go app on your mobile device

2. **Installation**

   ```bash
   # Clone the repository
   git clone [your-repo-url]
   cd Phase

   # Install dependencies
   npm install
   ```

3. **Running the App**

   ```bash
   # Start the development server
   npx expo start --clear
   ```

4. **Viewing the App**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Make sure your phone is on the same network as your development machine

## Current Features

- Bottom tab navigation
- Home screen with welcome message
- Documentation screen
- NativeWind styling integration

## Development Notes

- The project uses NativeWind for styling. All styles are written using Tailwind CSS classes via the `className` prop
- Navigation is handled through React Navigation's Bottom Tab Navigator
- The app is currently using Expo managed workflow for easier development and testing

## Dependencies

Main dependencies and their versions:

```json
{
  "expo": "~49.0.15",
  "react": "18.2.0",
  "react-native": "0.72.6",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/bottom-tabs": "^6.x",
  "nativewind": "^2.0.11",
  "tailwindcss": "^3.3.2"
}
```

## Best Practices

1. Always restart the Expo server with `--clear` flag after making configuration changes
2. Use NativeWind classes for styling instead of StyleSheet
3. Keep the navigation structure simple and intuitive
4. Follow the established project structure for new features

## TODO Before Production

1. **Supabase Security**
   - Enable Row Level Security (RLS) on all tables
   - Set up proper RLS policies for:
     - Anonymous read access to public data (test-messages, etc.)
     - Authenticated user access to private data
     - Admin access where needed
   - Review and test all security policies
   - Remove any test data from tables

## Troubleshooting

Common issues and solutions:

1. **Metro bundler issues**

   - Solution: Stop the server and restart with `npx expo start --clear`

2. **NativeWind styles not applying**

   - Check babel.config.js includes the NativeWind plugin
   - Verify tailwind.config.js content paths are correct
   - Restart the development server

3. **Navigation issues**
   - Ensure all navigation packages are properly installed
   - Check for version compatibility with Expo SDK
