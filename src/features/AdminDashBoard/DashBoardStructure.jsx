import React, { useEffect, useState } from 'react';
import {url} from "../../Link"

const DashBoardStructure = () => {
    // State to store customers
    const [customers, setCustomers] = useState([]);
    const [dataRes, setDataRes] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentObj, setPaymentObj] = useState({})
    const [viewingUsers, setViewingUsers] = useState(false);
    const [active, setActive] = useState(true)

    // State for payments
    const [payments, setPayments] = useState([]);
    const [loadingPayments, setLoadingPayments] = useState(false);
   // State for confirmation dialog for approval
    const [showApproveConfirm, setShowApproveConfirm] = useState(false);
    const [paymentToApprove, setPaymentToApprove] = useState(null);

    // State for delete confirmation dialog
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const customerId =sessionStorage.getItem("customerId")
    console.log(customerId)

    // State to store customers and withdrawals
    const [withdraws, setWithdraws] = useState([]);
    const [customerActiveState, setCustomerActiveState] = useState({});



    const handleActiveState = (customerId) => {
        alert(`Suspend customer ${customerId}`);
        setCustomerActiveState(prevState => ({
            ...prevState,
            [customerId]: !prevState[customerId] // Toggle active state for this specific customer
        }));
    };


    // State for withdraw approvals
    const [loadingWithdraws, setLoadingWithdraws] = useState(false);
    // const [showApproveConfirm, setShowApproveConfirm] = useState(false);
    const [withdrawToApprove, setWithdrawToApprove] = useState('');


    // Function to fetch customers
    const fetchCustomers = () => {
        setLoading(true);
        fetch(`${url}/api/v1/customer/getAllCustomers`)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }
                const res = response.json();
                setCustomers(await res);
                setLoading(false)
            })

            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    };

    console.log(dataRes, "data here")

    useEffect(()=> {
        fetchCustomers()
    }, [])

    // Function to fetch payments by email
    const fetchPayments = () => {
        setLoadingPayments(true);
        fetch(`http://localhost:8086/api/v1/customer/getAllCustomerByWalletId`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch payments');
                }
                return response.json();
            })
            .then(data => {
                // Assuming the data contains the payments array with status field
                const updatedPayments = data.map(payment => ({
                    ...payment,
                    status: payment?.amountToDeposit?.status === 'APPROVED' ? 'Approved' : 'Pending',
                }));
                setPayments(updatedPayments);
                setLoadingPayments(false);
            })
            .catch(error => {
                setError(error.message);
                setLoadingPayments(false);
            });
    };


    // Function to approve payment
    const approvePayment = (id) => {
        // Retrieve the ID from sessionStorage
        // const id = sessionStorage.getItem("amountToDeposit");

        // Log the ID to verify it's correctly retrieved


        // Check if the ID exists before proceeding
        if (!id) {
            console.error("No ID found in sessionStorage");
            setError("No ID found to approve payment.");
            return;
        }

        // If the ID exists, make the fetch request
        fetch(`http://localhost:8086/api/v1/customer/approveFund/${id}`, {
            method: 'POST',
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Failed to approve payment');
                }
                const res = await response.json();
                console.log("Payment response:", res);
                console.log(`Stored ID: ${id}`);
                setPaymentObj(res);

                // Refetch payments after approval
                fetchPayments();
                setShowApproveConfirm(false); // Hide approval confirmation modal
            })
            .catch(error => {
                console.error("Approval error:", error);
                setError(error.message);
            });
    };

    // Function to delete customer
    const deleteCustomer = (customerId) => {
        fetch(`http://localhost:8086/api/v1/customer/deleteCustomer/${customerId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete customer');
                }
                // Refetch customers after deletion
                fetchCustomers();
                setShowDeleteConfirm(false); // Hide delete confirmation modal
            })
            .catch(error => {
                setError(error.message);
            });
    };
    const fetchWithdraws = () => {
        setLoadingWithdraws(true);
        fetch(`http://localhost:8086/api/v1/customer/getAllCustomerByWalletId`)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch withdrawals');
                }
                const res = await response.json();
                const updatedWithdraws = res.map(withdraw => ({
                    ...withdraw,
                    status: withdraw?.amountToDeposit?.status === 'APPROVED' ? 'Approved' : 'Pending',
                }));
                setWithdraws(updatedWithdraws);
                setLoadingWithdraws(false);
            })
            .catch(error => {
                setError(error.message);
                setLoadingWithdraws(false);
            });
    };
    // Approve withdrawal
    const approveWithdraw = (id) => {
        fetch(`${url}/api/v1/customer/approveWalletFund/${id}`, { method: 'POST' })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Failed to approve withdrawal');
                }
                const res = await response.json();
                console.log("Withdraw response:", res);
                setWithdrawToApprove(null);
                fetchWithdraws(); // Refetch withdraws after approval
                setShowApproveConfirm(false); // Hide confirmation dialog
            })
            .catch(error => {
                console.error("Approval error:", error);
                setError(error.message);
            });
    };
    // Approve button click handler
    const handleApproveWithdrawClick = (withdraw) => {
        setWithdrawToApprove(withdraw);
        setShowApproveConfirm(true);
    };

    // Confirm approval
    const confirmApproval1 = () => {
        if (withdrawToApprove) {
            approveWithdraw(withdrawToApprove.id);
        }
    };

    // Cancel approval
    const cancelApproval1 = () => {
        setWithdrawToApprove(null);
        setShowApproveConfirm(false);
    };


    // Function to open the confirmation dialog for approving payment
    const handleApproveClick = (payment) => {
        setPaymentToApprove(payment); // Set the payment to approve
        setShowApproveConfirm(true); // Show approval confirmation dialog
    };

    // Function to handle delete button click
    const handleDeleteClick = (customer) => {
        setCustomerToDelete(customer); // Set the customer to delete
        setShowDeleteConfirm(true); // Show delete confirmation dialog
    };

    // Function to confirm approval
    const confirmApproval = () => {
        if (paymentToApprove) {
            approvePayment(paymentToApprove.id);
        }
    };

    // Function to confirm deletion
    const confirmCustomerDeletion = () => {
        if (customerToDelete) {
            deleteCustomer(customerToDelete.id);
        }
    };

    // Function to cancel approval
    const cancelApproval = () => {
        setPaymentToApprove(null); // Reset the payment to approve
        setShowApproveConfirm(false); // Hide approval confirmation dialog
    };

    // Function to cancel deletion
    const cancelCustomerDeletion = () => {
        setCustomerToDelete(null); // Reset the customer to delete
        setShowDeleteConfirm(false); // Hide delete confirmation dialog
    };

    // Handler for "View All Users" button click
    const handleViewUsersClick = () => {
        fetchCustomers();
        setViewingUsers(true); // Show the users section
    };
    useEffect(() => {
        fetchCustomers(); // Fetch customers on load
    }, []);

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <aside className="w-full lg:w-1/5 bg-gray-800 text-white p-4">
                <nav>
                    <ul>
                        <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">Dashboard</a></li>
                        <li>
                            <button
                                className="block py-2 px-4 hover:bg-gray-700 text-left w-full"
                                onClick={handleViewUsersClick} // Fetch and show all users on click
                            >
                                View All Users
                            </button>
                        </li>
                        <li>
                            <button
                                className="block py-2 px-4 hover:bg-gray-700 text-left w-full"
                                onClick={() => fetchPayments('customer@example.com')} // Fetch payments for a given customer
                            >
                                Deposits
                            </button>
                        </li>
                        <li>
                            <button
                                className="block py-2 px-4 hover:bg-gray-700 text-left w-full"
                                onClick={() => fetchWithdraws()}
                            >
                                Withdraws
                            </button>
                        </li>
                        <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">Settings</a></li>
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 bg-gray-100 p-4">
                <header className="mb-4">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                </header>

                {/* Conditional rendering for User Management Section */}
                {viewingUsers && (
                    <div className="bg-white shadow rounded-lg p-4 mb-4">
                        <h2 className="text-xl font-bold mb-4">User Management</h2>

                        {/* Refresh Users Button */}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
                            onClick={fetchCustomers} // Refresh users
                        >
                            Refresh Users
                        </button>

                        {/* Display Loading or Error State for Users */}
                        {loading && <p>Loading users...</p>}
                        {error && <p className="text-red-500">Error: {error}</p>}

                        {/* Users Table */}
                        {!loading && !error && customers.length > 0 && (
                            <table className="w-full table-auto">
                                <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">First Name</th>
                                    <th className="px-4 py-2">Last Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Active</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {customers.map(customer => {
                                    const isActive = customerActiveState[customer.id] !== false; // Default to true (active) if not set

                                    // const isActive = setActive(customer.active)
                                    return (
                                    <tr key={customer.id}>
                                        <td className="border px-4 py-2">{customer.id}</td>
                                        <td className="border px-4 py-2">{customer.firstName}</td>
                                        <td className="border px-4 py-2">{customer.lastName}</td>
                                        <td className="border px-4 py-2">{customer.email}</td>
                                        <td className="border px-4 py-2">{ active ? 'active' : 'Inactive'}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded mr-2"
                                                // Link to edit customer (replace with actual edit URL)
                                                onClick={() => alert(`Edit customer ${customer.id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-orange-500 hover:bg-orange-700 text-white px-2 py-1 rounded mr-2"
                                                onClick={() => handleDeleteClick(customer)} // Open delete confirmation dialog
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded"
                                                // Link to suspend customer (replace with actual suspend URL)
                                                onClick={() => handleActiveState(customer.id)}
                                            >
                                                {isActive ? 'Suspend' : 'Activate'}
                                                {/*Suspend*/}
                                            </button>
                                        </td>
                                    </tr>
                                )})}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {/* Payment Management Section */}
                <div className="bg-white shadow rounded-lg p-4 mb-4">
                    <h2 className="text-xl font-bold mb-4">Payment Management</h2>

                    {/* Refresh Payments Button */}
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
                        onClick={() => fetchPayments('customer@example.com')} // Replace with dynamic email input later
                    >
                        Refresh Payments
                    </button>

                    {/* Display Loading or Error State for Payments */}
                    {loadingPayments && <p>Loading payments...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}

                    {/* Payment Table */}
                    {!loadingPayments && !error && payments.length > 0 && (
                        <table className="w-full table-auto">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">ID</th>
                                {/*<th className="px-4 py-2">First Name</th>*/}
                                {/*<th className="px-4 py-2">Last Name</th>*/}
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Balance</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {payments.map(payment => (
                                <tr key={payment.id}>
                                    <td className="border px-4 py-2">{payment.id}</td>
                                    {/*<td className="border px-4 py-2">{payment.first_name}</td>*/}
                                    {/*<td className="border px-4 py-2">{payment.last_name}</td>*/}
                                    <td className="border px-4 py-2">{payment.amountToDeposit.amount}</td>
                                    <td className="border px-4 py-2">{payment.amountToDeposit.status}</td>
                                    <td className="border px-4 py-2">{payment.balance == null ? 0: payment.balance}</td>
                                    <td className="border px-4 py-2">
                                        {payment.status === "Pending" ? (
                                            <button
                                                className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                                                onClick={() => approvePayment(payment?.amountToDeposit.id) } // Open confirmation dialog for approval
                                            >
                                                Approve
                                            </button>
                                        ) : ''}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Approval Confirmation Dialog */}
                {showApproveConfirm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-lg font-bold mb-4">Do you want to approve this payment?</h3>
                            <p>{paymentToApprove && paymentToApprove.first_name} {paymentToApprove && paymentToApprove.last_name}</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
                                    onClick={confirmApproval} // Proceed with approval
                                >
                                    Yes
                                </button>
                                <button
                                    className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                                    onClick={cancelApproval} // Cancel approval
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Withdraws Table */}
                <div className="bg-white shadow rounded-lg p-4 mb-4">
                    <h2 className="text-xl font-bold mb-4">Withdraw Management</h2>

                    {/* Display Loading or Error State */}
                    {loadingWithdraws && <p>Loading withdraws...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}

                    {/* Withdraws Table */}
                    {!loadingWithdraws && !error && withdraws.length > 0 && (
                        <table className="w-full table-auto">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Wallet-Address</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Balance</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {withdraws.map(withdraw => (
                                <tr key={withdraw.id}>
                                    <td className="border px-4 py-2">{withdraw.amountToDeposit.id}</td>
                                    <td className="border px-4 py-2">{withdraw.amountToDeposit.customerWalletAddress}</td>
                                    <td className="border px-4 py-2">{withdraw.amountToDeposit.amount}</td>
                                    <td className="border px-4 py-2">{withdraw.amountToDeposit.status}</td>
                                    <td className="border px-4 py-2">{withdraw.balance == null ? 0: withdraw.balance}</td>
                                    <td className="border px-4 py-2">
                                        {withdraw.status === "Pending" && (
                                            <button
                                                className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                                                onClick={() => approveWithdraw(withdraw.amountToDeposit.id)}
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Approval Confirmation Dialog */}
                {showApproveConfirm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-lg font-bold mb-4">Do you want to approve this withdrawal?</h3>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
                                    onClick={confirmApproval1}
                                >
                                    Yes
                                </button>
                                <button
                                    className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                                    onClick={cancelApproval1}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Dialog */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this customer?</h3>
                            <p>{customerToDelete && `${customerToDelete.first_name} ${customerToDelete.last_name}`}</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2"
                                    onClick={confirmCustomerDeletion} // Proceed with deletion
                                >
                                    Yes
                                </button>
                                <button
                                    className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                                    onClick={cancelCustomerDeletion} // Cancel deletion
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DashBoardStructure;
