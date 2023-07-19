import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { AspectRatio, Box, Button, Center, HStack, Heading, Icon, IconButton, Stack, Text } from 'native-base';
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useMutation } from 'react-query';
import { ENDPOINTS } from 'src/API';
import { VolunteeringSignup } from 'src/features/Volunteering/VolunteeringSignup';
import { useCombinedStore } from 'src/store';

interface EventCardProps {
  id: number;
  imageUri: string;
  imageAlt: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  likesCount: number;
}

const styles = StyleSheet.create({
  cta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  likeIconWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  actionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  fontBold: {
    fontFamily: 'Poppins-Bold',
  },
  fontRegular: {
    fontFamily: 'Poppins-Regular',
  },
});

export function EventCard({ id, imageUri, imageAlt, title, description, date, tag, likesCount }: EventCardProps) {
  const [likes, setLikes] = useState(() => likesCount);

  const showForm = useCombinedStore(state => state.showForm);
  const isVisible = useCombinedStore(state => state.isVisible);
  const likesCountMutation = useMutation({
    mutationFn: () => axios.patch(`${ENDPOINTS.events}/${id}`, { likesCount: likesCount + 1 }),
  });

  const handleOpenVolunteeringSignup = () => {
    showForm();
  };

  return (
    <>
      <Box alignItems="center">
        <Box
          maxW="350"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          mr={4}
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
                  uri: `${imageUri}`,
                }}
                alt={imageAlt}
              />
            </AspectRatio>
            <Center
              bg="violet.500"
              _dark={{
                bg: 'violet.400',
              }}
              _text={{
                color: 'warmGray.50',
                fontWeight: '700',
                fontSize: 'xs',
              }}
              position="absolute"
              fontFamily="Poppins-Bold"
              bottom="0"
              px="3"
              py="1.5">
              {`#${tag}`}
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1" fontFamily="Poppins-Bold">
                {title}
              </Heading>
            </Stack>
            <Text fontWeight="400" fontFamily="Poppins-Regular">
              {description}
            </Text>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontWeight="700"
                  fontFamily="Poppins-Bold">
                  Kiedy ? {date}
                </Text>
              </HStack>
            </HStack>
          </Stack>
          <Stack p="4" space={3}>
            <View style={styles.cta}>
              <View style={styles.actionsWrapper}>
                <Button
                  _text={{ fontFamily: 'Poppins-Bold' }}
                  size="md"
                  variant="solid"
                  mr={4}
                  backgroundColor="violet.600">
                  Wspomóż
                </Button>
                <Button
                  _text={{ fontFamily: 'Poppins-Bold' }}
                  size="md"
                  variant="solid"
                  backgroundColor="amber.600"
                  onPress={handleOpenVolunteeringSignup}>
                  Wolontariat
                </Button>
              </View>
              <View style={styles.likeIconWrapper}>
                <IconButton
                  icon={<Icon as={Entypo} name="emoji-happy" />}
                  borderRadius="full"
                  _icon={{
                    color: 'violet.500',
                    size: 'xl',
                  }}
                  _hover={{
                    bg: 'violet.600:alpha.20',
                  }}
                  _pressed={{
                    bg: 'violet.600:alpha.20',
                    _icon: {
                      name: 'emoji-flirt',
                    },
                    _ios: {
                      _icon: {
                        size: '2xl',
                      },
                    },
                  }}
                  _ios={{
                    _icon: {
                      size: '2xl',
                    },
                  }}
                  onPress={() => {
                    setLikes(likes + 1);
                    return likesCountMutation.mutate();
                  }}
                />
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontFamily="Poppins-Bold"
                  fontWeight="700">
                  {likes}
                </Text>
              </View>
            </View>
          </Stack>
        </Box>
      </Box>

      <VolunteeringSignup isVisible={isVisible} />
    </>
  );
}
