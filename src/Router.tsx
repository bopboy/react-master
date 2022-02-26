import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Coin from './routes/Coin'
import Coins from './routes/Coins'

// react-router-dom 이 6 버전이 되면서 Switch 는 Routes 로 변경 (component 도 element 로 변경)
// Route 안에 element 에 컴포넌트 넣어야 함 
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:coinId" element={<Coin />}></Route>
                <Route path="/" element={<Coins />}></Route>
            </Routes>
        </BrowserRouter >
    )
}

export default Router
