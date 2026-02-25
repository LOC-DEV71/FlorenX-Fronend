import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import Hero from "../components/Hero/Hero"
import ChatWidget from "./chat"
import { SliderNavProvider } from "../../context/client/sliderNavContext"

function MainLayout(){
    return(
        <>
            <SliderNavProvider>
                <Hero/>
                <Header/>
                    <main>
                        <Outlet/>
                        <ChatWidget/>
                    </main>
                <Footer/>
            </SliderNavProvider>
           
        </>
    )
}

export default MainLayout