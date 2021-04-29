import React from "react";
import { Persona, PersonaInitialsColor, PersonaSize } from '@fluentui/react/lib/Persona';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

function EmployeeCard(props) {
    function handleChoice(mode) {
        props.chooseEmployee(props.employee.id);
        props.chooseMode(mode);
    }

    return (
        <div className="card ms-depth-4">
            <div className="row g-0">
                <div className="col-8">
                    <Persona text={props.employee.name}
                        secondaryText={`Employee ID: ${props.employee.id}`}
                        tertiaryText={`Employee's Team: ${props.employee.Team.name}`}
                        size={PersonaSize.size100}
                        initialsColor={PersonaInitialsColor.cyan} />
                </div>
                <div className="col-4">
                    <DefaultButton
                        text={`View ${props.employee.name}'s Schedule`}
                        onClick={() => handleChoice("View")} />
                    <PrimaryButton
                        text={`Update ${props.employee.name}'s Information`}
                        onClick={() => handleChoice("Update")} />
                </div>
            </div>
        </div>
    );
}

export default EmployeeCard;
