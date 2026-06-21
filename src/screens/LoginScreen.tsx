// src/screens/LoginScreen.tsx
import { useState } from 'react';
import { KeyboardAvoidingView, Platform,StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, FontSize, Fonts, Spacing } from '../../constants/theme';
import { CatBtn, CatInput, CatrisLogo, ErrorMsg } from '../components/ui/ui';
import { useAuth } from '../contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = { navigation: any };

export default function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError('Remplis tous les champs !');
      return;
    }

    setError('');

    signIn({
      id: Date.now().toString(),
      pseudo: email.split('@')[0],
      email,
    });
  };

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.container}>
        <CatrisLogo size={52} />
        <Text style={s.cat}>🐱</Text>

        <ErrorMsg message={error} />

        <CatInput placeholder="Email" value={email} onChangeText={t => { setEmail(t); setError(''); }} keyboardType="email-address" autoCapitalize="none" />
        <CatInput placeholder="Mot de passe" value={password} onChangeText={t => { setPassword(t); setError(''); }} secureTextEntry />

        <CatBtn label="JOUER 🐾" variant="pink" onPress={handleLogin} style={s.mb} />
        <CatBtn label="Créer un compte" variant="purple" onPress={() => navigation.navigate('Register')} />

        <TouchableOpacity onPress={() => { }}>
          <Text style={s.forgot}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl },
  cat: { fontSize: 64, marginBottom: Spacing.xl },
  mb: { marginBottom: Spacing.md },
  forgot: { fontFamily: Fonts.body, color: Colors.muted, fontSize: FontSize.sm, marginTop: Spacing.lg },
});
