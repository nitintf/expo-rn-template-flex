import { Linking } from 'react-native';

/**
 * Helper for opening a give URL in an external browser.
 */
export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url)
    .then((canOpen) => canOpen && Linking.openURL(url))
    .catch((error: unknown) => {
      console.error('Error opening link in browser:', error);
    });
}
