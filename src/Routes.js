import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import PageLoader from './components/Common/PageLoader';

//Authorized uses Base 
import Base from './components/Layout/Base';
//Unauthorized uses BasePage
import BasePage from './components/Layout/BasePage';




import SmsTemplatesRequested from './components/Pages/Admin/SmsTemplates/RequestedSmsTemplates';
import CustomerDetails from './components/Pages/Admin/Customers/CustomerDetails';
import MobileOperator from './components/Pages/Admin/Settings/MobileOperator';
import SmsLogs from './components/Pages/Admin/Settings/SmsLogs';
import CustomerList from './components/Pages/Admin/Customers/CustomerList';
import PostPaidCustomers from './components/Pages/Admin/Customers/PostPaidCustomers';
import Transactions from './components/Pages/Admin/Transactions/Transactions';
import Senders from './components/Pages/Admin/Senders/Senders';
import SendersRequested from './components/Pages/Admin/Senders/RequestedSenders';
import AddSenderId from './components/Pages/Admin/Senders/AddSenderId';
import AddSmsTemplate from './components/Pages/Admin/SmsTemplates/AddSmsTemplate';
import SmsTemplates from './components/Pages/Admin/SmsTemplates/SmsTemplates';
import Tariffs from "./components/Pages/Admin/Tariffs/Tariffs"
import AddTariffBand from './components/Pages/Admin/Tariffs/AddTariffBand';
import TarriffBand from './components/Pages/Admin/Tariffs/TariffBand';
import AddUser from './components/Pages/Admin/UserManagement/AddUser';
import UsersManagement from './components/Pages/Admin/UserManagement/UsersList';
import RestrictedWords from './components/Pages/Admin/Settings/RestrictedWords';
import ReservedNumbers from './components/Pages/Admin/Settings/ReservedNumbers';
import UserSenderIds from './components/Pages/Public/Senders/Senders';
import UserDashboard from './components/Pages/Public/Dashboard/UserDashboard';
import AddUserSenderId from './components/Pages/Public/Senders/AddSenderId';
import SendSmsCompose from './components/Pages/Public/Sms/SendSms';
import UserOutbox from "./components/Pages/Public/Sms/UserOutbox"
import UserScheduledSms from "./components/Pages/Public/Sms/UserScheduledSms"
import UserContactList from './components/Pages/Public/ContactList/UserContactlist';
import AddUserContactList from './components/Pages/Public/ContactList/AddUserContactlist';
import PurchaseSms from "./components/Pages/Public/PrePaid/PrePaidPurchaseSms"
import AddNormalUser from './components/Pages/Public/Users/AddUser';
import UserPage from './components/Pages/Public/Users/UserPage';
import PrePaidInvoiceList from './components/Pages/Public/PrePaid/PrePaidInvoiceList';
import UserRequestedSmsList from './components/Pages/Public/Sms/UserRequestedSmsList';
import AddUserRequestedSms from './components/Pages/Public/Sms/AddUserRequestedSms';
import PrePaidInvoice from "./components/Pages/Public/PrePaid/PrePaidInvoice";

import LandingPage from './components/Auth/landing';
import Invoices from './components/Pages/Admin/Transactions/Invoices';
import SingleUserPage from './components/Pages/Public/Users/SingleUserPage';
import EditAdminUser from './components/Pages/Admin/UserManagement/EditAdminUser';

const waitFor = Tag => props => <Tag {...props} />;

const Dashboard = lazy(() => import('./components/Pages/Admin/Dashboard/Dashboard'));
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));

const ViewContactList=lazy(()=>import("./components/Pages/Public/ContactList/ViewContactList"))

const listofPages = [
    '/login',
    '/register',
    '/'
];

