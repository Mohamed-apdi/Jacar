// app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  // Immediately redirect to the /sign-in route
  return <Redirect href="/sign-in" />;
}
