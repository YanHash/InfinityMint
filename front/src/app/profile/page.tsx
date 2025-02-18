"use client"

import AuthPage from "@/app/auth/page";

const ProfilePage = () => {

    return (localStorage.getItem("userIsConnected") ?
            <>
                <AuthPage/>

                <h1>Profile is coming soon...</h1>
            </> :<></>
    )
}
export default ProfilePage;