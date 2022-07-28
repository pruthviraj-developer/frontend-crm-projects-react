import React from "react";
import { Story } from '@storybook/react/types-6-0';
import {AddVendorProps} from './IAddVendorForm';
import {AddVendorForm} from "./AddVendorForm";


export default {
    title: 'Add Vendor Form',
    component: AddVendorForm,
  };

  const vendorContractProps = {
	};
const Template: Story<AddVendorProps> = (args) => <AddVendorForm {...args} />;
export const AddVendorFormComponent = Template.bind({});
AddVendorFormComponent.args = vendorContractProps;