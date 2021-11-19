import React, { useState } from "react";
import { Box } from "@mui/system";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Tab, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import {
    CHEMIST,
    CHEMIST_SIGNIN_URL,
    CHEMIST_SIGNUP_URL,
    USER,
    USER_SIGNIN_URL,
    USER_SIGNUP_URL,
} from "../utils";
import { useHistory, Redirect } from "react-router-dom";
import { setUser, signOut } from "../store/user";
import axios from "axios";
import { ArrowBackIos } from "@mui/icons-material";

const SignUp = () => {
    const type = useSelector((state) => state.user.type);
    const user = useSelector((state) => state.user.user);
    const [displayName, setdisplayName] = useState("");
    const [pharmaName, setpharmaName] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");

    const [loading, setLoading] = useState(false);
    const [currentTab, setCurrentTab] = useState("SIGNUP");

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSignInUser = () => {
        setLoading(true);
        axios
            .post(
                USER_SIGNIN_URL,
                {
                    user_name: displayName.toString(),
                    password: password.toString(),
                },
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            )
            .then((res) => {
                console.log(res);
                if (res.data["signedIn"]) {
                    dispatch(setUser(res.data["token"]));
                    setLoading(false);
                    history.push("/home");
                } else {
                    alert(res.data["err"] || res.data["sqlMessage"]);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };
    const handleSignInChemist = () => {
        setLoading(true);
        axios
            .post(
                CHEMIST_SIGNIN_URL,
                {
                    user_name: displayName.toString(),
                    password: password.toString(),
                },
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            )
            .then((res) => {
                console.log(res);
                if (res.data["signedIn"]) {
                    dispatch(setUser(res.data["token"]));
                    setLoading(false);
                    history.push("/home");
                } else {
                    alert(res.data["err"] || res.data["sqlMessage"]);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };
    const handleSignUpUser = () => {
        setLoading(true);
        axios
            .post(
                USER_SIGNUP_URL,
                {
                    user_name: displayName.toString(),
                    password: password.toString(),
                },
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            )
            .then((res) => {
                console.log(res);
                if (res.data["signedUp"]) {
                    dispatch(setUser(res.data["token"]));
                    setLoading(false);
                    history.push("/home");
                } else {
                    alert(res.data["error"] || res.data["sqlMessage"]);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };
    const handleSignUpChemist = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLoading(true);
            axios
                .post(
                    CHEMIST_SIGNUP_URL,
                    {
                        user_name: displayName.toString(),
                        password: password.toString(),
                        name: pharmaName.toString(),
                        address: address.toString(),
                        contact_no: contact.toString(),
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    },
                    {
                        headers: {
                            "content-type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    if (res.data["signedUp"]) {
                        dispatch(setUser(res.data["token"]));
                        history.push("/home");
                    } else {
                        alert(res.data["error"] || res.data["sqlMessage"]);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        });
    };

    if (user) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Button
                    sx={{ height: "200px" }}
                    variant="contained"
                    onClick={() => {
                        dispatch(signOut());
                        history.replace("/");
                    }}
                >
                    Sign out
                </Button>
            </Box>
        );
    } else if (!user && !type) {
        return <Redirect to="/" />;
    } else {
        return (
            <Box sx={{ width: "100%" }} >
                <TabContext value={currentTab}>
                    <Box>
                        <TabList
                            onChange={(e, v) => {
                                setCurrentTab(v);
                            }}
                            centered
                        >
                            <Tab label="Sign Up" value={"SIGNUP"} />
                            <Tab label="Sign In" value={"SIGNIN"} />
                        </TabList>
                    </Box>
                    <TabPanel
                        value={"SIGNUP"}
                    >
                        <Box sx={{ display: "flex", flexDirection: 'column' }}>
                            <TextField
                                variant="outlined"
                                placeholder="UserName"
                                onChange={(e) => {
                                    setdisplayName(e.target.value);
                                }}
                                style={{ margin: "20px" }}
                            />
                            <TextField
                                variant="outlined"
                                placeholder="Password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                style={{ margin: "20px" }}
                            />
                            {type === CHEMIST && (
                                <>
                                    <TextField
                                        variant="outlined"
                                        placeholder="Shop Name"
                                        onChange={(e) => {
                                            setpharmaName(e.target.value);
                                        }}
                                        style={{ margin: "20px" }}
                                    />
                                    <TextField
                                        variant="outlined"
                                        placeholder="Address"
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                        }}
                                        style={{ margin: "20px" }}
                                    />
                                    <TextField
                                        variant="outlined"
                                        placeholder="Contact"
                                        onChange={(e) => {
                                            setContact(e.target.value);
                                        }}
                                        style={{ margin: "20px" }}
                                    />
                                </>
                            )}
                            <LoadingButton
                                loading={loading}
                                variant="contained"
                                onClick={type === USER ? handleSignUpUser : handleSignUpChemist}
                                style={{ margin: "20px" }}
                            >
                                SIGN UP
                            </LoadingButton>
                            <Button
                                variant="contained"
                                onClick={() => { history.replace("/") }}
                                style={{ margin: "20px" }}
                                startIcon={<ArrowBackIos/>}
                            >
                                Back to Select Role
                            </Button>
                        </Box>
                    </TabPanel>
                    <TabPanel
                        value={"SIGNIN"}
                    >
                        <Box sx={{ display: "flex", flexDirection: 'column' }}>
                            <TextField
                                variant="outlined"
                                placeholder="UserName"
                                onChange={(e) => {
                                    setdisplayName(e.target.value);
                                }}
                                style={{ margin: "20px" }}
                            />
                            <TextField
                                variant="outlined"
                                placeholder="Password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                style={{ margin: "20px" }}
                            />
                            <LoadingButton
                                loading={loading}
                                variant="contained"
                                onClick={type === USER ? handleSignInUser : handleSignInChemist}
                                style={{ margin: "20px" }}
                                load
                            >
                                SIGN IN
                            </LoadingButton>
                            <Button
                                variant="contained"
                                onClick={() => { history.replace("/") }}
                                style={{ margin: "20px" }}
                                startIcon={<ArrowBackIos/>}
                            >
                                Back to Select Role
                            </Button>
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        );
    }
};

export default SignUp;
