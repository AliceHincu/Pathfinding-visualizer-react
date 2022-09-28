function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const SQUARE_SIZE = 25;
export const LEGEND_HEIGHT = 75;
export const NAV_MENU_HEIGHT = 65;
const windowDimensions = getWindowDimensions();
export const HEIGHT = windowDimensions.height - NAV_MENU_HEIGHT - LEGEND_HEIGHT;
export const WIDTH = windowDimensions.width;