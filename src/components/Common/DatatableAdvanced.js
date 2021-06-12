import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

// Libraries for buttons
import * as JSZip from "jszip";
window.JSZip = JSZip;


require('pdfmake/build/pdfmake.js');
require('pdfmake/build/vfs_fonts.js');
// Datatables
$.DataTable =require('datatables.net-bs')
$.DataTable =require('datatables.net-bs4/js/dataTables.bootstrap4.js')
$.DataTable =require('datatables.net-bs4/css/dataTables.bootstrap4.css')
$.DataTable =require('datatables.net-buttons')
$.DataTable =require('datatables.net-buttons-bs')
$.DataTable =require('datatables.net-responsive')
$.DataTable =require('datatables.net-responsive-bs')
$.DataTable =require('datatables.net-responsive-bs/css/responsive.bootstrap.css')
$.DataTable =require('datatables.net-buttons/js/buttons.colVis.js') // Column visibility
$.DataTable =require('datatables.net-buttons/js/buttons.html5.js') // HTML 5 file export
$.DataTable =require('datatables.net-buttons/js/buttons.flash.js') // Flash file export
$.DataTable =require('datatables.net-buttons/js/buttons.print.js') // Print view button
$.DataTable =require('datatables.net-keytable');
$.DataTable=require('datatables.net-keytable-bs/css/keyTable.bootstrap.css')
$.DataTable = require('datatables.net')

/**
 * Wrapper component for dataTable plugin
 * Only DOM child elements, componets are not supported (e.g. <Table>)
 */
export default class Datatable extends Component {

    static propTypes = {
        /** datatables options object */
        options: PropTypes.object,
        /** only one children allowed */
        children: PropTypes.element.isRequired,
        /** callback that receives the datatable instance as param */
        dtInstance: PropTypes.func
    }

    static defaultProps = {
        options: {}
    }

    componentDidMount() {
        const dtInstance = $(this.tableElement).dataTable(this.props.options);

        if(this.props.dtInstance)
            this.props.dtInstance(dtInstance)
    }

    componentWillUnmount() {
        $(this.tableElement).dataTable({destroy: true});
    }

 

    setRef = node => this.tableElement = node;

    render() {
        return (
            React.cloneElement(React.Children.only(this.props.children), {
                ref: this.setRef
            })
        )
    }
}
