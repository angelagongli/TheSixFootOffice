import React from "react";
import { Persona, PersonaInitialsColor, PersonaSize } from '@fluentui/react/lib/Persona';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

function TeamCard(props) {
    function handleChoice(mode) {
        props.chooseTeam(props.team.id);
        props.chooseMode(mode);
    }

    return (
        <div className="card ms-depth-4">
            <div className="row g-0">
                <div className="col-8">
                    <h5>
                        {props.team.name} Team
                    </h5>
                    <div className="employeeContainer">
                        {props.team.Employees.length ?
                        props.team.Employees.map(employee => (
                            <Persona key={employee.id}
                                text={employee.name}
                                secondaryText={`Employee ID: ${employee.id}`}
                                showSecondaryText={true}
                                size={PersonaSize.size32}
                                initialsColor={PersonaInitialsColor.cyan} />
                        )) : ""}
                    </div>
                </div>
                <div className="col-4">
                    <DefaultButton
                        text={`View the ${props.team.name} Team's Schedule for the Week`}
                        onClick={() => handleChoice("View")} />
                    <PrimaryButton
                        text={`Update the ${props.team.name} Team's Name`}
                        onClick={() => handleChoice("Update")} />
                </div>
            </div>
        </div>
    );
}

export default TeamCard;
