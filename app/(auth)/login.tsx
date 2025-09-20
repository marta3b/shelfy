// app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { storage } from '@/utils/storage';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const user = await storage.getUser();
    
    if (user && user.email === email && user.password === password) {
      Alert.alert('Successo', 'Login effettuato!');
      router.back(); // Torna indietro
    } else {
      Alert.alert('Errore', 'Email o password errati');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button title="Accedi" onPress={handleLogin} />
      
      <View style={styles.spacer} />
      
      <Button 
        title="Non hai un account? Registrati" 
        onPress={() => router.push('/(auth)/register')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 15, 
    marginBottom: 15, 
    borderRadius: 8,
    fontSize: 16
  },
  spacer: { height: 20 }
});