import { lazy, useMemo } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Fallback } from "./Fallback";
import Rules from "../pages/rules";
import { useAuth } from "../hooks/useAuth";
import BlockLists from "../pages/blockLists";
import VolumesShipped from "../pages/reporting/volumesShipped";

const Home = lazy(() => import("../pages/home"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const NotFount = lazy(() => import("../pages/notFound/NotFound"));
const ViewCampaigns = lazy(() => import("../pages/viewCampaigns"));
const CreatCampaigns = lazy(() => import("../pages/viewCampaigns/shards/creatCampaigns"));
const ViewDistributionList = lazy(() => import("../pages/viewDistributionList"));
const CreateDistributionList = lazy(() => import("../pages/viewDistributionList/shards/creatEndEditDistributionList"));
const ViewContactList = lazy(() => import("../pages/contact"));
const LangePageWts = lazy(() => import("../pages/langePageWts"));

const RoutesAll = (): JSX.Element => {
    const auth = useAuth();
    const getBasename = (path: any) => path.substr(0, path.lastIndexOf('/'));

    const routeEditCampaigns = auth?.editCampaigns && auth?.editCampaigns === true ? "/edit-campaigns" : "/create-campaigns"
    const routeEditDistributionList = auth?.editDistributionList && auth?.editDistributionList === true ? "/edit-distribution-list" : "/create-distribution-list"
    const url = useMemo(() => getBasename(window.location.pathname), [])
    return (
        <>
            <BrowserRouter basename={url}>
                <Routes>
                    <Route path="/">
                        <Route
                            index
                            path="login"
                            element={
                                <Fallback>
                                    <Home />
                                </Fallback>
                            }
                        />
                        <Route
                            path="/"
                            element={<Navigate to="/login" replace />}
                        />
                    </Route>
                    <Route
                        path="/langePageWts"
                        element={
                            <Fallback>
                                <LangePageWts />
                            </Fallback>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <Fallback>
                                <Dashboard />
                            </Fallback>
                        }
                    />
                    <Route
                        path="/view-campaigns"
                        element={
                            <Fallback>
                                <ViewCampaigns />
                            </Fallback>
                        }
                    />
                    <Route
                        path={`${routeEditCampaigns}`}
                        element={
                            <Fallback>
                                <CreatCampaigns />
                            </Fallback>
                        }
                    />
                    <Route
                        path="/volumes-shipped"
                        element={
                            <Fallback>
                                <VolumesShipped />
                            </Fallback>
                        }
                    />
                    <Route
                        path="/rules"
                        element={
                            <Fallback>
                                <Rules />
                            </Fallback>
                        }
                    />
                    <Route
                        path="/blacklists"
                        element={
                            <Fallback>
                                <BlockLists />
                            </Fallback>
                        }
                    />
                    <Route
                        path="/distribution-list"
                        element={
                            <Fallback>
                                <ViewDistributionList />
                            </Fallback>
                        }
                    />
                    <Route
                        path={`${routeEditDistributionList}`}
                        element={
                            <Fallback>
                                <CreateDistributionList />
                            </Fallback>
                        }
                    />
                    <Route
                        path="/contact-list"
                        element={
                            <Fallback>
                                <ViewContactList />
                            </Fallback>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Fallback>
                                <NotFount />
                            </Fallback>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default RoutesAll;
