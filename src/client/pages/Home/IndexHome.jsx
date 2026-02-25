import Banner from "./section/banner/Banner"
import Computer  from "./section/products/Computer";
import KeyBoard from "./section/products/keyboard";
import LaptopGamming from "./section/products/LaptopGamming";
import Mouse from "./section/products/mouse";
import Screen  from "./section/products/screen";
import Status from "./section/status/status";
function IndexHome(){
    return (
        <>
            <Banner/>
            <Computer/>
            <Screen/>
            <KeyBoard/>
            <Mouse/>
            <LaptopGamming/>
            <Status/>

        </>
    )
}

export default IndexHome