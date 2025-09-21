
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { storage } from '@/utils/storage';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Errore', 'Le password non coincidono');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Errore', 'La password deve essere di almeno 6 caratteri');
      return;
    }

    const success = await storage.saveUser({ name, email, password });
    
    if (success) {
      Alert.alert('Successo', 'Registrazione completata!');
      router.back(); 
    } else {
      Alert.alert('Errore', 'Errore durante la registrazione');
    }
  };

  return (

    <>
      <Stack.Screen
        options={{
          title: 'Registrazione',
          headerBackTitle: 'Indietro',
        }}
      />

    <View style={styles.container}>
      <Text style={styles.title}>Registrazione</Text>
      
      <Text style={styles.subtitle}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      
      <Text style={styles.subtitle}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <Text style={styles.subtitle}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Text style={styles.subtitle}>Conferma password</Text>
      <TextInput
        style={styles.input}
        placeholder="Conferma Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <Button title="Registrati" onPress={handleRegister} />
      
      <View style={styles.spacer} />
      
      <Button 
        title="Hai già un account? Accedi" 
        onPress={() => router.push('/(auth)/login')} 
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center',
    backgroundColor: 'rgba(173, 216, 230, 0.9)',
  },
  title: { 
    fontSize: 24, 
    fontWeight: '800', 
    marginBottom: 20, 
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
    marginLeft: 4,
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#000', 
    padding: 15, 
    marginBottom: 15, 
    borderRadius: 8,
    fontSize: 16
  },
  spacer: { 
    height: 20 
  }
});