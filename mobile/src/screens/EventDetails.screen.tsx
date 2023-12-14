import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { format } from 'date-fns';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Linking from 'expo-linking';
import { useMemo } from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
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
    },
    goBack: {
      position: 'absolute',
      top: theme.spacing.layout.vertical.xxl,
      left: theme.spacing.layout.horizontal.xl,
    },
    image: {
      flex: 0.5,
      resizeMode: 'cover',
      justifyContent: 'flex-end',
    },
    filter: {
      flex: 1,
      backgroundColor: '#0479CB',
      opacity: 0.4,
    },
    organizerContact: {
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
      maxHeight: Dimensions.get('window').height * 0.55,
      gap: theme.spacing.layout.horizontal.xl,
    },

    content: {
      justifyContent: 'space-between',
    },
    icon: {
      alignItems: 'center',
    },
  });

  return styles;
};

export function EventDetailsScreen({ route }: AuthenticatedStackScreenProps<'EventDetails'>) {
  const { event } = route.params;

  const { organizer, imageLink, name, description, address, startTime, endTime, links } = event;

  const styles = useThemedStyles(themedStyles);
  const { fontSizes, colors } = useTheme();

  const { goBack } = useNavigation<NativeStackNavigationProp<AuthenticatedStackParams>>();

  const formatedStartDate = format(new Date(startTime), 'dd.MM.yyyy, hh:mm');
  const formatedEndDate = format(new Date(endTime), 'dd.MM.yyyy, hh:mm');
  const fbLink = useMemo(() => organizer?.socialLinks?.find(link => link.includes('facebook')), []);
  const instagramLink = useMemo(() => organizer?.socialLinks?.find(link => link.includes('instagram')), []);
  const linkedInLink = useMemo(() => organizer?.socialLinks?.find(link => link.includes('linkedin')), []);

  const handleOpenLink = (link: string) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: imageLink }}
        style={styles.image}
        resizeMode="cover"
        resizeMethod="auto"
        imageStyle={{
          resizeMode: 'cover',
          alignSelf: 'flex-end',
        }}>
        <View style={styles.filter} />
      </ImageBackground>
      <View style={styles.goBack}>
        <TouchableOpacity onPress={goBack}>
          <AntDesign color={colors.main.accent} size={fontSizes['4xl']} name="left" />
        </TouchableOpacity>
      </View>
      <BottomSheet>
        <View style={styles.content} />
        <Text size="xl" type="primaryBold">
          {name}
        </Text>
        <ScrollView style={styles.descriptionWrapper}>
          <Text>{description}</Text>
        </ScrollView>
        <ScrollView style={styles.infoWrapper} contentContainerStyle={{ justifyContent: 'space-between', gap: 4 }}>
          <Text type="primaryBold">Gdzie i kiedy ?</Text>
          {address ? (
            <Text>
              ul. {address.street}, {address.zipCode} {address.city}
            </Text>
          ) : null}
          <Text>
            {formatedStartDate} - {formatedEndDate}
          </Text>

          <Text type="primaryBold">Organizator</Text>
          <Text>{organizer?.name}</Text>
          <TouchableOpacity onPress={() => handleOpenLink(`mailto:${organizer?.email}`)}>
            <Text>{organizer?.email}</Text>
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
            {organizer?.website ? (
              <TouchableOpacity onPress={() => handleOpenLink(organizer?.website)}>
                <AntDesign color={colors.main.primary} size={fontSizes.xxl} name="earth" />
              </TouchableOpacity>
            ) : null}
            {organizer?.phone ? (
              <TouchableOpacity onPress={() => handleOpenLink(`tel:${organizer?.phone}`)}>
                <AntDesign color={colors.main.primary} size={fontSizes.xxl} name="phone" />
              </TouchableOpacity>
            ) : null}
          </View>
          <Text type="primaryBold">Więcej info</Text>
          <View style={styles.links}>
            <TouchableOpacity onPress={() => handleOpenLink(links[0])}>
              <Text>{links[0]}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
}
