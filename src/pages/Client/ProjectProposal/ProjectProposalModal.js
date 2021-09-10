import React, { useEffect } from "react";
import { useForm, useStep } from "react-hooks-helper";
import ViewProposal from "./ViewProposal";
import PaymentProposal from "./PaymentProposal";

const steps = [
    {id: "viewProposal"},
    {id: "PaymentProposal"}
]

const  ProjectproposalModal = (proposal) =>{
    const {step, navigation} = useStep({initialStep: 0, steps});
    const {id} = step;
    const props = {proposal, navigation};

    switch(id){
        case "viewProposal":
            return <ViewProposal {...props} />;
        
        case "PaymentProposal":
            return <PaymentProposal {...props} />;
    }
}

export default ProjectproposalModal;