import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { supabase } from '../lib/supabase';

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing connection...');

  useEffect(() => {
    async function testConnection() {
      try {
        // First, let's just test the connection
        const { data, error } = await supabase
          .from('test-messages')
          .select('*')
          .limit(1);

        if (error) {
          console.error('Connection test error:', error);
          setStatus(`Error: ${error.message}`);
          return;
        }

        setStatus(`Connection successful! Found ${data.length} rows`);
      } catch (error) {
        console.error('Error:', error);
        setStatus(`Error: ${error.message}`);
      }
    }

    testConnection();
  }, []);

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-xl font-bold mb-4">Supabase Connection Test</Text>
      <Text className="text-lg text-center">{status}</Text>
    </View>
  );
} 