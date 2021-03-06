import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import PageLoader from '../components/Common/PageLoader';

//Authorized uses Base 
import Base from '../components/Layout/Base';
//Unauthorized uses BasePage
import BasePage from '../components/Layout/BasePage';




import MobileOperator from '../components/Pages/Admin/Settings/MobileOperator';
import AddUser from '../components/Pages/Admin/UserManagement/AddUser';
import UsersManagement from '../components/Pages/Admin/UserManagement/UsersList';
import RestrictedWords from '../components/Pages/Admin/Settings/RestrictedWords';
import ReservedNumbers from '../components/Pages/Admin/Settings/ReservedNumbers';
import UserSenderIds from '../components/Pages/Public/Senders/Senders';
import UserDashboard from '../components/Pages/Public/Dashboard/UserDashboard';
import SendSmsCompose from '../components/Pages/Public/Sms/SendSms';
import UserOutbox from "../components/Pages/Public/Sms/UserOutbox"
import UserScheduledSms from "../components/Pages/Public/Sms/UserScheduledSms"
import UserContactList from '../components/Pages/Public/ContactList/UserContactlist';
import AddUserContactList from '../components/Pages/Public/ContactList/AddUserContactlist';
import PurchaseSms from "../components/Pages/Public/PrePaid/PrePaidPurchaseSms"
import AddNormalUser from '../components/Pages/Public/Users/AddUser';
import UserPage from '../components/Pages/Public/Users/UserPage';
import PrePaidInvoiceList from '../components/Pages/Public/PrePaid/PrePaidInvoiceList';
import UserRequestedSmsList from '../components/Pages/Public/Sms/UserRequestedSmsList';
import AddUserRequestedSms from '../components/Pages/Public/Sms/AddUserRequestedSms';
import PrePaidInvoice from "../components/Pages/Public/PrePaid/PrePaidInvoice";

import LandingPage from '../components/Auth/landing';
import SingleUserPage from '../components/Pages/Public/Users/SingleUserPage';
import EditAdminUser from '../components/Pages/Admin/UserManagement/EditAdminUser';
import EditNormalUserPage from "../components/Pages/Public/Users/EditPage";
import ManageEmail from '../components/Pages/Admin/Settings/ManageEmail';
import ManageRole from '../components/Pages/Admin/Settings/ManageRole';
import ManageSmsc from '../components/Pages/Admin/Settings/ManageSmsc';
import EditSingleUserPage from '../components/Pages/Public/Users/EditSingleUserPage';
import UserSelfManagement from '../components/Pages/Admin/UserManagement/UserSelfManage';
import EditSelfManage from '../components/Pages/Admin/UserManagement/EditSelfManage';
import UserAccountExpiration from '../components/Pages/Admin/UserManagement/UserAccountExpiration';
import AllFarmers from '../components/Pages/Admin/Farmers/AllFarmers';
import FarmersHarvests from '../components/Pages/Admin/FarmerHarvests/FarmerHarvests';
import AdminWallet from '../components/Pages/Admin/Wallet/AdminWallet';
import UssdMenu from '../components/Pages/Admin/UssdMenu/UssdMenu';
import ManageCrop from '../components/Pages/Admin/SystemSetup/ManageCrop';
import ManageCropType from '../components/Pages/Admin/SystemSetup/ManageCropType';
import ManageRegion from '../components/Pages/Admin/SystemSetup/ManageRegion';
import ManageDistricts from '../components/Pages/Admin/SystemSetup/ManageDistricts';
import ManageWards from '../components/Pages/Admin/SystemSetup/ManageWards';
import ManageVillage from '../components/Pages/Admin/SystemSetup/ManageVillage';
import ManageCollectionCenter from '../components/Pages/Admin/SystemSetup/CollectionCenter/ManageCollectionCenter';
import AllRegistars from '../components/Pages/Admin/Registrars/AllRegistrars';
import ManageAmcosPrice from '../components/Pages/Admin/SystemSetup/ManageCropPrice';
import ManageCropPrice from '../components/Pages/Admin/SystemSetup/ManageCropPrice';
import AddFarmer from '../components/Pages/Admin/Farmers/AddFarmer';
import AddRegistar from '../components/Pages/Admin/Registrars/AddRegistar';
import AddUssdMenu from '../components/Pages/Admin/UssdMenu/AddUssdMenu';
import ManagePembejeo from '../components/Pages/Admin/SystemSetup/ManagePembejeo';
import ManageMCU from '../components/Pages/Admin/SystemSetup/ManageMCU';
import ManageAmcos from '../components/Pages/Admin/SystemSetup/Amcos/ManageAmcos';
import AddAmcos from '../components/Pages/Admin/SystemSetup/Amcos/AddAmcos';
import FarmerDetails from '../components/Pages/Admin/Farmers/FarmerDetails';
import AmcosDetails from '../components/Pages/Admin/SystemSetup/Amcos/AmcosDetails';
import EditRegistar from '../components/Pages/Admin/Registrars/EditRegistar';
import EditFarmer from '../components/Pages/Admin/Farmers/EditFarmer';
import AddVillage from '../components/Pages/Admin/SystemSetup/AddVillage';
import ManageAdvisoryServices from '../components/Pages/Admin/SystemSetup/ManageAdvisoryServices';
import EditAmcos from '../components/Pages/Admin/SystemSetup/Amcos/EditAmcos';
import AddCollectionCenter from '../components/Pages/Admin/SystemSetup/CollectionCenter/AddCollectionCenter';
import EditCollectionCenter from '../components/Pages/Admin/SystemSetup/CollectionCenter/EditCollectionCenter';
import EditUssdMenu from '../components/Pages/Admin/UssdMenu/EditUssdMenu';
import UssdDetails from '../components/Pages/Admin/UssdMenu/UssdDetails';
import AddUssdMenuData from '../components/Pages/Admin/UssdMenu/AddUssdMenuData';
import EditUssdMenuData from '../components/Pages/Admin/UssdMenu/EditUssdMenuData';

