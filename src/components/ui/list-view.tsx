import { LegendList } from '@legendapp/list';
import { forwardRef } from 'react';
import { FlatList } from 'react-native';

import { isRTL } from '@/lib/i18n';

import type { LegendListProps, LegendListRef } from '@legendapp/list';
import type {
  ForwardedRef,
  PropsWithoutRef,
  ReactElement,
  RefObject,
} from 'react';
import type { FlatListProps } from 'react-native';

export type ListViewRef = LegendListRef;

export type ListViewProps<T> = PropsWithoutRef<LegendListProps<T>>;

/**
 * This is a Higher Order Component meant to ease the pain of using @legendapp/list
 * when there is a chance that a user would have their device language set to an
 * RTL language like Arabic or Persian. This component will use react-native's
 * FlatList if the user's language is RTL or LegendList if the user's language is LTR.
 *
 * Because LegendList's props are a superset of FlatList's, you must pass estimatedItemSize
 * to this component if you want to use it.
 *
 * This is a temporary workaround until the LegendList component supports RTL at
 * which point this component can be removed and we will default to using LegendList everywhere.
 * @see {@link https://github.com/LegendApp/legend-list|Legend List GitHub}
 * @param {LegendListProps | FlatListProps} props - The props for the `ListView` component.
 * @param {RefObject<ListViewRef>} forwardRef - An optional forwarded ref.
 * @returns {JSX.Element} The rendered `ListView` component.
 */
const ListViewComponent = forwardRef(
  <T,>(props: ListViewProps<T>, ref: ForwardedRef<ListViewRef>) => {
    if (isRTL) {
      return (
        <FlatList
          {...(props as unknown as FlatListProps<T>)}
          ref={ref as unknown as RefObject<FlatList<T>>}
        />
      );
    }
    return <LegendList {...props} ref={ref} />;
  },
);

ListViewComponent.displayName = 'ListView';

export const ListView = ListViewComponent as <T>(
  props: ListViewProps<T> & {
    ref?: RefObject<ListViewRef>;
  },
) => ReactElement;
