import React from "react";

function OfficeRoster(props) {
    return (
        <div>
            {props.inOfficeEmployeesAll.length && Object.entries(props.inOfficeLookUp).length ?
            props.inOfficeEmployeesAll.map(employee => (
                <div key={employee.id}>
                    {employee.name} sits in Seat Number {employee.seatNumber}: {props.inOfficeLookUp[employee.id]}
                </div>
            ))
            : ""}
        </div>
    );
}

export default OfficeRoster;
