import axios from 'axios';
import _uniqBy from 'lodash/uniqBy'

export default {

    // module!
    namespaced: true,
    // data
    state : () => {
        return {
            movies: [],
            message: 'Search for the movie title!',
            loading: false,
            theMovie: {}
        }
    },
    // computed
    getters : {
        // movieIds(state) {
        //     return state.movies.map(m => m.imdbID)
        // }
    },
    // methods
    // 변이
    mutations: {
        updateStates(state, payload){
            // ['movies', 'message', 'loading']
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        resetMovies(state) {
            state.movies = []
        }
    },
    // 비동기
    actions: {
        async searchMovies({state, commit}, payload) {
            if (state.loading) return;
            
            commit('updateState',{
                message: '',
                loading: true
            })

            try{
                const response = await _fetchMoive({
                    ...payload,
                    page: 1
                })
                console.log(response);
                const {Search, totalResults} = response.data
                commit('updateStates', {
                    movies: _uniqBy(Search, 'imdbID') 
                })
                console.log(totalResults)
                console.log(typeof totalResults)
    
                const total = parseInt(totalResults, 10) 
                const pageLength = Math.ceil(total / 10)
    
                // 추가 요청
                if( pageLength > 1 ) {
                    for(let page = 2; page <= pageLength; page += 1) {
                        if (page > payload.number / 10) {
                            break
                        }
                        const response = await _fetchMoive({
                            ...payload,
                            page: page
                        })
                        const { Search } = response.data
                        commit('updateState' , {
                            movies: [...state.movies, 
                                ..._uniqBy(Search, 'imdbID')]
                        })
                    }
                }
    
            }
            
            catch(message) {
                commit('updateState', {
                    movies: [],
                    message
                })
            }  finally {
                commit('updateState',{
                    loading:false
                })
            
        }
    },
    async searchMovieWithId({state, commit}, payload) {
        if(state.loading) return

        commit('updateState' , {
            theMovie: {},
            loading:true
        })

        try {
            const res = await _fetchMovie(payload)
            console.log(res)
            commit('updateState', {
                theMovie: res.data
            })
        } catch (error) {
            commit('updateState', {
                theMovie: {}
            })
        } finally {
                commit('updateState', {
                    loading: false
                })
            }
        }
    }
}
function _fetchMoive(payload) {
    const {title, type, year, page, id} = payload
    const OMDB_API_KEY = '7035c60c'
    const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`


    return new Promise((reslove, reject ) => {
        axios.get(url)
        .then((res) => {
            if(res.data.Error) {
                reject(res.data.Error)
            }
            reslove(res)
        })
        .catch(err => {
            reject(err.message)
        })
        
    })
}
