import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import Head from './Head'

const Customer = () => {
    const [customers, setCustomers] = useState("");
    const [getTotal, setGetTotal] = useState(0);

    const [errors, setError] = useState({ msg: "", e: false })

    const getCustomers = async () => {
        const { data } = await supabase.from("customers").select("*");
        setCustomers(data);
    }

    const getTotalCount = async () => {
        const { data } = await supabase.from("customers").select("*", { count: "exact" });
        setGetTotal(data.length)
    }

    const deleteCustomer = async (id) => {
        const { status } = await supabase.from("customers").delete().eq("id", id);
        if (status == 200) {
            setError({ msg: "Customer add Successfully", e: true });
            getCustomers()
            getTotalCount()
        } else {
            setError({ msg: "Some problem", e: false });

        }

    }

    useEffect(() => {
        getCustomers()
        getTotalCount()
    }, [])

    return (
        <>
            <Head />
            <div className="container">
                <div className="card my-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h3>Customer ({getTotal})</h3>
                        <button className="btn btn-success">
                            <Link to="/create-customer">Add Customer</Link>
                        </button>
                    </div>
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
                    <div className="card-body">
                        <div className="table-responsive">
                            {customers.length > 0 ? (
                                <>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Balance</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customers && customers.map((val) => {
                                                return (
                                                    <>
                                                        <tr key={val.id}>
                                                            <td>{val.id}</td>
                                                            <td>{val.name}</td>
                                                            <td>{val.email}</td>
                                                            <td>{val.balance}</td>
                                                            <td><Link to={`/update-customer/${val.id}`}><button className="btn btn-success">Edit</button></Link></td>
                                                            <td><button onClick={() => { deleteCustomer(val.id) }} className="btn btn-danger">Delete</button></td>
                                                        </tr>
                                                    </>

                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </>
                            ) : (
                                <h1>Record Not Found</h1>
                            )}

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Customer