
# React-Imperative-Modal / Dialogs

Extremely lightweight imperative API for using react Modal/Dialog/Popover components.


## Installation

Install via npm or yarn

```bash
  npm install react-imperative-modal
```
    
## Usage/Examples

#### Example provided with material-ui dialog component use. However can be used with any library or custom dialog similarly.

```javascript
import DialogBuilder from 'react-imperative-modal'
import { Dialog } from "@mui/material";


interface MyConfirmDialogComponentProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

// Your component here
// Component should accept open and onClose props at the very least.
const MyConfirmDialogComponent = (props: MyConfirmDialogComponentProps) => {
    return <Dialog sx={{ p: 5 }}>
        Are you sure you want to do this action?
        <button onClick={onConfirm}>Confirm</button>
    </Dialog>
}

// Pass in your dialog component to the builder
// Note that props open and onClose are mandatory props that must be present for the dialog component that is passed in
// 'open' and 'onClose' are required because dialogbuilder intercepts these props and handles opening and closing actions 
const ConfirmDialog = new DialogBuilder<MyConfirmDialogComponentProps>()
                        .setComponent(MyConfirmDialogComponent)
                        .build();

function App() {

    const handleDialogOpen = () => {
        ConfirmDialog
            // pass in required props here
            // no need to pass 'open' since it is intercepted and removed
            .withProps((dialog) => ({
                onConfirm: async () => {
                    await deleteItem();
                    showDeleteSuccessNotification();
                    dialog.close();
                },
                onClose: () => console.log("closed");
            }))
            .open();
    }

    return  <div style={{ display: "flex" }}>
        <div>Item 1</div>
        <button onClick={handleDialogOpen}>Delete</button>
    </div>;
}
```


## API Reference

#### Instance creation
```javascript
    const dialog = new DialogBuilder<YourDialogComponentProps>()
        .setComponent(YourDialogComponent)
        .build();
```

#### Opening dialog

```javascript
    dialog.open();
```

#### Passing dialog component props

```javascript
    dialog.withProps((dialog) => {
        yourDialogComponentProp1: "prop1",
        yourDialogComponentProp2: "prop2",
        yourDialogComponentProp3: async () => {
            await doSomeAction();
            dialog.close();
        },
    });
```

#### Closing dialog

```javascript
    dialog.close();
```

#### Unmount dialog

```javascript
    dialog.unmount();
```




## License

[MIT](https://choosealicense.com/licenses/mit/)

