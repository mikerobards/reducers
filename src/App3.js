import React, { useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';

/*

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))

*/

function useAuth() {

    let [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "LOADING": {
                return { ...state, loading: true }
            }
            case "RESOLVED": {
                return {
                    ...state,
                    loading: false,
                    response: action.response,
                    error: null
                }
            }
            case "ERROR": {
                return {
                    ...state,
                    loading: false,
                    response: null,
                    error: action.error
                }
            }
            default:
                return state
        }
    }, {
        loading: false,
        response: null,
        error: null
    })

    useEffect(() => {
        let isCurrent = true
        dispatch({ type: "LOADING" })
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => {
                if (isCurrent) {
                    // setUser(json)
                    dispatch({ type: "RESOLVED", response: json })
                    console.log(json)
                }
            }).catch(error => {
                console.log(error)
                dispatch({ type: "ERROR", error })
            })
        return () => {
            isCurrent = false // cleanup function
        }
    }, [])
    return [state.loading, state.response, state.error]
}

const App3 = () => {
    // let [user, setUser] = useState(null);


    let [loading, response, error] = useAuth()

    return (
        <section>
            <h2>Get User Data</h2>
            <div className="user">
                {loading && <div>Loading...</div>}
                {error && <div>ERROR OH NO!!!</div>}
                {response && <>
                    User ID: {response.id} <br />
                    User Title: {response.title}
                </>}
            </div>
        </section>
    )
}
export default App3
// ReactDOM.render(<App />, document.getElementById('root'));