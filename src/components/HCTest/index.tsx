import React from "react";
import HCEditable from "./order";
// import HCEditable from "./editable";

export default class HCTestIndex extends React.Component {
    render(): React.ReactNode {
        return <div>
            <HCEditable></HCEditable>
        </div>;
    }
}