import React from "react";
import { Persona, PersonaInitialsColor, PersonaSize } from '@fluentui/react/lib/Persona';

function VisitorCard(props) {

    return (
        <div className="card ms-depth-4">
            <div className="row g-0">
                <div className="col-12">
                    <Persona text={props.EmployeeVisitingName}
                        secondaryText={`Is Being Requested to Be Visited by: ${props.visitor.name} (${props.visitor.role})`}
                        tertiaryText={`Reason for Request: ${props.visitor.reasonNecessitatingVisit}`}
                        size={PersonaSize.size100}
                        initialsColor={PersonaInitialsColor.cyan} />
                </div>
            </div>
        </div>
    );
}

export default VisitorCard;