const Routes = ({ location }) => {
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = { enter: 500, exit: 500 };

    const animationName = 'rag-fadeIn'

    if (listofPages.indexOf(location.pathname) > -1) {
        return (
            // Page Layout component wrapper
            <BasePage>
                <Suspense fallback={<PageLoader />}>
                    <Switch location={location}>
                        <Route path="/login" component={waitFor(Login)} />
                        <Route path="/register" component={waitFor(Register)} />
                        <Route path="/" component={waitFor(LandingPage)}/>
                    </Switch>
                </Suspense>
            </BasePage>
        )
    } else {
        return (
            <Base>
                <TransitionGroup>
                    <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
                        <div>
                            <Suspense fallback={<PageLoader />}>
                                <Switch location={location}>
                                    {/* <Route path="/dashboard" component={waitFor(Dashboard)}/> */}
                                    <Route path="/admin-dashboard" component={waitFor(Dashboard)} />

                                    <Route path="/admin-mobile-operators" component={waitFor(MobileOperator)} />
                                    <Route path="/admin-sms-log" component={waitFor(SmsLogs)} />

                                    <Route path="/admin-customers-list" component={waitFor(CustomerList)} />
                                    <Route path="/admin-customers-details/:id" component={waitFor(CustomerDetails)}/>
                                    <Route path="/admin-customers-postpaid" component={waitFor(PostPaidCustomers)} />
                                    <Route path="/admin-transactions" component={waitFor(Transactions)} />


                                    <Route path="/admin-add-senderid" component={waitFor(AddSenderId)} />
                                    <Route path="/admin-senders" component={waitFor(Senders)} />

                                   

                                    <Route path="/admin-add-sms-templates" component={waitFor(AddSmsTemplate)} />
                                    <Route path="/admin-senders-requested" component={waitFor(SendersRequested)} />
                                    <Route path="/admin-sms-requested-templates" component={waitFor(SmsTemplatesRequested)}/>
                                    <Route path="/admin-sms-templates" component={waitFor(SmsTemplates)} />
                                    <Route path="/admin-manage-tariffs" component={waitFor(Tariffs)} />
                                    <Route path="/admin-add-tariff-band" component={waitFor(AddTariffBand)} />
                                    <Route path="/admin-manage-tariff-bands/:id" component={waitFor(TarriffBand)} />


                                    <Route path="/admin-manage-edit-user/:id" component={waitFor(EditAdminUser)}/>
                                    <Route path="/admin-add-new-user" component={waitFor(AddUser)} />
                                    <Route path="/admin-manage-users" component={waitFor(UsersManagement)} />
                                    <Route path="/admin-restricted-words" component={waitFor(RestrictedWords)} />
                                    <Route path="/admin-reserved-numbers" component={waitFor(ReservedNumbers)} />
                                    <Route path="/admin-invoices/:id" component={waitFor(Invoices)} />


                                {/* User Roles -{type Prepaid & Post Paid}  */}

                                <Route path="/dashboard" component={waitFor(UserDashboard)}/>
                                <Route path="/senderId" component={waitFor(UserSenderIds)}/>
                                <Route path="/add-senderId" component={waitFor(AddUserSenderId)}/>


                                <Route path="/send-sms" component={waitFor(SendSmsCompose)}/>
                                <Route path="/outbox" component={waitFor(UserOutbox)}/>
                                <Route path="/scheduled-sms" component={waitFor(UserScheduledSms)}/>
                                <Route path="/contact-lists" component={waitFor(UserContactList)}/>
                                <Route path="/add-contact-list" component={waitFor(AddUserContactList)}/>

                                <Route path="/sms-purchase" component={waitFor(PurchaseSms)}/>


                                <Route path="/add-user" component={waitFor(AddNormalUser)}/>
                                <Route path="/manage-users" component={waitFor(UserPage)}/>
                                <Route path="/manage-user" component={waitFor(SingleUserPage)}/>
                                

                                <Route path="/prepaid-invoices" component={waitFor(PrePaidInvoiceList)}/>


                                <Route path="/sms-requests" component={waitFor(UserRequestedSmsList)}/>
                                <Route path="/add-sms-request" component={waitFor(AddUserRequestedSms)}/>
                                <Route path="/invoice/:id" component={waitFor(PrePaidInvoice)}/>

                                <Route path="/view-contactlist/:id" component={waitFor(ViewContactList)}/>
                                



                                {/*
                                <Route path="/summary-reports" component={waitFor(SmsSummaryReports)}/>
                                <Route path="/sender-reports" component={waitFor(SenderReports)}/>
                                */}

                                    <Redirect to="/dashboard" />
                                </Switch>
                            </Suspense>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Base>
        )
    }
}

export default withRouter(Routes);