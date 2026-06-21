// src/navigation/AppNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

// import GameOverScreen    from '../screens/GameOverScreen';
import GameScreen        from '../screens/GameScreen';
import HomeScreen        from '../screens/HomeScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import LoginScreen       from '../screens/LoginScreen';
import PermissionsScreen from '../screens/PermissionsScreen';
import ProfileScreen     from '../screens/ProfileScreen';
import RegisterScreen    from '../screens/RegisterScreen';

export type RootStackParamList = {
  // Auth
  Login:       undefined;
  Register:    undefined;
  // App
  Home:        undefined;
  Permissions: undefined;
  Game:        undefined;
  GameOver:    { score: number };
  Profile:     undefined;
  Leaderboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home"        component={HomeScreen} />
          <Stack.Screen name="Permissions" component={PermissionsScreen} />
          <Stack.Screen name="Game"        component={GameScreen} />
          {/* <Stack.Screen name="GameOver"    component={GameOverScreen} /> */}
          <Stack.Screen name="Profile"     component={ProfileScreen} />
          <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login"    component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}
