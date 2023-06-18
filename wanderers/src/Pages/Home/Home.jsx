import React, { useEffect, useState } from "react";
import FeaturedProperties from "../../components/FeaturedProperties/FeaturedProperties";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import PropertyList from "../../components/PropertyList/PropertyList";
import Subscribe from "../../components/Subscribe/Subscribe";
import "./Home.css";
function Home({googleUser}) {
  // const [googleUser,setgoogleUser] = useState(null)
  // useEffect(()=>{
  //   const fetchGoogleUser=()=>{
  //     fetch('http://localhost:8000/api/auth/login/success',{
  //       method:"GET",
  //       credentials:"include",
  //       headers:{
  //         Accept:"application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials":true,
  //       }
  //     }).then((response)=>{
  //       if(response.status===200) return response.json();
  //       throw new Error("Authentication has been failed");
  //     }).then(resObject=>{
  //       setgoogleUser(resObject.user)
  //     }).catch(err=>{
  //       console.log(err)
  //     })

  //   }
  //   fetchGoogleUser()
  // },[])
  // console.log(googleUser,"GoogleUser")
  return (
    <div>
      <Navbar googleUser={googleUser}/>
      <Header />
      <div className="homeContainer">
        <Features />
        <h1 className="hometitle">Browse by Property Type</h1>
        <PropertyList />
        <h1 className="homeTitle">Home Guest Love!</h1>
        <FeaturedProperties/>
        <Subscribe/>
        <Footer/>
      </div>
    </div>
  );
}

export default Home;
