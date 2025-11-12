declare module 'expo-image' {
  import * as React from 'react';
    import type { ImageProps } from 'react-native';

  export interface ExpoImageProps extends ImageProps {
    source: any;
    placeholder?: string | React.ReactNode;
  }

  export const Image: React.ComponentType<ExpoImageProps>;
  export default Image;
}