import ManageShops from '../components/Pages/Admin/Shop/ShopLists';
import ManageOrders from '../components/Pages/Admin/Orders/OrderList';
import ManageOrderDetails from '../components/Pages/Admin/Orders/OrderDetails';
import MakePayement from '../components/Pages/Admin/Wallet/MakePayment';
import ManageShopDetails from '../components/Pages/Admin/Shop/ShopDetails';
import PaymentBatches from '../components/Pages/Admin/Wallet/PaymentBatches';
import ManageUserType from '../components/Pages/Admin/Settings/ManageUserTypes';


const waitFor = Tag => props => <Tag {...props} />;

const Dashboard = lazy(() => import('../components/Pages/Admin/Dashboard/Dashboard'));
const Login = lazy(() => import('../components/Auth/Login'));
const TwoFaToken = lazy(() => import('../components/Auth/TwofaToken'));


const ViewContactList=lazy(()=>import("../components/Pages/Public/ContactList/ViewContactList"))

const listofPages = [
    '/login',
    '/register',
    '/otp-token',
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
                        <Route path="/otp-token" component={waitFor(TwoFaToken)} />
                        <Route path="/login" component={waitFor(Login)} />
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
                                    {/* Admin */}
                                    <Route path="/admin-dashboard" component={waitFor(Dashboard)} />

                                    <Route path="/admin-farmers-list" component={waitFor(AllFarmers)} />
                                    <Route path="/admin-farmer-details/:id" component={waitFor(FarmerDetails)}/>
                                    <Route path="/admin-add-farmer" component={waitFor(AddFarmer)} />
                                    <Route path="/admin-edit-farmer/:id" component={waitFor(EditFarmer)} />

                                    <Route path="/admin-farmers-harvests" component={waitFor(FarmersHarvests)}/>
                                    <Route path="/admin-mpesa-wallet" component={waitFor(AdminWallet)}/>

                                    <Route path="/admin-ussd-menu" component={waitFor(UssdMenu)}/>
                                    <Route path="/admin-add-ussdmenu" component={waitFor(AddUssdMenu)}/>
                                    <Route path="/admin-add-menu-data" component={waitFor(AddUssdMenuData)}/>
                                    <Route path="/admin-edit-menu-data" component={waitFor(EditUssdMenuData)}/>
                                    <Route path="/admin-edit-ussdmenu/:id" component={waitFor(EditUssdMenu)}/>
                                    <Route path="/admin-ussd-details/:id" component={waitFor(UssdDetails)}/>

                                    <Route path="/admin-manage-registars" component={waitFor(AllRegistars)}/>
                                    <Route path="/admin-add-registar" component={waitFor(AddRegistar)} />
                                    <Route path="/admin-edit-registar" component={waitFor(EditRegistar)} />
                                    <Route path="/admin-manage-users" component={waitFor(UsersManagement)} />
                                    <Route path="/admin-manage-shops" component={waitFor(ManageShops)} />
                                    <Route path="/admin-manage-orders" component={waitFor(ManageOrders)} />
                                    <Route path="/admin-shop-details/:id" component={waitFor(ManageShopDetails)} />

                                    <Route path="/admin-approve-payments" component={waitFor(PaymentBatches)} />


                                    {/* Mpesa Wallet */}
                                    <Route path="/admin-make-payment" component={waitFor(MakePayement)} />

                                    <Route path="/admin-manage-order/:id" component={waitFor(ManageOrderDetails)} />
                                    
                                   {/* System Setup */}
                                   <Route path="/admin-crops" component={waitFor(ManageCrop)}/>
                                   <Route path="/admin-crop-types" component={waitFor(ManageCropType)}/>
                                   <Route path="/admin-manage-regions" component={waitFor(ManageRegion)}/>
                                   <Route path="/admin-manage-districts" component={waitFor(ManageDistricts)}/>
                                   <Route path="/admin-manage-wards" component={waitFor(ManageWards)}/>

                                   <Route path="/admin-manage-villages" component={waitFor(ManageVillage)}/>
                                   <Route path="/admin-add-village" component={waitFor(AddVillage)}/>
                                   <Route path="/admin-edit-village/:id" component={waitFor(AddVillage)}/>

                                   <Route path="/admin-collection-centers" component={waitFor(ManageCollectionCenter)}/>
                                   <Route path="/admin-add-center" component={waitFor(AddCollectionCenter)}/>
                                   <Route path="/admin-edit-center/:id" component={waitFor(EditCollectionCenter)}/>
                                   <Route path="/admin-crop-price" component={waitFor(ManageCropPrice)}/>

                                   <Route path="/admin-agricultural-inputs" component={waitFor(ManagePembejeo)}/>
                                   <Route path="/admin-advisory-services" component={waitFor(ManageAdvisoryServices)}/>
                                   <Route path="/admin-manage-mcu" component={waitFor(ManageMCU)}/>

                                   <Route path="/admin-manage-amcos" component={waitFor(ManageAmcos)}/>
                                   <Route path="/admin-add-amcos" component={waitFor(AddAmcos)}/>
                                   <Route path="/admin-edit-amcos/:id" component={waitFor(EditAmcos)}/>
                                   <Route path="/admin-amcos-details/:id" component={waitFor(AmcosDetails)}/>


                                   {/* System Settings */}
                                   <Route path="/admin-manage-mail" component={waitFor(ManageEmail)}/>
                                    <Route path="/admin-manage-roles" component={waitFor(ManageRole)}/>
                                    <Route path="/admin-manage-usertypes" component={waitFor(ManageUserType)} />
                                    <Route path="/admin-manage-smsc" component={waitFor(ManageSmsc)}/>
                                    {/* <Route path="/admin-sms-log" component={waitFor(SmsLogs)} /> */}
                                    <Route path="/admin-mobile-operators" component={waitFor(MobileOperator)} />

                                    <Route path="/admin-manage-edit-user/:id" component={waitFor(EditAdminUser)}/>
                                    <Route path="/admin-add-new-user" component={waitFor(AddUser)} />
                                    <Route path="/admin-self-manage" component={waitFor(UserSelfManagement)} />
                                    <Route path="/admin-self-edit/:id" component={waitFor(EditSelfManage)}/>
                                    <Route path="/admin-restricted-words" component={waitFor(RestrictedWords)} />
                                    <Route path="/admin-reserved-numbers" component={waitFor(ReservedNumbers)} />
                                 
                                    <Route path="/admin-account-expiration" component={waitFor(UserAccountExpiration)}/>
                                    
                                    


                                {/* User Roles -{type Prepaid & Post Paid}  */}

                                <Route path="/dashboard" component={waitFor(UserDashboard)}/>
                                <Route path="/senderId" component={waitFor(UserSenderIds)}/>
                         


                                <Route path="/send-sms" component={waitFor(SendSmsCompose)}/>
                                <Route path="/outbox" component={waitFor(UserOutbox)}/>
                                <Route path="/scheduled-sms" component={waitFor(UserScheduledSms)}/>
                                <Route path="/contact-lists" component={waitFor(UserContactList)}/>
                                <Route path="/add-contact-list" component={waitFor(AddUserContactList)}/>

                                <Route path="/sms-purchase" component={waitFor(PurchaseSms)}/>


                                <Route path="/add-user" component={waitFor(AddNormalUser)}/>
                                <Route path="/edit-user" component={waitFor(EditNormalUserPage)}/>
                                <Route path="/manage-users" component={waitFor(UserPage)}/>
                                <Route path="/manage-user" component={waitFor(SingleUserPage)}/>
                                <Route path="/update-user/:id" component={waitFor(EditSingleUserPage)}/>
                                

                                <Route path="/prepaid-invoices" component={waitFor(PrePaidInvoiceList)}/>


                                <Route path="/sms-requests" component={waitFor(UserRequestedSmsList)}/>
                                <Route path="/add-sms-request" component={waitFor(AddUserRequestedSms)}/>
                                <Route path="/invoice/:id" component={waitFor(PrePaidInvoice)}/>

                                <Route path="/view-contactlist/:id" component={waitFor(ViewContactList)}/>
                                



                                {/*
                                <Route path="/summary-reports" component={waitFor(SmsSummaryReports)}/>
                                <Route path="/sender-reports" component={waitFor(SenderReports)}/>
                                */}

                                    {/* <Redirect to="/dashboard" /> */}
                                    <Redirect to="/login" />
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