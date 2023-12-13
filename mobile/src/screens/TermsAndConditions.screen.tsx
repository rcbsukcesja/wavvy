import { doc, setDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from 'firebaseConfig';
import { useToast } from 'native-base';
import { useEffect, useRef, useState } from 'react';
import { Animated, NativeScrollEvent, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from 'src/components/button/variants/PrimaryButton.component';
import { LineDivider } from 'src/components/line-divider/LineDivider';
import { Text } from 'src/components/text/Text.component';
import { useCombinedStore } from 'src/store';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';
import { setStorageItem } from 'src/utils/storage';

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.layout.horizontal.xl,
      paddingVertical: theme.spacing.layout.vertical.xl,
      backgroundColor: theme.colors.surface.background,
    },
    scroll: {
      paddingVertical: theme.spacing.layout.vertical.xl,
    },
    buttonWrapper: {
      marginTop: theme.spacing.layout.vertical.xl,
    },
    textWrapper: {
      marginTop: theme.spacing.layout.vertical.xl,
      gap: theme.spacing.layout.vertical.xl,
    },
  });

  return styles;
};

export function TermsAndConditionsScreen() {
  const [btnDisable, setBtnDisable] = useState(true);
  const setAppTerms = useCombinedStore(state => state.setAppTerms);
  const userId = useCombinedStore(state => state.userId);
  const appTerms = useCombinedStore(state => state.appTerms);
  const styles = useThemedStyles(themedStyles);
  const toast = useToast();

  const docRef = doc(FIRESTORE_DB, 'Users', userId);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) =>
    layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

  const fadeAnim = useRef(new Animated.Value(0.2)).current;

  const handleAccept = () => {
    setDoc(docRef, { consent: true })
      .then(() => {
        toast.show({
          description: 'Regulaminy zaakceptowane',
        });
        setStorageItem(`consent-${userId}`, true);
        setAppTerms(true);
      })
      .catch(() => {
        toast.show({
          description: 'Wystąpił błąd, spróbuj ponownie',
        });
      });
  };

  useEffect(() => {
    if (!btnDisable) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [btnDisable]);

  return (
    <SafeAreaView style={styles.container}>
      {!appTerms && (
        <>
          <Text color="onHoverPrimary" size="xxl">
            Regulamin aplikacji Wavvy i polityka prywatności
          </Text>
          <ScrollView
            scrollEventThrottle={16}
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                if (btnDisable) {
                  setBtnDisable(false);
                }
              }
            }}
            style={{ height: '80%' }}>
            <View style={styles.textWrapper}>
              <Text type="primaryBold" size="xl">
                Regulamin aplikacji
              </Text>
              <Text size="md2">
                Im baby ascot tofu synth polaroid Brooklyn praxis. Vegan meditation woke tbh tumblr subway tile.
                Blackbird spyplane before they sold out shabby chic, messenger bag poke ascot jianbing snackwave banjo
                shoreditch blue bottle. Lo-fi actually vinyl man braid, gentrify man bun distillery cred messenger bag
                shabby chic live-edge typewriter. Fit poutine VHS, vinyl marxism blog glossier. Ugh subway tile
                fingerstache small batch you probably have heard of them. Stumptown VHS iceland try-hard narwhal DIY
                succulents. IPhone flannel next level copper mug photo booth umami, crucifix mixtape celiac franzen.
                Live-edge shaman cronut fam, neutral milk hotel hot chicken blue bottle poke disrupt fashion axe
                gatekeep. Actually prism health goth before they sold out mustache godard. Vice vexillologist flannel
                selvage cliche humblebrag. Artisan vaporware pinterest tousled, you probably have heard of them narwhal
                XOXO intelligentsia jianbing.
              </Text>
              <LineDivider />
            </View>
            <View style={styles.textWrapper}>
              <Text type="primaryBold" size="xl">
                Polityka prywatności
              </Text>
              <Text size="md2">
                Im baby ascot tofu synth polaroid Brooklyn praxis. Vegan meditation woke tbh tumblr subway tile.
                Blackbird spyplane before they sold out shabby chic, messenger bag poke ascot jianbing snackwave banjo
                shoreditch blue bottle. Lo-fi actually vinyl man braid, gentrify man bun distillery cred messenger bag
                shabby chic live-edge typewriter. Fit poutine VHS, vinyl marxism blog glossier. Ugh subway tile
                fingerstache small batch you probably haven heard of them. Stumptown VHS iceland try-hard narwhal DIY
                succulents. IPhone flannel next level copper mug photo booth umami, crucifix mixtape celiac franzen.
                Live-edge shaman cronut fam, neutral milk hotel hot chicken blue bottle poke disrupt fashion axe
                gatekeep. Actually prism health goth before they sold out mustache godard. Vice vexillologist flannel
                selvage cliche humblebrag. Artisan vaporware pinterest tousled, you probably have heard of them narwhal
                XOXO intelligentsia jianbing.
              </Text>
            </View>
          </ScrollView>
          <Animated.View style={styles.buttonWrapper}>
            <PrimaryButton label="Akceptuję" onPress={handleAccept} disabled={btnDisable} />
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
}
