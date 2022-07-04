export interface OfflineDataItem {
  id: string;
  info: string;
}

export interface OfflineDataStateProps {
  data?: OfflineDataItem[];
}

export interface OfflineDataDispatchProps {
  onRefresh?: () => void;
}

export type OfflineDataProps = OfflineDataStateProps & OfflineDataDispatchProps;
