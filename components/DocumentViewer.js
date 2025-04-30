import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Linking } from 'react-native';
import { supabase } from '../lib/supabase';

export default function DocumentViewer() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      setLoading(true);
      setError(null);

      // List all files in the 'documents' bucket
      const { data, error } = await supabase
        .storage
        .from('documents')
        .list();

      if (error) {
        throw error;
      }

      // Filter for PDF files and format the data
      const pdfFiles = data
        .filter(file => file.name.toLowerCase().endsWith('.pdf'))
        .map(file => ({
          id: file.id,
          name: file.name,
          size: file.metadata.size,
          created: new Date(file.created_at).toLocaleDateString(),
        }));

      setDocuments(pdfFiles);
    } catch (err) {
      console.error('Error loading documents:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function downloadDocument(fileName) {
    try {
      // Get the signed URL for the file
      const { data, error } = await supabase
        .storage
        .from('documents')
        .createSignedUrl(fileName, 3600); // URL valid for 1 hour

      if (error) {
        throw error;
      }

      // Open the PDF in the device's default PDF viewer
      await Linking.openURL(data.signedUrl);
    } catch (err) {
      console.error('Error downloading document:', err);
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg">Loading documents...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-lg text-red-500 text-center">{error}</Text>
        <TouchableOpacity 
          className="mt-4 bg-blue-500 px-4 py-2 rounded-lg"
          onPress={loadDocuments}
        >
          <Text className="text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={documents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="p-4 border-b border-gray-200"
            onPress={() => downloadDocument(item.name)}
          >
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-sm text-gray-500">
              Created: {item.created} • Size: {Math.round(item.size / 1024)} KB
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-4">
            <Text className="text-lg text-center text-gray-500">
              No PDF documents found
            </Text>
          </View>
        }
      />
    </View>
  );
} 