import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, Fonts, Spacing } from '../../constants/theme';
import { CatBtn, CatInput, CatrisLogo, ErrorMsg } from '../components/ui/ui';
import { useAuth } from '../contexts/AuthContext';
import { loginMock } from '../services/authService';

type Props = { navigation: any };

export default function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Remplis tous les champs !');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const user = await loginMock(email.trim(), password);
      await signIn(user);
    } catch (e: any) {
      setError(e.message ?? 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.container}>
        <CatrisLogo size={52} />
        <Text style={s.cat}>🐱</Text>

        <ErrorMsg message={error} />

        <CatInput placeholder="Email" value={email} onChangeText={t => { setEmail(t); setError(''); }} keyboardType="email-address" autoCapitalize="none" />
        <CatInput placeholder="Mot de passe" value={password} onChangeText={t => { setPassword(t); setError(''); }} secureTextEntry />

        {loading ? (
          <ActivityIndicator color={Colors.pink} style={s.mb} />
        ) : (
          <CatBtn label="JOUER 🐾" variant="pink" onPress={handleLogin} style={s.mb} />
        )}
        <CatBtn label="Créer un compte" variant="purple" onPress={() => navigation.navigate('Register')} />

        <TouchableOpacity onPress={() => {}}>
          <Text style={s.forgot}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <Text style={s.hint}>Astuce test : sano@gmail.com / 123456</Text>
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
  hint: { fontFamily: Fonts.body, color: Colors.muted, fontSize: FontSize.xs, marginTop: Spacing.md, opacity: 0.6 },
});