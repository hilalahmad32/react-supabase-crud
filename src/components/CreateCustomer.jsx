import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Head from './Head'
import { supabase } from '../supabase'
const CreateCustomer = () => {

    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        balance: ""
    });

    const [errors, setError] = useState({ msg: "", e: false })

    const inputHandle = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setCustomer({ ...customer, [name]: value })
    }

    const save = async (e) => {
        e.preventDefault();
        const { name, email, balance } = customer;
        if (!name || !email || !balance) {
            setError({ msg: "Please fill the field" });
        } else {
            const data = {
                name, email, balance
            }
            const { status } = await supabase.from("customers").insert(data);
            if (status == 201) {
                setError({ msg: "Customer add Successfully", e: true });
                setCustomer({
                    name: "",
                    email: "",
                    balance: ""
                })
                navigate("/")
            } else {
                setError({ msg: "Some problem", e: true });
            }
        }
    }
    return (
        <>
            <Head />

            <div className="container my-4">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-0">
                        {errors.msg != "" ? (
                            <>
                                {errors.e ? (
                                    <>
                                        <div className="alert alert-success">
                                            <strong>{errors.msg}</strong>
                                        </div>
                                    </>
                                ) : (<>
                                    <div className="alert alert-danger">
                                        <strong>{errors.msg}</strong>
                                    </div>
                                </>)}
                            </>
                        ) : ("")}
                        <button className="btn btn-info">
                            <Link to="/">go Back</Link>
                        </button>
                        <div className="card">
                            <div className="card-header">
                                <h4>Create Customer</h4>
                            </div>
                            <div className="card-body">
                                <form action="" onSubmit={save}>
                                    <div className="my-2">
                                        <label htmlFor="">Enter you Name</label>
                                        <input type="text" name="name" onChange={inputHandle} value={customer.name} className="form-control-lg form-control" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="">Enter you Email</label>
                                        <input type="email" name="email" onChange={inputHandle} value={customer.email} className="form-control-lg form-control" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="">Enter you Balance</label>
                                        <input type="number" name="balance" onChange={inputHandle} value={customer.balance} className="form-control-lg form-control" />
                                    </div>
                                    <div className="my-2">
                                        <button className="btn btn-secondary" type="submit">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCustomer