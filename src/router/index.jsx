import Service from "../component/Service";
import About from "../component/About";
import FAQss from "../component/FAQss";
import Login from "../features/Auth/Login";
import Register from "../features/Auth/Register";
import AdminDashBoard2 from "../features/AdminDashBoard/AdminDashBoard2";
import CustomerDashboard from "../features/CustomerDashBoard/firstCustomerDashBoard/CustomerDashBoard";
import AdminLogin from "../features/Auth/AdminLogin/AdminLogin.jsx";
import NewDashbExport from "../features/CustomerDashBoard/newDashbExport";
import Home1 from "../features/Home1";
import Layout from "../component/Layout/index1";
import DepositPage from "../features/Deposit";
import WithdrawPage from "../features/Withdraw";
import ForgetPassword from "../features/Auth/ForgetPassword";
import Invest from "../features/Invest";
import EmailVerification from "../features/Auth/EmailVerification";
import ResetPassword from "../features/Auth/PasswordReset";
import WelcomeMessage from "../features/Auth/WelcomeMessage";

    export const Routes = [
    {
        path: "",
        element: <Layout/>,
        children: [
            {
                path: "/home",
                element: <Home1/>,

            },
        ]
    },
    {
        path: "/service",
        element: <Service/>,
    },
    {
        path: "/about",
        element: <About/>,
    },
    {
        path: "/FAQss",
        element: <FAQss/>,
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/sign-up",
        element: <Register/>,
    },
    {
        path: "/admin_dashboard",
        element: <AdminDashBoard2/>,
    },

    {
        path: "/customerDashboard",
        element: <CustomerDashboard/>
    },
    {
        path: "/admin",
        element: <AdminLogin/>
    },
    {
        path: "/customerDashboard2",
        element: <NewDashbExport/>
    },
    {
        path: "/deposit",
        element: <DepositPage/>
    },
    {
        path: "/withdraw",
        element: <WithdrawPage/>
    },
    {
        path: "/forget-password",
        element: <ForgetPassword/>
    },

    {
        path: "/invest",
        element: <Invest/>
    },
    {
        path: "/otp",
        element: <EmailVerification/>
    },
    {
        path: "/resetpassword",
        element: <ResetPassword/>
    },
    {
        path: "/wmessage",
        element: <WelcomeMessage/>
    },
]