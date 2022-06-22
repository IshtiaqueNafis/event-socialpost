import React from 'react';
import {useField, useFormikContext} from "formik";
import {FormField, Label} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

const MyDateInput = ({label, ...props}) => {
    const {setFieldValue} = useFormikContext(); // return all Formik state

    const [field, meta] = useField(props);
    return (
        <FormField error={meta.touched && !!meta.error}>
            {/* error={meta.touched && !!meta.error} --> meta.tpuched
        error --> error is the part FormField
        meta.touched --> checks whether or not forms has been touched or not
        !!meta.error --> error is going to be an object or a string, if there is a string in there it will be true if not will be fale.
  this error will be shown on the entire form field
        */}

            <label>{label}</label>
            <DatePicker
                /*datepicker is from react DatePicker*/
                {...props}
                /*spread the props */
                {...field}
                /*spread the fields */
                selected={(field.value && new Date(field.value)) || null}
                /*
                 selected={(field.value && new Date(field.value)) || null}
                 field.value && new Date(field.value) --> means field has a value and it can be converted to date.
                 or else it will be nuill

                 */
                onChange={value => setFieldValue(field.name, value)}
                /*    value=>setFieldValue(field.name,value)
                field.name comes from field.name
                name="date" which in this case is date.
                value is from the value.


                  */
            />


            {meta.touched && meta.error ?
                <Label basic color={'red'}>{meta.error}</Label> : null}
            {/*    This will show the error at the bottom  */}
        </FormField>
    );
};

export default MyDateInput;
