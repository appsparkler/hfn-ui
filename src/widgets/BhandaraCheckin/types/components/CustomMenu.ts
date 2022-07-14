type ReturnVoid = () => void;

export interface CustomMenuDispatchProps {
  onClickOfflineData?: ReturnVoid;
  onClickDashboard?: ReturnVoid;
  onRefreshApp?: ReturnVoid;
}

export interface CustomMenuStateProps {}

export type CustomMenuProps = CustomMenuDispatchProps & CustomMenuStateProps;
