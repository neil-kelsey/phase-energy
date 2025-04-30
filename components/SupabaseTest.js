import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing connection...');
  const [debugInfo, setDebugInfo] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function testConnection() {
      try {
        // Test 0: Check auth status
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        setDebugInfo('Auth Status: ' + (user ? 'Authenticated' : 'Anonymous') + '\n');
        
        if (authError) {
          setDebugInfo(prev => prev + `Auth Error: ${authError.message}\n`);
        }

        // Test 1: List all tables
        setDebugInfo(prev => prev + '\nListing available tables...\n');
        const { data: tables, error: tablesError } = await supabase
          .from('_tables')
          .select('tablename')
          .eq('schemaname', 'public');

        if (tablesError) {
          setDebugInfo(prev => prev + `Tables Error: ${tablesError.message}\n`);
        } else if (tables) {
          setDebugInfo(prev => prev + `Available tables: ${tables.map(t => t.tablename).join(', ')}\n`);
        }

        // Test 2: Basic connection to test-messages
        setDebugInfo(prev => prev + '\nTesting connection to test-messages...\n');
        
        // Try to get row count
        const { count, error: countError } = await supabase
          .from('test-messages')
          .select('*', { count: 'exact', head: true });

        if (countError) {
          setDebugInfo(prev => prev + `Count Error: ${countError.message}\n`);
          if (countError.code === '42501') {
            setDebugInfo(prev => prev + 'Permission denied. Check RLS policies.\n');
          }
        } else {
          setDebugInfo(prev => prev + `Table has ${count} rows\n`);
        }

        // Test 3: Try to read data
        setDebugInfo(prev => prev + '\nTrying to read data...\n');
        const { data, error } = await supabase
          .from('test-messages')
          .select('*');  // Select all columns to see what we get

        if (error) {
          setDebugInfo(prev => prev + `Data fetch error: ${error.message}\n`);
          setStatus(`Error: ${error.message}`);
          return;
        }

        setDebugInfo(prev => prev + `Received data: ${JSON.stringify(data, null, 2)}\n`);
        setStatus(`Connection successful! Found ${data?.length || 0} rows`);
        
        if (data && data.length > 0) {
          setDebugInfo(prev => prev + `Available columns: ${Object.keys(data[0]).join(', ')}\n`);
          setMessage(data[0].message);
        } else {
          setDebugInfo(prev => prev + 'No rows returned from query\n');
          setMessage('No messages found');
        }
      } catch (error) {
        console.error('Error:', error);
        setDebugInfo(prev => prev + `Unexpected error: ${error.message}\n`);
        setStatus(`Error: ${error.message}`);
      }
    }

    testConnection();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-xl font-bold mb-4">Supabase Connection Test</Text>
        <Text className="text-lg text-center mb-4">{status}</Text>
        <Text className="text-lg text-center text-blue-600 mb-4">
          {message || 'Waiting for message...'}
        </Text>
        <Text className="text-sm font-mono whitespace-pre-wrap">{debugInfo}</Text>
      </View>
    </ScrollView>
  );
} 