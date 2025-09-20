// app/utils/authAlert.ts
import { Alert } from 'react-native';

interface AuthAlertOptions {
  message?: string;
  onCancel?: () => void;
  onLogin?: () => void;
  onRegister?: () => void;
}

export const showAuthAlert = ({ 
  message = 'Devi accedere per accedere a questa funzionalità', 
  onCancel,
  onLogin,
  onRegister
}: AuthAlertOptions = {}) => {
  Alert.alert(
    '🔐 Accesso Richiesto',
    message,
    [
      {
        text: 'Annulla',
        style: 'cancel',
        onPress: onCancel
      },
      {
        text: 'Registrati',
        onPress: onRegister,
        style: 'default'
      },
      {
        text: 'Login',
        onPress: onLogin,
        style: 'default'
      }
    ]
  );
};