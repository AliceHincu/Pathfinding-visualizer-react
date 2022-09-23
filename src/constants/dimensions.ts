function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

export const SQUARE_SIZE = 25;
export const LEGEND_HEIGHT = 75;
export const windowDimensions = getWindowDimensions();
