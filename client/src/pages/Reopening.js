import React, { useState, useCallback } from "react";
import Header from "../components/Header";
import { Navigation } from "../components/Navigation";
import { Stack } from '@fluentui/react/lib/Stack';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import API from "../utils/API";

function Reopening() {
    const [chosenMaxAllowedOfficeCapacityPercentage, setChosenMaxAllowedOfficeCapacityPercentage] = useState();
    const [isMaskWearingRequired, setIsMaskWearingRequired] = useState(true);
    const columnProps = {
        tokens: { childrenGap: 15 },
        styles: { root: { width: 300 } },
    };

    function chooseMaxAllowedOfficeCapacity (event, maxAllowedOfficeCapacityChoice) {
        setChosenMaxAllowedOfficeCapacityPercentage(maxAllowedOfficeCapacityChoice.key);
    }

    const onChangeIsMaskWearingRequired = useCallback(
        (ev, checked) => {
            setIsMaskWearingRequired(!!checked);
        },
        [],
    );

    function computeMaxAllowedOfficeCapacityChoice() {
        let maxAllowedOfficeCapacityArr = [];
        for (let i = 32; i < 100; i++) {
            maxAllowedOfficeCapacityArr.push({
                key: i + 1,
                text: `${i + 1}%`
            });
        }
        return maxAllowedOfficeCapacityArr;
    }

    function submitOfficeReopeningSetting() {
    }

    return (
        <div>
            <div className="row g-0">
                <div className="col-12">
                    <Header />
                </div>
            </div>
            <div className="row g-0">
                <div className="col-3 col-sm-2 col-lg-1">
                    <Navigation />
                </div>
                <div className="col-9 col-sm-10 col-lg-11 container">
                    <h2>
                        Reopening the Office
                    </h2>
                    <Stack {...columnProps}>
                        <Dropdown
                            label="Set the Maximum Allowed Capacity for the Office"
                            selectedKey={chosenMaxAllowedOfficeCapacityPercentage ? chosenMaxAllowedOfficeCapacityPercentage : undefined}
                            onChange={chooseMaxAllowedOfficeCapacity}
                            placeholder="Choose Your Maximum Allowed Office Capacity"
                            options={computeMaxAllowedOfficeCapacityChoice()}
                            required />
                        <Checkbox
                            label="Is mask wearing still required in the office?"
                            checked={isMaskWearingRequired}
                            onChange={onChangeIsMaskWearingRequired} />
                        <PrimaryButton
                            text="Submit Office Reopening Setting"
                            onClick={() => submitOfficeReopeningSetting()} />
                    </Stack>
                </div>
            </div>
        </div>
    );
}

export default Reopening;
