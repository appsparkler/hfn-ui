type ReturnVoid = () => void;

export interface CustomMenuDispatchProps {
  onRefreshApp?: ReturnVoid;
  onClickDashboard?: ReturnVoid;
}

export interface CustomMenuStateProps {}

export type CustomMenuProps = CustomMenuDispatchProps & CustomMenuStateProps;
