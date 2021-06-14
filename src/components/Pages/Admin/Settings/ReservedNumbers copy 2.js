import React, {Component} from 'react'
import axios from "../../../../services/axios";
// import 'datatables.net-dt/css/jquery.dataTables.css'
// import 'datatables.net-bs/css/dataTables.bootstrap.css'

const $ = require('jquery')
$.DataTable = require('datatables.net')

export default class ReservedNumbers extends Component {

    state = {
        data: null
    }

    componentDidMount() {
        //console.log(this.el);

        axios.get('/tariff').then(res => {
            const data = res.data;
            console.log(data)
            this.setState({data});
        });

        this.$el = $(this.el)
        this.$el.DataTable({
            data: this.state.data
        })
    }

    componentWillUnmount() {
        this.$el.DataTable().destroy(true);
    }

    render() {
        return (
            <div>
                <table className="display"  ref = {el => this.el = el }>

                </table>
            </div>
        );
    }
}