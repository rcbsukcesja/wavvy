import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'src/components/text/Text.component';
import { AuthenticatedStackParams, NGO_DETAILS_SCREEN_NAME } from 'src/navigation/types';
import { useTheme } from 'src/theme/hooks/useTheme';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

import { NgoDTO } from '../types';

interface NgoCardProps {
  ngo: NgoDTO;
}

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 48,
      backgroundColor: theme.colors.surface.background,
      paddingHorizontal: theme.spacing.layout.horizontal.xl,
      paddingVertical: theme.spacing.layout.vertical.xl,
      borderWidth: 3,
      borderColor: theme.colors.main.primary,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 9999,
    },
    imagePlaceholder: {
      width: '100%',
      height: '100%',
      borderRadius: 9999,
      backgroundColor: theme.colors.main.primaryLight,
    },
    card: {
      position: 'relative',
      gap: theme.spacing.layout.vertical.xl,
    },
    imageWrapper: {
      width: 80,
      height: 80,
    },
    actionsWrapper: {
      paddingHorizontal: theme.spacing.layout.horizontal.xl,
      paddingTop: theme.spacing.layout.vertical.xl,
      justifyContent: 'space-between',
    },
    actionsUpper: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    iconsWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.layout.horizontal.xl,
    },
    moreButton: {
      marginRight: theme.spacing.layout.horizontal.lg,
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'center',
    },
    tagsWrapper: {
      flexDirection: 'row',
      gap: theme.spacing.layout.horizontal.md,
      flexWrap: 'wrap',
    },
    infoWrapper: {
      gap: theme.spacing.layout.horizontal.xs,
      overflow: 'hidden',
    },
    tag: {
      paddingHorizontal: theme.spacing.layout.horizontal.md,
      paddingVertical: theme.spacing.layout.vertical.xs,
      overflow: 'hidden',
    },
    tagDark: {
      backgroundColor: theme.colors.main.primarySecondVariant,
      alignSelf: 'flex-start',
    },
    tagLight: {
      backgroundColor: theme.colors.main.primary,
      alignSelf: 'flex-start',
      maxWidth: 300,
    },
  });

  return styles;
};

export function NgoCard({ ngo }: NgoCardProps) {
  const styles = useThemedStyles(themedStyles);
  const { colors, fontSizes } = useTheme();
  const { navigate } = useNavigation<NativeStackNavigationProp<AuthenticatedStackParams>>();

  const address = `ul. ${ngo.address?.street}, ${ngo.address?.city ?? ''}`;

  const handleOpenLink = (link: string) => {
    Linking.openURL(link);
  };

  const handleNavigateNgoDetailsScreen = () => {
    navigate(NGO_DETAILS_SCREEN_NAME, { ngo });
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.card} onPress={handleNavigateNgoDetailsScreen}>
        <View style={styles.tagsWrapper}>
          {ngo.tags?.map(tag => (
            <View key={tag} style={[styles.tag, styles.tagDark]}>
              <Text color="warning" letterSpacing="wide" type="primaryBold" size="sm">
                {tag}
              </Text>
            </View>
          ))}
          {ngo.resources
            ?.filter(tag => tag !== 'Brak danych')
            .map(tag => (
              <View key={tag} style={[styles.tag, styles.tagLight]}>
                <Text color="warning" letterSpacing="wide" type="primaryBold" size="sm">
                  {tag}
                </Text>
              </View>
            ))}
        </View>
        <View style={styles.imageWrapper}>
          {ngo.logoUrl ? (
            <Image
              style={styles.image}
              source={{
                uri: ngo.logoUrl,
              }}
            />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
        </View>

        <View style={styles.infoWrapper}>
          <View>
            <Text color="onHoverPrimary" letterSpacing="wide" type="primaryBold" size="sm">
              {ngo.name}
            </Text>
          </View>
          <View>
            <Text color="onBackground" letterSpacing="wide" type="primaryBold" size="sm">
              {address}
            </Text>
          </View>
          {ngo.krs && (
            <View>
              <Text color="onBackgroundVariant" letterSpacing="wide" type="primaryBold" size="sm">
                KRS: {ngo.krs}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.actionsWrapper}>
        <View style={styles.actionsUpper}>
          <View style={styles.iconsWrapper}>
            <TouchableOpacity onPress={() => handleOpenLink(ngo.website)}>
              <AntDesign color={colors.text.onHoverPrimary} size={fontSizes.xxl} name="earth" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOpenLink(`mailto: ${ngo.email}`)}>
              <AntDesign color={colors.text.onHoverPrimary} size={fontSizes.xxxl} name="mail" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOpenLink(`tel: ${ngo.phone}`)}>
              <AntDesign color={colors.text.onHoverPrimary} size={fontSizes.xxxl} name="phone" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.moreButton} onPress={handleNavigateNgoDetailsScreen}>
            <Text type="primaryBold">WIĘCEJ</Text>
            <AntDesign name="doubleright" size={fontSizes.md} color={colors.text.onBackground} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
