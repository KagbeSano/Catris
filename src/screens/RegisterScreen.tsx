import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/color';
import { useAuth } from '../contexts/AuthContext';
import { registerMock } from '../services/authService';

type Props = { navigation: any };

export default function RegisterScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!pseudo.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const user = await registerMock(pseudo.trim(), email.trim(), password);
      await signIn(user);
    } catch (e: any) {
      setError(e.message ?? 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Retour</Text>
          </TouchableOpacity>

          <Text style={styles.logo}>CATRiS</Text>
          <Text style={styles.title}>Crée ton compte</Text>
          <Text style={styles.sub}>Choisis un pseudo de champion 🏆</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TextInput style={styles.input} placeholder="Pseudo (ton nom dans le jeu)" placeholderTextColor={Colors.muted}
            value={pseudo} onChangeText={(t) => { setPseudo(t); setError(''); }} autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor={Colors.muted}
            value={email} onChangeText={(t) => { setEmail(t); setError(''); }} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="Mot de passe (min. 6 caractères)" placeholderTextColor={Colors.muted}
            value={password} onChangeText={(t) => { setPassword(t); setError(''); }} secureTextEntry />
          <TextInput style={styles.input} placeholder="Confirmer le mot de passe" placeholderTextColor={Colors.muted}
            value={confirm} onChangeText={(t) => { setConfirm(t); setError(''); }} secureTextEntry />

          {loading ? (
            <ActivityIndicator color={Colors.pink} style={{ marginVertical: 16 }} />
          ) : (
            <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister}>
              <Text style={styles.btnPrimaryText}>CRÉER MON COMPTE 🐾</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Déjà un compte ? Se connecter</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { alignItems: 'center', paddingHorizontal: 28, paddingTop: 20, paddingBottom: 40 },
  backBtn: { alignSelf: 'flex-start', marginBottom: 16 },
  backText: { color: Colors.teal, fontSize: 14 },
  logo: { fontSize: 40, fontWeight: '900', color: Colors.amber, letterSpacing: 3, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '700', color: Colors.white, marginBottom: 4 },
  sub: { fontSize: 13, color: Colors.muted, marginBottom: 24 },
  error: { color: Colors.error, fontSize: 13, marginBottom: 10, textAlign: 'center', backgroundColor: '#FF6B6B22', width: '100%', padding: 10, borderRadius: 10 },
  input: { width: '100%', backgroundColor: Colors.surface, color: Colors.white, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 18, marginBottom: 12, fontSize: 15, borderWidth: 1, borderColor: Colors.surfaceLight },
  btnPrimary: { width: '100%', backgroundColor: Colors.pink, borderRadius: 30, paddingVertical: 16, alignItems: 'center', marginTop: 8, marginBottom: 16 },
  btnPrimaryText: { color: Colors.white, fontSize: 16, fontWeight: '700', letterSpacing: 1 },
  linkText: { color: Colors.teal, fontSize: 14 },
});