import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, Spacing } from '../../constants/theme';
import { CatBtn, CatrisLogo } from '../components/ui/ui';

type Props = { navigation: any };

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={s.safe}>

      <View style={s.moonRow}>
        <Text style={s.moon}>🌙</Text>
      </View>

      <CatrisLogo size={52} />

      <Text style={s.cat}>🐱</Text>

      <View style={s.buttons}>
        <CatBtn label="JOUER 🐾"       variant="pink" onPress={() => navigation.navigate('Permissions')} />
        <CatBtn label="PARAMÈTRES ⚙️"  variant="teal" onPress={() => navigation.navigate('Settings')} />
      </View>

      <View style={s.footer}>
        <TouchableOpacity style={s.iconBtn} onPress={() => navigation.navigate('Leaderboard')}>
          <Text style={s.icon}>🏆</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.iconBtn} onPress={() => navigation.navigate('Profile')}>
          <Text style={s.icon}>😺</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.iconBtn} onPress={() => navigation.navigate('Settings')}>
          <Text style={s.icon}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: Colors.background },
  moonRow: { alignItems: 'flex-end', paddingHorizontal: Spacing.xl, paddingTop: Spacing.md },
  moon:    { fontSize: FontSize.xl },
  cat:     { fontSize: 72, textAlign: 'center', marginVertical: Spacing.lg },
  buttons: { paddingHorizontal: Spacing.xl, gap: Spacing.md },
  footer:  { flexDirection: 'row', justifyContent: 'center', gap: Spacing.xl, marginTop: 'auto', paddingVertical: Spacing.xl },
  iconBtn: { width: 46, height: 46, borderRadius: 14, backgroundColor: Colors.surfaceLight, alignItems: 'center', justifyContent: 'center' },
  icon:    { fontSize: FontSize.xl },
});