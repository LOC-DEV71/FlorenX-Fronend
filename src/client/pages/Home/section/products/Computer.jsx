import { TruckOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './Computer.scss'
function Computer(){
    return(
        <>
            <div className="computer">
                <div className='computer_top'>
                    <h3 className="computer_top-title">
                        PC BÁN CHẠY | <TruckOutlined /> TRẢ GÓP 0%
                    </h3>
                    <ul className='computer_top-category'>
                        <li>PC I3</li>
                        <li>PC I3</li>
                        <li>PC I3</li>
                        <li>PC I3</li>
                        <li>PC I3</li>
                        <li>PC I3</li>
                        <li>PC I3</li>
                        <li>PC I3</li>
                    </ul>
                    <Link className='computer_top-all'>Xem tất cả</Link>
                </div>

                <div className='computer_main'>
                    
                </div>


            </div>
        </>
    )
}

export default Computer