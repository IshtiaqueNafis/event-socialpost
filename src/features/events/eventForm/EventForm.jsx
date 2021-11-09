import React, {useState} from 'react';
import {Button, Form, Header, Segment} from "semantic-ui-react";

const EventForm = ({setFormOpen, setEvents}) => {


    //region
    const initialValues = {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: '',
    }
  //endregion

    const [values, setValues] = useState(initialValues); // means this will be the inital values.

    //region methods handleFormSubmit(), handleInputChange(e)

    //region handleFormSubmit() --> submits the form
    const handleFormSubmit = () => {
        console.log(values)
    }
    //endregion

 //region  handleInputChange(e)==> sets what input change for the file
    const handleInputChange = (e) => {
        const {name, value} = e.target
        //name and value are being destrucutred here from event
        setValues({...values, [name]: value})
        //region
        // ... values --> means copy all the value s
        // [name]:value means set the value [name] lets it be dynamic
        //endregion

    }
    //endregion

//endregion

    return (
        <Segment clearing>
            <Header content={'Create new Event'}/>
            <Form>

                <Form.Field>
                    <input type="text"
                           placeholder="Event title"
                           name={'title'}
                           value={values.title}
                           onChange={(e) => handleInputChange(e)}/>
                </Form.Field>

                <Form.Field>
                    <input
                        type="text"
                        placeholder="Category"
                        name={'category'}
                        value={values.category}
                        onChange={e => handleInputChange(e)}/>
                </Form.Field>

                <Form.Field>
                    <input
                        type="text"
                        placeholder="Description"
                        name={'description'}
                        value={values.description}
                        onChange={e => handleInputChange(e)}/>
                </Form.Field>

                <Form.Field>
                    <input type="text"
                           placeholder="City"
                           name={'city'}
                           value={values.city}
                           onChange={e => handleInputChange(e)}/>
                </Form.Field>

                <Form.Field>
                    <input type="text"
                           placeholder="Venue"
                           name={'venue'}
                           value={values.venue}
                           onChange={e => handleInputChange(e)}/>
                </Form.Field>

                <Form.Field>
                    <input type="date"
                           placeholder="Date"
                           name={'date'}
                           value={values.date}
                           onChange={e => handleInputChange(e)}/>
                </Form.Field>
                <Button type="submit" floated={'right'} onClick={handleFormSubmit} positive content={'Submit'}/>
                <Button onClick={() => setFormOpen(false)} type="submit" floated={'right'} content={'Cancel'}/>
            </Form>
        </Segment>
    );
};

export default EventForm;
