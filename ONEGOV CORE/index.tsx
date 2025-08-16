import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    // Redirect to auth screen as the starting screen
    router.replace('/auth');
  }, []);

  return null;
}
