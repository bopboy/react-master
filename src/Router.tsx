import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Coin from './routes/Coin'
import Coins from './routes/Coins'

// react-router-dom 이 6 버전이 되면서 Switch 는 Routes 로 변경 (component 도 element 로 변경)
// Route 안에 element 에 컴포넌트 넣어야 함 
interface IRouterProps {
    toggleDark: () => void
    isDark: boolean
}
function Router({ toggleDark, isDark }: IRouterProps) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/:coinId"><Coin isDark={isDark} /></Route>
                <Route path="/"><Coins toggleDark={toggleDark} /></Route>
            </Switch>
        </BrowserRouter >
    )
}

export default Router
