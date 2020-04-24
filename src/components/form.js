import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";


const formSchema = yup.object().shape({
    name: yup.string().required("Name is Required").min(2, "Minimum Length 2 Characters"),
    size: yup.string(),
    pepperoni: yup.string(),
    sausage: yup.string(),
    canadianbacon: yup.string(),
    italianSausage: yup.string(),
    special: yup.string()
})



function Form() {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [formState, setFormState] = useState({
        name: "",
        size: "",
        pepperoni: "",
        sausage: "",
        canadianbacon: "",
        italianSausage: "",
        special: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        size: "",
        pepperoni: "",
        sausage: "",
        canadianbacon: "",
        italianSausage: "",
        special: ""
    })

    const [post, setPost] = useState([])

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        })
    }, [formState])

    const formSubmit = e => {
        e.preventDefault();
        axios.post('https://reqres.in/api/users', formState)
            .then(res => {

                setPost([...post, res.data]);
                // console.log(post)}
                setFormState(formState)
            })


            .catch(err => {
                console.log("err")
            })

    }

    

    return (
        <>
            <Link to="/pizza"></Link>
            <form onSubmit={formSubmit}>
                <div className="name">
                    <div>
                        <label htmlFor="name">Name:    </label> <p>Required</p><br />
                    </div>
                    <input type="text" 
                    name="name"  
                    placeholder="Name" 
                    value={formState.name} 
                    onChange={inputChange} />

                    {errors.name}

                </div>
                <h2>Choice of Size</h2>
                <p>Required</p>
                <label>
                    <select id="size" name="size">
                        <option value="personal">Personal</option>
                        <option value="md">Medium</option>
                        <option value="lg">Larger</option>
                        <option value="xl">Extra Large</option>
                    </select>
                </label>
                <h2>Choose Your Toppings</h2>
                <span>Choose Up To 8</span><br />
                <label><input 
                type="checkbox" 
                name="pepperoni" 
                value={formState.pepperoni} 
                onChange={inputChange} 
                />Pepperoni</label>
                <label><input 
                type="checkbox" 
                name="sausage" 
                value={formState.sausage} 
                onChange={inputChange} 
                />Sausage</label>
                <label><input 
                type="checkbox" 
                name="canadianbacon" 
                value={formState.canadianbacon} 
                onChange={inputChange} 
                />Canadian Bacon</label>
                <label><input 
                type="checkbox" 
                name="italianSausage" 
                value={formState.italianSausage} 
                onChange={inputChange} 
                />Italian Sausage</label>




                <label><h2>Special Instructions</h2><input type="textarea" name="special" placeholder="Anything Else You'd Like To Add?" value={formState.special} onChange={inputChange} /></label>
                <div>{JSON.stringify(post, null, 2)}</div>
            
                
                <button className="submit" disabled={buttonDisabled}>Submit</button>
            </form>


        </>
    )
}

export default Form;