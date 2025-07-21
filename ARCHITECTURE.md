# Matchmaking App - Modular Architecture

This document describes the modular frontend architecture for the matchmaking app built with Expo (React Native) and TypeScript.

## 🏗️ Architecture Overview

The app follows a **domain-driven design** approach with modular folder structure, clean separation of concerns, and scalable state management using Zustand. The UI is handled by your existing `app` folder using Expo Router, while business logic is organized in domain folders.

## 📁 Folder Structure

```
├── app/                          # Expo Router screens (UI Layer)
│   ├── (auth)/
│   │   ├── login-screen.tsx      # Your existing login UI
│   │   ├── sign-up.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── chat.tsx
│   │   ├── notification.tsx
│   │   └── setting.tsx
│   └── _layout.tsx
├── domains/                      # Business Logic Layer
│   ├── auth/
│   │   ├── services/
│   │   │   └── authService.ts    # API calls
│   │   └── hooks/
│   │       └── useAuth.ts        # Zustand store
│   ├── profile/
│   │   ├── services/
│   │   │   └── profileService.ts
│   │   └── hooks/
│   │       └── useProfile.ts
│   ├── matchmaking/
│   │   ├── services/
│   │   │   └── matchmakingService.ts
│   │   └── hooks/
│   │       └── useMatchmaking.ts
│   ├── matches/
│   │   ├── services/
│   │   │   └── matchesService.ts
│   │   └── hooks/
│   │       └── useMatches.ts
│   ├── likes/
│   │   ├── services/
│   │   │   └── likesService.ts
│   │   └── hooks/
│   │       └── useLikes.ts
│   └── messages/
│       ├── services/
│       │   └── messagesService.ts
│       └── hooks/
│           └── useMessages.ts
├── constants/
│   └── api.ts                    # API endpoints
├── lib/
│   └── axios.ts                  # HTTP client with auth
├── types/
│   ├── auth.ts                   # TypeScript interfaces
│   ├── profile.ts
│   ├── matches.ts
│   ├── likes.ts
│   └── messages.ts
├── providers/
│   └── AuthProvider.tsx          # Context provider
└── components/
    └── LoadingScreen.tsx         # Shared components
```

## 🔧 Key Features

### 1. **Separation of Concerns**

- **UI Layer**: Your existing `app` folder with Expo Router
- **Business Logic**: Domain folders with services and hooks
- **Data Layer**: Types and API constants

### 2. **State Management with Zustand**

- Lightweight and performant state management
- Type-safe stores for each domain
- Automatic token management and API integration

### 3. **API Layer**

- Centralized Axios wrapper with interceptors
- Automatic token injection and refresh
- Error handling and authentication middleware

### 4. **Type Safety**

- Full TypeScript implementation
- Strict type checking
- Interface definitions for all data structures

## 🚀 Integration with Your Existing App

### Authentication Integration

Your existing `login-screen.tsx` now uses the domain logic:

```typescript
import { useAuthStore } from "../../domains/auth/hooks/useAuth";

export default function AuthScreen() {
  const { login, register, isLoading, error } = useAuthStore();

  const handleSubmit = async () => {
    if (isLogin) {
      await login({ email, password });
      router.replace("/(tabs)");
    } else {
      await register({ name, email, password, password_confirmation });
      router.replace("/(tabs)");
    }
  };
}
```

### Provider Integration

The `AuthProvider` is integrated into your `app/_layout.tsx`:

```typescript
import { AuthProvider } from "../providers/AuthProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Stack>{/* Your existing navigation */}</Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

## 📱 Features Implemented

### Authentication

- ✅ JWT token management with AsyncStorage
- ✅ Automatic token refresh
- ✅ Protected routes
- ✅ Integration with your existing login UI

### Profile Management

- ✅ Get and update user profile
- ✅ Profile preferences
- ✅ Photo upload functionality

### Matchmaking

- ✅ Get recommendations with pagination
- ✅ Filter recommendations by criteria
- ✅ Like/unlike users
- ✅ Match creation detection

### Matches & Messages

- ✅ View all matches
- ✅ Create and remove matches
- ✅ Conversations list
- ✅ Chat functionality (basic structure)

## 🔌 API Integration

The app integrates with your Laravel backend using the following endpoints:

### Authentication

- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user
- `GET /api/user` - Get current user

### Profile

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `POST /api/profile/preferences` - Update preferences

### Matchmaking

- `GET /api/recommendations` - Get recommendations

### Matches

- `GET /api/matches` - Get matches
- `POST /api/matches/{user_id}` - Create match
- `DELETE /api/matches/{user_id}` - Remove match

### Likes

- `GET /api/likes` - Get likes
- `POST /api/likes/{user_id}` - Like user
- `DELETE /api/likes/{user_id}` - Unlike user

### Messages

- `GET /api/messages` - Get conversations
- `GET /api/messages/{user_id}` - Get chat history
- `POST /api/messages/send` - Send message

## 🛠️ Development Guidelines

### Adding New Features

1. Create domain folder in `domains/`
2. Add types in `types/`
3. Create service for API calls
4. Create Zustand store hook
5. Integrate with your existing UI in `app/`

### State Management

- Use Zustand for domain-specific state
- Keep stores focused and single-purpose
- Use TypeScript for type safety
- Handle loading and error states

### API Calls

- Use the centralized `apiClient` from `lib/axios.ts`
- Add new endpoints to `constants/api.ts`
- Handle errors consistently across the app

## 🔒 Security Features

- JWT token management
- Automatic token refresh
- Secure storage with AsyncStorage
- Authentication middleware
- Protected route handling

## 📦 Dependencies

### Core

- `expo` - React Native framework
- `expo-router` - File-based routing
- `zustand` - State management
- `axios` - HTTP client
- `@react-native-async-storage/async-storage` - Secure storage

### Development

- `typescript` - Type safety
- `babel-plugin-module-resolver` - Path aliases

## 🎯 Benefits of This Architecture

1. **Clean Separation**: UI and business logic are separated
2. **Reusable**: Domain logic can be used across different UI components
3. **Scalable**: Easy to add new features following the same pattern
4. **Maintainable**: Clear folder structure and type safety
5. **Testable**: Business logic is isolated and easy to test

## 🚀 Next Steps

1. **Test the authentication flow** with your Laravel backend
2. **Add more domain logic** for other features
3. **Integrate domain hooks** with your existing UI components
4. **Add error handling** and loading states
5. **Implement real-time features** like WebSocket for messages

This architecture provides a solid foundation for your matchmaking app while preserving your existing UI structure and leveraging the power of Expo Router.
