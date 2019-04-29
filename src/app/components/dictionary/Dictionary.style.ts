import {CSSProperties} from "react";

const AddCategoryButton: CSSProperties = {
    border: '2px solid #dadfe6',
    color: '#2a2a2a',
    backgroundColor: 'transparent',
    padding: '5px 15px',
    borderRadius: '5px',
    fontWeight: 600,
    outline: 'none'
};

const CategoryItemContainer: CSSProperties = {
    padding: '20px',
    border: '1px solid #ebeef2',
    borderRadius: '5px',
    position: 'relative',
    boxShadow: '3px 3px 0 0 rgba(235,238,242,.4)',
    marginBottom: '20px'
};

const CategoryItemHeader: CSSProperties = {
    borderBottom: '1px solid #ebeef2'
};

const CategoryItemBody: CSSProperties = {
    padding: '10px 0'
};

export const DictionaryStyles = {
    AddCategoryButton: AddCategoryButton,
    CategoryItemContainer: CategoryItemContainer,
    CategoryItemHeader: CategoryItemHeader,
    CategoryItemBody: CategoryItemBody
};
