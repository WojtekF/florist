interface IButtonProps {
    label: string;
    handleClick: (event: any) => void;
}

interface IVatEntry extends IEntry {
    Name: string;
    Value: number;
}
interface IEntry {
    Id: number,
    IsActive: boolean
}

interface IEditableEntry<IEntry> {
    entry: IEntry,
    isSelected: boolean
}

interface IVat extends IEditableEntry<IVatEntry> {
}

interface IVatsProps {
    vats: IVatEntry[]
}

interface IVatsState {
    toModify: IVatEntry,
    selectedRow: number
}

interface IVatDialogProps {
    entry: IVatEntry,
    isOpened: boolean,
    toggleVisibility: (boolean) => void,
    submitEntry: (entry: IVatEntry) => void
}

interface FormProps {
    isOpened: boolean
}

interface FormState {
    canSubmit: boolean
}

interface ITableProps<IRow extends IEntry> {
    rows: IRow[],
    isFetching: boolean,
    failure: boolean,
    loadData: () => void,
}

interface IVatTableProps extends ITableProps<IVatEntry> {
    dispatchEdit: (entry: IVatEntry) => void,
    dispatchAdd: () => void,
    dispatchDelete: (id: number) => void
}

interface IDispatchButtonProps {
    label: string,
    onClick: () => void,
    alignment: Alignment
}
declare const enum Alignment {
    None = 1,
    Right = 2,
    Left = 3
}

