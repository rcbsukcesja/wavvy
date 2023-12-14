import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { format } from 'date-fns';
import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SecondaryButton } from 'src/components/button/variants/SecondaryButton.component';
import { Text } from 'src/components/text/Text.component';
import { AuthenticatedStackParams, EVENT_DETAILS_SCREEN_NAME } from 'src/navigation/types';
import { useCombinedStore } from 'src/store';
import { useTheme } from 'src/theme/hooks/useTheme';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

import { useLike } from '../hooks/useLike';
import { EventDTO } from '../types';

interface EventCardProps {
  event: EventDTO;
  scrollOffsetAnimatedValue: Animated.Value;
}

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderRadius: 48,
      backgroundColor: theme.colors.main.primaryLight,
    },
    image: {
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 48,
      borderTopRightRadius: 48,
    },
    imageWrapper: {
      flex: 0.7,
      position: 'relative',
    },
    actionsWrapper: {
      paddingHorizontal: theme.spacing.layout.horizontal.xl,
      paddingVertical: theme.spacing.layout.vertical.xl,
      flex: 0.3,
      justifyContent: 'space-between',
    },
    buttonWrapper: {
      width: '33%',
    },
    actionsUpper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    actionsLower: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    iconWrapper: {},
    moreButton: {
      marginRight: theme.spacing.layout.horizontal.lg,
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'center',
    },
    tagsWrapper: {
      position: 'absolute',
      top: theme.spacing.layout.vertical.xl,
      left: theme.spacing.layout.horizontal.xxl,
      flexDirection: 'row',
      gap: theme.spacing.layout.horizontal.md,
      flexWrap: 'wrap',
      maxWidth: '90%',
    },
    infoWrapper: {
      position: 'absolute',
      bottom: theme.spacing.layout.vertical.xl,
      right: theme.spacing.layout.horizontal.xl,
      gap: theme.spacing.layout.horizontal.md,
    },
    tag: {
      paddingHorizontal: theme.spacing.layout.horizontal.lg,
      paddingVertical: theme.spacing.layout.vertical.xs,
      overflow: 'hidden',
    },
    tagDark: {
      backgroundColor: theme.colors.main.primarySecondVariant,
    },
    tagLight: {
      backgroundColor: theme.colors.main.primary,
      alignSelf: 'flex-end',
      maxWidth: 300,
    },
    icon: {
      alignItems: 'center',
    },
  });

  return styles;
};

export function EventCard({ event, scrollOffsetAnimatedValue }: EventCardProps) {
  const styles = useThemedStyles(themedStyles);
  const { colors, fontSizes } = useTheme();
  const setModalState = useCombinedStore(state => state.setModalState);
  const userId = useCombinedStore(state => state.userId);
  const { isLiked, handleLikeEvent } = useLike(event.likes);
  const { navigate } = useNavigation<NativeStackNavigationProp<AuthenticatedStackParams>>();

  const formatedStartDate = format(new Date(event.startTime), 'dd.MM.yyyy, hh:mm');
  const formatedEndDate = format(new Date(event.endTime), 'dd.MM.yyyy, hh:mm');
  const address = `ul. ${event.address?.street ?? ''}, ${event.address?.city ?? ''}`;

  const inputRange = [0, 0.5, 0.99];
  const inputRangeOpacity = [0, 0.5, 0.99];

  const scale = scrollOffsetAnimatedValue.interpolate({
    inputRange,
    outputRange: [1, 0, 1],
  });

  const opacity = scrollOffsetAnimatedValue.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [1, 0, 1],
  });

  const handleOpenModal = () =>
    setModalState({
      message: `${event.cooperationMessage}\n\nWyślij email pod adres: ${event.organizer.email}`,
      visible: true,
      type: 'voluntaary',
      param: event.organizer.email,
    });

  const handleNavigateEventDetailsScreen = () => {
    navigate(EVENT_DETAILS_SCREEN_NAME, { event });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}>
      <TouchableOpacity style={styles.imageWrapper} onPress={handleNavigateEventDetailsScreen}>
        <Image
          style={styles.image}
          source={{
            uri: event.imageLink,
          }}
        />
        <View style={styles.tagsWrapper}>
          {event.tags.map(tag => (
            <View key={tag} style={[styles.tag, styles.tagDark]}>
              <Text color="warning" letterSpacing="wide" type="primaryBold">
                {tag}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.infoWrapper}>
          <View style={[styles.tag, styles.tagLight]}>
            <Text color="onPrimary" letterSpacing="wide" type="primaryBold">
              {event.name}
            </Text>
          </View>
          <View style={[styles.tag, styles.tagLight]}>
            <Text color="onPrimary" letterSpacing="wide" type="primaryBold">
              {event.organizer.name}
            </Text>
          </View>
          {event.address ? (
            <View style={[styles.tag, styles.tagLight]}>
              <Text color="onPrimary" letterSpacing="wide" type="primaryBold">
                {address}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
      <View style={styles.actionsWrapper}>
        <View style={styles.actionsUpper}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity style={styles.icon} onPress={() => handleLikeEvent(event.id, userId)}>
              <AntDesign name={isLiked ? 'heart' : 'hearto'} size={32} color={colors.main.primary} />
              {event.likes?.length ? (
                <Text type="primaryBold" color="onHoverPrimary">
                  {+event.likes.length}
                </Text>
              ) : (
                <Text type="primaryBold" color="onHoverPrimary">
                  0
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            {event.possibleVolunteer ? <SecondaryButton onPress={handleOpenModal} label="Wolontariat" /> : null}
          </View>
        </View>
        <View style={styles.actionsLower}>
          <View>
            <Text type="primaryBold">Od: {formatedStartDate}</Text>
            <Text type="primaryBold">Do: {formatedEndDate}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton} onPress={handleNavigateEventDetailsScreen}>
            <Text type="primaryBold">WIĘCEJ</Text>
            <AntDesign name="doubleright" size={fontSizes.md} color={colors.text.onBackground} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
