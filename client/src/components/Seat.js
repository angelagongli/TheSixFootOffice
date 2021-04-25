import React from "react";
import { Persona, PersonaInitialsColor, PersonaSize } from '@fluentui/react/lib/Persona';

function Seat(props) {
    return (
        <div>
            Seat Number: {props.seatNumber}
            <Persona text={props.employee.name}
                secondaryText={`Employee ID: ${props.employee.id},
                    Employee's Team: ${props.team.name}`}
                showSecondaryText={true}
                size={PersonaSize.size32}
                initialsColor={PersonaInitialsColor.cyan} />
        </div>
    );
}

export default Seat;
