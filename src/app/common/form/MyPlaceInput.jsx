import React from 'react';
import {useField} from "formik";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import {FormField, Label, List, Segment} from "semantic-ui-react";
import address from "address";

const MyPlaceInput = ({label, options, ...props}) => {
    // options will be used for specifying search.

    //region ***Field,meta,helpers from UseField ****
    const [field, meta, helpers] = useField(props);
    //field -- is for data
    // meta is for validation
    // helpsers set data
    //endregion


    //region ***handleSelect(address) ---> sets addres for the field of the form.***
    const handleSelect = address => {
        geocodeByAddress(address) // passed to googleMaps geocoder returns a promoise
            .then(results => getLatLng(results[0])) // returns latitude and altitude of the passed location comes as [0]
            .then(latLng => helpers.setValue({
                address,
                latLng
            })) // setvalue based on adress selected or lat and longrirude
            .catch(error => helpers.setError(error));
    };
    //endregion


    //region ***handleBlur=(e)*** event handler when a user leaves the field
    const handleBlur = (e) => {
        field.onBlur(e)
        if (!field.value.latLng) {
            helpers.setValue({address: '', latLng: ''})
        }
    }


    //endregion

    return (

        <PlacesAutocomplete
            value={field.value['address']} // address  helpers.setValue({address, latLng})) its coming from here.
            onChange={value => helpers.setValue({address: value})} // set the value based on what user chooses.
            onSelect={value => handleSelect(value)} //select the value passed
            searchOptions={options} // options coming from optins.
        >
            {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                //region ***getInputProps, suggestions, getSuggestionItemProps, loading***
                /*
                getInputProps(){} --->
                -is a function but also has property
                - it can be spread over on input and more data can be added.
                suggestions []
                --> returns an array from what comes from google when user types something
                can have the following proerites
                    {
                      active: false,
                      description: "San Francisco, CA, USA",
                      formattedSuggestion: { mainText: "San Francisco", secondaryText: "CA, USA" },
                      id: "1b9ea3c094d3ac23c9a3afa8cd4d8a41f05de50a",
                      index: 0,
                      matchedSubstrings: [ {length: 8, offset: 0} ],
                      placeId: "ChIJIQBpAG2ahYAR_6128GcTUEo",
                      terms: [
                        { offset: 0, value: "San Francisco" },
                        { offset: 15, value: "CA" },
                        { offset: 19, value: "USA" }
                      ],
                      types: ["locality", "political", "geocode"]
                    }

                    getSuggestionItemProps(){}
                    --> a function and object
                    -> spread over each suggestion item  in <PlacesAutocomplete>
                    -> optionally pass an object to pass other props to the element.

                loading:This is a boolean flag indicating whether or not the request is pending, or has completed
                 */
                //endregion


                <FormField error={meta.touched && !!meta.error}>
                    <label>{label}</label>
                    <input {...getInputProps({name: field.name, onBlur: e => handleBlur(e), ...props})}

                        //region
                        /*
                            field.name comes from field.value.
                            <input {...getInputProps({name: field.name, ...props})}
                            name: is the property for nameField.
                            spreading the ...getInputProps and passing other properties here.

                         */
                        //endregoion
                    />

                    {meta.touched && meta.error ? (<Label basic color={'red'}>{meta.error['address']}</Label>) : null}

                    {suggestions?.length > 0 && (
                        <Segment loading={loading}
                                 style={{marginTop: 0, position: 'absolute', zIndex: 1000, width: '100%'}}>
                            <List selection>
                                {suggestions.map(suggestion => (
                                    <List.Item key={suggestion.placeId} {...getSuggestionItemProps(suggestion)}
                                        // passing sugeestion item from here
                                    >

                                        <List.Header>
                                            {suggestion.formattedSuggestion.mainText}
                                            {/*    { mainText: "San Francisco", secondaryText: "CA, USA" }*/}
                                        </List.Header>
                                        <List.Description>
                                            {suggestion.formattedSuggestion.secondaryText}
                                            {/*    { mainText: "San Francisco", secondaryText: "CA, USA" }*/}


                                        </List.Description>
                                    </List.Item>
                                ))}

                            </List>
                        </Segment>
                    )}

                </FormField>
            )}

        </PlacesAutocomplete>

    )

};

export default MyPlaceInput;
