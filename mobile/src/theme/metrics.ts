import { Dimensions } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const TABLET_WIDTH = 800;
const TABLET_HEIGHT = 1280;

const guidelineBaseWidth = TABLET_WIDTH;
const guidelineBaseHeight = TABLET_HEIGHT;

const horizontalScale = (size: number) => +((windowWidth / guidelineBaseWidth) * size).toFixed(2);
const verticalScale = (size: number) => +((windowHeight / guidelineBaseHeight) * size).toFixed(2);
const moderateScale = (size: number, factor = 0.5) => +(size + (horizontalScale(size) - size) * factor).toFixed(3);

export { horizontalScale, verticalScale, moderateScale, windowWidth, windowHeight, TABLET_WIDTH };
