import React from 'react'
import { CSVLink } from 'react-csv'
import { Button } from "reactstrap";

export const ExportReactCSV = ({csvData, fileName}) => {

    return (
        <Button style={{ color: "white", 
        background: "#003366"  }} className="btn-pill-right mr-2">
            <CSVLink data={csvData} filename={fileName}>Export</CSVLink>
        </Button>
    )
}