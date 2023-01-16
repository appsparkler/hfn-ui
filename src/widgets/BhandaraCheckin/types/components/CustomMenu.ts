type ReturnVoid = () => void;

export interface CustomMenuDispatchProps {
  onRefreshApp?: ReturnVoid;
}

export interface CustomMenuStateProps {}

export type CustomMenuProps = CustomMenuDispatchProps & CustomMenuStateProps;
