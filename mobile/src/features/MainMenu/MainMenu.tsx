import { useNavigation } from '@react-navigation/native';
import { AspectRatio, Box, Heading, Stack } from 'native-base';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { BUSINESS_CARDS_SCREEN_NAME } from 'src/screens/BusinessCards.screen';
import { EVENT_LIST_SCREEN_NAME } from 'src/screens/EventList.screen';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  likeIconWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  actionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const eventsImageUri =
  'https://images.unsplash.com/photo-1647767614484-0da59e7fc51b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80';
const businessCardsImageUri =
  'https://images.unsplash.com/photo-1617450365226-9bf28c04e130?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
const settingsImageUri =
  'https://images.unsplash.com/photo-1607027340690-37e80b0f1b31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80';

export function MainMenu() {
  const { navigate } = useNavigation();

  const handleShowEvents = () => {
    navigate(EVENT_LIST_SCREEN_NAME);
  };

  const handleShowBusinessCards = () => {
    navigate(BUSINESS_CARDS_SCREEN_NAME);
  };

  const handleShowSettings = () => {};

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: 'space-between', alignItems: 'center' }}
      style={styles.container}>
      <TouchableOpacity onPress={handleShowEvents}>
        <Box alignItems="center">
          <Box
            maxW="100%"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            m={4}
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'gray.700',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'gray.50',
            }}>
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                  source={{
                    uri: `${eventsImageUri}`,
                  }}
                  alt="events image"
                />
              </AspectRatio>
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  Sprawdź nadchodzące wydarzenia
                </Heading>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleShowBusinessCards}>
        <Box alignItems="center">
          <Box
            maxW="100%"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            m={4}
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'gray.700',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'gray.50',
            }}>
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                  source={{
                    uri: `${businessCardsImageUri}`,
                  }}
                  alt="ngos and business image"
                />
              </AspectRatio>
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  Poznaj NGOs & MŚP
                </Heading>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity>
        <Box alignItems="center">
          <Box
            maxW="100%"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            m={4}
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'gray.700',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'gray.50',
            }}>
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                  source={{
                    uri: `${settingsImageUri}`,
                  }}
                  alt="settings image"
                />
              </AspectRatio>
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  Ustawienia konta
                </Heading>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </TouchableOpacity>
    </ScrollView>
  );
}
