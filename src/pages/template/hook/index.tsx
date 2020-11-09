import React from "react"
import { connect } from 'react-redux'
import Hook from "../hook"

interface IProps {

}

interface StateProps {

}

interface DispathProps {

}

class HookPage extends React.Component<IProps & StateProps & DispathProps> {
    public render() {
        return <Hook />
    }
}

export default connect(
    (state: any) => {
        return {
            
        }   
    },
    (dispatch) => {
        return {
            
        }
    }
)(HookPage)