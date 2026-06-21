// src/components/ui.tsx
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { ButtonShadows, Colors, FontSize, Fonts, Radius, Spacing } from '../../../constants/theme';

// 1. LOGO 
export function CatrisLogo({ size = 48 }: { size?: number }) {
  return (
    <View style={logo.wrap}>
      <Text style={[logo.text, { fontSize: size }]}>CATRiS</Text>
      <Text style={logo.tagline}>EMPILER. COMBINER. MIAOU !</Text>
    </View>
  );
}
const logo = StyleSheet.create({
  wrap: { alignItems: 'center', marginBottom: Spacing.sm },
  text: {
    fontFamily: Fonts.display, color: Colors.amber, letterSpacing: 3,
    textShadowColor: Colors.purple, textShadowOffset: { width: 3, height: 3 }, textShadowRadius: 0
  },
  tagline: {
    fontFamily: Fonts.body, fontSize: FontSize.xs, color: Colors.muted,
    letterSpacing: 2, fontWeight: '700', marginTop: 2
  },
});

//2. BOUTON PRINCIPAL
type BtnVariant = 'pink' | 'amber' | 'teal' | 'purple' | 'dark';

const BTN_STYLES: Record<BtnVariant, { bg: string; shadow: string; color: string }> = {
  pink: { bg: Colors.pink, shadow: ButtonShadows.pink, color: Colors.white },
  amber: { bg: Colors.amber, shadow: ButtonShadows.amber, color: Colors.background },
  teal: { bg: Colors.teal, shadow: ButtonShadows.teal, color: Colors.background },
  purple: { bg: Colors.purple, shadow: ButtonShadows.purple, color: Colors.white },
  dark: { bg: Colors.surfaceLight, shadow: ButtonShadows.dark, color: Colors.muted },
};

interface CatBtnProps extends TouchableOpacityProps {
  label: string;
  variant?: BtnVariant;
  small?: boolean;
}

export function CatBtn({ label, variant = 'pink', small = false, style, ...rest }: CatBtnProps) {
  const v = BTN_STYLES[variant];
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        btn.base,
        small && btn.small,
        { backgroundColor: v.bg, shadowColor: v.shadow },
        style as ViewStyle,
      ]}
      {...rest}
    >
      <Text style={[btn.label, small && btn.labelSmall, { color: v.color }]}>{label}</Text>
    </TouchableOpacity>
  );
}
const btn = StyleSheet.create({
  base: {
    width: '100%',
    borderRadius: Radius.xl,
    paddingVertical: 14,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  small: { paddingVertical: 10, borderRadius: Radius.lg },
  label: { fontFamily: Fonts.display, fontSize: FontSize.lg, letterSpacing: 1 },
  labelSmall: { fontSize: FontSize.base },
});

//3. INPUT 
export function CatInput({ style, ...rest }: TextInputProps) {
  return (
    <TextInput
      style={[input.field, style as TextStyle]}
      placeholderTextColor={Colors.muted}
      {...rest}
    />
  );
}
const input = StyleSheet.create({
  field: {
    width: '100%',
    backgroundColor: Colors.surface,
    color: Colors.white,
    borderRadius: Radius.md,
    paddingVertical: 13,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    fontSize: FontSize.md,
    fontFamily: Fonts.body,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
});

//3. CARD 
export function CatCard({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[card.base, style]}>{children}</View>;
}
const card = StyleSheet.create({
  base: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
    marginBottom: Spacing.md,
  },
});

// 5. SCORE DISPLAY (HUD) 
export function ScoreDisplay({
  label, value, align = 'left', highlight = false,
}: { label: string; value: string | number; align?: 'left' | 'right'; highlight?: boolean }) {
  return (
    <View style={{ alignItems: align === 'right' ? 'flex-end' : 'flex-start' }}>
      <Text style={score.label}>{label}</Text>
      <Text style={[score.value, highlight && { color: Colors.amber }]}>
        {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
      </Text>
    </View>
  );
}
const score = StyleSheet.create({
  label: { fontFamily: Fonts.body, fontSize: FontSize.xs, color: Colors.muted, letterSpacing: 2, fontWeight: '700' },
  value: { fontFamily: Fonts.display, fontSize: 28, color: Colors.white, lineHeight: 32 },
});

// 6. SECTION LABEL 
export function SectionLabel({ children }: { children: string }) {
  return <Text style={sl.text}>{children}</Text>;
}
const sl = StyleSheet.create({
  text: {
    fontFamily: Fonts.body,
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.muted,
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
});

// 7. TEXTE D'ERREUR 
export function ErrorMsg({ message }: { message: string }) {
  if (!message) return null;
  return <Text style={err.text}>{message}</Text>;
}
const err = StyleSheet.create({
  text: {
    fontFamily: Fonts.body,
    color: Colors.error,
    fontSize: FontSize.base,
    textAlign: 'center',
    backgroundColor: Colors.error + '22',
    padding: Spacing.md,
    borderRadius: Radius.sm,
    marginBottom: Spacing.md,
  },
});
