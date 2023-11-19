import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'

export default createRouter({
    // History 사용시에는 서버에 세팅 필요
    
    // Hash
    // https://google.com/#/search
    history: createWebHashHistory(),
    // pages
    // https://google.com/about -> about path's component run
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/movie/:id',
            component: Movie
        }, 
        {
            path: '/about',
            component: About
        }
    ]
})