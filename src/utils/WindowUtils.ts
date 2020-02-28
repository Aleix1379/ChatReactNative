import {Dimensions} from 'react-native';

enum ScreenSize {
  Desktop = 500,
}

export abstract class WindowUtils {
  public static getWindowHeight(): number {
    return Dimensions.get('window').height;
  }

  public static isMobile(): boolean {
    return Dimensions.get('window').width < ScreenSize.Desktop;
  }

  public static isDesktop(): boolean {
    return Dimensions.get('window').width >= ScreenSize.Desktop;
  }
}
