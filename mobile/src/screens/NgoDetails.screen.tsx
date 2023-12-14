/* eslint-disable react-hooks/exhaustive-deps */
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Linking from 'expo-linking';
import { useMemo } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomSheet } from 'src/components/bottom-sheet/BottomSheet';
import { Text } from 'src/components/text/Text.component';
import { AuthenticatedStackParams, AuthenticatedStackScreenProps } from 'src/navigation/types';
import { useTheme } from 'src/theme/hooks/useTheme';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      position: 'relative',
      backgroundColor: theme.colors.main.accent,
    },
    goBack: {
      position: 'absolute',
      top: theme.spacing.layout.vertical.xxl,
      left: theme.spacing.layout.horizontal.xl,
      zIndex: 999,
    },
    imageWrapper: {
      width: 120,
      height: 120,
      alignSelf: 'center',
    },
    image: {
      top: theme.spacing.layout.vertical.xxxl + theme.spacing.layout.vertical.xl,
      width: '100%',
      height: '100%',
      borderRadius: 9999,
    },
    placeholder: {
      top: theme.spacing.layout.vertical.xxxl + theme.spacing.layout.vertical.xl,
      width: 120,
      height: 120,
      borderRadius: 9999,
      backgroundColor: theme.colors.main.primaryLight,
      alignSelf: 'center',
    },
    organizerContact: {
      flexDirection: 'row',
      gap: theme.spacing.layout.horizontal.xl,
    },
    resources: {
      flexDirection: 'row',
      gap: theme.spacing.layout.horizontal.xl,
    },
    links: {
      flexDirection: 'row',
      gap: theme.spacing.layout.horizontal.xl,
    },
    actions: {
      flexDirection: 'row',
      gap: theme.spacing.layout.horizontal.xl,
      justifyContent: 'space-between',
    },
    descriptionWrapper: {
      maxHeight: Dimensions.get('window').height * 0.125,
      overflow: 'scroll',
    },
    infoWrapper: {
      maxHeight: Dimensions.get('window').height * 0.35,
      gap: theme.spacing.layout.horizontal.xl,
    },
    infoSection: {},
    content: {
      justifyContent: 'space-between',
      gap: theme.spacing.layout.vertical.xl,
    },
  });

  return styles;
};

export function NgoDetailsScreen({ route }: AuthenticatedStackScreenProps<'NgoDetails'>) {
  const styles = useThemedStyles(themedStyles);
  const { fontSizes, colors } = useTheme();
  const { socialLinks, address, bankAccount, description, email, phone, name, logoUrl, resources, website, krs, nip } =
    route.params.ngo;
  const { goBack } = useNavigation<NativeStackNavigationProp<AuthenticatedStackParams>>();

  const fbLink = useMemo(() => socialLinks.find(link => link.includes('facebook')), []);
  const instagramLink = useMemo(() => socialLinks.find(link => link.includes('instagram')), []);
  const linkedInLink = useMemo(() => socialLinks.find(link => link.includes('linkedin')), []);

  const handleOpenLink = (link: string) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <View style={styles.goBack}>
        <TouchableOpacity onPress={goBack}>
          <AntDesign color={colors.main.primary} size={fontSizes['4xl']} name="left" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      {logoUrl ? (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: logoUrl }} style={styles.image} resizeMode="cover" resizeMethod="auto" />
        </View>
      ) : (
        <View style={styles.placeholder} />
      )}
      <BottomSheet borderColor="primary">
        <View style={styles.content}>
          <Text size="xl" type="primaryBold">
            {name}
          </Text>
          <ScrollView style={styles.descriptionWrapper}>
            <Text>{description}</Text>
          </ScrollView>
          <ScrollView style={styles.infoWrapper} contentContainerStyle={{ justifyContent: 'space-between', gap: 4 }}>
            <Text type="primaryBold">Gdzie jesteśmy ?</Text>
            {address ? (
              <Text>
                ul. {address.street}, {address.zipCode} {address.city}
              </Text>
            ) : null}
            <Text type="primaryBold">Dysponujemy zasobami</Text>
            <View style={styles.resources}>
              {resources?.map(resource => (
                <Text key={resource}>{resource}</Text>
              ))}
            </View>
            <Text type="primaryBold">Kontakt</Text>
            <TouchableOpacity onPress={() => handleOpenLink(`mailto:${email}`)}>
              <Text>{email}</Text>
            </TouchableOpacity>
            <View style={styles.organizerContact}>
              {fbLink ? (
                <TouchableOpacity onPress={() => handleOpenLink(fbLink)}>
                  <AntDesign color={colors.main.primary} size={fontSizes.xxl} name="facebook-square" />
                </TouchableOpacity>
              ) : null}
              {instagramLink ? (
                <TouchableOpacity onPress={() => handleOpenLink(instagramLink)}>
                  <AntDesign color={colors.main.primary} size={fontSizes.xxl} name="instagram" />
                </TouchableOpacity>
              ) : null}
              {linkedInLink ? (
                <TouchableOpacity onPress={() => handleOpenLink(linkedInLink)}>
                  <AntDesign color={colors.main.primary} size={fontSizes.xxl} name="linkedin-square" />
                </TouchableOpacity>
              ) : null}
              {website ? (
                <TouchableOpacity onPress={() => handleOpenLink(website)}>
                  <AntDesign color={colors.main.primary} size={fontSizes.xxl} name="earth" />
                </TouchableOpacity>
              ) : null}
              {phone ? (
                <TouchableOpacity onPress={() => handleOpenLink(`tel:${phone}`)}>
                  <AntDesign color={colors.main.primary} size={fontSizes.xxl} name="phone" />
                </TouchableOpacity>
              ) : null}
            </View>
            <Text>Numer konta: {bankAccount}</Text>
            {krs ? <Text>KRS: {krs}</Text> : null}
            {nip ? <Text>NIP: {nip}</Text> : null}
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
}
