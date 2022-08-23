import ReactDOM from 'react-dom/client';

type ComponentType<T> = (props: T & Required<BaseProps>) => React.ReactElement;

export interface BaseProps {
  open: boolean;
  onClose: () => void;
}

export interface IDialogBuilder<T> {
  component?: ComponentType<T>;
}

class Dialog<T> {
  component?: ComponentType<T>;
  props: T = {} as T;
  viewRoot?: ReactDOM.Root;

  constructor(dialogBuilder: IDialogBuilder<T>) {
    this.component = dialogBuilder.component;
  }

  private createView() {
    this.viewRoot = ReactDOM.createRoot(
      document.createElement('dialog-imperative-root') as HTMLElement
    );
  }

  close() {
    if (this.component && this.viewRoot) {
      this.viewRoot.render(
        this.component({
          ...this.props,
          open: false,
          onClose: () => ({}),
        })
      );
    }
  }

  withProps(props: (t: Dialog<T>) => Omit<T, 'open'>) {
    this.props = props(this) as T;
    return this;
  }

  open() {
    if (!this.viewRoot) {
      this.createView();
    }
    if (this.component && this.viewRoot) {
      this.viewRoot.render(
        this.component({
          ...this.props,
          open: true,
          onClose: () => {
            this.close();
            if ('onClose' in this.props) {
              (this.props as T & { onClose: () => void }).onClose();
            }
          },
        })
      );
    }
  }

  unmount() {
    if (this.viewRoot) {
      this.viewRoot.unmount();
    }
    const containerNode = document.getElementById("dialog-imperative-root");
    if (containerNode) {
      containerNode.remove();
    }
  }
}

export class DialogBuilder<T> implements IDialogBuilder<T> {
  component?: ComponentType<T>;
  setComponent(component: ComponentType<T>) {
    this.component = component;
    return this;
  }

  build() {
    if (!this.component) {
      throw new Error(
        "Error React-Imperative-Dialog: 'setComponent' props needs to be passed!"
      );
    }
    return new Dialog(this);
  }
}
