import { View } from 'react-native';
import DocumentViewer from './components/DocumentViewer';

export default function DocumentationScreen() {
  return (
    <View className="flex-1 bg-white">
      <DocumentViewer />
    </View>
  );
} 