import React from 'react';
import {useField} from "formik";
import {FormField, Label, Select} from "semantic-ui-react";

const MySelectInput = ({label, ...props}) => { //region ***Field,Meta from UseField ****
    const [field, meta, helpers] = useField(props);
    //endregion
    return (
        <div>
            <FormField error={meta.touched && !!meta.error}>
                {/* error={meta.touched && !!meta.error} --> meta.tpuched
        error --> error is the part FormField
        meta.touched --> checks whether or not forms has been touched or not
        !!meta.error --> error is going to be an object or a string, if there is a string in there it will be true if not will be fale.
  this error will be shown on the entire form field
        */}

                <label>{label}</label>
                <Select
                    clearable
                    value={field.value || null}
                    onChange={(e, d) => helpers.setValue(d.value)}
                    // (e,d) ==> e is for event, d is for dropdown tiems

                    onBlur={() => helpers.setTouched(true)} //removes keyboard focus from the current element
                    {...props}

                />
                {meta.touched && meta.error ?
                    <Label basic color={'red'}>{meta.error}</Label> : null}
                {/*    This will show the error at the bottom  */}
            </FormField>
        </div>
    );
};

export default MySelectInput;
