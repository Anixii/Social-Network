import React from "react"; 
import { create } from "react-test-renderer"; 
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus Component', () => {
    test('status from props should be in state', () => {
        const component = create(<ProfileStatus status='Test' />);
        const instance = component.root;
        expect(instance.props.status).toEqual('Test');
    }); 
    // test('after creation span should be displayed', () => {
    //     const component = create(<ProfileStatus status='Test' />);
    //     const instance = component.root;
       
        
    //     expect(instance.findByType('span')).not.toBeNull();
    // });
});