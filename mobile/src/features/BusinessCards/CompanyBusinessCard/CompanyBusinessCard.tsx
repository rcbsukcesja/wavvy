import { AspectRatio, Box, Center, Heading, Stack, Text } from 'native-base';
import { Image, Linking, StyleSheet, View } from 'react-native';
import { PressableIcon } from 'src/components/PressableIcon';

import { Company } from '../types';

type CompanyBusinessCardProps = Partial<Company>;

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
  linksWrapper: {
    flexDirection: 'row',
  },
});

export function CompanyBusinessCard({
  logoUrl,
  name,
  address,
  description,
  phone,
  email,
  website,
  socialLinks,
  businessAreas,
}: CompanyBusinessCardProps) {
  return (
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
                uri: `${logoUrl}`,
              }}
              alt={name}
            />
          </AspectRatio>
          {businessAreas
            ? businessAreas.map(tag => (
                <Center
                  key={tag.id}
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
                  bottom="0"
                  px="3"
                  py="1.5">
                  {tag.name}
                </Center>
              ))
            : null}
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {name}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: 'violet.500',
              }}
              _dark={{
                color: 'violet.400',
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              {address}
            </Text>
          </Stack>
          <Text fontWeight="400">{description}</Text>
          <Text fontWeight="400">{website}</Text>
          <View style={styles.linksWrapper}>
            {socialLinks
              ? socialLinks.map(link => (
                  <PressableIcon
                    key={link}
                    name="facebook-with-circle"
                    size={24}
                    color="#424242"
                    handleOnPress={() => Linking.openURL(link)}
                  />
                ))
              : null}
          </View>
        </Stack>
        <Stack p="4" space={3}>
          <View style={styles.cta}>
            <View style={styles.actionsWrapper}>
              <PressableIcon
                name="old-phone"
                size={36}
                color="#424242"
                handleOnPress={() => Linking.openURL(`tel:${phone}`)}
              />
              <PressableIcon
                name="mail"
                size={36}
                color="#424242"
                handleOnPress={() => Linking.openURL(`mailto:${email}`)}
              />
            </View>
          </View>
        </Stack>
      </Box>
    </Box>
  );
}
